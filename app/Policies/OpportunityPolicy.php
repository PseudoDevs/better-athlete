<?php

namespace App\Policies;

use App\Models\Opportunity;
use App\Models\Organization;
use App\Models\User;

class OpportunityPolicy
{
    public function create(User $user, Organization $organization): bool
    {
        return $user->can('manage', $organization);
    }

    public function update(User $user, Opportunity $opportunity): bool
    {
        return $user->can('manage', $opportunity->organization);
    }

    public function delete(User $user, Opportunity $opportunity): bool
    {
        return $user->can('manage', $opportunity->organization);
    }
}
