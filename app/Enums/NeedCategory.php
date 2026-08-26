<?php

namespace App\Enums;

enum NeedCategory: string
{
    case Travel = 'travel';
    case Competition = 'competition';
    case Training = 'training';
    case Equipment = 'equipment';
    case Accommodation = 'accommodation';
    case Nutrition = 'nutrition';
    case Medical = 'medical';
    case Coaching = 'coaching';
    case Education = 'education';
    case Insurance = 'insurance';
    case Other = 'other';

    public function label(): string
    {
        return match ($this) {
            self::Travel => 'Travel',
            self::Competition => 'Competition',
            self::Training => 'Training',
            self::Equipment => 'Equipment',
            self::Accommodation => 'Accommodation',
            self::Nutrition => 'Nutrition',
            self::Medical => 'Medical',
            self::Coaching => 'Coaching',
            self::Education => 'Education',
            self::Insurance => 'Insurance',
            self::Other => 'Other',
        };
    }
}
