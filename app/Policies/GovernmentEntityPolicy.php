<?php

namespace App\Policies;

use App\Enums\UserRole;
use App\Models\GovernmentEntity;
use App\Models\User;

class GovernmentEntityPolicy
{
    public function create(User $user): bool
    {
        return in_array($user->role, [
            UserRole::Athlete,
            UserRole::GovernmentAdmin,
            UserRole::Supporter,
        ], true);
    }

    public function manage(User $user, GovernmentEntity $entity): bool
    {
        return $user->id === $entity->user_id;
    }
}
