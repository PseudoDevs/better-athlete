<?php

namespace App\Models;

use App\Enums\GovernmentEntityType;
use App\Enums\VerificationStatus;
use Database\Factories\GovernmentEntityFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

/**
 * @property int $id
 * @property int $user_id
 * @property string $name
 * @property string $slug
 * @property GovernmentEntityType $type
 * @property string|null $description
 * @property string|null $email
 * @property string|null $phone
 * @property string|null $website
 * @property string|null $city
 * @property string|null $province
 * @property string|null $region
 * @property VerificationStatus $verification_status
 * @property Carbon|null $verified_at
 */
class GovernmentEntity extends Model
{
    /** @use HasFactory<GovernmentEntityFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'slug',
        'type',
        'description',
        'email',
        'phone',
        'website',
        'city',
        'province',
        'region',
        'verification_status',
        'verified_at',
    ];

    protected function casts(): array
    {
        return [
            'type' => GovernmentEntityType::class,
            'verification_status' => VerificationStatus::class,
            'verified_at' => 'datetime',
        ];
    }

    protected static function booted(): void
    {
        static::creating(function (self $entity) {
            $entity->slug ??= Str::slug($entity->name.'-'.Str::lower(Str::random(5)));
        });
    }

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function fundingPrograms(): HasMany
    {
        return $this->hasMany(FundingProgram::class);
    }

    public function applications(): HasManyThrough
    {
        return $this->hasManyThrough(
            Application::class,
            FundingProgram::class,
        );
    }

    public function isVerified(): bool
    {
        return $this->verification_status === VerificationStatus::Verified;
    }
}
