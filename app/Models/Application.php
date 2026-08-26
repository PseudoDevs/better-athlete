<?php

namespace App\Models;

use App\Enums\ApplicationStatus;
use Database\Factories\ApplicationFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $opportunity_id
 * @property int $athlete_profile_id
 * @property ApplicationStatus $status
 * @property string|null $statement
 * @property int|null $requested_amount
 * @property Carbon|null $submitted_at
 * @property int|null $reviewed_by
 * @property Carbon|null $reviewed_at
 * @property string|null $decision_notes
 */
class Application extends Model
{
    /** @use HasFactory<ApplicationFactory> */
    use HasFactory;

    protected $fillable = [
        'opportunity_id',
        'athlete_profile_id',
        'status',
        'statement',
        'requested_amount',
        'submitted_at',
        'reviewed_by',
        'reviewed_at',
        'decision_notes',
    ];

    protected function casts(): array
    {
        return [
            'status' => ApplicationStatus::class,
            'submitted_at' => 'datetime',
            'reviewed_at' => 'datetime',
        ];
    }

    public function opportunity(): BelongsTo
    {
        return $this->belongsTo(Opportunity::class);
    }

    public function fundingProgram(): BelongsTo
    {
        return $this->belongsTo(FundingProgram::class);
    }

    public function athleteProfile(): BelongsTo
    {
        return $this->belongsTo(AthleteProfile::class);
    }

    public function reviewedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(ApplicationReview::class);
    }
}
