<?php

namespace App\Enums;

enum UserRole: string
{
    case SuperAdmin = 'super_admin';
    case Admin = 'admin';
    case Moderator = 'moderator';
    case VerificationOfficer = 'verification_officer';
    case OrganizationAdmin = 'organization_admin';
    case GovernmentAdmin = 'government_admin';
    case Athlete = 'athlete';
    case Coach = 'coach';
    case Supporter = 'supporter';

    public function label(): string
    {
        return match ($this) {
            self::SuperAdmin => 'Super Admin',
            self::Admin => 'Admin',
            self::Moderator => 'Moderator',
            self::VerificationOfficer => 'Verification Officer',
            self::OrganizationAdmin => 'Organization Admin',
            self::GovernmentAdmin => 'Government Admin',
            self::Athlete => 'Athlete',
            self::Coach => 'Coach',
            self::Supporter => 'Supporter',
        };
    }

    public function isStaff(): bool
    {
        return in_array($this, [
            self::SuperAdmin,
            self::Admin,
            self::Moderator,
            self::VerificationOfficer,
        ], true);
    }
}
