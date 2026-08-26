<?php

namespace App\Enums;

enum GovernmentEntityType: string
{
    case Agency = 'agency';
    case Lgu = 'lgu';
    case SportsAuthority = 'sports_authority';

    public function label(): string
    {
        return match ($this) {
            self::Agency => 'Government Agency',
            self::Lgu => 'Local Government Unit',
            self::SportsAuthority => 'Sports Authority',
        };
    }
}
