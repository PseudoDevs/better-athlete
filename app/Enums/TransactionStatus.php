<?php

namespace App\Enums;

enum TransactionStatus: string
{
    case Recorded = 'recorded';
    case Confirmed = 'confirmed';

    public function label(): string
    {
        return match ($this) {
            self::Recorded => 'Recorded',
            self::Confirmed => 'Confirmed',
        };
    }
}
