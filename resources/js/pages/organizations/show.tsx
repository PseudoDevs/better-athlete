import { Head, Link } from '@inertiajs/react';
import { BadgeCheck, Calendar, MapPin, Medal } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PublicLayout } from '@/layouts/public-layout';

type Opportunity = {
    id: number;
    title: string;
    slug: string;
    type: string;
    location: string | null;
    amount_max: number | null;
    application_deadline: string | null;
};

export default function OrganizationShow({
    organization,
    opportunities,
    opportunitiesCount,
}: {
    organization: {
        name: string;
        slug: string;
        type: string;
        description: string | null;
        email: string | null;
        website: string | null;
        city: string | null;
        province: string | null;
        region: string | null;
        verification_status: string;
    };
    opportunities: Opportunity[];
    opportunitiesCount: number;
}) {
    return (
        <PublicLayout>
            <Head title={`${organization.name} — Better Athlete.ph`} />

            <section className="border-b bg-muted/40 py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {organization.verification_status === 'verified' ? (
                        <Badge className="gap-1 border-transparent bg-success/10 text-success">
                            <BadgeCheck
                                className="size-3.5"
                                aria-hidden="true"
                            />
                            Verified organization
                        </Badge>
                    ) : null}
                    <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                        {organization.name}
                    </h1>
                    <p className="mt-2 text-muted-foreground capitalize">
                        {organization.type.replaceAll('_', ' ')}
                        {organization.city ? (
                            <span className="inline-flex items-center gap-1">
                                {' · '}
                                <MapPin
                                    className="inline size-4"
                                    aria-hidden="true"
                                />
                                {organization.city}
                                {organization.region
                                    ? `, ${organization.region}`
                                    : ''}
                            </span>
                        ) : null}
                    </p>
                    {organization.description ? (
                        <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
                            {organization.description}
                        </p>
                    ) : null}
                </div>
            </section>

            <section className="py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-foreground">
                            Open opportunities ({opportunitiesCount})
                        </h2>
                        <Button variant="outline" asChild>
                            <Link href="/opportunities">View all</Link>
                        </Button>
                    </div>

                    {opportunities.length === 0 ? (
                        <p className="mt-4 text-sm text-muted-foreground">
                            No open opportunities right now.
                        </p>
                    ) : (
                        <ul className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
                            {opportunities.map((opportunity) => (
                                <li key={opportunity.id}>
                                    <Card className="h-full">
                                        <CardHeader className="pb-3">
                                            <CardTitle className="text-base">
                                                {opportunity.title}
                                            </CardTitle>
                                            <Badge
                                                variant="secondary"
                                                className="w-fit capitalize"
                                            >
                                                {opportunity.type}
                                            </Badge>
                                        </CardHeader>
                                        <CardContent className="space-y-2 text-sm text-muted-foreground">
                                            {opportunity.amount_max ? (
                                                <p className="text-lg font-bold text-primary tabular-nums">
                                                    Up to ₱
                                                    {opportunity.amount_max.toLocaleString()}
                                                </p>
                                            ) : null}
                                            {opportunity.application_deadline ? (
                                                <p className="inline-flex items-center gap-1.5">
                                                    <Calendar
                                                        className="size-4"
                                                        aria-hidden="true"
                                                    />
                                                    Closes{' '}
                                                    {
                                                        opportunity.application_deadline
                                                    }
                                                </p>
                                            ) : null}
                                            <Button
                                                variant="outline"
                                                className="w-full"
                                                asChild
                                            >
                                                <Link
                                                    href={`/opportunities/${opportunity.slug}`}
                                                >
                                                    <Medal
                                                        className="size-4"
                                                        aria-hidden="true"
                                                    />
                                                    View opportunity
                                                </Link>
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}
