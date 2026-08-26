import { Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import {
    ClipboardList,
    FolderGit2,
    Landmark,
    LayoutDashboard,
    ShieldCheck,
    Trophy,
    UserRound,
    Users,
    BookOpen,
    ScrollText,
    Building2,
} from 'lucide-react';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { index as adminAuditLogsIndex } from '@/routes/admin/audit-logs';
import { index as adminUsersIndex } from '@/routes/admin/users';
import { index as adminVerificationsIndex } from '@/routes/admin/verifications';
import { index as applicationsIndex } from '@/routes/applications';
import { edit as athleteProfileEdit } from '@/routes/athlete/profile';
import { dashboard as governmentDashboard } from '@/routes/government';
import { index as organizationIndex } from '@/routes/organization';
import { index as verificationIndex } from '@/routes/verification';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutDashboard,
    },
    {
        title: 'My Profile',
        href: athleteProfileEdit(),
        icon: UserRound,
    },
    {
        title: 'Applications',
        href: applicationsIndex(),
        icon: ClipboardList,
    },
    {
        title: 'Verification',
        href: verificationIndex(),
        icon: ShieldCheck,
    },
    {
        title: 'My Organization',
        href: organizationIndex(),
        icon: Building2,
    },
];

const adminNavItems: NavItem[] = [
    {
        title: 'Users',
        href: adminUsersIndex(),
        icon: Users,
    },
    {
        title: 'Verifications',
        href: adminVerificationsIndex(),
        icon: ShieldCheck,
    },
    {
        title: 'Audit Logs',
        href: adminAuditLogsIndex(),
        icon: ScrollText,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Browse Athletes',
        href: '/athletes',
        icon: Trophy,
    },
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: FolderGit2,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const { auth } = usePage().props;

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <img
                                    src="/assets/better-athlete.webp"
                                    alt="Better Athlete.ph"
                                    className="h-9 w-auto object-contain"
                                />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
                {auth.user.role === 'government_admin' ? (
                    <SidebarGroup>
                        <SidebarGroupLabel>Government</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild>
                                        <Link href={governmentDashboard()}>
                                            <Landmark aria-hidden="true" />
                                            <span>Funding Programs</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ) : null}
                {auth.isStaff ? (
                    <SidebarGroup>
                        <SidebarGroupLabel>Admin</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {adminNavItems.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <Link href={item.href}>
                                                {item.icon ? (
                                                    <item.icon />
                                                ) : null}
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ) : null}
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
