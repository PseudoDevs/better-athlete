<?php

namespace App\Http\Controllers;

use App\Enums\OpportunityStatus;
use App\Models\AuditLog;
use App\Models\Opportunity;
use App\Models\Organization;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class OpportunityManageController extends Controller
{
    /**
     * Store a new opportunity.
     */
    public function store(Request $request, Organization $organization): RedirectResponse
    {
        $this->authorize('create', [Opportunity::class, $organization]);

        $validated = $this->validateOpportunity($request);

        $opportunity = $organization->opportunities()->create($validated);

        AuditLog::record('opportunity.created', $opportunity, ['title' => $opportunity->title]);

        return back()->with('status', 'opportunity-created');
    }

    /**
     * Update an opportunity.
     */
    public function update(Request $request, Opportunity $opportunity): RedirectResponse
    {
        $this->authorize('update', $opportunity);

        $opportunity->update($this->validateOpportunity($request));

        AuditLog::record('opportunity.updated', $opportunity);

        return back()->with('status', 'opportunity-updated');
    }

    /**
     * Publish an opportunity.
     */
    public function publish(Request $request, Opportunity $opportunity): RedirectResponse
    {
        $this->authorize('update', $opportunity);

        $opportunity->update([
            'status' => OpportunityStatus::Published,
            'published_at' => now(),
        ]);

        AuditLog::record('opportunity.published', $opportunity);

        return back()->with('status', 'opportunity-published');
    }

    /**
     * Close an opportunity.
     */
    public function close(Request $request, Opportunity $opportunity): RedirectResponse
    {
        $this->authorize('update', $opportunity);

        $opportunity->update(['status' => OpportunityStatus::Closed]);

        AuditLog::record('opportunity.closed', $opportunity);

        return back()->with('status', 'opportunity-closed');
    }

    /**
     * Delete an opportunity.
     */
    public function destroy(Request $request, Opportunity $opportunity): RedirectResponse
    {
        $this->authorize('delete', $opportunity);

        AuditLog::record('opportunity.deleted', $opportunity, ['title' => $opportunity->title]);

        $opportunity->delete();

        return redirect()->route('organization.index')->with('status', 'opportunity-deleted');
    }

    /**
     * Validate opportunity input.
     *
     * @return array<string, mixed>
     */
    protected function validateOpportunity(Request $request): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:200'],
            'type' => ['required', 'in:scholarship,grant,assistance,training,equipment,competition,other'],
            'description' => ['required', 'string', 'max:5000'],
            'sport_id' => ['nullable', 'exists:sports,id'],
            'location' => ['nullable', 'string', 'max:200'],
            'amount_min' => ['nullable', 'integer', 'min:0'],
            'amount_max' => ['nullable', 'integer', 'min:0'],
            'application_deadline' => ['nullable', 'date', 'after:today'],
        ]);
    }
}
