<?php

use App\Enums\ApplicationStatus;
use App\Enums\TransactionType;
use App\Enums\UserRole;
use App\Models\AuditLog;
use App\Models\FundingBeneficiary;
use App\Models\FundingProgram;
use App\Models\FundingTransaction;
use App\Models\GovernmentEntity;
use App\Models\User;
use App\Models\VerificationRequest;
use App\Services\Funding\Ledger;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

function createVerifiedGovernmentUser(): array
{
    $user = User::factory()->create(['role' => UserRole::GovernmentAdmin]);
    $entity = GovernmentEntity::factory()->for($user, 'owner')->verified()->create();

    return [$user, $entity];
}

test('government admins can register entities and publish programs with ledger allocation', function () {
    [$user, $entity] = createVerifiedGovernmentUser();

    $this->actingAs($user)->post(route('government.programs.store', $entity), [
        'title' => '2026 Athlete Travel Assistance',
        'description' => 'Travel support for national athletes.',
        'budget' => 5_000_000,
        'min_age' => 16,
        'max_age' => 30,
        'requires_verified_athlete' => true,
    ])->assertRedirect();

    $program = FundingProgram::where('title', '2026 Athlete Travel Assistance')->first();

    expect($program)->not->toBeNull()
        ->and($program->status->value)->toBe('draft');

    $this->actingAs($user)->post(route('government.programs.publish', $program))->assertRedirect();

    $program->refresh();

    expect($program->status->value)->toBe('published')
        ->and(FundingProgram::published()->count())->toBe(1)
        ->and($program->transactions()->count())->toBe(1);

    $allocation = $program->transactions()->first();

    expect($allocation->transaction_type)->toBe(TransactionType::Allocation)
        ->and($allocation->amount)->toBe(5_000_000)
        ->and($allocation->reference_number)->toStartWith('TXN-');

    $totals = Ledger::totals($program);

    expect($totals['allocated'])->toBe(5_000_000)
        ->and($totals['committed'])->toBe(0)
        ->and($totals['remaining'])->toBe(5_000_000)
        ->and(AuditLog::where('action', 'funding_program.published')->exists())->toBeTrue();
});

test('approving a funding application records a commitment and beneficiary', function () {
    [$user, $entity] = createVerifiedGovernmentUser();
    $program = FundingProgram::factory()->for($entity)->create(['budget' => 1_000_000]);
    $program->transactions()->create([
        'reference_number' => 'TXN-2026-000001',
        'transaction_type' => TransactionType::Allocation->value,
        'amount' => 1_000_000,
        'status' => 'recorded',
        'created_at' => now(),
    ]);

    $athlete = User::factory()->athlete()->create();
    $profile = $athlete->athleteProfile()->create(['city' => 'Manila']);

    $application = $program->applications()->create([
        'athlete_profile_id' => $profile->id,
        'status' => ApplicationStatus::Submitted->value,
        'statement' => 'Travel support please.',
        'requested_amount' => 50_000,
        'submitted_at' => now(),
    ]);

    $this->actingAs($user)
        ->post(route('funding-applications.review', $application), [
            'action' => 'approve',
            'notes' => 'Eligible national athlete.',
        ])
        ->assertRedirect();

    $application->refresh();

    expect($application->status)->toBe(ApplicationStatus::Approved)
        ->and($application->reviewed_by)->toBe($user->id);

    $beneficiary = FundingBeneficiary::first();

    expect($beneficiary)->not->toBeNull()
        ->and($beneficiary->athlete_profile_id)->toBe($profile->id)
        ->and($beneficiary->awarded_amount)->toBe(50_000);

    $commitment = $program->transactions()->where('transaction_type', 'commitment')->first();

    expect($commitment)->not->toBeNull()
        ->and($commitment->amount)->toBe(50_000)
        ->and($commitment->athlete_profile_id)->toBe($profile->id);

    $totals = Ledger::totals($program->fresh());

    expect($totals['committed'])->toBe(50_000)
        ->and($totals['remaining'])->toBe(950_000)
        ->and(AuditLog::where('action', 'funding_application.approve')->exists())->toBeTrue();
});

