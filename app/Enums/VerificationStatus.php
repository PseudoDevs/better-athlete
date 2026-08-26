<?php

namespace App\Enums;

enum VerificationStatus: string
{
    case Unverified = 'unverified';
    case Pending = 'pending';
    case Verified = 'verified';
    case Rejected = 'rejected';
    case Expired = 'expired';

    public function label(): string
    {
        return match ($this) {
            self::Unverified => 'Unverified',
            self::Pending => 'Pending Review',
            self::Verified => 'Verified',
            self::Rejected => 'Rejected',
            self::Expired => 'Expired',
        };
    }
}
