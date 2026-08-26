<?php

namespace App\Http\Controllers;

use App\Enums\OpportunityType;
use App\Models\Opportunity;
use App\Models\Sport;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OpportunityDirectoryController extends Controller
{
    /**
     * Display the opportunity directory.
     */
    public function index(Request $request): Response
    {
        $opportunities = Opportunity::published()
            ->with(['organization', 'sport'])
            ->when($request->filled('q'), fn ($query) => $query
                ->where('title', 'like', '%'.$request->string('q').'%')
                ->orWhere('location', 'like', '%'.$request->string('q').'%'))
            ->when($request->filled('type'), fn ($query) => $query
                ->where('type', $request->string('type')))
            ->when($request->filled('sport'), fn ($query) => $query
                ->where('sport_id', $request->integer('sport')))
            ->when($request->filled('open'), fn ($query) => $query
                ->where(fn ($inner) => $inner
                    ->whereNull('application_deadline')
                    ->orWhere('application_deadline', '>=', now())))
            ->orderBy('application_deadline')
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('opportunities/index', [
            'opportunities' => $opportunities,
            'sports' => Sport::orderBy('name')->get(['id', 'name', 'slug']),
            'types' => collect(OpportunityType::cases())
                ->map(fn ($type) => ['value' => $type->value, 'label' => $type->label()]),
            'filters' => $request->only(['q', 'type', 'sport', 'open']),
        ]);
    }

    /**
     * Display an opportunity detail page.
     */
    public function show(Request $request, Opportunity $opportunity): Response
    {
        $opportunity->load(['organization', 'sport']);

        $hasApplied = false;

        if ($request->user()?->athleteProfile) {
            $hasApplied = $opportunity->applications()
                ->where('athlete_profile_id', $request->user()->athleteProfile->id)
                ->exists();
        }

        return Inertia::render('opportunities/show', [
            'opportunity' => $opportunity,
            'hasApplied' => $hasApplied,
            'canApply' => $opportunity->isOpen(),
        ]);
    }
}
