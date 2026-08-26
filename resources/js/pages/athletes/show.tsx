import { Head } from '@inertiajs/react';
import { BadgeCheck, Clock, MapPin, Medal, Target } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PublicLayout } from '@/layouts/public-layout';

type AthleteSport = {
    id: number;
    level: { label?: string; value?: string } | string;
    is_primary: boolean;
    sport: { name: string };
};

type Achievement = {
    id: number;
    title: string;
    medal: string | null;
    event: string | null;
    year: number | null;
    location: string | null;
};

type Need = {
    id: number;
    category: string;
    title: string;
    description: string | null;
    target_amount: number | null;
};

export default function AthleteShow({
    athlete,
}: {
    athlete: {
        name: string;
        username: string | null;
        profile: {
            bio: string | null;
            city: string | null;
            province: string | null;
            region: string | null;
            current_goal: string | null;
            verification_status: string;
            sports: AthleteSport[];
            achievements: Achievement[];
            needs: Need[];
        };
    };
}) {
    const { profile } = athlete;
    const verified = profile.verification_status === 'verified';

    return (
        <PublicLayout>
            <Head title={`${athlete.name} — Athlete Profile`} />

            <section className="border-b bg-gradient-to-br from-primary to-primary-dark py-12 text-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <Badge className="gap-1 border-transparent bg-white/15 text-white">
                                {verified ? (
                                    <>
                                        <BadgeCheck
                                            className="size-3.5"
                                            aria-hidden="true"
                                        />
                                        Verified athlete
                                    </>
                                ) : (
                                    <>
                                        <Clock
                                            className="size-3.5"
                                            aria-hidden="true"
                                        />
                                        Verification pending
                                    </>
                                )}
                            </Badge>
                            <h1 className="mt-4 text-4xl font-semibold tracking-tight">
                                {athlete.name}
                            </h1>
                            <p className="mt-2 text-white/80">
                                {profile.sports
                                    .map((s) => s.sport.name)
                                    .join(' · ') || 'Athlete'}
                                {profile.city ? (
                                    <span className="inline-flex items-center gap-1">
                                        {' · '}
                                        <MapPin
                                            className="inline size-4"
                                            aria-hidden="true"
                                        />
                                        {profile.city}
                                        {profile.region
                                            ? `, ${profile.region}`
                                            : ''}
                                    </span>
                                ) : null}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12">
                <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[2fr_1fr] lg:px-8">
                    <div className="space-y-8">
                        {profile.bio ? (
                            <div>
                                <h2 className="text-lg font-semibold text-foreground">
                                    About
                                </h2>
                                <p className="mt-2 leading-relaxed text-muted-foreground">
                                    {profile.bio}
                                </p>
                            </div>
                        ) : null}

                        <div>
                            <h2 className="text-lg font-semibold text-foreground">
                                Achievements
                            </h2>
                            {profile.achievements.length === 0 ? (
                                <p className="mt-2 text-sm text-muted-foreground">
                                    No achievements listed yet.
                                </p>
                            ) : (
                                <ul className="mt-4 space-y-3">
                                    {profile.achievements.map((achievement) => (
                                        <li
                                            key={achievement.id}
                                            className="flex items-start gap-3 rounded-xl border bg-card p-4"
                                        >
                                            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold-foreground">
                                                <Medal
                                                    className="size-5"
                                                    aria-hidden="true"
                                                />
                                            </span>
                                            <div>
                                                <p className="font-medium text-foreground">
                                                    {achievement.title}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {achievement.medal
                                                        ? `${achievement.medal} · `
                                                        : ''}
                                                    {[
                                                        achievement.event,
                                                        achievement.year,
                                                        achievement.location,
                                                    ]
                                                        .filter(Boolean)
                                                        .join(' · ')}
                                                </p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">
                                    Sports
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                {profile.sports.length === 0 ? (
                                    <p className="text-sm text-muted-foreground">
                                        No sports listed.
                                    </p>
                                ) : (
                                    profile.sports.map((athleteSport) => (
                                        <div
                                            key={athleteSport.id}
                                            className="flex items-center justify-between text-sm"
                                        >
                                            <span className="font-medium text-foreground">
                                                {athleteSport.sport.name}
                                                {athleteSport.is_primary ? (
                                                    <Badge
                                                        variant="secondary"
                                                        className="ml-2"
                                                    >
                                                        Primary
                                                    </Badge>
                                                ) : null}
                                            </span>
                                            <span className="text-muted-foreground capitalize">
                                                {typeof athleteSport.level ===
                                                'object'
                                                    ? athleteSport.level?.label
                                                    : athleteSport.level}
                                            </span>
                                        </div>
                                    ))
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
                                    {profile.current_goal ??
                                        'No current goal listed.'}
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">
                                    Current needs
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {profile.needs.length === 0 ? (
                                    <p className="text-sm text-muted-foreground">
                                        No needs listed.
                                    </p>
                                ) : (
                                    profile.needs.map((need) => (
                                        <div key={need.id} className="text-sm">
                                            <p className="font-medium text-foreground">
                                                {need.title}
                                            </p>
                                            <p className="text-muted-foreground capitalize">
                                                {need.category}
                                                {need.target_amount
                                                    ? ` · ₱${need.target_amount.toLocaleString()}`
                                                    : ''}
                                            </p>
                                        </div>
                                    ))
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
