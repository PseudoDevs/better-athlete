<?php

namespace App\Models;

use App\Enums\OpportunityStatus;
use App\Enums\OpportunityType;
use Database\Factories\OpportunityFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

/**
 * @property int $id
 * @property int $organization_id
 * @property int|null $sport_id
 * @property string $title
 * @property string $slug
 * @property OpportunityType $type
 * @property string $description
 * @property string|null $location
 * @property int|null $amount_min
 * @property int|null $amount_max
 * @property Carbon|null $application_deadline
 * @property OpportunityStatus $status
 * @property Carbon|null $published_at
 */
class Opportunity extends Model
{
    /** @use HasFactory<OpportunityFactory> */
    use HasFactory;

    protected $fillable = [
        'organization_id',
        'sport_id',
        'title',
        'slug',
        'type',
        'description',
        'location',
        'amount_min',
        'amount_max',
        'application_deadline',
        'status',
        'published_at',
    ];

    protected function casts(): array
    {
        return [
            'type' => OpportunityType::class,
            'status' => OpportunityStatus::class,
            'application_deadline' => 'date',
            'published_at' => 'datetime',
        ];
    }

    protected static function booted(): void
    {
        static::creating(function (self $opportunity) {
            $opportunity->slug ??= Str::slug($opportunity->title.'-'.Str::lower(Str::random(5)));
        });
    }

    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organization::class);
    }

    public function sport(): BelongsTo
    {
        return $this->belongsTo(Sport::class);
    }

    public function applications(): HasMany
    {
        return $this->hasMany(Application::class);
    }

    public function scopePublished($query): mixed
    {
        return $query
            ->where('status', OpportunityStatus::Published)
            ->whereNotNull('published_at')
            ->where('published_at', '<=', now());
    }

    public function isOpen(): bool
    {
        return $this->status === OpportunityStatus::Published
            && ($this->application_deadline === null || $this->application_deadline->isFuture());
    }
}
