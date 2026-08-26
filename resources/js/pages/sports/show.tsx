import { Head, Link } from '@inertiajs/react';
import { BadgeCheck, MapPin, Medal } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PublicLayout } from '@/layouts/public-layout';

type Athlete = {
    id: number;
    user: { name: string; username: string | null };
    city: string | null;
    verification_status: string;
    sports: { sport: { name: string } }[];
};

type Opportunity = {
    id: number;
    title: string;
    slug: string;
    amount_max: number | null;
    organization: { name: string; verification_status: string };
};

export default function SportShow({
    sport,
    athletes,
    opportunities,
    athletesCount,
}: {
    sport: {
        name: string;
        description: string | null;
        disciplines: { id: number; name: string }[];
    };
    athletes: Athlete[];
    opportunities: Opportunity[];
    athletesCount: number;
}) {
    return (
        <PublicLayout>
            <Head title={`${sport.name} — Better Athlete.ph`} />

            <section className="border-b bg-muted/40 py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                        {sport.name}
                    </h1>
                    {sport.description ? (
                        <p className="mt-2 max-w-2xl text-muted-foreground">
                            {sport.description}
                        </p>
                    ) : null}
                    <div className="mt-6 flex flex-wrap gap-8">
                        <div>
                            <p className="text-3xl font-bold text-primary tabular-nums">
                                {athletesCount}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Athletes
                            </p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-primary tabular-nums">
                                {sport.disciplines.length}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Disciplines
                            </p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-primary tabular-nums">
                                {opportunities.length}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Open opportunities
                            </p>
                        </div>
                    </div>
                    {sport.disciplines.length > 0 ? (
                        <div className="mt-6 flex flex-wrap gap-2">
                            {sport.disciplines.map((discipline) => (
                                <Badge key={discipline.id} variant="secondary">
                                    {discipline.name}
                                </Badge>
                            ))}
                        </div>
                    ) : null}
                </div>
            </section>

            <section className="grid gap-8 py-12 lg:grid-cols-2">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2 className="text-lg font-semibold text-foreground">
                        Featured athletes
                    </h2>
                    {athletes.length === 0 ? (
                        <p className="mt-3 text-sm text-muted-foreground">
                            No athletes yet.
                        </p>
                    ) : (
                        <ul className="mt-4 space-y-3">
                            {athletes.map((athlete) => (
                                <li key={athlete.id}>
                                    <Link
                                        href={`/athletes/${athlete.user.username}`}
                                        className="flex items-center justify-between rounded-xl border bg-card p-4 transition-colors hover:border-primary/40"
                                    >
                                        <div>
                                            <p className="font-medium text-foreground">
                                                {athlete.user.name}
                                                {athlete.verification_status ===
                                                'verified' ? (
                                                    <BadgeCheck
                                                        className="ml-1.5 inline size-4 text-success"
                                                        aria-hidden="true"
                                                    />
                                                ) : null}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {athlete.sports
                                                    .map((s) => s.sport.name)
                                                    .join(' · ')}
                                            </p>
                                        </div>
                                        {athlete.city ? (
                                            <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                                                <MapPin
                                                    className="size-3.5"
                                                    aria-hidden="true"
                                                />
                                                {athlete.city}
                                            </span>
                                        ) : null}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2 className="text-lg font-semibold text-foreground">
                        Opportunities
                    </h2>
                    {opportunities.length === 0 ? (
                        <p className="mt-3 text-sm text-muted-foreground">
                            No open opportunities for this sport yet.
                        </p>
                    ) : (
                        <ul className="mt-4 space-y-3">
                            {opportunities.map((opportunity) => (
                                <li key={opportunity.id}>
                                    <Card>
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-base">
                                                {opportunity.title}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="flex items-center justify-between">
                                            <p className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                                                {opportunity.organization.name}
                                                {opportunity.organization
                                                    .verification_status ===
                                                'verified' ? (
                                                    <BadgeCheck
                                                        className="size-4 text-success"
                                                        aria-hidden="true"
                                                    />
                                                ) : null}
                                            </p>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                asChild
                                            >
                                                <Link
                                                    href={`/opportunities/${opportunity.slug}`}
                                                >
                                                    <Medal
                                                        className="size-4"
                                                        aria-hidden="true"
                                                    />
                                                    View
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
