<?php

use App\Enums\ApplicationStatus;
use App\Enums\UserRole;
use App\Models\Application;
use App\Models\AuditLog;
use App\Models\Opportunity;
use App\Models\Organization;
use App\Models\Sport;
use App\Models\User;
use App\Models\VerificationRequest;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

test('guests can browse the athlete directory and athlete profiles', function () {
    $athlete = User::factory()->athlete()->create(['username' => 'maria-santos']);
    $profile = $athlete->athleteProfile()->create([
        'bio' => 'Swimmer',
        'city' => 'Quezon City',
        'verification_status' => 'verified',
        'verified_at' => now(),
    ]);
    $sport = Sport::create(['name' => 'Swimming']);
    $profile->sports()->create(['sport_id' => $sport->id, 'level' => 'national', 'is_primary' => true]);

    $this->get(route('athletes.index', ['sport' => $sport->id]))
        ->assertOk()
        ->assertInertia(fn ($page) => $page->component('athletes/index')->has('athletes.data', 1));

    $this->get(route('athletes.show', ['user' => 'maria-santos']))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('athletes/show')
            ->where('athlete.username', 'maria-santos')
            ->where('athlete.profile.verification_status', 'verified'));

    $this->get(route('athletes.show', ['user' => 'nobody-here']))->assertNotFound();
});

test('athletes can update their profile and add achievements and needs', function () {
    $user = User::factory()->athlete()->create();
    $sport = Sport::create(['name' => 'Boxing']);

    $this->actingAs($user)
        ->post(route('athlete.profile.update'), [
            'bio' => 'Boxer from Cebu.',
            'city' => 'Cebu City',
            'region' => 'Region VII',
            'primary_sport_id' => $sport->id,
            'level' => 'national',
        ])
        ->assertRedirect();

    $profile = $user->fresh()->athleteProfile;

    expect($profile->city)->toBe('Cebu City')
        ->and($profile->sports)->toHaveCount(1)
        ->and($profile->sports->first()->is_primary)->toBeTrue();

    $this->actingAs($user)
        ->post(route('athlete.achievements.store'), [
            'title' => 'National Championship',
            'medal' => 'gold',
            'year' => 2026,
        ])->assertRedirect();

    $this->actingAs($user)
        ->post(route('athlete.needs.store'), [
            'category' => 'equipment',
            'title' => 'New gloves',
            'target_amount' => 15000,
        ])->assertRedirect();

    expect($profile->fresh()->achievements)->toHaveCount(1)
        ->and($profile->fresh()->needs)->toHaveCount(1);
});

test('athletes can apply once to an open opportunity and organizations can approve', function () {
    $owner = User::factory()->organizationAdmin()->create();
    $organization = Organization::factory()->for($owner, 'owner')->verified()->create();
    $opportunity = Opportunity::factory()->for($organization)->create();

    $athlete = User::factory()->athlete()->create();
    $athlete->athleteProfile()->create(['city' => 'Manila']);

    $response = $this->actingAs($athlete)->post(route('applications.store', $opportunity), [
        'statement' => 'I need support for travel.',
        'requested_amount' => 25000,
    ]);

    $response->assertRedirect();

    $application = Application::first();

    expect($application->status)->toBe(ApplicationStatus::Submitted)
        ->and($application->reviewed_by)->toBeNull();

    $this->actingAs($athlete)->post(route('applications.store', $opportunity), [
        'statement' => 'Duplicate',
    ])->assertRedirect()->assertSessionHasErrors();

    $this->actingAs($owner)
        ->post(route('applications.review', $application), [
            'action' => 'approve',
            'notes' => 'Approved for travel support.',
        ])
        ->assertRedirect();

    expect($application->fresh()->status)->toBe(ApplicationStatus::Approved)
        ->and($application->fresh()->reviewed_by)->toBe($owner->id)
        ->and($application->reviews)->toHaveCount(1)
        ->and(AuditLog::where('action', 'application.approve')->exists())->toBeTrue();
});

