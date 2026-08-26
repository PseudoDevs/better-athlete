<?php

namespace App\Policies;

use App\Models\FundingProgram;
use App\Models\User;

class FundingProgramPolicy
{
    public function manage(User $user, FundingProgram $program): bool
    {
        return $user->id === $program->governmentEntity->user_id;
    }
}
