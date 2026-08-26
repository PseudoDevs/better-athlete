<?php

namespace App\Enums;

enum AthleteLevel: string
{
    case Local = 'local';
    case Regional = 'regional';
    case National = 'national';
    case International = 'international';

    public function label(): string
    {
        return match ($this) {
            self::Local => 'Local',
            self::Regional => 'Regional',
            self::National => 'National',
            self::International => 'International',
        };
    }
}
