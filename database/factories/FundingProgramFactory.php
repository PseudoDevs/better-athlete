<?php

namespace Database\Factories;

use App\Enums\FundingProgramStatus;
use App\Models\FundingProgram;
use App\Models\GovernmentEntity;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<FundingProgram>
 */
class FundingProgramFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'government_entity_id' => GovernmentEntity::factory(),
            'sport_id' => null,
            'title' => fake()->randomElement([
                'Athlete Travel Assistance Program',
                'National Athlete Development Program',
                'Grassroots Equipment Program',
                'Competition Support Program',
            ]).' '.fake()->unique()->numberBetween(100, 999),
            'description' => fake()->paragraphs(2, true),
            'budget' => fake()->randomElement([1_000_000, 5_000_000, 10_000_000]),
            'min_age' => 16,
            'max_age' => 35,
            'requires_verified_athlete' => true,
            'application_deadline' => fake()->dateTimeBetween('+1 week', '+3 months'),
            'status' => FundingProgramStatus::Published,
            'published_at' => now(),
        ];
    }

    public function draft(): static
    {
        return $this->state(fn () => [
            'status' => FundingProgramStatus::Draft,
            'published_at' => null,
        ]);
    }

    public function closed(): static
    {
        return $this->state(fn () => [
            'status' => FundingProgramStatus::Closed,
        ]);
    }
}
