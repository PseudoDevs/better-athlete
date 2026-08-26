<?php

namespace App\Models;

use Database\Factories\ApplicationReviewFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $application_id
 * @property int $reviewer_id
 * @property string $action
 * @property string|null $notes
 */
class ApplicationReview extends Model
{
    /** @use HasFactory<ApplicationReviewFactory> */
    use HasFactory;

    protected $fillable = ['application_id', 'reviewer_id', 'action', 'notes'];

    public function application(): BelongsTo
    {
        return $this->belongsTo(Application::class);
    }

    public function reviewer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reviewer_id');
    }
}
