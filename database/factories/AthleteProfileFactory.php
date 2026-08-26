<?php

namespace Database\Factories;

use App\Models\AthleteProfile;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<AthleteProfile>
 */
class AthleteProfileFactory extends Factory
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
            'bio' => fake()->paragraph(),
            'birth_date' => fake()->dateTimeBetween('-35 years', '-16 years'),
            'gender' => fake()->randomElement(['male', 'female']),
            'city' => fake()->randomElement(['Quezon City', 'Cebu City', 'Davao City', 'Baguio City', 'Iloilo City']),
            'province' => fake()->randomElement(['Metro Manila', 'Cebu', 'Davao del Sur', 'Benguet', 'Iloilo']),
            'region' => fake()->randomElement(['NCR', 'Region VII', 'Region XI', 'CAR', 'Region VI']),
            'current_goal' => fake()->optional()->sentence(),
        ];
    }

    public function forUser(User $user): static
    {
        return $this->state(fn () => [
            'user_id' => $user->id,
        ]);
    }

    public function unverifiedOwner(): static
    {
        return $this->state(fn () => [
            'user_id' => User::factory()->athlete()->unverified(),
        ]);
    }
}
