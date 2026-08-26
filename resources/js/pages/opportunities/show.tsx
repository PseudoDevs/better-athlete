import { Form, Head, Link } from '@inertiajs/react';
import { BadgeCheck, Calendar, MapPin } from 'lucide-react';

import ApplicationController from '@/actions/App/Http/Controllers/ApplicationController';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PublicLayout } from '@/layouts/public-layout';

type Opportunity = {
    id: number;
    title: string;
    slug: string;
    type: string;
    description: string;
    location: string | null;
    amount_min: number | null;
    amount_max: number | null;
    application_deadline: string | null;
    organization: {
        name: string;
        slug: string;
        verification_status: string;
        city: string | null;
    };
    sport: { name: string } | null;
};

export default function OpportunityShow({
    opportunity,
    hasApplied,
    canApply,
}: {
    opportunity: Opportunity;
    hasApplied: boolean;
    canApply: boolean;
}) {
    return (
        <PublicLayout>
            <Head title={`${opportunity.title} — Better Athlete.ph`} />

            <section className="border-b bg-muted/40 py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Badge variant="secondary" className="capitalize">
                        {opportunity.type}
                    </Badge>
                    <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                        {opportunity.title}
                    </h1>
                    <p className="mt-2 text-muted-foreground">
                        <Link
                            href={`/organizations/${opportunity.organization.slug}`}
                            className="inline-flex items-center gap-1.5 font-medium text-foreground hover:text-primary"
                        >
                            {opportunity.organization.name}
                            {opportunity.organization.verification_status ===
                            'verified' ? (
                                <BadgeCheck
                                    className="size-4 text-success"
                                    aria-hidden="true"
                                />
                            ) : null}
                        </Link>
                        {opportunity.location ? (
                            <span className="ml-3 inline-flex items-center gap-1">
                                <MapPin className="size-4" aria-hidden="true" />
                                {opportunity.location}
                            </span>
                        ) : null}
                        {opportunity.application_deadline ? (
                            <span className="ml-3 inline-flex items-center gap-1">
                                <Calendar
                                    className="size-4"
                                    aria-hidden="true"
                                />
                                Closes {opportunity.application_deadline}
                            </span>
                        ) : null}
                    </p>
                </div>
            </section>

            <section className="grid gap-8 py-12 lg:grid-cols-[2fr_1fr]">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2 className="text-lg font-semibold text-foreground">
                        About this opportunity
                    </h2>
                    <p className="mt-3 leading-relaxed whitespace-pre-line text-muted-foreground">
                        {opportunity.description}
                    </p>
                </div>

                <div className="mx-auto w-full max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">
                                Support details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                            {opportunity.amount_max ? (
                                <p>
                                    <span className="text-muted-foreground">
                                        Amount:{' '}
                                    </span>
                                    <span className="font-semibold text-foreground tabular-nums">
                                        {opportunity.amount_min
                                            ? `₱${opportunity.amount_min.toLocaleString()} – `
                                            : 'Up to '}
                                        ₱
                                        {opportunity.amount_max.toLocaleString()}
                                    </span>
                                </p>
                            ) : null}
                            {opportunity.sport ? (
                                <p>
                                    <span className="text-muted-foreground">
                                        Sport:{' '}
                                    </span>
                                    <span className="font-medium text-foreground">
                                        {opportunity.sport.name}
                                    </span>
                                </p>
                            ) : null}
                            <p>
                                <span className="text-muted-foreground">
                                    Deadline:{' '}
                                </span>
                                <span className="font-medium text-foreground">
                                    {opportunity.application_deadline ??
                                        'Rolling'}
                                </span>
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Apply</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {hasApplied ? (
                                <p className="rounded-lg bg-success/10 px-4 py-3 text-sm font-medium text-success">
                                    You have already applied to this
                                    opportunity.
                                </p>
                            ) : !canApply ? (
                                <p className="rounded-lg bg-muted px-4 py-3 text-sm text-muted-foreground">
                                    This opportunity is no longer accepting
                                    applications.
                                </p>
                            ) : (
                                <Form
                                    {...ApplicationController.store.form(
                                        opportunity.id,
                                    )}
                                    options={{ preserveScroll: true }}
                                    className="space-y-4"
                                >
                                    {({ processing, errors }) => (
                                        <>
                                            <div className="space-y-2">
                                                <Label htmlFor="statement">
                                                    Why do you need this
                                                    support?
                                                </Label>
                                                <Textarea
                                                    id="statement"
                                                    name="statement"
                                                    rows={5}
                                                    required
                                                    placeholder="Tell the organization about your situation and goals…"
                                                />
                                                {errors.statement ? (
                                                    <p className="text-sm text-destructive">
                                                        {errors.statement}
                                                    </p>
                                                ) : null}
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="requested_amount">
                                                    Requested amount (₱)
                                                </Label>
                                                <input
                                                    id="requested_amount"
                                                    name="requested_amount"
                                                    type="number"
                                                    min="0"
                                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                                    placeholder="50000"
                                                />
                                            </div>
                                            <Button
                                                type="submit"
                                                className="w-full"
                                                disabled={processing}
                                            >
                                                {processing
                                                    ? 'Submitting…'
                                                    : 'Submit application'}
                                            </Button>
                                        </>
                                    )}
                                </Form>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </section>
        </PublicLayout>
    );
}
