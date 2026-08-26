<?php

namespace App\Enums;

enum VerificationType: string
{
    case AthleteIdentity = 'athlete_identity';
    case AthleteStatus = 'athlete_status';
    case Organization = 'organization';
    case GovernmentEntity = 'government_entity';

    public function label(): string
    {
        return match ($this) {
            self::AthleteIdentity => 'Identity Verification',
            self::AthleteStatus => 'Athlete Status Verification',
            self::Organization => 'Organization Verification',
            self::GovernmentEntity => 'Government Entity Verification',
        };
    }
}
