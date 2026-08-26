import { Head, Link } from '@inertiajs/react';
import { ClipboardList } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

type Application = {
    id: number;
    status: string;
    requested_amount: number | null;
    submitted_at: string | null;
    opportunity: {
        title: string;
        slug: string;
        organization: { name: string };
    };
};

export default function AthleteApplications({
    applications,
}: {
    applications: Application[] | { data: Application[] };
}) {
    const items = Array.isArray(applications)
        ? applications
        : applications.data;

    return (
        <>
            <Head title="My Applications" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardContent className="p-6">
                        <h1 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                            <ClipboardList
                                className="size-5 text-primary"
                                aria-hidden="true"
                            />
                            My applications
                        </h1>

                        {items.length === 0 ? (
                            <div className="py-10 text-center">
                                <p className="text-sm text-muted-foreground">
                                    You have not applied to any opportunities
                                    yet.
                                </p>
                                <Button size="sm" className="mt-3" asChild>
                                    <Link href="/opportunities">
                                        Browse opportunities
                                    </Link>
                                </Button>
                            </div>
                        ) : (
                            <ul className="mt-4 space-y-3">
                                {items.map((application) => (
                                    <li
                                        key={application.id}
                                        className="flex flex-wrap items-center justify-between gap-3 rounded-lg border p-4"
                                    >
                                        <div className="min-w-0">
                                            <Link
                                                href={`/opportunities/${application.opportunity.slug}`}
                                                className="text-sm font-medium text-foreground hover:text-primary"
                                            >
                                                {application.opportunity.title}
                                            </Link>
                                            <p className="text-xs text-muted-foreground">
                                                {
                                                    application.opportunity
                                                        .organization.name
                                                }
                                                {application.submitted_at
                                                    ? ` · Applied ${application.submitted_at}`
                                                    : ' · Draft'}
                                                {application.requested_amount
                                                    ? ` · ₱${application.requested_amount.toLocaleString()}`
                                                    : ''}
                                            </p>
                                        </div>
                                        <Badge
                                            variant="secondary"
                                            className="capitalize"
                                        >
                                            {application.status.replaceAll(
                                                '_',
                                                ' ',
                                            )}
                                        </Badge>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

AthleteApplications.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Applications', href: '/applications' },
    ],
};
