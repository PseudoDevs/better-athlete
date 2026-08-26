<?php

namespace App\Enums;

enum MedalType: string
{
    case Gold = 'gold';
    case Silver = 'silver';
    case Bronze = 'bronze';
    case Other = 'other';

    public function label(): string
    {
        return match ($this) {
            self::Gold => 'Gold',
            self::Silver => 'Silver',
            self::Bronze => 'Bronze',
            self::Other => 'Other',
        };
    }
}
