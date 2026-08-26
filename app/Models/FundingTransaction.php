<?php

namespace App\Models;

use App\Enums\TransactionStatus;
use App\Enums\TransactionType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * Immutable ledger entry. Never update or delete recorded transactions.
 *
 * @property int $id
 * @property int $funding_program_id
 * @property string $reference_number
 * @property TransactionType $transaction_type
 * @property int $amount
 * @property int|null $athlete_profile_id
 * @property int|null $application_id
 * @property TransactionStatus $status
 * @property string|null $description
 * @property Carbon|null $transaction_date
 * @property string|null $document_path
 * @property int|null $created_by
 * @property Carbon|null $created_at
 */
class FundingTransaction extends Model
{
    /** @use HasFactory<FundingTransactionFactory> */
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'funding_program_id',
        'reference_number',
        'transaction_type',
        'amount',
        'athlete_profile_id',
        'application_id',
        'status',
        'description',
        'transaction_date',
        'document_path',
        'created_by',
        'created_at',
    ];

    protected function casts(): array
    {
        return [
            'transaction_type' => TransactionType::class,
            'status' => TransactionStatus::class,
            'transaction_date' => 'date',
            'created_at' => 'datetime',
        ];
    }

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

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    protected static function booted(): void
    {
        static::updating(function (self $transaction) {
            throw new \RuntimeException('Funding transactions are immutable and cannot be updated.');
        });

        static::deleting(function (self $transaction) {
            throw new \RuntimeException('Funding transactions are immutable and cannot be deleted.');
        });
    }
}
