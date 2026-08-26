<?php

namespace Database\Seeders;

use App\Models\Sport;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SportsSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Common Philippine sports with sample disciplines.
     *
     * @var array<string, list<string>>
     */
    protected array $sports = [
        'Swimming' => ['Freestyle', 'Backstroke', 'Breaststroke', 'Butterfly'],
        'Athletics' => ['Sprints', 'Middle Distance', 'Long Distance', 'Relays', 'Hurdles'],
        'Boxing' => ['Flyweight', 'Featherweight', 'Welterweight'],
        'Basketball' => ['5x5', '3x3'],
        'Volleyball' => ['Indoor', 'Beach'],
        'Football' => ['Outdoor', 'Futsal'],
        'Weightlifting' => ['Snatch', 'Clean and Jerk'],
        'Gymnastics' => ['Artistic', 'Rhythmic'],
        'Arnis' => ['Anyo', 'Labanan'],
        'Taekwondo' => ['Poomsae', 'Kyorugi'],
        'Cycling' => ['Road', 'Track', 'Mountain Bike'],
        'Chess' => ['Standard', 'Rapid', 'Blitz'],
    ];

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach ($this->sports as $name => $disciplines) {
            $sport = Sport::create(['name' => $name]);

            foreach ($disciplines as $discipline) {
                $sport->disciplines()->create(['name' => $discipline]);
            }
        }
    }
}
