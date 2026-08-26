import { Form, Head, Link } from '@inertiajs/react';
import { Building2, ClipboardList, Landmark, Plus } from 'lucide-react';

import FundingProgramController from '@/actions/App/Http/Controllers/FundingProgramController';
import GovernmentDashboardController from '@/actions/App/Http/Controllers/GovernmentDashboardController';
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

type Program = {
    id: number;
    title: string;
    slug: string;
    status: string;
    budget: number;
    applications_count: number;
};

type Entity = {
    id: number;
    name: string;
    slug: string;
    type: string;
    description: string | null;
    verification_status: string;
    funding_programs_count: number;
    applications_count: number;
    fundingProgramsList: Program[];
};

export default function GovernmentDashboard({
    entities,
}: {
    entities: Entity[];
}) {
    return (
        <>
            <Head title="Government Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {entities.length > 0 ? (
                    entities.map((entity) => (
                        <Card key={entity.id}>
                            <CardHeader>
                                <div className="flex flex-wrap items-center justify-between gap-3">
                                    <CardTitle className="flex items-center gap-2 text-base">
                                        <Landmark
                                            className="size-5 text-primary"
                                            aria-hidden="true"
                                        />
                                        {entity.name}
                                    </CardTitle>
                                    <Badge
                                        className={
                                            entity.verification_status ===
                                            'verified'
                                                ? 'border-transparent bg-success/10 text-success'
                                                : 'border-transparent bg-warning/10 text-warning'
                                        }
                                    >
                                        {entity.verification_status.replaceAll(
                                            '_',
                                            ' ',
                                        )}
                                    </Badge>
                                </div>
                                <CardDescription>
                                    {entity.funding_programs_count} programs ·{' '}
                                    {entity.applications_count} applications ·{' '}
                                    <a
                                        href={`/verification`}
                                        className="underline-offset-4 hover:underline"
                                    >
                                        {entity.verification_status ===
                                        'verified'
                                            ? 'Verified'
                                            : 'Submit verification documents'}
                                    </a>
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <h3 className="text-sm font-semibold text-foreground">
                                        Your funding programs
                                    </h3>
                                    {entity.fundingProgramsList.length === 0 ? (
                                        <p className="mt-2 text-sm text-muted-foreground">
                                            No programs yet. Create your first
                                            program below.
                                        </p>
                                    ) : (
                                        <ul className="mt-3 space-y-2">
                                            {entity.fundingProgramsList.map(
                                                (program) => (
                                                    <li
                                                        key={program.id}
                                                        className="flex flex-wrap items-center justify-between gap-2 rounded-lg border p-3"
                                                    >
                                                        <div>
                                                            <Link
                                                                href={`/transparency/${program.slug}`}
                                                                className="text-sm font-medium text-foreground hover:text-primary"
                                                            >
                                                                {program.title}
                                                            </Link>
                                                            <p className="text-xs text-muted-foreground">
                                                                ₱
                                                                {program.budget.toLocaleString()}{' '}
                                                                budget ·{' '}
                                                                {
                                                                    program.applications_count
                                                                }{' '}
                                                                applications
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Badge
                                                                variant="secondary"
                                                                className="capitalize"
                                                            >
                                                                {program.status}
                                                            </Badge>
                                                            {program.status ===
                                                            'draft' ? (
                                                                <Form
                                                                    {...FundingProgramController.publish.form(
                                                                        program.id,
                                                                    )}
                                                                    options={{
                                                                        preserveScroll: true,
                                                                    }}
                                                                >
                                                                    {({
                                                                        processing,
                                                                    }) => (
                                                                        <Button
                                                                            type="submit"
                                                                            size="sm"
                                                                            disabled={
                                                                                processing
                                                                            }
                                                                        >
                                                                            Publish
                                                                        </Button>
                                                                    )}
                                                                </Form>
                                                            ) : null}
                                                            {program.status ===
                                                            'published' ? (
                                                                <Form
                                                                    {...FundingProgramController.close.form(
                                                                        program.id,
                                                                    )}
                                                                    options={{
                                                                        preserveScroll: true,
                                                                    }}
                                                                >
                                                                    {({
                                                                        processing,
                                                                    }) => (
                                                                        <Button
                                                                            type="submit"
                                                                            size="sm"
                                                                            variant="outline"
                                                                            disabled={
                                                                                processing
                                                                            }
                                                                        >
                                                                            Close
                                                                        </Button>
                                                                    )}
                                                                </Form>
                                                            ) : null}
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                asChild
                                                            >
                                                                <Link
                                                                    href={`/government/programs/${program.id}`}
                                                                >
                                                                    Manage
                                                                </Link>
                                                            </Button>
                                                        </div>
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                    )}
                                </div>

                                <div>
                                    <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                                        <Plus
                                            className="size-4 text-primary"
                                            aria-hidden="true"
                                        />
                                        Create a funding program
                                    </h3>
                                    <Form
                                        {...FundingProgramController.store.form(
                                            entity.id,
                                        )}
                                        options={{ preserveScroll: true }}
                                        className="mt-3 grid max-w-2xl gap-3 sm:grid-cols-2"
                                    >
                                        {({ processing }) => (
                                            <>
                                                <div className="space-y-1.5 sm:col-span-2">
                                                    <Label
                                                        htmlFor={`prog-title-${entity.id}`}
                                                    >
                                                        Title
                                                    </Label>
                                                    <Input
                                                        id={`prog-title-${entity.id}`}
                                                        name="title"
                                                        placeholder="2026 Athlete Travel Assistance"
                                                        required
                                                    />
                                                </div>
                                                <div className="space-y-1.5 sm:col-span-2">
                                                    <Label
                                                        htmlFor={`prog-desc-${entity.id}`}
                                                    >
                                                        Description
                                                    </Label>
                                                    <Textarea
                                                        id={`prog-desc-${entity.id}`}
                                                        name="description"
                                                        rows={3}
                                                        required
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <Label
                                                        htmlFor={`prog-budget-${entity.id}`}
                                                    >
                                                        Budget (₱)
                                                    </Label>
                                                    <Input
                                                        id={`prog-budget-${entity.id}`}
                                                        name="budget"
                                                        type="number"
                                                        min="1000"
                                                        required
                                                        placeholder="5000000"
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <Label
                                                        htmlFor={`prog-deadline-${entity.id}`}
                                                    >
                                                        Application deadline
                                                    </Label>
                                                    <Input
                                                        id={`prog-deadline-${entity.id}`}
                                                        name="application_deadline"
                                                        type="date"
                                                    />
                                                </div>
                                                <div className="sm:col-span-2">
                                                    <Button
                                                        type="submit"
                                                        size="sm"
                                                        variant="outline"
                                                        disabled={processing}
                                                    >
                                                        Create program (draft)
                                                    </Button>
                                                </div>
                                            </>
                                        )}
                                    </Form>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-base">
                                <Building2
                                    className="size-5 text-primary"
                                    aria-hidden="true"
                                />
                                Register your government entity
                            </CardTitle>
                            <CardDescription>
                                Agencies, LGUs, and sports authorities can
                                publish funding programs for athletes after
                                verification.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form
                                {...GovernmentDashboardController.store.form()}
                                options={{ preserveScroll: true }}
                                className="grid max-w-2xl gap-4 sm:grid-cols-2"
                            >
                                {({ processing }) => (
                                    <>
                                        <div className="space-y-2 sm:col-span-2">
                                            <Label htmlFor="gov-name">
                                                Entity name
                                            </Label>
                                            <Input
                                                id="gov-name"
                                                name="name"
                                                placeholder="Quezon City Sports Development Office"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="gov-type">
                                                Type
                                            </Label>
                                            <select
                                                id="gov-type"
                                                name="type"
                                                defaultValue="agency"
                                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs"
                                            >
                                                <option value="agency">
                                                    Government Agency
                                                </option>
                                                <option value="lgu">
                                                    Local Government Unit
                                                </option>
                                                <option value="sports_authority">
                                                    Sports Authority
                                                </option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="gov-city">
                                                City
                                            </Label>
                                            <Input
                                                id="gov-city"
                                                name="city"
                                                placeholder="Quezon City"
                                            />
                                        </div>
                                        <div className="space-y-2 sm:col-span-2">
                                            <Label htmlFor="gov-description">
                                                Description
                                            </Label>
                                            <Textarea
                                                id="gov-description"
                                                name="description"
                                                rows={3}
                                            />
                                        </div>
                                        <div>
                                            <Button
                                                type="submit"
                                                disabled={processing}
                                            >
                                                {processing
                                                    ? 'Creating…'
                                                    : 'Register entity'}
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </Form>
                        </CardContent>
                    </Card>
                )}

                <Card>
                    <CardContent className="p-6">
                        <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                            <ClipboardList
                                className="size-4 text-primary"
                                aria-hidden="true"
                            />
                            How funding works
                        </h2>
                        <ol className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                            <li>
                                1. Publish a program — the budget is recorded as
                                an allocation.
                            </li>
                            <li>
                                2. Athletes apply — you review and approve with
                                an awarded amount.
                            </li>
                            <li>
                                3. Approval creates a commitment in the ledger.
                            </li>
                            <li>
                                4. Disbursements are recorded against committed
                                funds.
                            </li>
                            <li>
                                5. Everything is public on the transparency
                                dashboard.
                            </li>
                        </ol>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

GovernmentDashboard.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Government', href: '/government' },
    ],
};
