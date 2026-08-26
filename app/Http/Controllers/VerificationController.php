<?php

namespace App\Http\Controllers;

use App\Enums\VerificationStatus;
use App\Enums\VerificationType;
use App\Models\AuditLog;
use App\Models\GovernmentEntity;
use App\Models\Organization;
use App\Models\VerificationRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class VerificationController extends Controller
{
    /**
     * Show the current user's verification requests.
     */
    public function index(Request $request): Response
    {
        $requests = VerificationRequest::where('user_id', $request->user()->id)
            ->with('documents')
            ->latest()
            ->get();

        return Inertia::render('athlete/verification', [
            'requests' => $requests,
        ]);
    }

    /**
     * Submit a verification request with documents.
     */
    public function store(Request $request): RedirectResponse
    {
        $user = $request->user();

        $validated = $request->validate([
            'type' => ['required', 'in:athlete_identity,athlete_status,organization,government_entity'],
            'organization_id' => ['required_if:type,organization', 'nullable', 'exists:organizations,id'],
            'government_entity_id' => ['required_if:type,government_entity', 'nullable', 'exists:government_entities,id'],
            'notes' => ['nullable', 'string', 'max:1000'],
            'documents' => ['required', 'array', 'min:1', 'max:5'],
            'documents.*' => ['required', 'file', 'max:10240', 'mimes:pdf,jpg,jpeg,png'],
        ]);

        if ($validated['type'] === 'organization') {
            $organization = Organization::findOrFail($validated['organization_id']);
            $this->authorize('manage', $organization);
        }

        $governmentEntityId = null;

        if ($validated['type'] === 'government_entity') {
            $governmentEntity = GovernmentEntity::findOrFail($validated['government_entity_id']);
            $this->authorize('manage', $governmentEntity);
            $governmentEntityId = $governmentEntity->id;
        }

        $verificationRequest = $user->verificationRequests()->create([
            'type' => $validated['type'],
            'organization_id' => $validated['organization_id'] ?? null,
            'government_entity_id' => $governmentEntityId,
            'status' => VerificationStatus::Pending,
            'notes' => $validated['notes'] ?? null,
        ]);

        foreach ($request->file('documents') as $document) {
            $path = $document->store('verification-documents', 'local');

            $verificationRequest->documents()->create([
                'document_type' => $validated['type'],
                'file_path' => $path,
                'original_name' => $document->getClientOriginalName(),
            ]);
        }

        AuditLog::record('verification.submitted', $verificationRequest, [
            'type' => $validated['type'],
        ]);

        return back()->with('status', 'verification-submitted');
    }

    /**
     * Show the admin verification queue.
     */
    public function queue(Request $request): Response
    {
        $requests = VerificationRequest::query()
            ->with(['user', 'documents', 'organization', 'governmentEntity'])
            ->when($request->filled('status'), fn ($query) => $query
                ->where('status', $request->string('status')))
            ->latest()
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('admin/verifications', [
            'requests' => $requests,
            'filters' => $request->only(['status']),
        ]);
    }

    /**
     * Approve or reject a verification request.
     */
    public function decide(Request $request, VerificationRequest $verificationRequest): RedirectResponse
    {
        $this->authorize('decide', $verificationRequest);

        $validated = $request->validate([
            'decision' => ['required', 'in:approve,reject'],
            'review_notes' => ['nullable', 'string', 'max:2000'],
        ]);

        $approved = $validated['decision'] === 'approve';

        $verificationRequest->update([
            'status' => $approved ? VerificationStatus::Verified : VerificationStatus::Rejected,
            'reviewed_by' => $request->user()->id,
            'reviewed_at' => now(),
            'review_notes' => $validated['review_notes'] ?? null,
        ]);

        if ($approved) {
            match ($verificationRequest->type) {
                VerificationType::Organization => $verificationRequest->organization?->update([
                    'verification_status' => VerificationStatus::Verified,
                    'verified_at' => now(),
                ]),
                VerificationType::GovernmentEntity => $verificationRequest->governmentEntity?->update([
                    'verification_status' => VerificationStatus::Verified,
                    'verified_at' => now(),
                ]),
                default => $verificationRequest->user->athleteProfile?->update([
                    'verification_status' => VerificationStatus::Verified,
                    'verified_at' => now(),
                ]),
            };
        }

        AuditLog::record(
            $approved ? 'verification.approved' : 'verification.rejected',
            $verificationRequest,
            ['type' => $verificationRequest->type->value],
        );

        return back()->with('status', 'verification-decided');
    }
}
