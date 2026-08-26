<?php

namespace Database\Factories;

use App\Enums\AthleteLevel;
use App\Models\AthleteProfile;
use App\Models\AthleteSport;
use App\Models\Sport;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<AthleteSport>
 */
class AthleteSportFactory extends Factory
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
            'sport_id' => Sport::factory(),
            'sport_discipline_id' => null,
            'level' => fake()->randomElement(AthleteLevel::cases()),
            'is_primary' => false,
        ];
    }

    public function primary(): static
    {
        return $this->state(fn () => [
            'is_primary' => true,
        ]);
    }
}
