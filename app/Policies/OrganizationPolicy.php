<?php

namespace App\Policies;

use App\Enums\UserRole;
use App\Models\Organization;
use App\Models\User;

class OrganizationPolicy
{
    public function create(User $user): bool
    {
        return in_array($user->role, [
            UserRole::Athlete,
            UserRole::OrganizationAdmin,
            UserRole::Supporter,
            UserRole::Coach,
        ], true);
    }

    public function update(User $user, Organization $organization): bool
    {
        return $this->manage($user, $organization);
    }

    public function manage(User $user, Organization $organization): bool
    {
        return $user->id === $organization->user_id
            || $organization->members()->where('user_id', $user->id)->exists();
    }
}
