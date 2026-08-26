import { Head, Link } from '@inertiajs/react';
import type { LucideIcon } from 'lucide-react';
import {
    ArrowRight,
    Building2,
    Database,
    Dumbbell,
    GraduationCap,
    Landmark,
    MapPin,
    Megaphone,
    Medal,
    Plane,
    Search,
    ShieldCheck,
    Trophy,
    Users,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DotPattern } from '@/components/ui/dot-pattern';
import { Input } from '@/components/ui/input';
import { PublicLayout } from '@/layouts/public-layout';

const tickerStats = [
    { value: '₱420M', label: 'funding tracked' },
    { value: '42,481', label: 'athletes supported' },
    { value: '184', label: 'programs' },
    { value: '84', label: 'organizations' },
];

const popularSports = [
    'Swimming',
    'Basketball',
    'Athletics',
    'Boxing',
    'Volleyball',
    'Gymnastics',
];

const popularPrograms = [
    { label: 'Travel Grants', icon: Plane },
    { label: 'Equipment', icon: Dumbbell },
    { label: 'Scholarships', icon: GraduationCap },
    { label: 'Training Camps', icon: Medal },
];

type DirectoryCard = {
    title: string;
    icon: LucideIcon;
    links: { label: string; href: string }[];
    viewAllLabel: string;
    viewAllHref: string;
};

const directoryCards: DirectoryCard[] = [
    {
        title: 'Athletes by Sport',
        icon: Trophy,
        links: [
            { label: 'Swimming', href: '/athletes' },
            { label: 'Boxing', href: '/athletes' },
            { label: 'Athletics', href: '/athletes' },
        ],
        viewAllLabel: 'View all athletes',
        viewAllHref: '/athletes',
    },
    {
        title: 'Athletes by Region',
        icon: MapPin,
        links: [
            { label: 'National Capital Region', href: '/athletes' },
            { label: 'Region IV-A CALABARZON', href: '/athletes' },
            { label: 'Central Visayas', href: '/athletes' },
        ],
        viewAllLabel: 'View all regions',
        viewAllHref: '/athletes',
    },
    {
        title: 'Organizations',
        icon: Building2,
        links: [
            { label: 'Government agencies', href: '/organizations' },
            { label: 'LGU sports offices', href: '/organizations' },
            { label: 'Clubs and academies', href: '/organizations' },
        ],
        viewAllLabel: 'View all organizations',
        viewAllHref: '/organizations',
    },
    {
        title: 'Competitions',
        icon: Users,
        links: [
            { label: 'National competitions', href: '/competitions' },
            { label: 'International competitions', href: '/competitions' },
            { label: 'Local meets', href: '/competitions' },
        ],
        viewAllLabel: 'View all competitions',
        viewAllHref: '/competitions',
    },
];

const transparencyStats = [
    { value: '₱420M', label: 'Funding tracked' },
    { value: '184', label: 'Programs' },
    { value: '42,481', label: 'Athletes supported' },
    { value: '84', label: 'Organizations' },
];

const fundingStages = [
    { label: 'Allocated', amount: '₱50M' },
    { label: 'Committed', amount: '₱42M' },
    { label: 'Disbursed', amount: '₱38M' },
    { label: 'Confirmed received', amount: '₱37M' },
];

const communityPillars = [
    { icon: ShieldCheck, label: 'Verified profiles' },
    { icon: Landmark, label: 'Public funding trail' },
    { icon: Database, label: 'Open data' },
];

