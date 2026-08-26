<?php

namespace App\Models;

use App\Enums\OrganizationType;
use App\Enums\VerificationStatus;
use Database\Factories\OrganizationFactory;
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
 * @property OrganizationType $type
 * @property string|null $description
 * @property string|null $email
 * @property string|null $phone
 * @property string|null $website
 * @property string|null $logo_path
 * @property string|null $city
 * @property string|null $province
 * @property string|null $region
 * @property VerificationStatus $verification_status
 * @property Carbon|null $verified_at
 */
class Organization extends Model
{
    /** @use HasFactory<OrganizationFactory> */
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
        'logo_path',
        'city',
        'province',
        'region',
        'verification_status',
        'verified_at',
    ];

    protected function casts(): array
    {
        return [
            'type' => OrganizationType::class,
            'verification_status' => VerificationStatus::class,
            'verified_at' => 'datetime',
        ];
    }

    protected static function booted(): void
    {
        static::creating(function (self $organization) {
            $organization->slug ??= Str::slug($organization->name.'-'.Str::lower(Str::random(5)));
        });
    }

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function members(): HasMany
    {
        return $this->hasMany(OrganizationMember::class);
    }

    public function opportunities(): HasMany
    {
        return $this->hasMany(Opportunity::class);
    }

    public function applications(): HasManyThrough
    {
        return $this->hasManyThrough(
            Application::class,
            Opportunity::class,
        );
    }

    public function isVerified(): bool
    {
        return $this->verification_status === VerificationStatus::Verified;
    }
}
