<?php

namespace Database\Factories;

use App\Models\Application;
use App\Models\AthleteProfile;
use App\Models\FundingBeneficiary;
use App\Models\FundingProgram;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<FundingBeneficiary>
 */
class FundingBeneficiaryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'funding_program_id' => FundingProgram::factory(),
            'athlete_profile_id' => AthleteProfile::factory(),
            'application_id' => Application::factory(),
            'awarded_amount' => fake()->numberBetween(10_000, 100_000),
        ];
    }
}
