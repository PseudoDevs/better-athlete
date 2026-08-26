import { Head, Link } from '@inertiajs/react';
import { BadgeCheck, Clock, MapPin, Search, Trophy } from 'lucide-react';
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

type Athlete = {
    id: number;
    user: { name: string; username: string | null };
    city: string | null;
    region: string | null;
    verification_status: string;
    sports: { id: number; sport: { name: string } }[];
};

export default function AthletesIndex({
    athletes,
    sports,
    regions,
    filters,
}: {
    athletes: { data: Athlete[]; links: unknown[] };
    sports: { id: number; name: string; slug: string }[];
    regions: string[];
    filters: { q?: string; sport?: string; region?: string; verified?: string };
}) {
    const [q, setQ] = useState(filters.q ?? '');

    const initials = (name: string) =>
        name
            .split(' ')
            .map((part) => part[0])
            .slice(0, 2)
            .join('')
            .toUpperCase();

    return (
        <PublicLayout>
            <Head title="Athlete Directory — Better Athlete.ph">
                <meta
                    name="description"
                    content="Discover verified Filipino athletes across all sports and regions."
                />
            </Head>

            <section className="border-b bg-muted/40 py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                        Athlete directory
                    </h1>
                    <p className="mt-2 max-w-2xl text-muted-foreground">
                        Discover Filipino athletes across every sport and
                        region.
                    </p>

                    <form
                        className="mt-6 flex flex-col gap-3 sm:flex-row"
                        action="/athletes"
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
                                placeholder="Search athletes by name or city…"
                                aria-label="Search athletes"
                                className="h-11 pl-10"
                            />
                        </div>
                        <Select name="sport" defaultValue={filters.sport ?? ''}>
                            <SelectTrigger className="h-11 w-full sm:w-48">
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
                        <Select
                            name="region"
                            defaultValue={filters.region ?? ''}
                        >
                            <SelectTrigger className="h-11 w-full sm:w-44">
                                <SelectValue placeholder="All regions" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="">All regions</SelectItem>
                                {regions.map((region) => (
                                    <SelectItem key={region} value={region}>
                                        {region}
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
                    {athletes.data.length === 0 ? (
                        <div className="rounded-xl border bg-card p-12 text-center">
                            <Trophy className="mx-auto size-10 text-muted-foreground/40" />
                            <h2 className="mt-4 font-semibold text-foreground">
                                No athletes found
                            </h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Try changing your filters or search terms.
                            </p>
                            <Button variant="outline" className="mt-4" asChild>
                                <Link href="/athletes">Clear filters</Link>
                            </Button>
                        </div>
                    ) : (
                        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {athletes.data.map((athlete) => (
                                <li key={athlete.id}>
                                    <Link
                                        href={`/athletes/${athlete.user.username}`}
                                        className="group block overflow-hidden rounded-xl border bg-card shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                                    >
                                        <div className="relative aspect-[4/5] bg-gradient-to-br from-primary/10 via-primary/5 to-gold/15">
                                            <span
                                                aria-hidden="true"
                                                className="absolute inset-0 flex items-center justify-center text-5xl font-bold text-primary/25 select-none"
                                            >
                                                {initials(athlete.user.name)}
                                            </span>
                                            {athlete.verification_status ===
                                            'verified' ? (
                                                <Badge className="absolute top-3 left-3 gap-1 bg-card/90 text-success shadow-xs backdrop-blur">
                                                    <BadgeCheck
                                                        className="size-3.5"
                                                        aria-hidden="true"
                                                    />
                                                    Verified
                                                </Badge>
                                            ) : (
                                                <Badge
                                                    variant="outline"
                                                    className="absolute top-3 left-3 gap-1 bg-card/90 text-warning backdrop-blur"
                                                >
                                                    <Clock
                                                        className="size-3.5"
                                                        aria-hidden="true"
                                                    />
                                                    Unverified
                                                </Badge>
                                            )}
                                        </div>
                                        <div className="p-4">
                                            <h2 className="font-semibold text-foreground">
                                                {athlete.user.name}
                                            </h2>
                                            <p className="text-sm text-muted-foreground">
                                                {athlete.sports
                                                    .map((s) => s.sport.name)
                                                    .slice(0, 2)
                                                    .join(' · ') || 'Athlete'}
                                            </p>
                                            {athlete.city ? (
                                                <p className="mt-0.5 inline-flex items-center gap-1 text-sm text-muted-foreground">
                                                    <MapPin
                                                        className="size-3.5 shrink-0"
                                                        aria-hidden="true"
                                                    />
                                                    {athlete.city}
                                                    {athlete.region
                                                        ? `, ${athlete.region}`
                                                        : ''}
                                                </p>
                                            ) : null}
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}

                    {athletes.data.length > 0 ? (
                        <div className="mt-8 flex items-center justify-center gap-2">
                            {(
                                athletes.links as {
                                    url: string | null;
                                    label: string;
                                    active: boolean;
                                }[]
                            )
                                .filter(
                                    (link) =>
                                        link.url ||
                                        link.label.includes('Previous') ||
                                        link.label.includes('Next'),
                                )
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
                    ) : null}
                </div>
            </section>
        </PublicLayout>
    );
}
