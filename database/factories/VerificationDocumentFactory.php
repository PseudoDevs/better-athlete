<?php

namespace Database\Factories;

use App\Models\VerificationDocument;
use App\Models\VerificationRequest;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<VerificationDocument>
 */
class VerificationDocumentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'verification_request_id' => VerificationRequest::factory(),
            'document_type' => fake()->randomElement([
                'government_id',
                'birth_certificate',
                'athlete_id',
                'competition_result',
                'organization_registration',
            ]),
            'file_path' => 'verification-documents/'.fake()->uuid().'.pdf',
            'original_name' => fake()->word().'.pdf',
        ];
    }
}
