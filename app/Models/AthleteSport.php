<?php

namespace App\Models;

use App\Enums\AthleteLevel;
use Database\Factories\AthleteSportFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $athlete_profile_id
 * @property int $sport_id
 * @property int|null $sport_discipline_id
 * @property AthleteLevel $level
 * @property bool $is_primary
 */
class AthleteSport extends Model
{
    /** @use HasFactory<AthleteSportFactory> */
    use HasFactory;

    protected $fillable = [
        'athlete_profile_id',
        'sport_id',
        'sport_discipline_id',
        'level',
        'is_primary',
    ];

    protected function casts(): array
    {
        return [
            'level' => AthleteLevel::class,
            'is_primary' => 'boolean',
        ];
    }

    public function athleteProfile(): BelongsTo
    {
        return $this->belongsTo(AthleteProfile::class);
    }

    public function sport(): BelongsTo
    {
        return $this->belongsTo(Sport::class);
    }

    public function discipline(): BelongsTo
    {
        return $this->belongsTo(SportDiscipline::class, 'sport_discipline_id');
    }
}
