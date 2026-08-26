<?php

namespace App\Enums;

enum OpportunityType: string
{
    case Scholarship = 'scholarship';
    case Grant = 'grant';
    case Assistance = 'assistance';
    case Training = 'training';
    case Equipment = 'equipment';
    case Competition = 'competition';
    case Other = 'other';

    public function label(): string
    {
        return match ($this) {
            self::Scholarship => 'Scholarship',
            self::Grant => 'Grant',
            self::Assistance => 'Assistance',
            self::Training => 'Training',
            self::Equipment => 'Equipment',
            self::Competition => 'Competition',
            self::Other => 'Other',
        };
    }
}
