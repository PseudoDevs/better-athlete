<?php

namespace App\Http\Controllers;

use App\Models\AthleteProfile;
use App\Models\Opportunity;
use App\Models\Organization;
use App\Models\Sport;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SearchController extends Controller
{
    /**
     * Global search across athletes, organizations, opportunities and sports.
     */
    public function __invoke(Request $request): Response
    {
        $term = $request->string('q')->trim();

        $athletes = collect();
        $organizations = collect();
        $opportunities = collect();
        $sports = collect();

        if ($term->isNotEmpty()) {
            $like = '%'.$term.'%';

            $athletes = AthleteProfile::query()
                ->with('user')
                ->whereHas('user', fn ($query) => $query
                    ->where('name', 'like', $like)
                    ->orWhere('username', 'like', $like))
                ->orWhere('city', 'like', $like)
                ->limit(6)
                ->get();

            $organizations = Organization::query()
                ->where('name', 'like', $like)
                ->limit(6)
                ->get();

            $opportunities = Opportunity::published()
                ->with('organization')
                ->where('title', 'like', $like)
                ->limit(6)
                ->get();

            $sports = Sport::query()
                ->where('name', 'like', $like)
                ->limit(6)
                ->get();
        }

        return Inertia::render('search', [
            'q' => (string) $term,
            'athletes' => $athletes,
            'organizations' => $organizations,
            'opportunities' => $opportunities,
            'sports' => $sports,
        ]);
    }
}
