<?php

namespace Database\Factories;

use App\Models\Sport;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Sport>
 */
class SportFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->unique()->randomElement([
                'Swimming',
                'Athletics',
                'Basketball',
                'Boxing',
                'Volleyball',
                'Football',
                'Weightlifting',
                'Gymnastics',
                'Arnis',
                'Taekwondo',
                'Cycling',
                'Chess',
            ]),
            'description' => fake()->sentence(),
        ];
    }
}
