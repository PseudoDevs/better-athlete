<?php

namespace App\Models;

use Database\Factories\SportFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

/**
 * @property int $id
 * @property string $name
 * @property string $slug
 * @property string|null $description
 * @property bool $is_active
 */
class Sport extends Model
{
    /** @use HasFactory<SportFactory> */
    use HasFactory;

    protected $fillable = ['name', 'slug', 'description', 'is_active'];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
        ];
    }

    protected static function booted(): void
    {
        static::creating(function (self $sport) {
            $sport->slug ??= Str::slug($sport->name);
        });
    }

    public function disciplines(): HasMany
    {
        return $this->hasMany(SportDiscipline::class);
    }

    public function athleteSports(): HasMany
    {
        return $this->hasMany(AthleteSport::class);
    }

    public function opportunities(): HasMany
    {
        return $this->hasMany(Opportunity::class);
    }
}
