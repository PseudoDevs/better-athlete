<?php

namespace App\Http\Controllers;

use App\Enums\UserRole;
use App\Models\AuditLog;
use App\Models\GovernmentEntity;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class GovernmentDashboardController extends Controller
{
    /**
     * Display the government dashboard.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();

        $entities = $user->governmentEntities()
            ->withCount(['fundingPrograms', 'applications'])
            ->get();

        $entities->each(function (GovernmentEntity $entity) {
            $entity->setRelation(
                'fundingProgramsList',
                $entity->fundingPrograms()->withCount('applications')->latest()->limit(10)->get(),
            );
        });

        return Inertia::render('government/dashboard', [
            'entities' => $entities,
        ]);
    }

    /**
     * Register a new government entity.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:200'],
            'type' => ['required', 'in:agency,lgu,sports_authority'],
            'description' => ['nullable', 'string', 'max:2000'],
            'email' => ['nullable', 'email', 'max:200'],
            'website' => ['nullable', 'url', 'max:255'],
            'city' => ['nullable', 'string', 'max:120'],
            'province' => ['nullable', 'string', 'max:120'],
            'region' => ['nullable', 'string', 'max:120'],
        ]);

        $entity = $request->user()->governmentEntities()->create($validated);

        if ($request->user()->role->isAthlete()) {
            $request->user()->update(['role' => UserRole::GovernmentAdmin]);
        }

        AuditLog::record('government_entity.created', $entity, ['name' => $entity->name]);

        return redirect()->route('government.dashboard')->with('status', 'government-entity-created');
    }
}
