<?php

namespace Database\Factories;

use App\Models\Sport;
use App\Models\SportDiscipline;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<SportDiscipline>
 */
class SportDisciplineFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'sport_id' => Sport::factory(),
            'name' => fake()->unique()->randomElement([
                'Freestyle',
                'Backstroke',
                'Breaststroke',
                'Butterfly',
                'Sprints',
                'Long Jump',
                'Middle Distance',
            ]),
        ];
    }
}
