<?php

namespace App\Models;

use Database\Factories\FundingBeneficiaryFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $funding_program_id
 * @property int $athlete_profile_id
 * @property int $application_id
 * @property int $awarded_amount
 */
class FundingBeneficiary extends Model
{
    /** @use HasFactory<FundingBeneficiaryFactory> */
    use HasFactory;

    protected $fillable = [
        'funding_program_id',
        'athlete_profile_id',
        'application_id',
        'awarded_amount',
    ];

    public function fundingProgram(): BelongsTo
    {
        return $this->belongsTo(FundingProgram::class);
    }

    public function athleteProfile(): BelongsTo
    {
        return $this->belongsTo(AthleteProfile::class);
    }

    public function application(): BelongsTo
    {
        return $this->belongsTo(Application::class);
    }
}
