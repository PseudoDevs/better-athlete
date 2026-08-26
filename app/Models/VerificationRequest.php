<?php

namespace App\Models;

use App\Enums\VerificationStatus;
use App\Enums\VerificationType;
use Database\Factories\VerificationRequestFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $user_id
 * @property VerificationType $type
 * @property int|null $organization_id
 * @property VerificationStatus $status
 * @property string|null $notes
 * @property int|null $reviewed_by
 * @property Carbon|null $reviewed_at
 * @property string|null $review_notes
 */
class VerificationRequest extends Model
{
    /** @use HasFactory<VerificationRequestFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'type',
        'organization_id',
        'government_entity_id',
        'status',
        'notes',
        'reviewed_by',
        'reviewed_at',
        'review_notes',
    ];

    protected function casts(): array
    {
        return [
            'type' => VerificationType::class,
            'status' => VerificationStatus::class,
            'reviewed_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organization::class);
    }

    public function governmentEntity(): BelongsTo
    {
        return $this->belongsTo(GovernmentEntity::class);
    }

    public function reviewedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }

    public function documents(): HasMany
    {
        return $this->hasMany(VerificationDocument::class);
    }
}
