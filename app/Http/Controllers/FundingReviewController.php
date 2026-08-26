<?php

namespace App\Http\Controllers;

use App\Enums\ApplicationStatus;
use App\Enums\TransactionType;
use App\Models\Application;
use App\Models\AuditLog;
use App\Models\FundingBeneficiary;
use App\Services\Funding\Ledger;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use InvalidArgumentException;

class FundingReviewController extends Controller
{
    /**
     * Review a funding program application.
     */
    public function review(Request $request, Application $application): RedirectResponse
    {
        $program = $application->fundingProgram;
        abort_if($program === null, 404);

        $this->authorize('manage', $program);

        $validated = $request->validate([
            'action' => ['required', 'in:approve,reject,request_information,mark_reviewed'],
            'notes' => ['nullable', 'string', 'max:2000'],
            'awarded_amount' => ['nullable', 'integer', 'min:1'],
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

        if ($validated['action'] === 'approve') {
            $awarded = $validated['awarded_amount']
                ?? $application->requested_amount
                ?? 0;

            abort_if($awarded <= 0, 422, 'An awarded amount is required to approve.');

            FundingBeneficiary::firstOrCreate(
                [
                    'funding_program_id' => $program->id,
                    'athlete_profile_id' => $application->athlete_profile_id,
                ],
                [
                    'application_id' => $application->id,
                    'awarded_amount' => $awarded,
                ],
            );

            try {
                Ledger::record(
                    $program,
                    TransactionType::Commitment,
                    $awarded,
                    $application->athlete_profile_id,
                    $application->id,
                    ['description' => 'Commitment for approved application'],
                );
            } catch (InvalidArgumentException $exception) {
                return back()->withErrors(['awarded_amount' => $exception->getMessage()]);
            }
        }

        AuditLog::record('funding_application.'.$validated['action'], $application, [
            'status' => $status->value,
            'awarded_amount' => $validated['awarded_amount'] ?? null,
        ]);

        return back()->with('status', 'application-reviewed');
    }
}
