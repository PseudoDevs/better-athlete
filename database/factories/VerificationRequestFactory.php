<?php

namespace Database\Factories;

use App\Enums\VerificationStatus;
use App\Enums\VerificationType;
use App\Models\Organization;
use App\Models\User;
use App\Models\VerificationRequest;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<VerificationRequest>
 */
class VerificationRequestFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory()->athlete(),
            'type' => fake()->randomElement([VerificationType::AthleteIdentity, VerificationType::AthleteStatus]),
            'organization_id' => null,
            'status' => VerificationStatus::Pending,
            'notes' => fake()->optional()->sentence(),
        ];
    }

    public function organization(): static
    {
        return $this->state(fn () => [
            'type' => VerificationType::Organization,
            'user_id' => User::factory()->organizationAdmin(),
            'organization_id' => Organization::factory(),
        ]);
    }

    public function approved(): static
    {
        return $this->state(fn () => [
            'status' => VerificationStatus::Verified,
            'reviewed_at' => now(),
        ]);
    }

    public function rejected(): static
    {
        return $this->state(fn () => [
            'status' => VerificationStatus::Rejected,
            'reviewed_at' => now(),
        ]);
    }
}
