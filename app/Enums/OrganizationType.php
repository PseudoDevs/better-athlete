<?php

namespace App\Enums;

enum OrganizationType: string
{
    case SportsOrganization = 'sports_organization';
    case Club = 'club';
    case School = 'school';
    case University = 'university';
    case TrainingCenter = 'training_center';
    case Foundation = 'foundation';
    case PrivateCompany = 'private_company';

    public function label(): string
    {
        return match ($this) {
            self::SportsOrganization => 'Sports Organization',
            self::Club => 'Club',
            self::School => 'School',
            self::University => 'University',
            self::TrainingCenter => 'Training Center',
            self::Foundation => 'Foundation',
            self::PrivateCompany => 'Private Company',
        };
    }
}
