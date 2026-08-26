import { Form, Head } from '@inertiajs/react';
import { Building2, ClipboardList, Plus } from 'lucide-react';

import ApplicationController from '@/actions/App/Http/Controllers/ApplicationController';
import OpportunityManageController from '@/actions/App/Http/Controllers/OpportunityManageController';
import OrganizationDashboardController from '@/actions/App/Http/Controllers/OrganizationDashboardController';
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

type OrganizationApplication = {
    id: number;
    status: string;
    statement: string | null;
    requested_amount: number | null;
    athlete_profile: {
        user: { name: string };
        city: string | null;
    };
    opportunity: { title: string };
};

type Organization = {
    id: number;
    name: string;
    slug: string;
    type: string;
    description: string | null;
    city: string | null;
    verification_status: string;
    opportunities_count: number;
    pending_applications_count: number;
    applications?: OrganizationApplication[];
};

export default function OrganizationDashboard({
    organizations,
    canCreate,
}: {
    organizations: Organization[];
    canCreate: boolean;
}) {
    return (
        <>
            <Head title="My Organization" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {organizations.length > 0 ? (
                    organizations.map((organization) => (
                        <Card key={organization.id}>
                            <CardHeader>
                                <div className="flex flex-wrap items-center justify-between gap-3">
                                    <CardTitle className="flex items-center gap-2 text-base">
                                        <Building2
                                            className="size-5 text-primary"
                                            aria-hidden="true"
                                        />
                                        {organization.name}
                                    </CardTitle>
                                    <Badge
                                        className={
                                            organization.verification_status ===
                                            'verified'
                                                ? 'border-transparent bg-success/10 text-success'
                                                : ''
                                        }
                                    >
                                        {organization.verification_status.replaceAll(
                                            '_',
                                            ' ',
                                        )}
                                    </Badge>
                                </div>
                                <CardDescription>
                                    {organization.opportunities_count}{' '}
                                    opportunities ·{' '}
                                    {organization.pending_applications_count}{' '}
                                    pending applications ·{' '}
                                    <a
                                        href={`/organizations/${organization.slug}`}
                                        className="underline-offset-4 hover:underline"
                                    >
                                        View public page
                                    </a>
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <Form
                                    {...OrganizationDashboardController.update.form(
                                        organization.id,
                                    )}
                                    options={{ preserveScroll: true }}
                                    className="grid max-w-2xl gap-4 md:grid-cols-2"
                                >
                                    {({ processing }) => (
                                        <>
                                            <div className="space-y-2">
                                                <Label
                                                    htmlFor={`name-${organization.id}`}
                                                >
                                                    Name
                                                </Label>
                                                <Input
                                                    id={`name-${organization.id}`}
                                                    name="name"
                                                    defaultValue={
                                                        organization.name
                                                    }
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label
                                                    htmlFor={`type-${organization.id}`}
                                                >
                                                    Type
                                                </Label>
                                                <select
                                                    id={`type-${organization.id}`}
                                                    name="type"
                                                    defaultValue={
                                                        organization.type
                                                    }
                                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs"
                                                >
                                                    <option value="sports_organization">
                                                        Sports Organization
                                                    </option>
                                                    <option value="club">
                                                        Club
                                                    </option>
                                                    <option value="school">
                                                        School
                                                    </option>
                                                    <option value="university">
                                                        University
                                                    </option>
                                                    <option value="training_center">
                                                        Training Center
                                                    </option>
                                                    <option value="foundation">
                                                        Foundation
                                                    </option>
                                                    <option value="private_company">
                                                        Private Company
                                                    </option>
                                                </select>
                                            </div>
                                            <div className="space-y-2 md:col-span-2">
                                                <Label
                                                    htmlFor={`description-${organization.id}`}
                                                >
                                                    Description
                                                </Label>
                                                <Textarea
                                                    id={`description-${organization.id}`}
                                                    name="description"
                                                    defaultValue={
                                                        organization.description ??
                                                        ''
                                                    }
                                                    rows={3}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label
                                                    htmlFor={`city-${organization.id}`}
                                                >
                                                    City
                                                </Label>
                                                <Input
                                                    id={`city-${organization.id}`}
                                                    name="city"
                                                    defaultValue={
                                                        organization.city ?? ''
                                                    }
                                                />
                                            </div>
                                            <div className="flex items-end md:col-span-2">
                                                <Button
                                                    type="submit"
                                                    size="sm"
                                                    disabled={processing}
                                                >
                                                    {processing
                                                        ? 'Saving…'
                                                        : 'Save organization'}
                                                </Button>
                                            </div>
                                        </>
                                    )}
                                </Form>

                                <div>
                                    <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                                        <ClipboardList
                                            className="size-4 text-primary"
                                            aria-hidden="true"
                                        />
                                        Post a new opportunity
                                    </h3>
                                    <Form
                                        {...OpportunityManageController.store.form(
                                            organization.id,
                                        )}
                                        options={{ preserveScroll: true }}
                                        className="mt-3 grid max-w-2xl gap-3 sm:grid-cols-2"
                                    >
                                        {({ processing }) => (
                                            <>
                                                <div className="space-y-1.5 sm:col-span-2">
                                                    <Label
                                                        htmlFor={`opp-title-${organization.id}`}
                                                    >
                                                        Title
                                                    </Label>
                                                    <Input
                                                        id={`opp-title-${organization.id}`}
                                                        name="title"
                                                        placeholder="Athlete Travel Grant"
                                                        required
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <Label
                                                        htmlFor={`opp-type-${organization.id}`}
                                                    >
                                                        Type
                                                    </Label>
                                                    <select
                                                        id={`opp-type-${organization.id}`}
                                                        name="type"
                                                        defaultValue="grant"
                                                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs"
                                                    >
                                                        <option value="scholarship">
                                                            Scholarship
                                                        </option>
                                                        <option value="grant">
                                                            Grant
                                                        </option>
                                                        <option value="assistance">
                                                            Assistance
                                                        </option>
                                                        <option value="training">
                                                            Training
                                                        </option>
                                                        <option value="equipment">
                                                            Equipment
                                                        </option>
                                                        <option value="competition">
                                                            Competition
                                                        </option>
                                                        <option value="other">
                                                            Other
                                                        </option>
                                                    </select>
                                                </div>
                                                <div className="space-y-1.5">
                                                    <Label
                                                        htmlFor={`opp-deadline-${organization.id}`}
                                                    >
                                                        Application deadline
                                                    </Label>
                                                    <Input
                                                        id={`opp-deadline-${organization.id}`}
                                                        name="application_deadline"
                                                        type="date"
                                                    />
                                                </div>
                                                <div className="space-y-1.5 sm:col-span-2">
                                                    <Label
                                                        htmlFor={`opp-desc-${organization.id}`}
                                                    >
                                                        Description
                                                    </Label>
                                                    <Textarea
                                                        id={`opp-desc-${organization.id}`}
                                                        name="description"
                                                        rows={3}
                                                        required
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <Label
                                                        htmlFor={`opp-min-${organization.id}`}
                                                    >
                                                        Min amount (₱)
                                                    </Label>
                                                    <Input
                                                        id={`opp-min-${organization.id}`}
                                                        name="amount_min"
                                                        type="number"
                                                        min="0"
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <Label
                                                        htmlFor={`opp-max-${organization.id}`}
                                                    >
                                                        Max amount (₱)
                                                    </Label>
                                                    <Input
                                                        id={`opp-max-${organization.id}`}
                                                        name="amount_max"
                                                        type="number"
                                                        min="0"
                                                    />
                                                </div>
                                                <div className="sm:col-span-2">
                                                    <Button
                                                        type="submit"
                                                        size="sm"
                                                        variant="outline"
                                                        disabled={processing}
                                                    >
                                                        <Plus
                                                            className="size-4"
                                                            aria-hidden="true"
                                                        />
                                                        Create opportunity
                                                        (draft)
                                                    </Button>
                                                </div>
                                            </>
                                        )}
                                    </Form>

                                    <div className="mt-6">
                                        <h3 className="text-sm font-semibold text-foreground">
                                            Applications to review
                                        </h3>
                                        {(organization.applications ?? [])
                                            .length === 0 ? (
                                            <p className="mt-2 text-sm text-muted-foreground">
                                                No pending applications.
                                            </p>
                                        ) : (
                                            <ul className="mt-3 space-y-4">
                                                {(organization.applications ?? []).map((application) => (
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
                                                                                .user
                                                                                .name
                                                                        }{' '}
                                                                        ·{' '}
                                                                        <span className="font-normal text-muted-foreground">
                                                                            {
                                                                                application
                                                                                    .opportunity
                                                                                    .title
                                                                            }
                                                                        </span>
                                                                    </p>
                                                                    <p className="text-xs text-muted-foreground">
                                                                        Requesting{' '}
                                                                        {application.requested_amount
                                                                            ? `₱${application.requested_amount.toLocaleString()}`
                                                                            : 'unspecified amount'}
                                                                    </p>
                                                                </div>
                                                                <Badge
                                                                    variant="secondary"
                                                                    className="capitalize"
                                                                >
                                                                    {application.status.replaceAll(
                                                                        '_',
                                                                        ' ',
                                                                    )}
                                                                </Badge>
                                                            </div>
                                                            {application.statement ? (
                                                                <p className="mt-2 rounded-md bg-muted px-3 py-2 text-sm text-muted-foreground">
                                                                    “
                                                                    {
                                                                        application.statement
                                                                    }
                                                                    ”
                                                                </p>
                                                            ) : null}
                                                            <Form
                                                                {...ApplicationController.review.form(
                                                                    application.id,
                                                                )}
                                                                options={{
                                                                    preserveScroll: true,
                                                                }}
                                                                className="mt-3 flex flex-wrap items-end gap-2"
                                                            >
                                                                {({
                                                                    processing,
                                                                }) => (
                                                                    <>
                                                                        <input
                                                                            type="hidden"
                                                                            name="notes"
                                                                            value=""
                                                                        />
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
                                                                            Request
                                                                            info
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
                                                                    </>
                                                                )}
                                                            </Form>
                                                        </li>
                                                    ),
                                                )}
                                            </ul>
                                        )}
                                    </div>

                                    <div className="mt-6">
                                        <h3 className="text-sm font-semibold text-foreground">
                                            Post a new opportunity
                                        </h3>
                                        <ul className="mt-3 space-y-2">
                                            {organization.opportunities_count ===
                                            0 ? (
                                                <li className="text-sm text-muted-foreground">
                                                    No opportunities yet.
                                                </li>
                                            ) : null}
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <Card>
                        <CardHeader>
                            <CardTitle>Create your organization</CardTitle>
                            <CardDescription>
                                Set up your organization profile to post
                                opportunities for athletes.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {canCreate ? (
                                <Form
                                    {...OrganizationDashboardController.store.form()}
                                    options={{ preserveScroll: true }}
                                    className="grid max-w-2xl gap-4 sm:grid-cols-2"
                                >
                                    {({ processing }) => (
                                        <>
                                            <div className="space-y-2 sm:col-span-2">
                                                <Label htmlFor="org-name">
                                                    Organization name
                                                </Label>
                                                <Input
                                                    id="org-name"
                                                    name="name"
                                                    placeholder="Quezon City Sports Club"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="org-type">
                                                    Type
                                                </Label>
                                                <select
                                                    id="org-type"
                                                    name="type"
                                                    defaultValue="sports_organization"
                                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs"
                                                >
                                                    <option value="sports_organization">
                                                        Sports Organization
                                                    </option>
                                                    <option value="club">
                                                        Club
                                                    </option>
                                                    <option value="school">
                                                        School
                                                    </option>
                                                    <option value="university">
                                                        University
                                                    </option>
                                                    <option value="training_center">
                                                        Training Center
                                                    </option>
                                                    <option value="foundation">
                                                        Foundation
                                                    </option>
                                                    <option value="private_company">
                                                        Private Company
                                                    </option>
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="org-city">
                                                    City
                                                </Label>
                                                <Input
                                                    id="org-city"
                                                    name="city"
                                                    placeholder="Quezon City"
                                                />
                                            </div>
                                            <div className="space-y-2 sm:col-span-2">
                                                <Label htmlFor="org-description">
                                                    Description
                                                </Label>
                                                <Textarea
                                                    id="org-description"
                                                    name="description"
                                                    rows={3}
                                                    placeholder="What does your organization do?"
                                                />
                                            </div>
                                            <div>
                                                <Button
                                                    type="submit"
                                                    disabled={processing}
                                                >
                                                    {processing
                                                        ? 'Creating…'
                                                        : 'Create organization'}
                                                </Button>
                                            </div>
                                        </>
                                    )}
                                </Form>
                            ) : (
                                <p className="text-sm text-muted-foreground">
                                    You cannot create an organization with your
                                    current role.
                                </p>
                            )}
                        </CardContent>
                    </Card>
                )}
            </div>
        </>
    );
}

OrganizationDashboard.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'My Organization', href: '/organization' },
    ],
};
