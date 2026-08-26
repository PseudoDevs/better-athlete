<?php

namespace App\Http\Controllers;

use App\Enums\FundingProgramStatus;
use App\Enums\TransactionType;
use App\Models\AuditLog;
use App\Models\FundingProgram;
use App\Models\GovernmentEntity;
use App\Services\Funding\Ledger;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use InvalidArgumentException;

class FundingProgramController extends Controller
{
    /**
     * Show a program's management page (details, applications, ledger).
     */
    public function show(Request $request, FundingProgram $program): Response
    {
        $this->authorize('manage', $program);

        $program->load(['governmentEntity', 'sport']);

        $applications = $program->applications()
            ->with(['athleteProfile.user', 'athleteProfile.sports.sport'])
            ->latest()
            ->limit(30)
            ->get();

        $transactions = $program->transactions()
            ->with(['athleteProfile.user', 'createdBy'])
            ->latest('created_at')
            ->limit(50)
            ->get();

        return Inertia::render('government/program', [
            'program' => $program,
            'applications' => $applications,
            'transactions' => $transactions,
            'totals' => Ledger::totals($program),
            'beneficiaries' => $program->beneficiaries()->with('athleteProfile.user')->get(),
        ]);
    }

    /**
     * Create a funding program.
     */
    public function store(Request $request, GovernmentEntity $governmentEntity): RedirectResponse
    {
        $this->authorize('manage', $governmentEntity);

        $program = $governmentEntity->fundingPrograms()->create(
            $this->validateProgram($request)
        );

        AuditLog::record('funding_program.created', $program, ['title' => $program->title]);

        return redirect()
            ->route('government.programs.show', $program)
            ->with('status', 'funding-program-created');
    }

    /**
     * Update a funding program.
     */
    public function update(Request $request, FundingProgram $program): RedirectResponse
    {
        $this->authorize('manage', $program);

        $program->update($this->validateProgram($request));

        AuditLog::record('funding_program.updated', $program);

        return back()->with('status', 'funding-program-updated');
    }

    /**
     * Publish a program (records the allocation in the ledger).
     */
    public function publish(Request $request, FundingProgram $program): RedirectResponse
    {
        $this->authorize('manage', $program);

        if ($program->status !== FundingProgramStatus::Draft) {
            return back()->withErrors(['status' => 'Only draft programs can be published.']);
        }

        $program->update([
            'status' => FundingProgramStatus::Published,
            'published_at' => now(),
        ]);

        Ledger::record(
            $program,
            TransactionType::Allocation,
            $program->budget,
            null,
            null,
            ['description' => 'Initial allocation upon publication'],
        );

        AuditLog::record('funding_program.published', $program, ['budget' => $program->budget]);

        return back()->with('status', 'funding-program-published');
    }

    /**
     * Close a program to new applications.
     */
    public function close(Request $request, FundingProgram $program): RedirectResponse
    {
        $this->authorize('manage', $program);

        $program->update(['status' => FundingProgramStatus::Closed]);

        AuditLog::record('funding_program.closed', $program);

        return back()->with('status', 'funding-program-closed');
    }

    /**
     * Record a ledger transaction (commitment or disbursement).
     */
    public function recordTransaction(Request $request, FundingProgram $program): RedirectResponse
    {
        $this->authorize('manage', $program);

        $validated = $request->validate([
            'transaction_type' => ['required', 'in:commitment,disbursement,refund,adjustment'],
            'amount' => ['required', 'integer', 'min:1'],
            'athlete_profile_id' => ['nullable', 'exists:athlete_profiles,id'],
            'application_id' => ['nullable', 'exists:applications,id'],
            'description' => ['nullable', 'string', 'max:500'],
            'transaction_date' => ['nullable', 'date'],
        ]);

        try {
            Ledger::record(
                $program,
                TransactionType::from($validated['transaction_type']),
                $validated['amount'],
                $validated['athlete_profile_id'] ?? null,
                $validated['application_id'] ?? null,
                [
                    'description' => $validated['description'] ?? null,
                    'transaction_date' => $validated['transaction_date'] ?? null,
                ],
            );
        } catch (InvalidArgumentException $exception) {
            return back()->withErrors(['amount' => $exception->getMessage()]);
        }

        AuditLog::record('funding_transaction.recorded', $program, [
            'type' => $validated['transaction_type'],
            'amount' => $validated['amount'],
        ]);

        return back()->with('status', 'transaction-recorded');
    }

    /**
     * Validate program input.
     *
     * @return array<string, mixed>
     */
    protected function validateProgram(Request $request): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:200'],
            'description' => ['required', 'string', 'max:5000'],
            'budget' => ['required', 'integer', 'min:1000'],
            'sport_id' => ['nullable', 'exists:sports,id'],
            'min_age' => ['nullable', 'integer', 'min:12', 'max:80'],
            'max_age' => ['nullable', 'integer', 'min:12', 'max:80', 'gte:min_age'],
            'gender' => ['nullable', 'in:male,female'],
            'eligible_levels' => ['nullable', 'array'],
            'eligible_levels.*' => ['in:local,regional,national,international'],
            'eligible_regions' => ['nullable', 'array'],
            'eligible_regions.*' => ['string', 'max:120'],
            'requires_verified_athlete' => ['boolean'],
            'application_deadline' => ['nullable', 'date', 'after:today'],
        ]);
    }
}
