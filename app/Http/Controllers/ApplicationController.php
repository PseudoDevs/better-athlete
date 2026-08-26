<?php

namespace App\Http\Controllers;

use App\Enums\ApplicationStatus;
use App\Models\Application;
use App\Models\AuditLog;
use App\Models\Opportunity;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ApplicationController extends Controller
{
    /**
     * List the athlete's own applications.
     */
    public function index(Request $request): Response
    {
        $applications = $request->user()
            ->athleteProfile()
            ->with(['applications.opportunity.organization'])
            ->first()
            ?->applications()
            ->with('opportunity.organization')
            ->latest()
            ->paginate(10) ?? collect();

        return Inertia::render('athlete/applications', [
            'applications' => $applications,
        ]);
    }

    /**
     * Submit an application to an opportunity.
     */
    public function store(Request $request, Opportunity $opportunity): RedirectResponse
    {
        $profile = $request->user()->athleteProfile;

        abort_if($profile === null, 403, 'Create your athlete profile first.');
        abort_unless($opportunity->isOpen(), 422, 'This opportunity is not accepting applications.');

        if ($opportunity->applications()->where('athlete_profile_id', $profile->id)->exists()) {
            return back()->withErrors(['statement' => 'You have already applied to this opportunity.']);
        }

        $validated = $request->validate([
            'statement' => ['required', 'string', 'max:3000'],
            'requested_amount' => ['nullable', 'integer', 'min:0'],
        ]);

        $application = $opportunity->applications()->create([
            ...$validated,
            'athlete_profile_id' => $profile->id,
            'status' => ApplicationStatus::Submitted,
            'submitted_at' => now(),
        ]);

        AuditLog::record('application.submitted', $application, [
            'opportunity' => $opportunity->title,
        ]);

        return back()->with('status', 'application-submitted');
    }

    /**
     * Review an application (approve / reject / request information).
     */
    public function review(Request $request, Application $application): RedirectResponse
    {
        $this->authorize('decide', $application);

        $validated = $request->validate([
            'action' => ['required', 'in:approve,reject,request_information,mark_reviewed'],
            'notes' => ['nullable', 'string', 'max:2000'],
        ]);

        $status = match ($validated['action']) {
            'approve' => ApplicationStatus::Approved,
            'reject' => ApplicationStatus::Ineligible,
            'request_information' => ApplicationStatus::NeedsInformation,
            'mark_reviewed' => ApplicationStatus::UnderReview,
        };

        $application->update([
            'status' => $status,
            'reviewed_by' => $request->user()->id,
            'reviewed_at' => now(),
            'decision_notes' => $validated['notes'] ?? $application->decision_notes,
        ]);

        $application->reviews()->create([
            'reviewer_id' => $request->user()->id,
            'action' => $validated['action'],
            'notes' => $validated['notes'] ?? null,
        ]);

        AuditLog::record('application.'.$validated['action'], $application, [
            'status' => $status->value,
        ]);

        return back()->with('status', 'application-reviewed');
    }
}
