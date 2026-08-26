<?php

namespace App\Http\Controllers;

use App\Enums\ApplicationStatus;
use App\Enums\FundingProgramStatus;
use App\Enums\TransactionType;
use App\Models\FundingBeneficiary;
use App\Models\FundingProgram;
use App\Models\FundingTransaction;
use App\Models\GovernmentEntity;
use App\Services\Funding\Ledger;
use Inertia\Inertia;
use Inertia\Response;

class TransparencyController extends Controller
{
    /**
     * Public funding transparency dashboard.
     */
    public function index(): Response
    {
        $programs = FundingProgram::published()
            ->orWhere('status', FundingProgramStatus::Closed)
            ->with('governmentEntity')
            ->withCount('beneficiaries')
            ->latest('published_at')
            ->paginate(12);

        $programs->getCollection()->transform(function (FundingProgram $program) {
            $program->totals = Ledger::totals($program);

            return $program;
        });

        $grandTotals = [
            'allocated' => (int) FundingTransaction::where('transaction_type', TransactionType::Allocation->value)->sum('amount'),
            'committed' => (int) FundingTransaction::where('transaction_type', TransactionType::Commitment->value)->sum('amount'),
            'disbursed' => (int) FundingTransaction::where('transaction_type', TransactionType::Disbursement->value)->sum('amount'),
            'programs' => FundingProgram::published()->count(),
            'beneficiaries' => FundingBeneficiary::count(),
            'entities' => GovernmentEntity::query()->where('verification_status', 'verified')->count(),
        ];

        return Inertia::render('transparency/index', [
            'programs' => $programs,
            'totals' => $grandTotals,
        ]);
    }

    /**
     * Public funding program detail with full pipeline.
     */
    public function show(FundingProgram $program): Response
    {
        abort_unless(
            in_array($program->status, [FundingProgramStatus::Published, FundingProgramStatus::Closed, FundingProgramStatus::Completed], true),
            404,
        );

        $program->load(['governmentEntity', 'sport']);

        $transactions = $program->transactions()
            ->with('athleteProfile.user')
            ->latest('created_at')
            ->limit(100)
            ->get();

        $applicationStats = [
            'total' => $program->applications()->count(),
            'approved' => $program->applications()->where('status', ApplicationStatus::Approved)->count(),
            'rejected' => $program->applications()->where('status', ApplicationStatus::Ineligible)->count(),
            'pending' => $program->applications()->whereIn('status', [
                ApplicationStatus::Submitted,
                ApplicationStatus::UnderReview,
                ApplicationStatus::NeedsInformation,
            ])->count(),
        ];

        return Inertia::render('transparency/show', [
            'program' => $program,
            'totals' => Ledger::totals($program),
            'transactions' => $transactions,
            'beneficiaries' => $program->beneficiaries()->with('athleteProfile.user')->get(),
            'applicationStats' => $applicationStats,
        ]);
    }
}
