<?php

namespace App\Http\Controllers;

use App\Enums\ApplicationStatus;
use App\Enums\UserRole;
use App\Models\AuditLog;
use App\Models\Organization;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OrganizationDashboardController extends Controller
{
    /**
     * Display the organization management dashboard.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();

        $organizations = $user->ownedOrganizations()
            ->withCount([
                'opportunities',
                'applications as pending_applications_count' => fn ($query) => $query->where('applications.status', ApplicationStatus::Submitted),
            ])
            ->get();

        $organizations->each(function ($organization) {
            $organization->setRelation('applications', $organization->applications()
                ->whereIn('status', [ApplicationStatus::Submitted, ApplicationStatus::UnderReview, ApplicationStatus::NeedsInformation])
                ->with(['athleteProfile.user', 'opportunity'])
                ->latest('submitted_at')
                ->limit(20)
                ->get());
        });

        return Inertia::render('organization/index', [
            'organizations' => $organizations,
            'canCreate' => $user->can('create', Organization::class),
        ]);
    }

    /**
     * Create a new organization.
     */
    public function store(Request $request): RedirectResponse
    {
        $user = $request->user();

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:200'],
            'type' => ['required', 'in:sports_organization,club,school,university,training_center,foundation,private_company'],
            'description' => ['nullable', 'string', 'max:2000'],
            'email' => ['nullable', 'email', 'max:200'],
            'phone' => ['nullable', 'string', 'max:32'],
            'website' => ['nullable', 'url', 'max:255'],
            'city' => ['nullable', 'string', 'max:120'],
            'province' => ['nullable', 'string', 'max:120'],
            'region' => ['nullable', 'string', 'max:120'],
        ]);

        $organization = $user->ownedOrganizations()->create($validated);

        $organization->members()->create([
            'user_id' => $user->id,
            'role' => 'owner',
        ]);

        if ($user->role === UserRole::Athlete) {
            $user->update(['role' => UserRole::OrganizationAdmin]);
        }

        AuditLog::record('organization.created', $organization, ['name' => $organization->name]);

        return redirect()->route('organization.index')->with('status', 'organization-created');
    }

    /**
     * Update an organization.
     */
    public function update(Request $request, Organization $organization): RedirectResponse
    {
        $this->authorize('update', $organization);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:200'],
            'type' => ['required', 'in:sports_organization,club,school,university,training_center,foundation,private_company'],
            'description' => ['nullable', 'string', 'max:2000'],
            'email' => ['nullable', 'email', 'max:200'],
            'phone' => ['nullable', 'string', 'max:32'],
            'website' => ['nullable', 'url', 'max:255'],
            'city' => ['nullable', 'string', 'max:120'],
            'province' => ['nullable', 'string', 'max:120'],
            'region' => ['nullable', 'string', 'max:120'],
        ]);

        $organization->update($validated);

        AuditLog::record('organization.updated', $organization);

        return back()->with('status', 'organization-updated');
    }
}
