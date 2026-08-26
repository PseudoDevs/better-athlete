import { Head, Link } from '@inertiajs/react';
import { Building2, Search, Trophy, Users } from 'lucide-react';

import { BadgeCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { PublicLayout } from '@/layouts/public-layout';

type Athlete = {
    id: number;
    user: { name: string; username: string | null };
    city: string | null;
};
type Organization = { id: number; name: string; slug: string };
type Opportunity = {
    id: number;
    title: string;
    slug: string;
    organization: { name: string };
};
type Sport = { id: number; name: string; slug: string };

export default function SearchResults({
    q,
    athletes,
    organizations,
    opportunities,
    sports,
}: {
    q: string;
    athletes: Athlete[];
    organizations: Organization[];
    opportunities: Opportunity[];
    sports: Sport[];
}) {
    const total =
        athletes.length +
        organizations.length +
        opportunities.length +
        sports.length;

    const section = (
        title: string,
        icon: React.ReactNode,
        items: React.ReactNode,
    ) => (
        <div>
            <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                {icon}
                {title}
            </h2>
            <div className="mt-3">{items}</div>
        </div>
    );

    return (
        <PublicLayout>
            <Head title={`Search: ${q} — Better Athlete.ph`} />

            <section className="border-b bg-muted/40 py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h1 className="flex items-center gap-2 text-3xl font-semibold tracking-tight text-foreground">
                        <Search
                            className="size-7 text-primary"
                            aria-hidden="true"
                        />
                        Search results for “{q}”
                    </h1>
                    <p className="mt-2 text-muted-foreground">
                        {total} results found
                    </p>
                </div>
            </section>

            <section className="space-y-10 py-12">
                <div className="mx-auto max-w-7xl space-y-10 px-4 sm:px-6 lg:px-8">
                    {total === 0 ? (
                        <p className="text-muted-foreground">
                            Nothing found. Try different keywords.
                        </p>
                    ) : null}

                    {athletes.length > 0
                        ? section(
                              'Athletes',
                              <Trophy
                                  className="size-5 text-primary"
                                  aria-hidden="true"
                              />,
                              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                  {athletes.map((athlete) => (
                                      <li key={athlete.id}>
                                          <Link
                                              href={`/athletes/${athlete.user.username}`}
                                              className="block rounded-xl border bg-card p-4 transition-colors hover:border-primary/40"
                                          >
                                              <p className="font-medium text-foreground">
                                                  {athlete.user.name}
                                              </p>
                                              <p className="text-sm text-muted-foreground">
                                                  {athlete.city}
                                              </p>
                                          </Link>
                                      </li>
                                  ))}
                              </ul>,
                          )
                        : null}

                    {organizations.length > 0
                        ? section(
                              'Organizations',
                              <Building2
                                  className="size-5 text-primary"
                                  aria-hidden="true"
                              />,
                              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                  {organizations.map((organization) => (
                                      <li key={organization.id}>
                                          <Link
                                              href={`/organizations/${organization.slug}`}
                                              className="block rounded-xl border bg-card p-4 transition-colors hover:border-primary/40"
                                          >
                                              <p className="font-medium text-foreground">
                                                  {organization.name}
                                              </p>
                                          </Link>
                                      </li>
                                  ))}
                              </ul>,
                          )
                        : null}

                    {opportunities.length > 0
                        ? section(
                              'Opportunities',
                              <BadgeCheck
                                  className="size-5 text-primary"
                                  aria-hidden="true"
                              />,
                              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                  {opportunities.map((opportunity) => (
                                      <li key={opportunity.id}>
                                          <Link
                                              href={`/opportunities/${opportunity.slug}`}
                                              className="block rounded-xl border bg-card p-4 transition-colors hover:border-primary/40"
                                          >
                                              <p className="font-medium text-foreground">
                                                  {opportunity.title}
                                              </p>
                                              <p className="text-sm text-muted-foreground">
                                                  {
                                                      opportunity.organization
                                                          .name
                                                  }
                                              </p>
                                          </Link>
                                      </li>
                                  ))}
                              </ul>,
                          )
                        : null}

                    {sports.length > 0
                        ? section(
                              'Sports',
                              <Users
                                  className="size-5 text-primary"
                                  aria-hidden="true"
                              />,
                              <div className="flex flex-wrap gap-2">
                                  {sports.map((sport) => (
                                      <Badge
                                          key={sport.id}
                                          variant="secondary"
                                          asChild
                                      >
                                          <Link href={`/sports/${sport.slug}`}>
                                              {sport.name}
                                          </Link>
                                      </Badge>
                                  ))}
                              </div>,
                          )
                        : null}
                </div>
            </section>
        </PublicLayout>
    );
}
