import { Form, Head } from '@inertiajs/react';
import { Medal, Plus, Target, Trash2 } from 'lucide-react';

import AthleteProfileController from '@/actions/App/Http/Controllers/AthleteProfileController';
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

type Sport = { id: number; name: string };
type Achievement = {
    id: number;
    title: string;
    medal: string | null;
    year: number | null;
};
type Need = {
    id: number;
    title: string;
    category: string;
    target_amount: number | null;
};

export default function AthleteProfileEdit({
    profile,
    sports,
}: {
    profile: {
        bio: string | null;
        birth_date: string | null;
        gender: string | null;
        city: string | null;
        province: string | null;
        region: string | null;
        current_goal: string | null;
        sports: { id: number; sport_id: number; is_primary: boolean }[];
        achievements: Achievement[];
        needs: Need[];
    } | null;
    sports: Sport[];
}) {
    const primarySport = profile?.sports.find((s) => s.is_primary);

    return (
        <>
            <Head title="My Athlete Profile" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Profile details</CardTitle>
                        <CardDescription>
                            This information appears on your public athlete
                            page.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form
                            {...AthleteProfileController.update.form()}
                            options={{ preserveScroll: true }}
                            className="grid gap-4 md:grid-cols-2"
                        >
                            {({ processing }) => (
                                <>
                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor="bio">Bio</Label>
                                        <Textarea
                                            id="bio"
                                            name="bio"
                                            defaultValue={profile?.bio ?? ''}
                                            rows={4}
                                            placeholder="Tell people about yourself as an athlete…"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="birth_date">
                                            Birth date
                                        </Label>
                                        <Input
                                            id="birth_date"
                                            name="birth_date"
                                            type="date"
                                            defaultValue={
                                                profile?.birth_date ?? ''
                                            }
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="gender">Gender</Label>
                                        <select
                                            id="gender"
                                            name="gender"
                                            defaultValue={profile?.gender ?? ''}
                                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs"
                                        >
                                            <option value="">
                                                Prefer not to say
                                            </option>
                                            <option value="male">Male</option>
                                            <option value="female">
                                                Female
                                            </option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="city">City</Label>
                                        <Input
                                            id="city"
                                            name="city"
                                            defaultValue={profile?.city ?? ''}
                                            placeholder="Quezon City"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="province">
                                            Province
                                        </Label>
                                        <Input
                                            id="province"
                                            name="province"
                                            defaultValue={
                                                profile?.province ?? ''
                                            }
                                            placeholder="Metro Manila"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="region">Region</Label>
                                        <Input
                                            id="region"
                                            name="region"
                                            defaultValue={profile?.region ?? ''}
                                            placeholder="NCR"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="primary_sport_id">
                                            Primary sport
                                        </Label>
                                        <select
                                            id="primary_sport_id"
                                            name="primary_sport_id"
                                            defaultValue={
                                                primarySport
                                                    ? String(
                                                          primarySport.sport_id,
                                                      )
                                                    : ''
                                            }
                                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs"
                                        >
                                            <option value="">None</option>
                                            {sports.map((sport) => (
                                                <option
                                                    key={sport.id}
                                                    value={sport.id}
                                                >
                                                    {sport.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="level">
                                            Competition level
                                        </Label>
                                        <select
                                            id="level"
                                            name="level"
                                            defaultValue="local"
                                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs"
                                        >
                                            <option value="local">Local</option>
                                            <option value="regional">
                                                Regional
                                            </option>
                                            <option value="national">
                                                National
                                            </option>
                                            <option value="international">
                                                International
                                            </option>
                                        </select>
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor="current_goal">
                                            Current goal
                                        </Label>
                                        <Input
                                            id="current_goal"
                                            name="current_goal"
                                            defaultValue={
                                                profile?.current_goal ?? ''
                                            }
                                            placeholder="e.g. International training camp"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <Button
                                            type="submit"
                                            disabled={processing}
                                        >
                                            {processing
                                                ? 'Saving…'
                                                : 'Save profile'}
                                        </Button>
                                    </div>
                                </>
                            )}
                        </Form>
                    </CardContent>
                </Card>

                <div className="grid gap-4 lg:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-base">
                                <Medal
                                    className="size-4 text-primary"
                                    aria-hidden="true"
                                />
                                Achievements
                            </CardTitle>
                            <CardDescription>
                                Your competition results and medals.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {profile && profile.achievements.length > 0 ? (
                                <ul className="space-y-2">
                                    {profile.achievements.map((achievement) => (
                                        <li
                                            key={achievement.id}
                                            className="flex items-center justify-between gap-2 rounded-lg border p-3"
                                        >
                                            <div>
                                                <p className="text-sm font-medium text-foreground">
                                                    {achievement.title}
                                                </p>
                                                <p className="text-xs text-muted-foreground capitalize">
                                                    {achievement.medal ?? '—'}
                                                    {achievement.year
                                                        ? ` · ${achievement.year}`
                                                        : ''}
                                                </p>
                                            </div>
                                            <Form
                                                {...AthleteProfileController.destroyAchievement.form(
                                                    achievement.id,
                                                )}
                                                options={{
                                                    preserveScroll: true,
                                                }}
                                                className="contents"
                                            >
                                                {({ processing }) => (
                                                    <Button
                                                        type="submit"
                                                        variant="ghost"
                                                        size="icon"
                                                        disabled={processing}
                                                        aria-label={`Delete ${achievement.title}`}
                                                    >
                                                        <Trash2
                                                            className="size-4 text-destructive"
                                                            aria-hidden="true"
                                                        />
                                                    </Button>
                                                )}
                                            </Form>
                                        </li>
                                    ))}
                                </ul>
                            ) : null}
                            <Form
                                {...AthleteProfileController.storeAchievement.form()}
                                options={{ preserveScroll: true }}
                                className="grid gap-3 sm:grid-cols-2"
                            >
                                {({ processing }) => (
                                    <>
                                        <div className="space-y-1.5 sm:col-span-2">
                                            <Label htmlFor="achievement-title">
                                                Title
                                            </Label>
                                            <Input
                                                id="achievement-title"
                                                name="title"
                                                placeholder="National Championship"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label htmlFor="achievement-medal">
                                                Medal
                                            </Label>
                                            <select
                                                id="achievement-medal"
                                                name="medal"
                                                defaultValue=""
                                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs"
                                            >
                                                <option value="">None</option>
                                                <option value="gold">
                                                    Gold
                                                </option>
                                                <option value="silver">
                                                    Silver
                                                </option>
                                                <option value="bronze">
                                                    Bronze
                                                </option>
                                                <option value="other">
                                                    Other
                                                </option>
                                            </select>
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label htmlFor="achievement-year">
                                                Year
                                            </Label>
                                            <Input
                                                id="achievement-year"
                                                name="year"
                                                type="number"
                                                min="1900"
                                                max={
                                                    new Date().getFullYear() + 1
                                                }
                                            />
                                        </div>
                                        <div className="sm:col-span-2">
                                            <Button
                                                type="submit"
                                                variant="outline"
                                                size="sm"
                                                disabled={processing}
                                            >
                                                <Plus
                                                    className="size-4"
                                                    aria-hidden="true"
                                                />
                                                Add achievement
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </Form>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-base">
                                <Target
                                    className="size-4 text-primary"
                                    aria-hidden="true"
                                />
                                Current needs
                            </CardTitle>
                            <CardDescription>
                                What kind of support are you looking for?
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {profile && profile.needs.length > 0 ? (
                                <ul className="space-y-2">
                                    {profile.needs.map((need) => (
                                        <li
                                            key={need.id}
                                            className="flex items-center justify-between gap-2 rounded-lg border p-3"
                                        >
                                            <div>
                                                <p className="text-sm font-medium text-foreground">
                                                    {need.title}
                                                </p>
                                                <p className="text-xs text-muted-foreground capitalize">
                                                    {need.category}
                                                    {need.target_amount
                                                        ? ` · ₱${need.target_amount.toLocaleString()}`
                                                        : ''}
                                                </p>
                                            </div>
                                            <Form
                                                {...AthleteProfileController.destroyNeed.form(
                                                    need.id,
                                                )}
                                                options={{
                                                    preserveScroll: true,
                                                }}
                                                className="contents"
                                            >
                                                {({ processing }) => (
                                                    <Button
                                                        type="submit"
                                                        variant="ghost"
                                                        size="icon"
                                                        disabled={processing}
                                                        aria-label={`Delete ${need.title}`}
                                                    >
                                                        <Trash2
                                                            className="size-4 text-destructive"
                                                            aria-hidden="true"
                                                        />
                                                    </Button>
                                                )}
                                            </Form>
                                        </li>
                                    ))}
                                </ul>
                            ) : null}
                            <Form
                                {...AthleteProfileController.storeNeed.form()}
                                options={{ preserveScroll: true }}
                                className="grid gap-3 sm:grid-cols-2"
                            >
                                {({ processing }) => (
                                    <>
                                        <div className="space-y-1.5">
                                            <Label htmlFor="need-category">
                                                Category
                                            </Label>
                                            <select
                                                id="need-category"
                                                name="category"
                                                defaultValue="travel"
                                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs"
                                            >
                                                <option value="travel">
                                                    Travel
                                                </option>
                                                <option value="competition">
                                                    Competition
                                                </option>
                                                <option value="training">
                                                    Training
                                                </option>
                                                <option value="equipment">
                                                    Equipment
                                                </option>
                                                <option value="accommodation">
                                                    Accommodation
                                                </option>
                                                <option value="nutrition">
                                                    Nutrition
                                                </option>
                                                <option value="medical">
                                                    Medical
                                                </option>
                                                <option value="coaching">
                                                    Coaching
                                                </option>
                                                <option value="education">
                                                    Education
                                                </option>
                                                <option value="insurance">
                                                    Insurance
                                                </option>
                                                <option value="other">
                                                    Other
                                                </option>
                                            </select>
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label htmlFor="need-title">
                                                Title
                                            </Label>
                                            <Input
                                                id="need-title"
                                                name="title"
                                                placeholder="Competition travel"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-1.5 sm:col-span-2">
                                            <Label htmlFor="need-amount">
                                                Target amount (₱)
                                            </Label>
                                            <Input
                                                id="need-amount"
                                                name="target_amount"
                                                type="number"
                                                min="0"
                                                placeholder="50000"
                                            />
                                        </div>
                                        <div className="sm:col-span-2">
                                            <Button
                                                type="submit"
                                                variant="outline"
                                                size="sm"
                                                disabled={processing}
                                            >
                                                <Plus
                                                    className="size-4"
                                                    aria-hidden="true"
                                                />
                                                Add need
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </Form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

AthleteProfileEdit.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'My Profile', href: '/profile/athlete' },
    ],
};
