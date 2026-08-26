import { Head, Link } from '@inertiajs/react';
import { ScrollText } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type LogRow = {
    id: number;
    action: string;
    properties: Record<string, unknown> | null;
    ip_address: string | null;
    created_at: string | null;
    user: { id: number; name: string } | null;
};

export default function AuditLogs({
    logs,
    filters,
}: {
    logs: { data: LogRow[]; links: unknown[] };
    filters: { action?: string };
}) {
    return (
        <>
            <Head title="Audit Logs" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="flex items-center gap-2 text-base">
                            <ScrollText
                                className="size-5 text-primary"
                                aria-hidden="true"
                            />
                            Audit log
                        </CardTitle>
                        <form
                            action="/admin/audit-logs"
                            method="get"
                            className="flex gap-2"
                        >
                            <input
                                name="action"
                                defaultValue={filters.action ?? ''}
                                placeholder="Filter by action…"
                                className="h-9 w-56 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs"
                            />
                            <Button type="submit" size="sm" variant="outline">
                                Filter
                            </Button>
                        </form>
                    </CardHeader>
                    <CardContent>
                        {logs.data.length === 0 ? (
                            <p className="py-8 text-center text-sm text-muted-foreground">
                                No audit entries yet.
                            </p>
                        ) : (
                            <ul className="space-y-2">
                                {logs.data.map((log) => (
                                    <li
                                        key={log.id}
                                        className="flex flex-wrap items-center justify-between gap-2 rounded-lg border px-4 py-3 text-sm"
                                    >
                                        <div>
                                            <p className="font-medium text-foreground">
                                                {log.action}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {log.user
                                                    ? `${log.user.name} · `
                                                    : 'System · '}
                                                {log.ip_address ?? '—'} ·{' '}
                                                {log.created_at ?? ''}
                                                {log.properties &&
                                                Object.keys(log.properties)
                                                    .length > 0
                                                    ? ` · ${JSON.stringify(log.properties)}`
                                                    : ''}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}

                        <div className="mt-4 flex items-center justify-center gap-2">
                            {(
                                logs.links as {
                                    url: string | null;
                                    label: string;
                                    active: boolean;
                                }[]
                            )
                                .filter((link) => link.url)
                                .map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url ?? '#'}
                                        className={`rounded-md px-3 py-1.5 text-sm ${
                                            link.active
                                                ? 'bg-primary text-primary-foreground'
                                                : 'border bg-card text-muted-foreground hover:text-primary'
                                        }`}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

AuditLogs.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Admin', href: '/admin/users' },
        { title: 'Audit Logs', href: '/admin/audit-logs' },
    ],
};
