<?php

namespace App\Models;

use Database\Factories\OrganizationMemberFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $organization_id
 * @property int $user_id
 * @property string $role
 */
class OrganizationMember extends Model
{
    /** @use HasFactory<OrganizationMemberFactory> */
    use HasFactory;

    protected $fillable = ['organization_id', 'user_id', 'role'];

    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organization::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
