<?php

namespace Database\Factories;

use App\Enums\NeedCategory;
use App\Models\AthleteNeed;
use App\Models\AthleteProfile;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<AthleteNeed>
 */
class AthleteNeedFactory extends Factory
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
            'category' => fake()->randomElement(NeedCategory::cases()),
            'title' => fake()->sentence(3),
            'description' => fake()->optional()->paragraph(),
            'target_amount' => fake()->optional()->numberBetween(5_000, 250_000),
        ];
    }
}
