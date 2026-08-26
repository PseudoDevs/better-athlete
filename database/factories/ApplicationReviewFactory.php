<?php

namespace Database\Factories;

use App\Models\Application;
use App\Models\ApplicationReview;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ApplicationReview>
 */
class ApplicationReviewFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'application_id' => Application::factory(),
            'reviewer_id' => User::factory(),
            'action' => fake()->randomElement(['approve', 'reject', 'request_information']),
            'notes' => fake()->optional()->sentence(),
        ];
    }
}
