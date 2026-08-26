<?php

namespace App\Http\Controllers;

use App\Models\AuditLog;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AuditLogController extends Controller
{
    /**
     * List the audit log trail.
     */
    public function index(Request $request): Response
    {
        $logs = AuditLog::query()
            ->with('user')
            ->when($request->filled('action'), fn ($query) => $query
                ->where('action', 'like', '%'.$request->string('action').'%'))
            ->latest('created_at')
            ->paginate(50)
            ->withQueryString();

        return Inertia::render('admin/audit-logs', [
            'logs' => $logs,
            'filters' => $request->only(['action']),
        ]);
    }
}
