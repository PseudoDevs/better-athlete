import { Head, Link } from '@inertiajs/react';
import { BadgeCheck, Calendar, ShieldCheck } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { PublicLayout } from '@/layouts/public-layout';

type Transaction = {
    id: number;
    reference_number: string;
    transaction_type: string;
    amount: number;
    status: string;
    description: string | null;
    transaction_date: string | null;
    athlete_profile: { user: { name: string } } | null;
};

type Beneficiary = {
    id: number;
    awarded_amount: number;
    athlete_profile: { user: { name: string; username: string | null } };
};

export default function TransparencyShow({
    program,
    totals,
    transactions,
    beneficiaries,
    applicationStats,
}: {
    program: {
        title: string;
        slug: string;
        description: string;
        budget: number;
        status: string;
        application_deadline: string | null;
        government_entity: {
            name: string;
            verification_status: string;
            city: string | null;
            region: string | null;
        };
        sport: { name: string } | null;
    };
    totals: {
        allocated: number;
        committed: number;
        disbursed: number;
        remaining: number;
    };
    transactions: Transaction[];
    beneficiaries: Beneficiary[];
    applicationStats: {
        total: number;
        approved: number;
        rejected: number;
        pending: number;
    };
}) {
    const stages = [
        { label: 'Allocated', amount: totals.allocated },
        { label: 'Committed', amount: totals.committed },
        { label: 'Disbursed', amount: totals.disbursed },
    ];

    return (
        <PublicLayout>
            <Head title={`${program.title} — Transparency`} />

            <section className="border-b bg-gradient-to-br from-primary to-primary-dark py-12 text-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap items-center gap-2">
                        <Badge className="gap-1 border-transparent bg-white/15 text-white">
                            <BadgeCheck
                                className="size-3.5"
                                aria-hidden="true"
                            />
                            {program.government_entity.name}
                        </Badge>
                        <Badge className="gap-1 border-transparent bg-white/15 text-white capitalize">
                            {program.status}
                        </Badge>
                        {program.application_deadline ? (
                            <Badge className="gap-1 border-transparent bg-white/15 text-white">
                                <Calendar
                                    className="size-3.5"
                                    aria-hidden="true"
                                />
                                Closed {program.application_deadline}
                            </Badge>
                        ) : null}
                    </div>
                    <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                        {program.title}
                    </h1>
                    <p className="mt-3 max-w-3xl leading-relaxed text-white/70">
                        {program.description}
                    </p>
                </div>
            </section>

            <section className="py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <ol className="grid gap-6 sm:grid-cols-3">
                        {stages.map((stage, index) => (
                            <li
                                key={stage.label}
                                className="relative border-l-4 border-gold pl-4"
                            >
                                <p className="text-xs text-muted-foreground">
                                    Stage {index + 1}
                                </p>
                                <p className="mt-1 text-3xl font-bold tracking-tight text-primary tabular-nums">
                                    ₱{stage.amount.toLocaleString()}
                                </p>
                                <p className="mt-0.5 text-sm text-muted-foreground">
                                    {stage.label}
                                </p>
                            </li>
                        ))}
                    </ol>

                    <div className="mt-8 rounded-xl border bg-muted/40 p-6">
                        <h2 className="text-sm font-semibold text-foreground">
                            Applications
                        </h2>
                        <div className="mt-3 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
                            <p>
                                <span className="text-2xl font-bold text-foreground tabular-nums">
                                    {applicationStats.total}
                                </span>{' '}
                                <span className="text-muted-foreground">
                                    total
                                </span>
                            </p>
                            <p>
                                <span className="text-2xl font-bold text-success tabular-nums">
                                    {applicationStats.approved}
                                </span>{' '}
                                <span className="text-muted-foreground">
                                    approved
                                </span>
                            </p>
                            <p>
                                <span className="text-2xl font-bold text-warning tabular-nums">
                                    {applicationStats.pending}
                                </span>{' '}
                                <span className="text-muted-foreground">
                                    pending
                                </span>
                            </p>
                            <p>
                                <span className="text-2xl font-bold text-destructive tabular-nums">
                                    {applicationStats.rejected}
                                </span>{' '}
                                <span className="text-muted-foreground">
                                    rejected
                                </span>
                            </p>
                        </div>
                    </div>

                    <div className="mt-10 grid gap-10 lg:grid-cols-2">
                        <div>
                            <h2 className="text-lg font-semibold text-foreground">
                                Beneficiaries ({beneficiaries.length})
                            </h2>
                            {beneficiaries.length === 0 ? (
                                <p className="mt-3 text-sm text-muted-foreground">
                                    No beneficiaries yet.
                                </p>
                            ) : (
                                <ul className="mt-4 space-y-2">
                                    {beneficiaries.map((beneficiary) => (
                                        <li
                                            key={beneficiary.id}
                                            className="flex items-center justify-between rounded-lg border bg-card p-3 text-sm"
                                        >
                                            <Link
                                                href={`/athletes/${beneficiary.athlete_profile.user.username}`}
                                                className="font-medium text-foreground hover:text-primary"
                                            >
                                                {
                                                    beneficiary.athlete_profile
                                                        .user.name
                                                }
                                            </Link>
                                            <span className="font-semibold text-primary tabular-nums">
                                                ₱
                                                {beneficiary.awarded_amount.toLocaleString()}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold text-foreground">
                                Transaction ledger
                            </h2>
                            <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                                <ShieldCheck
                                    className="size-3.5"
                                    aria-hidden="true"
                                />
                                Source: official government submission ·
                                append-only ledger
                            </p>
                            {transactions.length === 0 ? (
                                <p className="mt-3 text-sm text-muted-foreground">
                                    No transactions recorded.
                                </p>
                            ) : (
                                <ul className="mt-4 space-y-2">
                                    {transactions.map((transaction) => (
                                        <li
                                            key={transaction.id}
                                            className="rounded-lg border bg-card p-3 text-sm"
                                        >
                                            <div className="flex items-center justify-between gap-2">
                                                <span className="font-mono text-xs text-muted-foreground">
                                                    {
                                                        transaction.reference_number
                                                    }
                                                </span>
                                                <span
                                                    className={`font-semibold tabular-nums ${
                                                        transaction.transaction_type ===
                                                        'allocation'
                                                            ? 'text-primary'
                                                            : 'text-foreground'
                                                    }`}
                                                >
                                                    ₱
                                                    {transaction.amount.toLocaleString()}
                                                </span>
                                            </div>
                                            <p className="mt-0.5 text-xs text-muted-foreground capitalize">
                                                {transaction.transaction_type}
                                                {transaction.athlete_profile
                                                    ? ` · ${transaction.athlete_profile.user.name}`
                                                    : ''}
                                                {transaction.transaction_date
                                                    ? ` · ${transaction.transaction_date}`
                                                    : ''}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
