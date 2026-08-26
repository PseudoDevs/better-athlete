<?php

namespace App\Models;

use Database\Factories\SportDisciplineFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

/**
 * @property int $id
 * @property int $sport_id
 * @property string $name
 * @property string $slug
 */
class SportDiscipline extends Model
{
    /** @use HasFactory<SportDisciplineFactory> */
    use HasFactory;

    protected $fillable = ['sport_id', 'name', 'slug'];

    protected static function booted(): void
    {
        static::creating(function (self $discipline) {
            $discipline->slug ??= Str::slug($discipline->name);
        });
    }

    public function sport(): BelongsTo
    {
        return $this->belongsTo(Sport::class);
    }
}
