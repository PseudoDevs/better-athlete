import { Head, Link } from '@inertiajs/react';
import { BadgeCheck, Landmark, ShieldCheck } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { PublicLayout } from '@/layouts/public-layout';

type Program = {
    id: number;
    title: string;
    slug: string;
    budget: number;
    status: string;
    application_deadline: string | null;
    beneficiaries_count: number;
    government_entity: { name: string; verification_status: string };
    totals: { allocated: number; committed: number; disbursed: number };
};

const peso = (value: number) => {
    if (value >= 1_000_000) {
return `₱${(value / 1_000_000).toFixed(1)}M`;
}

    if (value >= 1_000) {
return `₱${Math.round(value / 1_000)}K`;
}

    return `₱${value.toLocaleString()}`;
};

export default function TransparencyIndex({
    programs,
    totals,
}: {
    programs: { data: Program[] };
    totals: {
        allocated: number;
        committed: number;
        disbursed: number;
        programs: number;
        beneficiaries: number;
        entities: number;
    };
}) {
    return (
        <PublicLayout>
            <Head title="Funding Transparency — Better Athlete.ph">
                <meta
                    name="description"
                    content="See where Philippine sports funding comes from and where it goes. Allocated, committed, and disbursed — tracked publicly."
                />
            </Head>

            <section
                aria-labelledby="transparency-heading"
                className="bg-gradient-to-br from-primary to-primary-dark py-14 text-white"
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Badge className="gap-1.5 border-transparent bg-white/10 text-white">
                        <Landmark className="size-3" aria-hidden="true" />
                        Transparency dashboard
                    </Badge>
                    <h1
                        id="transparency-heading"
                        className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl"
                    >
                        See where Philippine sports funding goes
                    </h1>
                    <p className="mt-3 max-w-2xl text-white/70">
                        Allocated is not the same as disbursed. Every stage is
                        tracked publicly, with sources attached to each record.
                    </p>

                    <dl className="mt-10 grid grid-cols-2 gap-8 lg:grid-cols-3">
                        <div>
                            <dd className="text-3xl font-bold tracking-tight tabular-nums sm:text-4xl">
                                {peso(totals.allocated)}
                            </dd>
                            <dt className="mt-1.5 text-sm text-white/60">
                                Total allocated
                            </dt>
                        </div>
                        <div>
                            <dd className="text-3xl font-bold tracking-tight tabular-nums sm:text-4xl">
                                {peso(totals.committed)}
                            </dd>
                            <dt className="mt-1.5 text-sm text-white/60">
                                Committed to athletes
                            </dt>
                        </div>
                        <div>
                            <dd className="text-3xl font-bold tracking-tight tabular-nums sm:text-4xl">
                                {peso(totals.disbursed)}
                            </dd>
                            <dt className="mt-1.5 text-sm text-white/60">
                                Disbursed
                            </dt>
                        </div>
                        <div>
                            <dd className="text-2xl font-bold tabular-nums">
                                {totals.programs}
                            </dd>
                            <dt className="mt-1 text-sm text-white/60">
                                Published programs
                            </dt>
                        </div>
                        <div>
                            <dd className="text-2xl font-bold tabular-nums">
                                {totals.beneficiaries}
                            </dd>
                            <dt className="mt-1 text-sm text-white/60">
                                Athlete beneficiaries
                            </dt>
                        </div>
                        <div>
                            <dd className="text-2xl font-bold tabular-nums">
                                {totals.entities}
                            </dd>
                            <dt className="mt-1 text-sm text-white/60">
                                Verified government entities
                            </dt>
                        </div>
                    </dl>

                    <p className="mt-8 inline-flex items-center gap-2 text-xs text-white/50">
                        <ShieldCheck className="size-4" aria-hidden="true" />
                        Totals are calculated directly from the immutable
                        transaction ledger — never manually entered.
                    </p>
                </div>
            </section>

            <section className="py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2 className="text-lg font-semibold text-foreground">
                        Funding programs
                    </h2>
                    {programs.data.length === 0 ? (
                        <p className="mt-4 text-sm text-muted-foreground">
                            No published programs yet.
                        </p>
                    ) : (
                        <ul className="mt-6 space-y-4">
                            {programs.data.map((program) => (
                                <li key={program.id}>
                                    <Link
                                        href={`/transparency/${program.slug}`}
                                        className="block rounded-xl border bg-card p-6 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                                    >
                                        <div className="flex flex-wrap items-start justify-between gap-3">
                                            <div>
                                                <h3 className="font-semibold text-foreground">
                                                    {program.title}
                                                </h3>
                                                <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                                                    {
                                                        program
                                                            .government_entity
                                                            .name
                                                    }
                                                    {program.government_entity
                                                        .verification_status ===
                                                    'verified' ? (
                                                        <BadgeCheck
                                                            className="size-4 text-success"
                                                            aria-hidden="true"
                                                        />
                                                    ) : null}
                                                    <span className="ml-2 capitalize">
                                                        {program.status}
                                                    </span>
                                                </p>
                                            </div>
                                            {program.application_deadline ? (
                                                <Badge variant="secondary">
                                                    Closes{' '}
                                                    {
                                                        program.application_deadline
                                                    }
                                                </Badge>
                                            ) : null}
                                        </div>

                                        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
                                            <div>
                                                <p className="text-xl font-bold text-primary tabular-nums">
                                                    {peso(
                                                        program.totals
                                                            .allocated,
                                                    )}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    Allocated
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xl font-bold text-foreground tabular-nums">
                                                    {peso(
                                                        program.totals
                                                            .committed,
                                                    )}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    Committed
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xl font-bold text-foreground tabular-nums">
                                                    {peso(
                                                        program.totals
                                                            .disbursed,
                                                    )}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    Disbursed
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xl font-bold text-foreground tabular-nums">
                                                    {
                                                        program.beneficiaries_count
                                                    }
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    Beneficiaries
                                                </p>
                                            </div>
                                        </div>
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
