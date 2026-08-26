<?php

namespace Database\Factories;

use App\Enums\OrganizationType;
use App\Enums\VerificationStatus;
use App\Models\Organization;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Organization>
 */
class OrganizationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory()->organizationAdmin(),
            'name' => fake()->unique()->company().' Sports',
            'type' => fake()->randomElement(OrganizationType::cases()),
            'description' => fake()->paragraph(),
            'email' => fake()->safeEmail(),
            'phone' => fake()->phoneNumber(),
            'website' => fake()->optional()->url(),
            'city' => fake()->randomElement(['Quezon City', 'Cebu City', 'Davao City', 'Baguio City']),
            'province' => fake()->randomElement(['Metro Manila', 'Cebu', 'Davao del Sur', 'Benguet']),
            'region' => fake()->randomElement(['NCR', 'Region VII', 'Region XI', 'CAR']),
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
