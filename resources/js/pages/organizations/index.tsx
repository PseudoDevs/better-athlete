import { Head, Link } from '@inertiajs/react';
import { BadgeCheck, Building2, MapPin, Search } from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { PublicLayout } from '@/layouts/public-layout';

type Organization = {
    id: number;
    name: string;
    slug: string;
    type: string;
    city: string | null;
    verification_status: string;
    opportunities_count: number;
};

export default function OrganizationsIndex({
    organizations,
    types,
    filters,
}: {
    organizations: { data: Organization[] };
    types: { value: string; label: string }[];
    filters: { q?: string; type?: string; verified?: string };
}) {
    const [q, setQ] = useState(filters.q ?? '');

    return (
        <PublicLayout>
            <Head title="Organizations — Better Athlete.ph" />

            <section className="border-b bg-muted/40 py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                        Organization directory
                    </h1>
                    <p className="mt-2 max-w-2xl text-muted-foreground">
                        Sports organizations, clubs, schools, and foundations
                        supporting Filipino athletes.
                    </p>
                    <form
                        className="mt-6 flex flex-col gap-3 sm:flex-row"
                        action="/organizations"
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
                                placeholder="Search organizations…"
                                aria-label="Search organizations"
                                className="h-11 pl-10"
                            />
                        </div>
                        <Select name="type" defaultValue={filters.type ?? ''}>
                            <SelectTrigger className="h-11 w-full sm:w-56">
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
                        <Button type="submit" className="h-11">
                            Search
                        </Button>
                    </form>
                </div>
            </section>

            <section className="py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {organizations.data.length === 0 ? (
                        <div className="rounded-xl border bg-card p-12 text-center">
                            <Building2 className="mx-auto size-10 text-muted-foreground/40" />
                            <h2 className="mt-4 font-semibold text-foreground">
                                No organizations found
                            </h2>
                            <Button variant="outline" className="mt-4" asChild>
                                <Link href="/organizations">Clear filters</Link>
                            </Button>
                        </div>
                    ) : (
                        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {organizations.data.map((organization) => (
                                <li key={organization.id}>
                                    <Link
                                        href={`/organizations/${organization.slug}`}
                                        className="block rounded-xl border bg-card p-6 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <span className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                                <Building2
                                                    className="size-5"
                                                    aria-hidden="true"
                                                />
                                            </span>
                                            {organization.verification_status ===
                                            'verified' ? (
                                                <Badge className="gap-1 border-transparent bg-success/10 text-success">
                                                    <BadgeCheck
                                                        className="size-3.5"
                                                        aria-hidden="true"
                                                    />
                                                    Verified
                                                </Badge>
                                            ) : null}
                                        </div>
                                        <h2 className="mt-4 font-semibold text-foreground">
                                            {organization.name}
                                        </h2>
                                        <p className="text-sm text-muted-foreground capitalize">
                                            {organization.type.replaceAll(
                                                '_',
                                                ' ',
                                            )}
                                        </p>
                                        <p className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
                                            <span className="inline-flex items-center gap-1">
                                                {organization.city ? (
                                                    <>
                                                        <MapPin
                                                            className="size-3.5"
                                                            aria-hidden="true"
                                                        />
                                                        {organization.city}
                                                    </>
                                                ) : null}
                                            </span>
                                            <span>
                                                {
                                                    organization.opportunities_count
                                                }{' '}
                                                opportunities
                                            </span>
                                        </p>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}