function SectionHeading({
    eyebrow,
    title,
    description,
}: {
    eyebrow: string;
    title: string;
    description?: string;
}) {
    return (
        <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-widest text-primary uppercase">
                {eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {title}
            </h2>
            {description ? (
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                    {description}
                </p>
            ) : null}
        </div>
    );
}

export default function Home() {
    return (
        <PublicLayout>
            <Head title="AthletePH — Every Filipino Athlete Deserves a Chance">
                <meta
                    name="description"
                    content="Discover Filipino athletes, find sports opportunities and assistance programs, and see how Philippine sports funding flows — transparently."
                />
            </Head>

            <section
                aria-label="Platform statistics"
                className="border-b bg-background"
            >
                <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-1 px-4 py-2.5 text-xs tabular-nums sm:px-6 sm:text-sm lg:px-8">
                    {tickerStats.map((stat) => (
                        <p key={stat.label} className="text-muted-foreground">
                            <span className="font-semibold text-primary">
                                {stat.value}
                            </span>{' '}
                            {stat.label}
                        </p>
                    ))}
                </div>
            </section>

            <div className="bg-gradient-to-r from-gold to-[#b83232] text-white">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-2 px-4 py-2.5 text-center text-sm sm:flex-row sm:gap-3 sm:px-6 lg:px-8">
                    <p className="inline-flex items-center gap-2">
                        <Megaphone
                            className="size-4 shrink-0"
                            aria-hidden="true"
                        />
                        AthletePH beta is live — create your athlete profile
                        today
                    </p>
                    <Link
                        href="/register"
                        className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-primary transition-colors hover:bg-white/90"
                    >
                        Join now
                    </Link>
                </div>
            </div>

            <section
                aria-labelledby="hero-heading"
                className="relative overflow-hidden bg-gradient-to-br from-primary to-primary-dark text-white"
            >
                <DotPattern
                    glow
                    width={20}
                    height={20}
                    cx={1}
                    cy={1}
                    cr={1.5}
                    className="[mask-image:radial-gradient(600px_circle_at_50%_30%,white,transparent)] fill-white/25"
                />
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute top-16 left-1/2 size-96 -translate-x-1/2 rounded-full bg-gold/15 blur-3xl"
                />
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute top-16 left-1/2 size-96 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
                />
                <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-20">
                    <div>
                        <Badge className="gap-1.5 border-transparent bg-white/10 text-white">
                            <Landmark className="size-3" aria-hidden="true" />
                            Philippine sports civic-tech platform
                        </Badge>
                        <h1
                            id="hero-heading"
                            className="mt-6 text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl"
                        >
                            Every Filipino athlete deserves a{' '}
                            <span className="relative inline-block whitespace-nowrap text-gold">
                                chance
                                <svg
                                    aria-hidden="true"
                                    viewBox="0 0 120 12"
                                    fill="none"
                                    preserveAspectRatio="none"
                                    className="absolute -bottom-2 left-0 h-3 w-full text-gold"
                                >
                                    <path
                                        d="M2 9C25 3 60 2 118 6"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </span>
                            .
                        </h1>
                        <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/80">
                            Discover athletes, find opportunities, and see how
                            Filipino sports are being supported.
                        </p>

                        <div
                            role="search"
                            aria-label="Search AthletePH"
                            className="mt-8 max-w-xl"
                        >
                            <div className="relative">
                                <Search
                                    aria-hidden="true"
                                    className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground"
                                />
                                <Input
                                    type="search"
                                    placeholder="Search athletes, sports, organizations…"
                                    aria-label="Search athletes, sports, organizations"
                                    className="h-14 rounded-full border-transparent bg-card pr-4 pl-12 text-base text-foreground shadow-lg"
                                />
                            </div>
                            <div className="mt-4 flex flex-wrap items-center gap-2">
                                <span className="text-sm text-white/70">
                                    Popular:
                                </span>
                                {popularSports.map((sport) => (
                                    <Link
                                        key={sport}
                                        href="/sports"
                                        className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-sm text-white transition-colors hover:bg-white/20"
                                    >
                                        {sport}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border bg-card p-6 shadow-xs">
                        <h2 className="text-lg font-semibold text-foreground">
                            Popular Programs
                        </h2>
                        <ul className="mt-4 grid grid-cols-2 gap-3">
                            {popularPrograms.map((program) => (
                                <li key={program.label}>
                                    <Link
                                        href="/opportunities"
                                        className="flex flex-col items-center gap-3 rounded-xl bg-muted/60 px-4 py-6 text-center transition-colors hover:bg-primary/10"
                                    >
                                        <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                                            <program.icon
                                                className="size-5"
                                                aria-hidden="true"
                                            />
                                        </span>
                                        <span className="text-sm font-medium text-foreground">
                                            {program.label}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <Button className="mt-4 w-full" asChild>
                            <Link href="/opportunities">View all programs</Link>
                        </Button>
                    </div>
                </div>
            </section>

            <section
                aria-labelledby="directory-heading"
                className="py-16 sm:py-20"
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <SectionHeading
                        eyebrow="Explore"
                        title="Find your corner of Philippine sports"
                        description="Browse verified athletes, organizations, and competitions across the country."
                    />

                    <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {directoryCards.map((card) => (
                            <li key={card.title}>
                                <article className="h-full rounded-xl border bg-card p-6 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                                    <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <card.icon
                                            className="size-5"
                                            aria-hidden="true"
                                        />
                                    </span>
                                    <h3 className="mt-4 font-semibold text-foreground">
                                        {card.title}
                                    </h3>
                                    <ul className="mt-3 space-y-2 text-sm">
                                        {card.links.map((link) => (
                                            <li key={link.label}>
                                                <Link
                                                    href={link.href}
                                                    className="text-muted-foreground transition-colors hover:text-primary"
                                                >
                                                    {link.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                    <Link
                                        href={card.viewAllHref}
                                        className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                                    >
                                        {card.viewAllLabel}
                                        <ArrowRight
                                            className="size-4"
                                            aria-hidden="true"
                                        />
                                    </Link>
                                </article>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-10 text-center">
                        <Button size="lg" asChild>
                            <Link href="/athletes">
                                Browse everything
                                <ArrowRight aria-hidden="true" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            <section
                aria-labelledby="transparency-heading"
                id="transparency"
                className="scroll-mt-20 border-y bg-muted/40 py-16 sm:py-20"
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl">
                        <p className="text-xs font-semibold tracking-widest text-primary uppercase">
                            Transparency
                        </p>
                        <h2
                            id="transparency-heading"
                            className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
                        >
                            See where Philippine sports funding goes
                        </h2>
                        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                            Allocated is not the same as disbursed. AthletePH
                            tracks every stage publicly, with sources attached
                            to each record.
                        </p>
                    </div>

                    <dl className="mt-12 grid grid-cols-2 gap-8 lg:grid-cols-4">
                        {transparencyStats.map((stat) => (
                            <div key={stat.label}>
                                <dd className="text-3xl font-bold tracking-tight text-primary tabular-nums sm:text-4xl">
                                    {stat.value}
                                </dd>
                                <dt className="mt-1.5 text-sm text-muted-foreground">
                                    {stat.label}
                                </dt>
                            </div>
                        ))}
                    </dl>

                    <div className="mt-12 rounded-xl border border-border bg-muted/50 p-6 sm:p-8">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <h3 className="text-sm font-medium text-muted-foreground">
                                Sample program:{' '}
                                <span className="font-semibold text-foreground">
                                    2026 Athlete Assistance Program
                                </span>{' '}
                                · Philippine Sports Commission
                            </h3>
                            <Badge
                                variant="outline"
                                className="gap-1 border-success/30 bg-success/10 text-success"
                            >
                                <ShieldCheck
                                    className="size-3.5"
                                    aria-hidden="true"
                                />
                                Verified government organization
                            </Badge>
                        </div>
                        <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {fundingStages.map((stage, index) => (
                                <li
                                    key={stage.label}
                                    className="relative border-l-2 border-gold/60 pl-4 lg:border-l-0 lg:pl-0"
                                >
                                    <span
                                        aria-hidden="true"
                                        className="absolute top-1.5 -left-[5px] size-2 rounded-full bg-gold lg:hidden"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Stage {index + 1}
                                    </p>
                                    <p className="mt-1 text-2xl font-bold tracking-tight text-foreground tabular-nums">
                                        {stage.amount}
                                    </p>
                                    <p className="mt-0.5 text-sm text-muted-foreground">
                                        {stage.label}
                                    </p>
                                </li>
                            ))}
                        </ol>
                        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
                            <p className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                                <Landmark
                                    className="size-4 shrink-0 text-primary"
                                    aria-hidden="true"
                                />
                                Source: Official government submission · Updated
                                August 2026
                            </p>
                            <Link
                                href="/transparency"
                                className="inline-flex items-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline"
                            >
                                Explore the transparency dashboard
                                <ArrowRight
                                    className="size-4"
                                    aria-hidden="true"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section
                aria-labelledby="community-heading"
                className="bg-background py-16 sm:py-20"
            >
                <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                    <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Users className="size-6" aria-hidden="true" />
                    </span>
                    <h2
                        id="community-heading"
                        className="mt-6 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl"
                    >
                        Support Filipino athletes today
                    </h2>
                    <p className="mt-3 text-sm font-medium text-primary">
                        Athlete-led. Verified. Transparent.
                    </p>
                    <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
                        Create your athlete profile, publish a program, or
                        follow the journeys of the country&apos;s rising stars.
                    </p>
                    <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <Button size="lg" className="w-full sm:w-auto" asChild>
                            <Link href="/register">Create your profile</Link>
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="w-full sm:w-auto"
                            asChild
                        >
                            <Link href="/organizations">Partner with us</Link>
                        </Button>
                    </div>
                    <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                        {communityPillars.map((pillar) => (
                            <li
                                key={pillar.label}
                                className="inline-flex items-center gap-1.5"
                            >
                                <pillar.icon
                                    className="size-4 text-primary"
                                    aria-hidden="true"
                                />
                                {pillar.label}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section aria-labelledby="campaign-heading">
                <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-gold px-6 py-8 text-[#3a2a08] sm:px-10 lg:flex-row lg:items-center">
                        <div>
                            <h2
                                id="campaign-heading"
                                className="text-2xl font-semibold tracking-tight"
                            >
                                Athlete Travel Grant
                            </h2>
                            <p className="mt-2 max-w-xl text-sm leading-relaxed opacity-80">
                                Up to ₱100,000 for international competition
                                travel, open to verified Filipino athletes.
                                Applications close September 30, 2026.
                            </p>
                        </div>
                        <Button
                            size="lg"
                            className="w-full shrink-0 bg-white text-gold-foreground hover:bg-white/90 lg:w-auto"
                            asChild
                        >
                            <Link href="/opportunities">Apply now</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
