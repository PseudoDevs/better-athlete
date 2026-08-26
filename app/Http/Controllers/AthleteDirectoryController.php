<?php

namespace App\Http\Controllers;

use App\Enums\VerificationStatus;
use App\Models\AthleteProfile;
use App\Models\Sport;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AthleteDirectoryController extends Controller
{
    /**
     * Display the athlete directory.
     */
    public function index(Request $request): Response
    {
        $athletes = AthleteProfile::query()
            ->with(['user', 'sports.sport'])
            ->when($request->filled('q'), function ($query) use ($request) {
                $term = '%'.$request->string('q').'%';

                $query->whereHas('user', fn ($userQuery) => $userQuery
                    ->where('name', 'like', $term)
                    ->orWhere('username', 'like', $term))
                    ->orWhere('city', 'like', $term);
            })
            ->when($request->filled('sport'), fn ($query) => $query
                ->whereHas('sports', fn ($sports) => $sports
                    ->where('sport_id', $request->integer('sport'))))
            ->when($request->filled('region'), fn ($query) => $query
                ->where('region', $request->string('region')))
            ->when($request->boolean('verified'), fn ($query) => $query
                ->where('verification_status', VerificationStatus::Verified))
            ->latest()
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('athletes/index', [
            'athletes' => $athletes,
            'sports' => Sport::orderBy('name')->get(['id', 'name', 'slug']),
            'regions' => AthleteProfile::query()
                ->select('region')
                ->distinct()
                ->whereNotNull('region')
                ->orderBy('region')
                ->pluck('region'),
            'filters' => $request->only(['q', 'sport', 'region', 'verified']),
        ]);
    }

    /**
     * Display a public athlete profile.
     */
    public function show(User $user): Response
    {
        $profile = $user->athleteProfile()->with([
            'sports.sport',
            'achievements' => fn ($query) => $query->orderByDesc('year'),
            'needs',
        ])->firstOrFail();

        return Inertia::render('athletes/show', [
            'athlete' => [
                'id' => $user->id,
                'name' => $user->name,
                'username' => $user->username,
                'profile' => $profile,
            ],
        ]);
    }
}
