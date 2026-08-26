<?php

namespace App\Services\Funding;

use App\Enums\TransactionType;
use App\Models\FundingProgram;
use App\Models\FundingTransaction;
use Illuminate\Database\UniqueConstraintViolationException;
use Illuminate\Support\Facades\DB;
use InvalidArgumentException;
use RuntimeException;

class Ledger
{
    /**
     * Ledger totals for a program, calculated from immutable transactions.
     *
     * @return array{allocated: int, committed: int, disbursed: int, remaining: int}
     */
    public static function totals(FundingProgram $program): array
    {
        $sums = $program->transactions()
            ->selectRaw('transaction_type, SUM(amount) as total')
            ->whereIn('transaction_type', [
                TransactionType::Allocation->value,
                TransactionType::Commitment->value,
                TransactionType::Disbursement->value,
                TransactionType::Refund->value,
            ])
            ->groupBy('transaction_type')
            ->pluck('total', 'transaction_type');

        $allocated = (int) ($sums[TransactionType::Allocation->value] ?? 0);
        $committed = (int) ($sums[TransactionType::Commitment->value] ?? 0);
        $disbursed = (int) ($sums[TransactionType::Disbursement->value] ?? 0);
        $refunded = (int) ($sums[TransactionType::Refund->value] ?? 0);

        return [
            'allocated' => $allocated,
            'committed' => $committed,
            'disbursed' => $disbursed,
            'remaining' => max(0, $allocated - $committed),
            'undisbursed' => max(0, $committed - $disbursed),
            'refunded' => $refunded,
        ];
    }

    /**
     * Record an immutable ledger transaction.
     *
     * @param  array{description?: string|null, transaction_date?: string|null, document_path?: string|null}  $attributes
     */
    public static function record(
        FundingProgram $program,
        TransactionType $type,
        int $amount,
        ?int $athleteProfileId = null,
        ?int $applicationId = null,
        array $attributes = [],
    ): FundingTransaction {
        if ($amount <= 0) {
            throw new InvalidArgumentException('Amount must be greater than zero.');
        }

        $totals = self::totals($program);

        if ($type === TransactionType::Commitment && $amount > $totals['remaining']) {
            throw new InvalidArgumentException(
                'Commitment exceeds the uncommitted allocation. Remaining: ₱'.number_format($totals['remaining']).'.'
            );
        }

        if ($type === TransactionType::Disbursement && $amount > $totals['undisbursed']) {
            throw new InvalidArgumentException(
                'Disbursement exceeds committed but undisbursed funds. Available: ₱'.number_format($totals['undisbursed']).'.'
            );
        }

        for ($attempt = 0; $attempt < 5; $attempt++) {
            try {
                return DB::transaction(function () use ($program, $type, $amount, $athleteProfileId, $applicationId, $attributes) {
                    return $program->transactions()->create([
                        'transaction_type' => $type->value,
                        'amount' => $amount,
                        'athlete_profile_id' => $athleteProfileId,
                        'application_id' => $applicationId,
                        'reference_number' => self::nextReference(),
                        'description' => $attributes['description'] ?? null,
                        'transaction_date' => $attributes['transaction_date'] ?? now()->toDateString(),
                        'document_path' => $attributes['document_path'] ?? null,
                        'status' => 'recorded',
                        'created_by' => auth()->id(),
                        'created_at' => now(),
                    ]);
                });
            } catch (UniqueConstraintViolationException $exception) {
                if ($attempt === 4) {
                    throw new RuntimeException('Unable to generate a unique reference number.', previous: $exception);
                }
            }
        }

        throw new RuntimeException('Unreachable');
    }

    /**
     * Generate the next sequential reference number (TXN-YYYY-NNNNNN).
     */
    public static function nextReference(): string
    {
        $prefix = 'TXN-'.now()->year.'-';

        $lastSequence = (int) substr(
            (string) FundingTransaction::where('reference_number', 'like', $prefix.'%')->max('reference_number'),
            strlen($prefix),
        );

        return $prefix.str_pad((string) ($lastSequence + 1), 6, '0', STR_PAD_LEFT);
    }
}
