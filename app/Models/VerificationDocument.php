<?php

namespace App\Models;

use Database\Factories\VerificationDocumentFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $verification_request_id
 * @property string $document_type
 * @property string $file_path
 * @property string|null $original_name
 */
class VerificationDocument extends Model
{
    /** @use HasFactory<VerificationDocumentFactory> */
    use HasFactory;

    protected $fillable = [
        'verification_request_id',
        'document_type',
        'file_path',
        'original_name',
    ];

    public function verificationRequest(): BelongsTo
    {
        return $this->belongsTo(VerificationRequest::class);
    }
}
