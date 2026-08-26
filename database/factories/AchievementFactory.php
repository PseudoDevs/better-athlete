<?php

namespace Database\Factories;

use App\Enums\MedalType;
use App\Models\Achievement;
use App\Models\AthleteProfile;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Achievement>
 */
class AchievementFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'athlete_profile_id' => AthleteProfile::factory(),
            'title' => fake()->randomElement([
                'National Championship',
                'Regional Meet Champion',
                'Palarong Pilipino Gold',
                'PRISAA Gold',
                'SEA Games Qualifier',
                'City Olympics Champion',
            ]),
            'medal' => fake()->randomElement(MedalType::cases()),
            'event' => fake()->sentence(3),
            'year' => fake()->numberBetween(2018, 2026),
            'location' => fake()->randomElement(['Manila', 'Cebu City', 'Davao City', 'Baguio City']),
            'is_verified' => false,
        ];
    }

    public function verified(): static
    {
        return $this->state(fn () => [
            'is_verified' => true,
        ]);
    }

    public function gold(): static
    {
        return $this->state(fn () => [
            'medal' => MedalType::Gold,
        ]);
    }
}
