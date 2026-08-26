import { Form, Head, Link } from '@inertiajs/react';

import VerificationController from '@/actions/App/Http/Controllers/VerificationController';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

type VerificationRow = {
    id: number;
    type: string;
    status: string;
    notes: string | null;
    reviewed_at: string | null;
    review_notes: string | null;
    user: { id: number; name: string; username: string | null };
    organization: { id: number; name: string } | null;
    documents: {
        id: number;
        original_name: string | null;
        file_path: string;
    }[];
};

export default function AdminVerifications({
    requests,
    filters,
}: {
    requests: { data: VerificationRow[] };
    filters: { status?: string };
}) {
    return (
        <>
            <Head title="Verification Queue" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-base">
                            Verification queue
                        </CardTitle>
                        <form
                            action="/admin/verifications"
                            method="get"
                            className="flex gap-2"
                        >
                            <select
                                name="status"
                                defaultValue={filters.status ?? ''}
                                className="h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs"
                            >
                                <option value="">All statuses</option>
                                <option value="pending">Pending</option>
                                <option value="verified">Verified</option>
                                <option value="rejected">Rejected</option>
                            </select>
                            <Button type="submit" size="sm" variant="outline">
                                Filter
                            </Button>
                        </form>
                    </CardHeader>
                    <CardContent>
                        {requests.data.length === 0 ? (
                            <p className="py-8 text-center text-sm text-muted-foreground">
                                No verification requests.
                            </p>
                        ) : (
                            <ul className="space-y-4">
                                {requests.data.map((request) => (
                                    <li
                                        key={request.id}
                                        className="rounded-lg border p-4"
                                    >
                                        <div className="flex flex-wrap items-center justify-between gap-2">
                                            <div>
                                                <p className="text-sm font-medium text-foreground capitalize">
                                                    {request.type.replaceAll(
                                                        '_',
                                                        ' ',
                                                    )}{' '}
                                                    —{' '}
                                                    <Link
                                                        href={`/athletes/${request.user.username}`}
                                                        className="underline-offset-4 hover:underline"
                                                    >
                                                        {request.user.name}
                                                    </Link>
                                                    {request.organization
                                                        ? ` · ${request.organization.name}`
                                                        : ''}
                                                </p>
                                                <p className="mt-0.5 text-xs text-muted-foreground">
                                                    {request.documents.length}{' '}
                                                    document(s):{' '}
                                                    {request.documents
                                                        .map(
                                                            (doc) =>
                                                                doc.original_name,
                                                        )
                                                        .filter(Boolean)
                                                        .join(', ')}
                                                </p>
                                                {request.notes ? (
                                                    <p className="mt-2 rounded-md bg-muted px-3 py-2 text-xs text-muted-foreground">
                                                        Applicant note:{' '}
                                                        {request.notes}
                                                    </p>
                                                ) : null}
                                            </div>
                                            <Badge
                                                variant="secondary"
                                                className={
                                                    request.status ===
                                                    'verified'
                                                        ? 'border-transparent bg-success/10 text-success'
                                                        : request.status ===
                                                            'rejected'
                                                          ? 'border-transparent bg-destructive/10 text-destructive'
                                                          : 'border-transparent bg-warning/10 text-warning'
                                                }
                                            >
                                                {request.status}
                                            </Badge>
                                        </div>

                                        {request.status === 'pending' ? (
                                            <Form
                                                {...VerificationController.decide.form(
                                                    request.id,
                                                )}
                                                options={{
                                                    preserveScroll: true,
                                                }}
                                                className="mt-3 space-y-2"
                                            >
                                                {({ processing }) => (
                                                    <>
                                                        <Textarea
                                                            name="review_notes"
                                                            rows={2}
                                                            placeholder="Review notes (optional)…"
                                                        />
                                                        <div className="flex gap-2">
                                                            <Button
                                                                type="submit"
                                                                name="decision"
                                                                value="approve"
                                                                size="sm"
                                                                disabled={
                                                                    processing
                                                                }
                                                            >
                                                                Approve
                                                            </Button>
                                                            <Button
                                                                type="submit"
                                                                name="decision"
                                                                value="reject"
                                                                size="sm"
                                                                variant="outline"
                                                                className="text-destructive"
                                                                disabled={
                                                                    processing
                                                                }
                                                            >
                                                                Reject
                                                            </Button>
                                                        </div>
                                                    </>
                                                )}
                                            </Form>
                                        ) : request.review_notes ? (
                                            <p className="mt-2 text-xs text-muted-foreground">
                                                Decision note:{' '}
                                                {request.review_notes}
                                            </p>
                                        ) : null}
                                    </li>
                                ))}
                            </ul>
                        )}

                        <div className="mt-4 flex items-center justify-center gap-2">
                            {(requests.data.length > 0
                                ? [
                                      (
                                          requests as unknown as {
                                              links?: unknown[];
                                          }
                                      ).links ?? [],
                                  ][0]
                                : []
                            ).length > 0
                                ? null
                                : null}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

AdminVerifications.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Admin', href: '/admin/users' },
        { title: 'Verifications', href: '/admin/verifications' },
    ],
};
