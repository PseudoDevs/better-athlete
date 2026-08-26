<?php

namespace App\Models;

use App\Enums\VerificationStatus;
use Database\Factories\AthleteProfileFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $user_id
 * @property string|null $bio
 * @property Carbon|null $birth_date
 * @property string|null $gender
 * @property string|null $photo_path
 * @property string|null $city
 * @property string|null $province
 * @property string|null $region
 * @property string|null $current_goal
 * @property VerificationStatus $verification_status
 * @property Carbon|null $verified_at
 */
class AthleteProfile extends Model
{
    /** @use HasFactory<AthleteProfileFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'bio',
        'birth_date',
        'gender',
        'photo_path',
        'city',
        'province',
        'region',
        'current_goal',
        'verification_status',
        'verified_at',
    ];

    protected function casts(): array
    {
        return [
            'birth_date' => 'date',
            'verification_status' => VerificationStatus::class,
            'verified_at' => 'datetime',
        ];
    }

    public function isVerified(): bool
    {
        return $this->verification_status === VerificationStatus::Verified;
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function sports(): HasMany
    {
        return $this->hasMany(AthleteSport::class);
    }

    public function achievements(): HasMany
    {
        return $this->hasMany(Achievement::class);
    }

    public function needs(): HasMany
    {
        return $this->hasMany(AthleteNeed::class);
    }

    public function applications(): HasMany
    {
        return $this->hasMany(Application::class);
    }
}
