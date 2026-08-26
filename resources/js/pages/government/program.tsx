import { Form, Head, Link } from '@inertiajs/react';
import { ArrowLeft, Landmark, SendHorizonal } from 'lucide-react';

import FundingProgramController from '@/actions/App/Http/Controllers/FundingProgramController';
import FundingReviewController from '@/actions/App/Http/Controllers/FundingReviewController';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type Application = {
    id: number;
    status: string;
    statement: string | null;
    requested_amount: number | null;
    athlete_profile: { user: { name: string; username: string | null } };
};

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

export default function GovernmentProgram({
    program,
    applications,
    transactions,
    totals,
    beneficiaries,
}: {
    program: {
        id: number;
        title: string;
        slug: string;
        status: string;
        budget: number;
        description: string;
        application_deadline: string | null;
        government_entity: { name: string };
    };
    applications: Application[];
    transactions: Transaction[];
    totals: {
        allocated: number;
        committed: number;
        disbursed: number;
        remaining: number;
        undisbursed: number;
    };
    beneficiaries: {
        id: number;
        awarded_amount: number;
        athlete_profile: { user: { name: string } };
    }[];
}) {
    return (
        <>
            <Head title={`${program.title} — Manage`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h1 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                            <Landmark
                                className="size-5 text-primary"
                                aria-hidden="true"
                            />
                            {program.title}
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            {program.government_entity.name} · Deadline:{' '}
                            {program.application_deadline ?? 'Rolling'}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="capitalize">
                            {program.status}
                        </Badge>
                        {program.status === 'draft' ? (
                            <Form
                                {...FundingProgramController.publish.form(
                                    program.id,
                                )}
                            >
                                {({ processing }) => (
                                    <Button
                                        type="submit"
                                        size="sm"
                                        disabled={processing}
                                    >
                                        <SendHorizonal
                                            className="size-4"
                                            aria-hidden="true"
                                        />
                                        Publish (records allocation)
                                    </Button>
                                )}
                            </Form>
                        ) : null}
                        {program.status === 'published' ? (
                            <Form
                                {...FundingProgramController.close.form(
                                    program.id,
                                )}
                            >
                                {({ processing }) => (
                                    <Button
                                        type="submit"
                                        size="sm"
                                        variant="outline"
                                        disabled={processing}
                                    >
                                        Close applications
                                    </Button>
                                )}
                            </Form>
                        ) : null}
                        <Button size="sm" variant="ghost" asChild>
                            <Link href="/transparency">
                                <ArrowLeft
                                    className="size-4"
                                    aria-hidden="true"
                                />
                                Public page
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-5">
                    {[
                        { label: 'Allocated', value: totals.allocated },
                        { label: 'Committed', value: totals.committed },
                        { label: 'Disbursed', value: totals.disbursed },
                        {
                            label: 'Remaining to commit',
                            value: totals.remaining,
                        },
                        { label: 'Undisbursed', value: totals.undisbursed },
                    ].map((stat) => (
                        <Card key={stat.label}>
                            <CardContent className="p-4">
                                <p className="text-xs text-muted-foreground">
                                    {stat.label}
                                </p>
                                <p className="mt-1 text-xl font-bold text-primary tabular-nums">
                                    ₱{stat.value.toLocaleString()}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">
                            Record a ledger transaction
                        </CardTitle>
                        <CardDescription>
                            Commitments reserve funds for an athlete.
                            Disbursements release committed funds. Entries are
                            immutable once recorded.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form
                            {...FundingProgramController.recordTransaction.form(
                                program.id,
                            )}
                            options={{ preserveScroll: true }}
                            className="grid max-w-2xl gap-3 sm:grid-cols-2"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="transaction_type">
                                            Type
                                        </Label>
                                        <select
                                            id="transaction_type"
                                            name="transaction_type"
                                            defaultValue="disbursement"
                                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs"
                                        >
                                            <option value="commitment">
                                                Commitment
                                            </option>
                                            <option value="disbursement">
                                                Disbursement
                                            </option>
                                            <option value="refund">
                                                Refund
                                            </option>
                                            <option value="adjustment">
                                                Adjustment
                                            </option>
                                        </select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="amount">
                                            Amount (₱)
                                        </Label>
                                        <Input
                                            id="amount"
                                            name="amount"
                                            type="number"
                                            min="1"
                                            required
                                        />
                                        {errors.amount ? (
                                            <p className="text-xs text-destructive">
                                                {errors.amount}
                                            </p>
                                        ) : null}
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="athlete_profile_id">
                                            Athlete profile ID
                                        </Label>
                                        <Input
                                            id="athlete_profile_id"
                                            name="athlete_profile_id"
                                            type="number"
                                            placeholder="Optional"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="description">
                                            Description
                                        </Label>
                                        <Input
                                            id="description"
                                            name="description"
                                        />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <Button
                                            type="submit"
                                            size="sm"
                                            disabled={processing}
                                        >
                                            Record transaction
                                        </Button>
                                    </div>
                                </>
                            )}
                        </Form>
                    </CardContent>
                </Card>

                <div className="grid gap-4 lg:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">
                                Applications ({applications.length})
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {applications.length === 0 ? (
                                <p className="py-4 text-center text-sm text-muted-foreground">
                                    No applications yet.
                                </p>
                            ) : (
                                <ul className="space-y-4">
                                    {applications.map((application) => (
                                        <li
                                            key={application.id}
                                            className="rounded-lg border p-4"
                                        >
                                            <div className="flex flex-wrap items-center justify-between gap-2">
                                                <div>
                                                    <p className="text-sm font-medium text-foreground">
                                                        {
                                                            application
                                                                .athlete_profile
                                                                .user.name
                                                        }
                                                        <span className="ml-2 text-xs font-normal text-muted-foreground">
                                                            Requesting{' '}
                                                            {application.requested_amount
                                                                ? `₱${application.requested_amount.toLocaleString()}`
                                                                : '—'}
                                                        </span>
                                                    </p>
                                                    <Badge
                                                        variant="secondary"
                                                        className="mt-1 capitalize"
                                                    >
                                                        {application.status.replaceAll(
                                                            '_',
                                                            ' ',
                                                        )}
                                                    </Badge>
                                                </div>
                                            </div>
                                            {application.statement ? (
                                                <p className="mt-2 rounded-md bg-muted px-3 py-2 text-xs text-muted-foreground">
                                                    “{application.statement}”
                                                </p>
                                            ) : null}
                                            {application.status ===
                                                'submitted' ||
                                            application.status ===
                                                'under_review' ? (
                                                <Form
                                                    {...FundingReviewController.review.form(
                                                        application.id,
                                                    )}
                                                    options={{
                                                        preserveScroll: true,
                                                    }}
                                                    className="mt-3 space-y-2"
                                                >
                                                    {({ processing }) => (
                                                        <>
                                                            <Input
                                                                name="awarded_amount"
                                                                type="number"
                                                                min="1"
                                                                placeholder={`Awarded amount (default ₱${(application.requested_amount ?? 0).toLocaleString()})`}
                                                            />
                                                            <div className="flex gap-2">
                                                                <Button
                                                                    type="submit"
                                                                    name="action"
                                                                    value="approve"
                                                                    size="sm"
                                                                    disabled={
                                                                        processing
                                                                    }
                                                                >
                                                                    Approve
                                                                </Button>
                                                                <Button
                                                                    type="submit"
                                                                    name="action"
                                                                    value="request_information"
                                                                    size="sm"
                                                                    variant="outline"
                                                                    disabled={
                                                                        processing
                                                                    }
                                                                >
                                                                    Request info
                                                                </Button>
                                                                <Button
                                                                    type="submit"
                                                                    name="action"
                                                                    value="reject"
                                                                    size="sm"
                                                                    variant="outline"
                                                                    className="text-destructive"
                                                                    disabled={
                                                                        processing
                                                                    }
                                                                >
                                                                    Reject
                                                                </Button>
                                                            </div>
                                                        </>
                                                    )}
                                                </Form>
                                            ) : null}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </CardContent>
                    </Card>

                    <div className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">
                                    Beneficiaries ({beneficiaries.length})
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {beneficiaries.length === 0 ? (
                                    <p className="text-sm text-muted-foreground">
                                        None yet.
                                    </p>
                                ) : (
                                    <ul className="space-y-2">
                                        {beneficiaries.map((beneficiary) => (
                                            <li
                                                key={beneficiary.id}
                                                className="flex items-center justify-between text-sm"
                                            >
                                                <span className="text-foreground">
                                                    {
                                                        beneficiary
                                                            .athlete_profile
                                                            .user.name
                                                    }
                                                </span>
                                                <span className="font-semibold text-primary tabular-nums">
                                                    ₱
                                                    {beneficiary.awarded_amount.toLocaleString()}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">
                                    Ledger ({transactions.length})
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="max-h-96 space-y-2 overflow-y-auto">
                                    {transactions.map((transaction) => (
                                        <li
                                            key={transaction.id}
                                            className="rounded-lg border p-3 text-sm"
                                        >
                                            <div className="flex items-center justify-between gap-2">
                                                <span className="font-mono text-xs text-muted-foreground">
                                                    {
                                                        transaction.reference_number
                                                    }
                                                </span>
                                                <span className="font-semibold text-foreground tabular-nums">
                                                    ₱
                                                    {transaction.amount.toLocaleString()}
                                                </span>
                                            </div>
                                            <p className="mt-0.5 text-xs text-muted-foreground capitalize">
                                                {transaction.transaction_type}
                                                {transaction.athlete_profile
                                                    ? ` · ${transaction.athlete_profile.user.name}`
                                                    : ''}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}

GovernmentProgram.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Government', href: '/government' },
        { title: 'Program', href: '/government' },
    ],
};
