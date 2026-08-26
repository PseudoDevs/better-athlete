<?php

namespace App\Http\Controllers;

use App\Models\Achievement;
use App\Models\AthleteNeed;
use App\Models\Sport;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Inertia\Inertia;
use Inertia\Response;

class AthleteProfileController extends Controller
{
    /**
     * Show the athlete profile editor.
     */
    public function edit(Request $request): Response
    {
        $profile = $request->user()->athleteProfile()->with([
            'sports.sport.disciplines',
            'achievements',
            'needs',
        ])->first();

        return Inertia::render('athlete/profile', [
            'profile' => $profile,
            'sports' => Sport::with('disciplines')->orderBy('name')->get(),
        ]);
    }

    /**
     * Save the athlete profile and sports.
     */
    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'bio' => ['nullable', 'string', 'max:2000'],
            'birth_date' => ['nullable', 'date', 'before:today'],
            'gender' => ['nullable', 'in:male,female'],
            'city' => ['nullable', 'string', 'max:120'],
            'province' => ['nullable', 'string', 'max:120'],
            'region' => ['nullable', 'string', 'max:120'],
            'current_goal' => ['nullable', 'string', 'max:500'],
            'primary_sport_id' => ['nullable', 'exists:sports,id'],
            'secondary_sport_ids' => ['nullable', 'array'],
            'secondary_sport_ids.*' => ['integer', 'exists:sports,id'],
            'level' => ['nullable', 'in:local,regional,national,international'],
        ]);

        $profile = $request->user()->athleteProfile()->firstOrCreate(
            ['user_id' => $request->user()->id],
        );

        $profile->update(Arr::only($validated, [
            'bio', 'birth_date', 'gender', 'city', 'province', 'region', 'current_goal',
        ]));

        $profile->sports()->delete();

        $level = $validated['level'] ?? 'local';

        if (! empty($validated['primary_sport_id'])) {
            $profile->sports()->create([
                'sport_id' => $validated['primary_sport_id'],
                'level' => $level,
                'is_primary' => true,
            ]);
        }

        foreach (array_unique($validated['secondary_sport_ids'] ?? []) as $sportId) {
            if ($sportId == ($validated['primary_sport_id'] ?? null)) {
                continue;
            }

            $profile->sports()->create([
                'sport_id' => $sportId,
                'level' => $level,
                'is_primary' => false,
            ]);
        }

        return back()->with('status', 'profile-updated');
    }

    /**
     * Store a new achievement.
     */
    public function storeAchievement(Request $request): RedirectResponse
    {
        $profile = $request->user()->athleteProfile()->firstOrCreate(
            ['user_id' => $request->user()->id],
        );

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:200'],
            'medal' => ['nullable', 'in:gold,silver,bronze,other'],
            'event' => ['nullable', 'string', 'max:200'],
            'year' => ['nullable', 'integer', 'min:1900', 'max:'.(now()->year + 1)],
            'location' => ['nullable', 'string', 'max:200'],
        ]);

        $profile->achievements()->create($validated);

        return back()->with('status', 'achievement-added');
    }

    /**
     * Remove an achievement.
     */
    public function destroyAchievement(Request $request, Achievement $achievement): RedirectResponse
    {
        abort_unless($achievement->athleteProfile->user_id === $request->user()->id, 403);

        $achievement->delete();

        return back();
    }

    /**
     * Store a new need.
     */
    public function storeNeed(Request $request): RedirectResponse
    {
        $profile = $request->user()->athleteProfile()->firstOrCreate(
            ['user_id' => $request->user()->id],
        );

        $validated = $request->validate([
            'category' => ['required', 'in:travel,competition,training,equipment,accommodation,nutrition,medical,coaching,education,insurance,other'],
            'title' => ['required', 'string', 'max:200'],
            'description' => ['nullable', 'string', 'max:1000'],
            'target_amount' => ['nullable', 'integer', 'min:0', 'max:100000000'],
        ]);

        $profile->needs()->create($validated);

        return back()->with('status', 'need-added');
    }

    /**
     * Remove a need.
     */
    public function destroyNeed(Request $request, AthleteNeed $need): RedirectResponse
    {
        abort_unless($need->athleteProfile->user_id === $request->user()->id, 403);

        $need->delete();

        return back();
    }
}
