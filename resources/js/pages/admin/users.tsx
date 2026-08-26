import { Form, Head, Link } from '@inertiajs/react';
import { Search } from 'lucide-react';

import AdminUserController from '@/actions/App/Http/Controllers/AdminUserController';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

type UserRow = {
    id: number;
    name: string;
    email: string;
    username: string | null;
    role: string;
};

export default function AdminUsers({
    users,
    roles,
    filters,
}: {
    users: { data: UserRow[]; links: unknown[] };
    roles: { value: string; label: string }[];
    filters: { q?: string; role?: string };
}) {
    return (
        <>
            <Head title="User Management" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Users</CardTitle>
                        <form
                            action="/admin/users"
                            method="get"
                            className="mt-2 flex gap-2"
                        >
                            <div className="relative w-full max-w-xs">
                                <Search
                                    aria-hidden="true"
                                    className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                                />
                                <Input
                                    name="q"
                                    defaultValue={filters.q ?? ''}
                                    placeholder="Search name, email, username…"
                                    className="h-9 pl-9"
                                />
                            </div>
                            <select
                                name="role"
                                defaultValue={filters.role ?? ''}
                                className="h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs"
                            >
                                <option value="">All roles</option>
                                {roles.map((role) => (
                                    <option key={role.value} value={role.value}>
                                        {role.label}
                                    </option>
                                ))}
                            </select>
                            <Button type="submit" size="sm" variant="outline">
                                Filter
                            </Button>
                        </form>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {users.data.map((user) => (
                                <li
                                    key={user.id}
                                    className="flex flex-wrap items-center justify-between gap-3 rounded-lg border p-4"
                                >
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium text-foreground">
                                            {user.name}
                                            {user.username ? (
                                                <span className="ml-1.5 text-xs text-muted-foreground">
                                                    @{user.username}
                                                </span>
                                            ) : null}
                                        </p>
                                        <p className="truncate text-xs text-muted-foreground">
                                            {user.email}
                                        </p>
                                    </div>

                                    <Badge
                                        variant="secondary"
                                        className="capitalize"
                                    >
                                        {user.role.replaceAll('_', ' ')}
                                    </Badge>

                                    <Form
                                        {...AdminUserController.updateRole.form(
                                            user.id,
                                        )}
                                        options={{ preserveScroll: true }}
                                        className="flex items-center gap-2"
                                    >
                                        {({ processing }) => (
                                            <>
                                                <select
                                                    name="role"
                                                    defaultValue={user.role}
                                                    className="h-8 rounded-md border border-input bg-transparent px-2 py-0.5 text-xs shadow-xs"
                                                >
                                                    {roles.map((role) => (
                                                        <option
                                                            key={role.value}
                                                            value={role.value}
                                                        >
                                                            {role.label}
                                                        </option>
                                                    ))}
                                                </select>
                                                <Button
                                                    type="submit"
                                                    size="sm"
                                                    variant="outline"
                                                    disabled={processing}
                                                >
                                                    Save
                                                </Button>
                                            </>
                                        )}
                                    </Form>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-4 flex items-center justify-center gap-2">
                            {(
                                users.links as {
                                    url: string | null;
                                    label: string;
                                    active: boolean;
                                }[]
                            )
                                .filter((link) => link.url)
                                .map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url ?? '#'}
                                        className={`rounded-md px-3 py-1.5 text-sm ${
                                            link.active
                                                ? 'bg-primary text-primary-foreground'
                                                : 'border bg-card text-muted-foreground hover:text-primary'
                                        }`}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

AdminUsers.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Admin', href: '/admin/users' },
        { title: 'Users', href: '/admin/users' },
    ],
};
