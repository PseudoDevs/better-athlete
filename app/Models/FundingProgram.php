<?php

namespace App\Models;

use App\Enums\FundingProgramStatus;
use App\Services\Funding\Ledger;
use Database\Factories\FundingProgramFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

/**
 * @property int $id
 * @property int $government_entity_id
 * @property int|null $sport_id
 * @property string $title
 * @property string $slug
 * @property string $description
 * @property int $budget
 * @property int|null $min_age
 * @property int|null $max_age
 * @property string|null $gender
 * @property array<string, mixed>|null $eligible_levels
 * @property array<string, mixed>|null $eligible_regions
 * @property bool $requires_verified_athlete
 * @property Carbon|null $application_deadline
 * @property FundingProgramStatus $status
 * @property Carbon|null $published_at
 */
class FundingProgram extends Model
{
    /** @use HasFactory<FundingProgramFactory> */
    use HasFactory;

    protected $fillable = [
        'government_entity_id',
        'sport_id',
        'title',
        'slug',
        'description',
        'budget',
        'min_age',
        'max_age',
        'gender',
        'eligible_levels',
        'eligible_regions',
        'requires_verified_athlete',
        'application_deadline',
        'status',
        'published_at',
    ];

    protected function casts(): array
    {
        return [
            'status' => FundingProgramStatus::class,
            'application_deadline' => 'date',
            'published_at' => 'datetime',
            'eligible_levels' => 'array',
            'eligible_regions' => 'array',
            'requires_verified_athlete' => 'boolean',
        ];
    }

    protected static function booted(): void
    {
        static::creating(function (self $program) {
            $program->slug ??= Str::slug($program->title.'-'.Str::lower(Str::random(5)));
        });
    }

    public function governmentEntity(): BelongsTo
    {
        return $this->belongsTo(GovernmentEntity::class);
    }

    public function sport(): BelongsTo
    {
        return $this->belongsTo(Sport::class);
    }

    public function applications(): HasMany
    {
        return $this->hasMany(Application::class);
    }

    public function beneficiaries(): HasMany
    {
        return $this->hasMany(FundingBeneficiary::class);
    }

    public function transactions(): HasMany
    {
        return $this->hasMany(FundingTransaction::class)->orderBy('created_at');
    }

    public function scopePublished($query): mixed
    {
        return $query
            ->where('status', FundingProgramStatus::Published)
            ->whereNotNull('published_at');
    }

    public function totals(): array
    {
        return Ledger::totals($this);
    }

    public function isOpen(): bool
    {
        return $this->status === FundingProgramStatus::Published
            && ($this->application_deadline === null || $this->application_deadline->isFuture());
    }
}
