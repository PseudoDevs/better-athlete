<?php

namespace App\Http\Controllers;

use App\Enums\OrganizationType;
use App\Enums\VerificationStatus;
use App\Models\Organization;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OrganizationDirectoryController extends Controller
{
    /**
     * Display the organization directory.
     */
    public function index(Request $request): Response
    {
        $organizations = Organization::query()
            ->withCount('opportunities')
            ->when($request->filled('q'), fn ($query) => $query
                ->where('name', 'like', '%'.$request->string('q').'%')
                ->orWhere('city', 'like', '%'.$request->string('q').'%'))
            ->when($request->filled('type'), fn ($query) => $query
                ->where('type', $request->string('type')))
            ->when($request->boolean('verified'), fn ($query) => $query
                ->where('verification_status', VerificationStatus::Verified))
            ->orderBy('name')
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('organizations/index', [
            'organizations' => $organizations,
            'types' => collect(OrganizationType::cases())
                ->map(fn ($type) => ['value' => $type->value, 'label' => $type->label()]),
            'filters' => $request->only(['q', 'type', 'verified']),
        ]);
    }

    /**
     * Display an organization page.
     */
    public function show(Organization $organization): Response
    {
        $opportunities = $organization->opportunities()
            ->published()
            ->with('sport')
            ->latest('published_at')
            ->limit(6)
            ->get();

        return Inertia::render('organizations/show', [
            'organization' => $organization,
            'opportunities' => $opportunities,
            'opportunitiesCount' => $organization->opportunities()->published()->count(),
        ]);
    }
}
