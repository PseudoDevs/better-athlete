<?php

namespace App\Models;

use App\Enums\NeedCategory;
use Database\Factories\AthleteNeedFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $athlete_profile_id
 * @property NeedCategory $category
 * @property string $title
 * @property string|null $description
 * @property int|null $target_amount
 */
class AthleteNeed extends Model
{
    /** @use HasFactory<AthleteNeedFactory> */
    use HasFactory;

    protected $fillable = [
        'athlete_profile_id',
        'category',
        'title',
        'description',
        'target_amount',
    ];

    protected function casts(): array
    {
        return [
            'category' => NeedCategory::class,
        ];
    }

    public function athleteProfile(): BelongsTo
    {
        return $this->belongsTo(AthleteProfile::class);
    }
}
