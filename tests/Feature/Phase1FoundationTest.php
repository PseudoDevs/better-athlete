<?php

use App\Enums\ApplicationStatus;
use App\Enums\OpportunityStatus;
use App\Enums\UserRole;
use App\Enums\VerificationStatus;
use App\Models\Application;
use App\Models\Opportunity;
use App\Models\Organization;
use App\Models\Sport;
use App\Models\User;
use App\Models\VerificationRequest;

test('users default to the athlete role and staff roles are detected', function () {
    $athlete = User::factory()->create();
    $admin = User::factory()->admin()->create();

    expect($athlete->role)->toBe(UserRole::Athlete)
        ->and($athlete->isStaff())->toBeFalse()
        ->and($admin->role)->toBe(UserRole::Admin)
        ->and($admin->isStaff())->toBeTrue();
});

test('athlete profiles link users, sports, achievements and needs', function () {
    $user = User::factory()->athlete()->create();
    $profile = $user->athleteProfile()->create([
        'bio' => 'Competitive swimmer from Quezon City.',
        'city' => 'Quezon City',
        'region' => 'NCR',
    ]);

    $sport = Sport::create(['name' => 'Swimming']);
    $profile->sports()->create([
        'sport_id' => $sport->id,
        'level' => 'national',
        'is_primary' => true,
    ]);
    $profile->achievements()->create([
        'title' => 'National Championship',
        'medal' => 'gold',
        'year' => 2026,
    ]);
    $profile->needs()->create([
        'category' => 'travel',
        'title' => 'International competition travel',
        'target_amount' => 80_000,
    ]);

    expect($profile->user->is($user))->toBeTrue()
        ->and($profile->sports)->toHaveCount(1)
        ->and($profile->sports->first()->sport->name)->toBe('Swimming')
        ->and($profile->achievements->first()->medal->value)->toBe('gold')
        ->and($profile->needs->first()->target_amount)->toBe(80_000);
});

test('opportunities auto-generate slugs and only publish visible listings', function () {
    $organization = Organization::factory()->verified()->create();
    $opportunity = Opportunity::factory()->create([
        'organization_id' => $organization->id,
        'title' => 'Athlete Travel Grant',
    ]);

    expect($opportunity->slug)->toContain('athlete-travel-grant')
        ->and($opportunity->status)->toBe(OpportunityStatus::Published)
        ->and(Opportunity::published()->get())->toHaveCount(1);

    $closed = Opportunity::factory()->closed()->create([
        'organization_id' => $organization->id,
    ]);

    expect(Opportunity::published()->get())->toHaveCount(1)
        ->and($closed->isOpen())->toBeFalse();
});

test('applications start as drafts and enforce one per athlete per opportunity', function () {
    $opportunity = Opportunity::factory()->create();
    $profile = $opportunity->organization->owner->athleteProfile()->create([
        'city' => 'Quezon City',
    ]);

    $application = Application::create([
        'opportunity_id' => $opportunity->id,
        'athlete_profile_id' => $profile->id,
        'status' => ApplicationStatus::Draft->value,
    ]);

    expect($application->status)->toBe(ApplicationStatus::Draft);

    Application::create([
        'opportunity_id' => $opportunity->id,
        'athlete_profile_id' => $profile->id,
        'status' => ApplicationStatus::Draft->value,
    ]);
})->throws(PDOException::class);

test('verification requests track pending status and documents', function () {
    $request = VerificationRequest::create([
        'user_id' => User::factory()->athlete()->create()->id,
        'type' => 'athlete_identity',
        'status' => VerificationStatus::Pending->value,
    ]);

    $request->documents()->create([
        'document_type' => 'government_id',
        'file_path' => 'verification-documents/test.pdf',
        'original_name' => 'test.pdf',
    ]);

    expect($request->status)->toBe(VerificationStatus::Pending)
        ->and($request->documents)->toHaveCount(1)
        ->and($request->documents->first()->document_type)->toBe('government_id');
});
