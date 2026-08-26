<?php

namespace App\Models;

use App\Enums\MedalType;
use Database\Factories\AchievementFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $athlete_profile_id
 * @property string $title
 * @property MedalType|null $medal
 * @property string|null $event
 * @property int|null $year
 * @property string|null $location
 * @property string|null $description
 * @property bool $is_verified
 */
class Achievement extends Model
{
    /** @use HasFactory<AchievementFactory> */
    use HasFactory;

    protected $fillable = [
        'athlete_profile_id',
        'title',
        'medal',
        'event',
        'year',
        'location',
        'description',
        'is_verified',
    ];

    protected function casts(): array
    {
        return [
            'medal' => MedalType::class,
            'is_verified' => 'boolean',
        ];
    }

    public function athleteProfile(): BelongsTo
    {
        return $this->belongsTo(AthleteProfile::class);
    }
}
