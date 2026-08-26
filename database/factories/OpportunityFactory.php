<?php

namespace Database\Factories;

use App\Enums\OpportunityStatus;
use App\Enums\OpportunityType;
use App\Models\Opportunity;
use App\Models\Organization;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Opportunity>
 */
class OpportunityFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'organization_id' => Organization::factory(),
            'sport_id' => null,
            'title' => fake()->randomElement([
                'Athlete Travel Grant',
                'Grassroots Equipment Assistance',
                'Regional Sports Scholarship',
                'Training Camp Support',
                'Competition Fee Assistance',
            ]).' '.fake()->unique()->numberBetween(100, 999),
            'type' => fake()->randomElement(OpportunityType::cases()),
            'description' => fake()->paragraphs(2, true),
            'location' => fake()->randomElement(['Nationwide', 'Quezon City', 'Central Visayas', 'Region XI']),
            'amount_min' => fake()->numberBetween(5_000, 25_000),
            'amount_max' => fake()->numberBetween(50_000, 150_000),
            'application_deadline' => fake()->dateTimeBetween('+1 week', '+3 months'),
            'status' => OpportunityStatus::Published,
            'published_at' => now(),
        ];
    }

    public function draft(): static
    {
        return $this->state(fn () => [
            'status' => OpportunityStatus::Draft,
            'published_at' => null,
        ]);
    }

    public function closed(): static
    {
        return $this->state(fn () => [
            'status' => OpportunityStatus::Closed,
        ]);
    }

    public function expired(): static
    {
        return $this->state(fn () => [
            'application_deadline' => now()->subWeek(),
        ]);
    }
}
