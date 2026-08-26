<?php

namespace Database\Factories;

use App\Enums\ApplicationStatus;
use App\Models\Application;
use App\Models\AthleteProfile;
use App\Models\Opportunity;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Application>
 */
class ApplicationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'opportunity_id' => Opportunity::factory(),
            'athlete_profile_id' => AthleteProfile::factory(),
            'status' => ApplicationStatus::Draft,
            'statement' => fake()->paragraph(),
            'requested_amount' => fake()->numberBetween(10_000, 100_000),
            'submitted_at' => null,
        ];
    }

    public function submitted(): static
    {
        return $this->state(fn () => [
            'status' => ApplicationStatus::Submitted,
            'submitted_at' => now(),
        ]);
    }

    public function approved(): static
    {
        return $this->state(fn () => [
            'status' => ApplicationStatus::Approved,
            'submitted_at' => now()->subDays(5),
            'reviewed_at' => now(),
        ]);
    }
}