test('organization owners can create organizations and publish opportunities', function () {
    $user = User::factory()->athlete()->create();

    $this->actingAs($user)->post(route('organization.store'), [
        'name' => 'Cebu Boxing Club',
        'type' => 'club',
        'description' => 'Grassroots boxing gym.',
        'city' => 'Cebu City',
    ])->assertRedirect();

    $organization = Organization::where('name', 'Cebu Boxing Club')->first();

    expect($organization)->not->toBeNull()
        ->and($user->fresh()->role)->toBe(UserRole::OrganizationAdmin)
        ->and($organization->members()->where('user_id', $user->id)->exists())->toBeTrue();

    $this->actingAs($user)->post(route('organization.opportunities.store', $organization), [
        'title' => 'Boxing Equipment Grant',
        'type' => 'equipment',
        'description' => 'Gloves and headgear for grassroots boxers.',
        'amount_max' => 30000,
    ])->assertRedirect();

    $opportunity = Opportunity::where('title', 'Boxing Equipment Grant')->first();

    expect($opportunity->status->value)->toBe('draft');

    $this->actingAs($user)->post(route('opportunities.publish', $opportunity))->assertRedirect();

    expect($opportunity->fresh()->status->value)->toBe('published')
        ->and(Opportunity::published()->count())->toBe(1);

    $stranger = User::factory()->create();

    $this->actingAs($stranger)
        ->patch(route('opportunities.update', $opportunity), ['title' => 'Hacked'])
        ->assertForbidden();
});

test('athletes can submit verification requests and staff can approve them', function () {
    Storage::fake('local');

    $athlete = User::factory()->athlete()->create();
    $profile = $athlete->athleteProfile()->create(['city' => 'Manila']);
    $officer = User::factory()->verificationOfficer()->create();

    $this->actingAs($athlete)->post(route('verification.store'), [
        'type' => 'athlete_identity',
        'documents' => [UploadedFile::fake()->image('government-id.jpg')],
        'notes' => 'Submitting my ID.',
    ])->assertRedirect();

    $request = VerificationRequest::first();

    expect($request->status->value)->toBe('pending')
        ->and($request->documents)->toHaveCount(1)
        ->and(Storage::disk('local')->exists($request->documents->first()->file_path))->toBeTrue();

    $this->actingAs($athlete)
        ->post(route('verification.decide', $request), ['decision' => 'approve'])
        ->assertForbidden();

    $this->actingAs($officer)
        ->post(route('verification.decide', $request), [
            'decision' => 'approve',
            'review_notes' => 'Documents check out.',
        ])
        ->assertRedirect();

    expect($request->fresh()->status->value)->toBe('verified')
        ->and($request->fresh()->reviewed_by)->toBe($officer->id)
        ->and($profile->fresh()->verification_status->value)->toBe('verified')
        ->and(AuditLog::where('action', 'verification.approved')->exists())->toBeTrue();
});

test('staff can access admin areas and manage roles while others cannot', function () {
    $admin = User::factory()->admin()->create();
    $athlete = User::factory()->athlete()->create();

    $this->actingAs($athlete)->get(route('admin.users.index'))->assertForbidden();
    $this->actingAs($admin)->get(route('admin.users.index'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page->component('admin/users'));

    $this->actingAs($admin)->get(route('admin.verifications.index'))->assertOk();
    $this->actingAs($admin)->get(route('admin.audit-logs.index'))->assertOk();

    $this->actingAs($admin)
        ->patch(route('admin.users.role', $athlete), ['role' => UserRole::Coach->value])
        ->assertRedirect();

    expect($athlete->fresh()->role)->toBe(UserRole::Coach)
        ->and(AuditLog::where('action', 'user.role_changed')->exists())->toBeTrue();
});

test('search returns matching athletes, organizations and opportunities', function () {
    $athlete = User::factory()->athlete()->create(['name' => 'Maria Santos', 'username' => 'maria-santos']);
    $athlete->athleteProfile()->create(['city' => 'Quezon City']);

    Organization::factory()->create(['name' => 'Quezon City Sports Office']);
    Opportunity::factory()->create(['title' => 'Quezon City Travel Grant']);

    $this->get(route('search', ['q' => 'quezon']))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('search')
            ->where('athletes', fn ($athletes) => count($athletes) === 1)
            ->where('organizations', fn ($orgs) => count($orgs) === 1)
            ->where('opportunities', fn ($opps) => count($opps) === 1));
});
