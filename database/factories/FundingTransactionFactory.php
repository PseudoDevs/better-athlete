<?php

namespace Database\Factories;

use App\Enums\TransactionStatus;
use App\Enums\TransactionType;
use App\Models\FundingProgram;
use App\Models\FundingTransaction;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<FundingTransaction>
 */
class FundingTransactionFactory extends Factory
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
            'reference_number' => 'TXN-'.now()->year.'-'.fake()->unique()->numberBetween(1, 999999),
            'transaction_type' => fake()->randomElement([
                TransactionType::Allocation,
                TransactionType::Commitment,
                TransactionType::Disbursement,
            ]),
            'amount' => fake()->numberBetween(10_000, 500_000),
            'athlete_profile_id' => null,
            'application_id' => null,
            'status' => TransactionStatus::Recorded,
            'transaction_date' => now()->toDateString(),
            'created_by' => null,
            'created_at' => now(),
        ];
    }

    public function allocation(): static
    {
        return $this->state(fn () => [
            'transaction_type' => TransactionType::Allocation,
            'amount' => 10_000_000,
        ]);
    }

    public function commitment(): static
    {
        return $this->state(fn () => [
            'transaction_type' => TransactionType::Commitment,
        ]);
    }

    public function disbursement(): static
    {
        return $this->state(fn () => [
            'transaction_type' => TransactionType::Disbursement,
        ]);
    }
}
