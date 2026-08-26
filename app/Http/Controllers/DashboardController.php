<?php

namespace App\Http\Controllers;

use App\Enums\ApplicationStatus;
use App\Enums\VerificationStatus;
use App\Models\VerificationRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the athlete dashboard.
     */
    public function __invoke(Request $request): Response
    {
        $user = $request->user();

        $profile = $user->athleteProfile()->with([
            'sports.sport',
            'achievements',
            'needs',
        ])->first();

        $applications = $profile
            ? $profile->applications()
                ->with(['opportunity.organization'])
                ->latest('submitted_at')
                ->limit(5)
                ->get()
            : collect();

        $latestVerification = $user->isStaff()
            ? null
            : VerificationRequest::where('user_id', $user->id)
                ->latest()
                ->first();

        $organization = $user->ownedOrganizations()->withCount([
            'opportunities',
            'applications as pending_applications_count' => fn ($query) => $query->where('applications.status', ApplicationStatus::Submitted),
        ])->first();

        return Inertia::render('dashboard', [
            'profile' => $profile,
            'applications' => $applications,
            'verification' => $latestVerification,
            'isVerified' => $profile?->isVerified() ?? false,
            'verificationStatus' => $profile?->verification_status ?? VerificationStatus::Unverified,
            'organization' => $organization,
        ]);
    }
}
