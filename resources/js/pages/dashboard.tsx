import { Head, Link } from '@inertiajs/react';
import {
    ArrowRight,
    BadgeCheck,
    ClipboardList,
    Clock,
    ShieldCheck,
    Target,
    Trophy,
    UserRound,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { dashboard } from '@/routes';

type Application = {
    id: number;
    status: { label?: string } | string;
    submitted_at: string | null;
    opportunity: {
        title: string;
        slug: string;
        organization: { name: string };
    };
};

export default function Dashboard({
    profile,
    applications,
    isVerified,
    verificationStatus,
    organization,
}: {
    profile: {
        bio: string | null;
        city: string | null;
        region: string | null;
        current_goal: string | null;
        sports: { id: number; is_primary: boolean; sport: { name: string } }[];
        achievements: unknown[];
        needs: { id: number; title: string; category: string }[];
    } | null;
    applications: Application[];
    verification: { id: number; status: string; type: string } | null;
    isVerified: boolean;
    verificationStatus: { label?: string } | string;
    organization: {
        id: number;
        name: string;
        opportunities_count: number;
        pending_applications_count: number;
    } | null;
}) {
    const statusLabel =
        typeof verificationStatus === 'object'
            ? verificationStatus?.label
            : verificationStatus;

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardDescription>Verification</CardDescription>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                {isVerified ? (
                                    <>
                                        <BadgeCheck
                                            className="size-5 text-success"
                                            aria-hidden="true"
                                        />
                                        Verified
                                    </>
                                ) : (
                                    <>
                                        <Clock
                                            className="size-5 text-warning"
                                            aria-hidden="true"
                                        />
                                        {statusLabel ?? 'Unverified'}
                                    </>
                                )}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {!isVerified ? (
                                <Button size="sm" variant="outline" asChild>
                                    <Link href="/verification">
                                        Get verified
                                    </Link>
                                </Button>
                            ) : (
                                <p className="text-sm text-muted-foreground">
                                    Your athlete profile is verified.
                                </p>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardDescription>Applications</CardDescription>
                            <CardTitle className="text-lg">
                                {applications.length} recent
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Button size="sm" variant="outline" asChild>
                                <Link href="/applications">View all</Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardDescription>Profile</CardDescription>
                            <CardTitle className="text-lg">
                                {profile
                                    ? `${profile.achievements.length} achievements · ${profile.needs.length} needs`
                                    : 'Not created'}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Button size="sm" variant="outline" asChild>
                                <Link href="/profile/athlete">
                                    <UserRound
                                        className="size-4"
                                        aria-hidden="true"
                                    />
                                    Edit profile
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-base">
                                <ClipboardList
                                    className="size-4 text-primary"
                                    aria-hidden="true"
                                />
                                Recent applications
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {applications.length === 0 ? (
                                <div className="py-6 text-center">
                                    <p className="text-sm text-muted-foreground">
                                        No applications yet.
                                    </p>
                                    <Button size="sm" className="mt-3" asChild>
                                        <Link href="/opportunities">
                                            Browse opportunities
                                            <ArrowRight
                                                className="size-4"
                                                aria-hidden="true"
                                            />
                                        </Link>
                                    </Button>
                                </div>
                            ) : (
                                <ul className="space-y-3">
                                    {applications.map((application) => (
                                        <li
                                            key={application.id}
                                            className="flex items-center justify-between gap-3 rounded-lg border p-3"
                                        >
                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-medium text-foreground">
                                                    {
                                                        application.opportunity
                                                            .title
                                                    }
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {
                                                        application.opportunity
                                                            .organization.name
                                                    }
                                                </p>
                                            </div>
                                            <Badge
                                                variant="secondary"
                                                className="shrink-0 capitalize"
                                            >
                                                {typeof application.status ===
                                                'object'
                                                    ? application.status?.label
                                                    : String(
                                                          application.status,
                                                      ).replaceAll('_', ' ')}
                                            </Badge>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </CardContent>
                    </Card>

                    <div className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-base">
                                    <Trophy
                                        className="size-4 text-primary"
                                        aria-hidden="true"
                                    />
                                    My sports
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {profile && profile.sports.length > 0 ? (
                                    <div className="flex flex-wrap gap-2">
                                        {profile.sports.map((athleteSport) => (
                                            <Badge
                                                key={athleteSport.id}
                                                variant="secondary"
                                            >
                                                {athleteSport.sport.name}
                                                {athleteSport.is_primary
                                                    ? ' ★'
                                                    : ''}
                                            </Badge>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-muted-foreground">
                                        Add your sports in your profile.
                                    </p>
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-base">
                                    <Target
                                        className="size-4 text-primary"
                                        aria-hidden="true"
                                    />
                                    Current goal
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    {profile?.current_goal ??
                                        'Set your current goal in your profile.'}
                                </p>
                            </CardContent>
                        </Card>

                        {organization ? (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-base">
                                        <ShieldCheck
                                            className="size-4 text-primary"
                                            aria-hidden="true"
                                        />
                                        {organization.name}
                                    </CardTitle>
                                    <CardDescription>
                                        {organization.opportunities_count}{' '}
                                        opportunities ·{' '}
                                        {
                                            organization.pending_applications_count
                                        }{' '}
                                        pending applications
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Button size="sm" variant="outline" asChild>
                                        <Link href="/organization">
                                            Manage organization
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        ) : null}
                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