test('the ledger prevents over-commitment and over-disbursement', function () {
    [$user, $entity] = createVerifiedGovernmentUser();
    $program = FundingProgram::factory()->for($entity)->create(['budget' => 100_000]);
    $program->transactions()->create([
        'reference_number' => 'TXN-2026-000002',
        'transaction_type' => TransactionType::Allocation->value,
        'amount' => 100_000,
        'created_at' => now(),
    ]);

    $this->actingAs($user)
        ->post(route('government.programs.transactions.store', $program), [
            'transaction_type' => 'commitment',
            'amount' => 150_000,
        ])
        ->assertSessionHasErrors('amount');

    $this->actingAs($user)
        ->post(route('government.programs.transactions.store', $program), [
            'transaction_type' => 'commitment',
            'amount' => 60_000,
        ])
        ->assertRedirect();

    $this->actingAs($user)
        ->post(route('government.programs.transactions.store', $program), [
            'transaction_type' => 'disbursement',
            'amount' => 50_000,
        ])
        ->assertRedirect();

    $this->actingAs($user)
        ->post(route('government.programs.transactions.store', $program), [
            'transaction_type' => 'disbursement',
            'amount' => 60_000,
        ])
        ->assertSessionHasErrors('amount');

    $totals = Ledger::totals($program->fresh());

    expect($totals['committed'])->toBe(60_000)
        ->and($totals['disbursed'])->toBe(50_000)
        ->and($program->transactions()->count())->toBe(3);
});

test('ledger transactions are immutable', function () {
    [$user, $entity] = createVerifiedGovernmentUser();
    $program = FundingProgram::factory()->for($entity)->create();
    $transaction = FundingTransaction::factory()->for($program)->allocation()->create();

    expect(fn () => $transaction->update(['amount' => 1]))
        ->toThrow(RuntimeException::class, 'immutable');

    expect(fn () => $transaction->delete())
        ->toThrow(RuntimeException::class, 'immutable');
});

test('the transparency dashboard shows public funding totals', function () {
    [$user, $entity] = createVerifiedGovernmentUser();

    $program = FundingProgram::factory()->for($entity)->create([
        'title' => '2026 Athlete Assistance Program',
        'budget' => 10_000_000,
    ]);
    $program->transactions()->create([
        'reference_number' => 'TXN-2026-000010',
        'transaction_type' => TransactionType::Allocation->value,
        'amount' => 10_000_000,
        'created_at' => now(),
    ]);
    $program->transactions()->create([
        'reference_number' => 'TXN-2026-000011',
        'transaction_type' => TransactionType::Commitment->value,
        'amount' => 4_200_000,
        'created_at' => now(),
    ]);

    $this->get(route('transparency.index'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('transparency/index')
            ->where('totals.allocated', 10_000_000)
            ->where('totals.committed', 4_200_000)
            ->has('programs.data', 1));

    $this->get(route('transparency.show', ['program' => $program->slug]))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('transparency/show')
            ->where('totals.allocated', 10_000_000)
            ->where('totals.committed', 4_200_000)
            ->has('transactions', 2));
});

test('government entities can submit verification and staff can approve', function () {
    Storage::fake('local');

    $user = User::factory()->create(['role' => UserRole::GovernmentAdmin]);
    $entity = GovernmentEntity::factory()->for($user, 'owner')->create();
    $officer = User::factory()->verificationOfficer()->create();

    $this->actingAs($user)->post(route('verification.store'), [
        'type' => 'government_entity',
        'government_entity_id' => $entity->id,
        'documents' => [UploadedFile::fake()->create('securities.pdf', 100, 'application/pdf')],
    ])->assertRedirect();

    $request = VerificationRequest::first();

    expect($request->type->value)->toBe('government_entity')
        ->and($request->government_entity_id)->toBe($entity->id);

    $this->actingAs($officer)
        ->post(route('verification.decide', $request), ['decision' => 'approve'])
        ->assertRedirect();

    expect($entity->fresh()->verification_status->value)->toBe('verified');
});

test('non-government users cannot access government management routes', function () {
    $athlete = User::factory()->athlete()->create();
    [$owner, $entity] = createVerifiedGovernmentUser();
    $program = FundingProgram::factory()->for($entity)->create();

    $this->actingAs($athlete)->get(route('government.dashboard'))->assertOk();
    $this->actingAs($athlete)
        ->post(route('government.programs.store', $entity), [
            'title' => 'Hack',
            'description' => 'x',
            'budget' => 1000,
        ])
        ->assertForbidden();

    $this->actingAs($athlete)
        ->get(route('government.programs.show', $program))
        ->assertForbidden();
});
