import { Link, usePage } from '@inertiajs/react';
import { Globe, Menu, Search } from 'lucide-react';
import type { ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { dashboard, home, login, register } from '@/routes';

const navItems = [
    { label: 'Athletes', href: '/athletes' },
    { label: 'Sports', href: '/sports' },
    { label: 'Opportunities', href: '/opportunities' },
    { label: 'Organizations', href: '/organizations' },
    { label: 'Transparency', href: '/transparency' },
];

const footerSections = [
    {
        title: 'Explore',
        links: [
            { label: 'Athletes', href: '/athletes' },
            { label: 'Sports', href: '/sports' },
            { label: 'Opportunities', href: '/opportunities' },
            { label: 'Organizations', href: '/organizations' },
            { label: 'Transparency', href: '/transparency' },
        ],
    },
    {
        title: 'For Organizations',
        links: [
            { label: 'Government Agencies', href: '/organizations' },
            { label: 'LGUs', href: '/organizations' },
            { label: 'Sponsors', href: '/organizations' },
            { label: 'Foundations', href: '/organizations' },
        ],
    },
    {
        title: 'About',
        links: [
            { label: 'About AthletePH', href: '/about' },
            { label: 'How It Works', href: '/how-it-works' },
            { label: 'Contact', href: '/contact' },
            { label: 'Accessibility', href: '/accessibility' },
        ],
    },
    {
        title: 'Data',
        links: [
            { label: 'Sources', href: '/transparency' },
            { label: 'Methodology', href: '/about' },
            { label: 'Privacy', href: '/privacy' },
            { label: 'Terms', href: '/terms' },
        ],
    },
];

export function PublicLayout({ children }: { children: ReactNode }) {
    const { auth } = usePage().props;

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <div className="hidden bg-muted/70 sm:block">
                <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4 text-xs sm:px-6 lg:px-8">
                    <nav
                        aria-label="Secondary navigation"
                        className="flex items-center gap-4"
                    >
                        <Link
                            href="/about"
                            className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                            About
                        </Link>
                        <Link
                            href="/how-it-works"
                            className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                            How It Works
                        </Link>
                        <Link
                            href="/contact"
                            className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                            Contact
                        </Link>
                    </nav>
                    <label className="flex items-center gap-1.5 text-muted-foreground">
                        <Globe className="size-3.5" aria-hidden="true" />
                        <span className="sr-only">Language</span>
                        <select
                            aria-label="Select language"
                            defaultValue="en"
                            className="bg-transparent text-xs font-medium text-foreground focus:outline-none"
                        >
                            <option value="en">English</option>
                            <option value="fil">Filipino</option>
                        </select>
                    </label>
                </div>
            </div>

            <header className="sticky top-0 z-40 w-full border-b bg-white">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
                    <Link
                        href={home()}
                        className="flex items-center rounded-md focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
                    >
                        <img
                            src="/assets/better-athlete.webp"
                            alt="Better Athlete.ph"
                            className="h-14 w-auto object-contain"
                        />
                    </Link>

                    <nav
                        aria-label="Main navigation"
                        className="hidden items-center gap-1 lg:flex"
                    >
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="hidden items-center gap-2 lg:flex">
                        <Button variant="ghost" size="icon" asChild>
                            <Link href="/search" aria-label="Search AthletePH">
                                <Search aria-hidden="true" />
                            </Link>
                        </Button>
                        {auth.user ? (
                            <Button variant="outline" asChild>
                                <Link href={dashboard()}>Dashboard</Link>
                            </Button>
                        ) : (
                            <>
                                <Button variant="ghost" asChild>
                                    <Link href={login()}>Sign in</Link>
                                </Button>
                                <Button asChild>
                                    <Link href={register()}>
                                        I&apos;m an athlete
                                    </Link>
                                </Button>
                            </>
                        )}
                    </div>

                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="lg:hidden"
                                aria-label="Open menu"
                            >
                                <Menu aria-hidden="true" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-80">
                            <SheetHeader>
                                <SheetTitle>
                                    <img
                                        src="/assets/better-athlete.webp"
                                        alt="Better Athlete.ph"
                                        className="h-12 w-auto object-contain"
                                    />
                                </SheetTitle>
                                <SheetDescription>
                                    Every Filipino athlete deserves a chance.
                                </SheetDescription>
                            </SheetHeader>
                            <nav
                                aria-label="Mobile navigation"
                                className="flex flex-col gap-1 px-4"
                            >
                                {navItems.map((item) => (
                                    <SheetClose key={item.label} asChild>
                                        <Link
                                            href={item.href}
                                            className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                                        >
                                            {item.label}
                                        </Link>
                                    </SheetClose>
                                ))}
                            </nav>
                            <div className="mt-auto flex flex-col gap-2 p-4">
                                {auth.user ? (
                                    <SheetClose asChild>
                                        <Button variant="outline" asChild>
                                            <Link href={dashboard()}>
                                                Dashboard
                                            </Link>
                                        </Button>
                                    </SheetClose>
                                ) : (
                                    <>
                                        <SheetClose asChild>
                                            <Button
                                                variant="outline"
                                                className="w-full"
                                                asChild
                                            >
                                                <Link href={login()}>
                                                    Sign in
                                                </Link>
                                            </Button>
                                        </SheetClose>
                                        <SheetClose asChild>
                                            <Button className="w-full" asChild>
                                                <Link href={register()}>
                                                    I&apos;m an athlete
                                                </Link>
                                            </Button>
                                        </SheetClose>
                                    </>
                                )}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </header>

            <main className="flex-1">{children}</main>

            <footer className="bg-[#1a1a1a] text-white">
                <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
                    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
                        <div>
                            <span className="inline-block rounded-lg bg-white px-3 py-2">
                                <img
                                    src="/assets/better-athlete.webp"
                                    alt="Better Athlete.ph"
                                    className="h-14 w-auto object-contain"
                                />
                            </span>
                            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
                                The transparent digital infrastructure
                                connecting Filipino athletes with the people and
                                organizations that support them.
                            </p>
                        </div>
                        {footerSections.map((section) => (
                            <nav key={section.title} aria-label={section.title}>
                                <h3 className="text-sm font-semibold text-white">
                                    {section.title}
                                </h3>
                                <ul className="mt-4 space-y-2.5">
                                    {section.links.map((link) => (
                                        <li key={link.label}>
                                            <Link
                                                href={link.href}
                                                className="text-sm text-white/60 transition-colors hover:text-white"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        ))}
                    </div>
                    <div className="mt-12 flex justify-center">
                        <p className="rounded-full bg-white/10 px-5 py-2.5 text-center text-xs text-white/80 sm:text-sm">
                            Cost to build Better Athlete.ph to date:{' '}
                            <span className="font-semibold text-white">₱0</span>
                            <span
                                className="mx-1.5 text-white/40"
                                aria-hidden="true"
                            >
                                ·
                            </span>
                            Athlete funding tracked:{' '}
                            <span className="font-semibold text-gold">
                                ₱420M
                            </span>
                        </p>
                    </div>
                    <div className="mt-12 border-t border-white/10 pt-6">
                        <p className="text-xs leading-relaxed text-white/40">
                            Data shown on Better Athlete.ph may be sourced from
                            official government records, participating
                            organizations, athletes, or public datasets. Verify
                            official documents and current program rules with
                            the responsible organization.
                        </p>
                        <div className="mt-3 flex flex-col gap-1 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
                            <p>
                                © 2026 Better Athlete.ph · A civic-tech
                                platform, not an official government website.
                            </p>
                            <p>
                                v0.1.0 · Public funding data republished from
                                official sources
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
