<?php

namespace App\Http\Controllers;

use App\Enums\UserRole;
use App\Models\AuditLog;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminUserController extends Controller
{
    /**
     * List users for management.
     */
    public function index(Request $request): Response
    {
        $users = User::query()
            ->when($request->filled('q'), fn ($query) => $query
                ->where('name', 'like', '%'.$request->string('q').'%')
                ->orWhere('email', 'like', '%'.$request->string('q').'%')
                ->orWhere('username', 'like', '%'.$request->string('q').'%'))
            ->when($request->filled('role'), fn ($query) => $query
                ->where('role', $request->string('role')))
            ->latest()
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('admin/users', [
            'users' => $users,
            'roles' => collect(UserRole::cases())
                ->map(fn ($role) => ['value' => $role->value, 'label' => $role->label()]),
            'filters' => $request->only(['q', 'role']),
        ]);
    }

    /**
     * Update a user's role.
     */
    public function updateRole(Request $request, User $user): RedirectResponse
    {
        $validated = $request->validate([
            'role' => ['required', 'in:'.implode(',', array_column(UserRole::cases(), 'value'))],
        ]);

        $user->update(['role' => $validated['role']]);

        AuditLog::record('user.role_changed', $user, [
            'role' => $validated['role'],
        ]);

        return back()->with('status', 'role-updated');
    }
}
