<?php

namespace Database\Factories;

use App\Enums\GovernmentEntityType;
use App\Enums\UserRole;
use App\Enums\VerificationStatus;
use App\Models\GovernmentEntity;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<GovernmentEntity>
 */
class GovernmentEntityFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory()->state(fn () => ['role' => UserRole::GovernmentAdmin]),
            'name' => fake()->unique()->randomElement([
                'Philippine Sports Commission',
                'Quezon City Sports Development Office',
                'Cebu Provincial Sports Office',
                'Davao City Sports Division',
                'National Athletics Association',
            ]).' '.fake()->numberBetween(10, 99),
            'type' => fake()->randomElement(GovernmentEntityType::cases()),
            'description' => fake()->paragraph(),
            'email' => fake()->safeEmail(),
            'city' => fake()->randomElement(['Quezon City', 'Cebu City', 'Davao City']),
            'region' => fake()->randomElement(['NCR', 'Region VII', 'Region XI']),
            'verification_status' => VerificationStatus::Unverified,
        ];
    }

    public function verified(): static
    {
        return $this->state(fn () => [
            'verification_status' => VerificationStatus::Verified,
            'verified_at' => now(),
        ]);
    }
}
