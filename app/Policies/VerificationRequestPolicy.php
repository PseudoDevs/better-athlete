<?php

namespace App\Policies;

use App\Enums\UserRole;
use App\Models\User;
use App\Models\VerificationRequest;

class VerificationRequestPolicy
{
    public function view(User $user, VerificationRequest $request): bool
    {
        return $user->id === $request->user_id || $user->isStaff();
    }

    public function decide(User $user, VerificationRequest $request): bool
    {
        return in_array($user->role, [
            UserRole::SuperAdmin,
            UserRole::Admin,
            UserRole::VerificationOfficer,
        ], true);
    }
}
