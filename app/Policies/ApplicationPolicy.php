<?php

namespace App\Policies;

use App\Models\Application;
use App\Models\User;

class ApplicationPolicy
{
    public function view(User $user, Application $application): bool
    {
        return $user->id === $application->athleteProfile->user_id
            || $user->id === $application->opportunity->organization->user_id
            || $user->isStaff();
    }

    public function review(User $user, Application $application): bool
    {
        return $user->id === $application->opportunity->organization->user_id
            || $application->opportunity->organization
                ->members()
                ->where('user_id', $user->id)
                ->exists();
    }

    public function decide(User $user, Application $application): bool
    {
        return $this->review($user, $application);
    }
}
