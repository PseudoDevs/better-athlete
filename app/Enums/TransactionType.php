<?php

namespace App\Enums;

enum TransactionType: string
{
    case Allocation = 'allocation';
    case Commitment = 'commitment';
    case Disbursement = 'disbursement';
    case Refund = 'refund';
    case Adjustment = 'adjustment';

    public function label(): string
    {
        return match ($this) {
            self::Allocation => 'Allocation',
            self::Commitment => 'Commitment',
            self::Disbursement => 'Disbursement',
            self::Refund => 'Refund',
            self::Adjustment => 'Adjustment',
        };
    }
}
