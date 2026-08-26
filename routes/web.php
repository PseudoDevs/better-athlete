<?php

use App\Http\Controllers\AdminUserController;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\AthleteDirectoryController;
use App\Http\Controllers\AthleteProfileController;
use App\Http\Controllers\AuditLogController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FundingProgramController;
use App\Http\Controllers\FundingReviewController;
use App\Http\Controllers\GovernmentDashboardController;
use App\Http\Controllers\OpportunityDirectoryController;
use App\Http\Controllers\OpportunityManageController;
use App\Http\Controllers\OrganizationDashboardController;
use App\Http\Controllers\OrganizationDirectoryController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\SportDirectoryController;
use App\Http\Controllers\TransparencyController;
use App\Http\Controllers\VerificationController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'home')->name('home');

Route::get('/transparency', [TransparencyController::class, 'index'])->name('transparency.index');
Route::get('/transparency/{program:slug}', [TransparencyController::class, 'show'])->name('transparency.show');

Route::get('/athletes', [AthleteDirectoryController::class, 'index'])->name('athletes.index');
Route::get('/athletes/{user:username}', [AthleteDirectoryController::class, 'show'])->name('athletes.show');
Route::get('/sports', [SportDirectoryController::class, 'index'])->name('sports.index');
Route::get('/sports/{sport:slug}', [SportDirectoryController::class, 'show'])->name('sports.show');
Route::get('/organizations', [OrganizationDirectoryController::class, 'index'])->name('organizations.index');
Route::get('/organizations/{organization:slug}', [OrganizationDirectoryController::class, 'show'])->name('organizations.show');
Route::get('/opportunities', [OpportunityDirectoryController::class, 'index'])->name('opportunities.index');
Route::get('/opportunities/{opportunity:slug}', [OpportunityDirectoryController::class, 'show'])->name('opportunities.show');
Route::get('/search', SearchController::class)->name('search');

Route::middleware(['auth', 'verified'])->group(function (): void {
    Route::get('dashboard', DashboardController::class)->name('dashboard');

    Route::get('/profile/athlete', [AthleteProfileController::class, 'edit'])->name('athlete.profile.edit');
    Route::post('/profile/athlete', [AthleteProfileController::class, 'update'])->name('athlete.profile.update');
    Route::post('/profile/athlete/achievements', [AthleteProfileController::class, 'storeAchievement'])->name('athlete.achievements.store');
    Route::delete('/profile/athlete/achievements/{achievement}', [AthleteProfileController::class, 'destroyAchievement'])->name('athlete.achievements.destroy');
    Route::post('/profile/athlete/needs', [AthleteProfileController::class, 'storeNeed'])->name('athlete.needs.store');
    Route::delete('/profile/athlete/needs/{need}', [AthleteProfileController::class, 'destroyNeed'])->name('athlete.needs.destroy');

    Route::get('/applications', [ApplicationController::class, 'index'])->name('applications.index');
    Route::post('/opportunities/{opportunity}/apply', [ApplicationController::class, 'store'])->name('applications.store');
    Route::post('/applications/{application}/review', [ApplicationController::class, 'review'])
        ->middleware('can:decide,application')
        ->name('applications.review');

    Route::get('/organization', [OrganizationDashboardController::class, 'index'])->name('organization.index');
    Route::post('/organization', [OrganizationDashboardController::class, 'store'])->name('organization.store');
    Route::patch('/organization/{organization}', [OrganizationDashboardController::class, 'update'])
        ->middleware('can:update,organization')
        ->name('organization.update');

    Route::post('/organization/{organization}/opportunities', [OpportunityManageController::class, 'store'])
        ->name('organization.opportunities.store');
    Route::patch('/opportunities/{opportunity}', [OpportunityManageController::class, 'update'])
        ->middleware('can:update,opportunity')
        ->name('opportunities.update');
    Route::post('/opportunities/{opportunity}/publish', [OpportunityManageController::class, 'publish'])
        ->middleware('can:update,opportunity')
        ->name('opportunities.publish');
    Route::post('/opportunities/{opportunity}/close', [OpportunityManageController::class, 'close'])
        ->middleware('can:update,opportunity')
        ->name('opportunities.close');
    Route::delete('/opportunities/{opportunity}', [OpportunityManageController::class, 'destroy'])
        ->middleware('can:delete,opportunity')
        ->name('opportunities.destroy');

    Route::get('/verification', [VerificationController::class, 'index'])->name('verification.index');
    Route::post('/verification', [VerificationController::class, 'store'])->name('verification.store');
    Route::post('/verification/{verificationRequest}/decide', [VerificationController::class, 'decide'])
        ->middleware('can:decide,verificationRequest')
        ->name('verification.decide');

    Route::get('/government', [GovernmentDashboardController::class, 'index'])->name('government.dashboard');
    Route::post('/government', [GovernmentDashboardController::class, 'store'])->name('government.store');
    Route::post('/government/{governmentEntity}/programs', [FundingProgramController::class, 'store'])
        ->name('government.programs.store');
    Route::get('/government/programs/{program}', [FundingProgramController::class, 'show'])
        ->middleware('can:manage,program')
        ->name('government.programs.show');
    Route::patch('/government/programs/{program}', [FundingProgramController::class, 'update'])
        ->middleware('can:manage,program')
        ->name('government.programs.update');
    Route::post('/government/programs/{program}/publish', [FundingProgramController::class, 'publish'])
        ->middleware('can:manage,program')
        ->name('government.programs.publish');
    Route::post('/government/programs/{program}/close', [FundingProgramController::class, 'close'])
        ->middleware('can:manage,program')
        ->name('government.programs.close');
    Route::post('/government/programs/{program}/transactions', [FundingProgramController::class, 'recordTransaction'])
        ->middleware('can:manage,program')
        ->name('government.programs.transactions.store');
    Route::post('/funding-applications/{application}/review', [FundingReviewController::class, 'review'])
        ->name('funding-applications.review');

    Route::middleware('can:staff')->prefix('admin')->name('admin.')->group(function (): void {
        Route::get('/users', [AdminUserController::class, 'index'])->name('users.index');
        Route::patch('/users/{user}/role', [AdminUserController::class, 'updateRole'])
            ->middleware('can:admin')
            ->name('users.role');
        Route::get('/verifications', [VerificationController::class, 'queue'])->name('verifications.index');
        Route::get('/audit-logs', [AuditLogController::class, 'index'])->name('audit-logs.index');
    });
});

require __DIR__.'/settings.php';
