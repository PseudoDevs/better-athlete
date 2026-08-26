<?php

namespace App\Http\Controllers;

use App\Models\Opportunity;
use App\Models\Sport;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SportDirectoryController extends Controller
{
    /**
     * Display the sports directory.
     */
    public function index(Request $request): Response
    {
        $sports = Sport::query()
            ->withCount('athleteSports as athletes_count')
            ->withCount('opportunities as opportunities_count')
            ->when($request->filled('q'), fn ($query) => $query
                ->where('name', 'like', '%'.$request->string('q').'%'))
            ->orderBy('name')
            ->paginate(24)
            ->withQueryString();

        return Inertia::render('sports/index', [
            'sports' => $sports,
            'filters' => $request->only(['q']),
        ]);
    }

    /**
     * Display a sport page with its athletes and opportunities.
     */
    public function show(Sport $sport): Response
    {
        $athletes = $sport->athleteSports()
            ->with(['athleteProfile.user', 'athleteProfile.sports.sport'])
            ->limit(8)
            ->get()
            ->pluck('athleteProfile')
            ->unique('id')
            ->values();

        $opportunities = Opportunity::published()
            ->where('sport_id', $sport->id)
            ->with('organization')
            ->latest('published_at')
            ->limit(6)
            ->get();

        return Inertia::render('sports/show', [
            'sport' => $sport->load('disciplines'),
            'athletes' => $athletes,
            'opportunities' => $opportunities,
            'athletesCount' => $sport->athleteSports()->distinct('athlete_profile_id')->count('athlete_profile_id'),
        ]);
    }
}
