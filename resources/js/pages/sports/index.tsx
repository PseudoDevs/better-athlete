import { Head, Link } from '@inertiajs/react';
import { ChevronRight, Search } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PublicLayout } from '@/layouts/public-layout';

type Sport = {
    id: number;
    name: string;
    slug: string;
    athletes_count: number;
    opportunities_count: number;
};

export default function SportsIndex({
    sports,
    filters,
}: {
    sports: { data: Sport[]; links: unknown[] };
    filters: { q?: string };
}) {
    const [q, setQ] = useState(filters.q ?? '');

    return (
        <PublicLayout>
            <Head title="Sports Directory — Better Athlete.ph" />

            <section className="border-b bg-muted/40 py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                        Sports directory
                    </h1>
                    <p className="mt-2 max-w-2xl text-muted-foreground">
                        Browse Philippine sports, their athletes, and open
                        opportunities.
                    </p>
                    <form
                        className="mt-6 flex max-w-xl gap-3"
                        action="/sports"
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
                                placeholder="Search sports…"
                                aria-label="Search sports"
                                className="h-11 pl-10"
                            />
                        </div>
                        <Button type="submit" className="h-11">
                            Search
                        </Button>
                    </form>
                </div>
            </section>

            <section className="py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {sports.data.map((sport) => (
                            <li key={sport.id}>
                                <Link
                                    href={`/sports/${sport.slug}`}
                                    className="flex items-center justify-between gap-4 rounded-xl border bg-card p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                                >
                                    <div>
                                        <h2 className="font-semibold text-foreground">
                                            {sport.name}
                                        </h2>
                                        <p className="text-sm text-muted-foreground">
                                            {sport.athletes_count} athletes ·{' '}
                                            {sport.opportunities_count}{' '}
                                            opportunities
                                        </p>
                                    </div>
                                    <ChevronRight
                                        className="size-5 shrink-0 text-muted-foreground"
                                        aria-hidden="true"
                                    />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </PublicLayout>
    );
}
