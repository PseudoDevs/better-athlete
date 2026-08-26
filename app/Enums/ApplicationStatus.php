<?php

namespace App\Enums;

enum ApplicationStatus: string
{
    case Draft = 'draft';
    case Submitted = 'submitted';
    case UnderReview = 'under_review';
    case NeedsInformation = 'needs_information';
    case Eligible = 'eligible';
    case Ineligible = 'ineligible';
    case Approved = 'approved';
    case Funded = 'funded';
    case PartiallyFunded = 'partially_funded';
    case Disbursed = 'disbursed';
    case Completed = 'completed';
    case Cancelled = 'cancelled';

    public function label(): string
    {
        return match ($this) {
            self::Draft => 'Draft',
            self::Submitted => 'Submitted',
            self::UnderReview => 'Under Review',
            self::NeedsInformation => 'Needs Information',
            self::Eligible => 'Eligible',
            self::Ineligible => 'Ineligible',
            self::Approved => 'Approved',
            self::Funded => 'Funded',
            self::PartiallyFunded => 'Partially Funded',
            self::Disbursed => 'Disbursed',
            self::Completed => 'Completed',
            self::Cancelled => 'Cancelled',
        };
    }
}
