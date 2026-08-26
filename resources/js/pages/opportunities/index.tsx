import { Head, Link } from '@inertiajs/react';
import { BadgeCheck, Calendar, MapPin, Search } from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { PublicLayout } from '@/layouts/public-layout';

type Opportunity = {
    id: number;
    title: string;
    slug: string;
    type: string;
    location: string | null;
    amount_min: number | null;
    amount_max: number | null;
    application_deadline: string | null;
    organization: { name: string; verification_status: string };
    sport: { name: string } | null;
};

export default function OpportunitiesIndex({
    opportunities,
    sports,
    types,
    filters,
}: {
    opportunities: { data: Opportunity[] };
    sports: { id: number; name: string; slug: string }[];
    types: { value: string; label: string }[];
    filters: { q?: string; type?: string; sport?: string; open?: string };
}) {
    const [q, setQ] = useState(filters.q ?? '');

    return (
        <PublicLayout>
            <Head title="Opportunities — Better Athlete.ph">
                <meta
                    name="description"
                    content="Scholarships, grants, and assistance programs open for Filipino athletes."
                />
            </Head>

            <section className="border-b bg-muted/40 py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                        Opportunities
                    </h1>
                    <p className="mt-2 max-w-2xl text-muted-foreground">
                        Grants, scholarships, and assistance programs currently
                        accepting applications.
                    </p>
                    <form
                        className="mt-6 flex flex-col gap-3 lg:flex-row"
                        action="/opportunities"
                        method="get"
                    >
                        <div className="relative grow">
                            <Search
                                aria-hidden="true"
                                className="pointer-events-none absolute top-1/2 left-3.5 size-4.5 -translate-y-1/2 text-muted-foreground"
                            />
                            <Input
                                name="q"
                                value={q}
                                onChange={(e) => setQ(e.target.value)}
                                placeholder="Search opportunities…"
                                aria-label="Search opportunities"
                                className="h-11 pl-10"
                            />
                        </div>
                        <Select name="type" defaultValue={filters.type ?? ''}>
                            <SelectTrigger className="h-11 w-full lg:w-44">
                                <SelectValue placeholder="All types" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="">All types</SelectItem>
                                {types.map((type) => (
                                    <SelectItem
                                        key={type.value}
                                        value={type.value}
                                    >
                                        {type.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select name="sport" defaultValue={filters.sport ?? ''}>
                            <SelectTrigger className="h-11 w-full lg:w-44">
                                <SelectValue placeholder="All sports" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="">All sports</SelectItem>
                                {sports.map((sport) => (
                                    <SelectItem
                                        key={sport.id}
                                        value={String(sport.id)}
                                    >
                                        {sport.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <input type="hidden" name="open" value="1" />
                        <Button type="submit" className="h-11">
                            Search
                        </Button>
                    </form>
                </div>
            </section>

            <section className="py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {opportunities.data.length === 0 ? (
                        <div className="rounded-xl border bg-card p-12 text-center">
                            <h2 className="font-semibold text-foreground">
                                No opportunities found
                            </h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Try different filters or check back soon.
                            </p>
                        </div>
                    ) : (
                        <ul className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                            {opportunities.data.map((opportunity) => (
                                <li key={opportunity.id}>
                                    <Card className="flex h-full flex-col">
                                        <CardHeader className="pb-3">
                                            <div className="flex items-start justify-between gap-3">
                                                <CardTitle className="text-base">
                                                    {opportunity.title}
                                                </CardTitle>
                                                <Badge
                                                    variant="secondary"
                                                    className="shrink-0 capitalize"
                                                >
                                                    {opportunity.type}
                                                </Badge>
                                            </div>
                                            <p className="inline-flex items-center gap-1 text-sm text-muted-foreground">
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
                                        </CardHeader>
                                        <CardContent className="flex grow flex-col">
                                            {opportunity.amount_max ? (
                                                <p className="text-2xl font-bold tracking-tight text-primary tabular-nums">
                                                    Up to ₱
                                                    {opportunity.amount_max.toLocaleString()}
                                                </p>
                                            ) : null}
                                            <div className="mt-3 grow space-y-1.5 text-sm text-muted-foreground">
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
                                                {opportunity.location ? (
                                                    <p className="inline-flex items-center gap-1.5">
                                                        <MapPin
                                                            className="size-4"
                                                            aria-hidden="true"
                                                        />
                                                        {opportunity.location}
                                                    </p>
                                                ) : null}
                                            </div>
                                            <Button
                                                variant="outline"
                                                className="mt-5 w-full"
                                                asChild
                                            >
                                                <Link
                                                    href={`/opportunities/${opportunity.slug}`}
                                                >
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
