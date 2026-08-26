import { Form, Head } from '@inertiajs/react';
import { FileText, ShieldCheck } from 'lucide-react';

import VerificationController from '@/actions/App/Http/Controllers/VerificationController';
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

type Request = {
    id: number;
    type: string;
    status: string;
    notes: string | null;
    reviewed_at: string | null;
    review_notes: string | null;
    documents: { id: number; original_name: string | null }[];
};

export default function Verification({ requests }: { requests: Request[] }) {
    return (
        <>
            <Head title="Verification" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base">
                            <ShieldCheck
                                className="size-5 text-primary"
                                aria-hidden="true"
                            />
                            Get verified
                        </CardTitle>
                        <CardDescription>
                            Submit documents to verify your identity or athlete
                            status. Verified athletes get a badge on their
                            public profile.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form
                            {...VerificationController.store.form()}
                            options={{ preserveScroll: true }}
                            className="grid max-w-xl gap-4"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="space-y-2">
                                        <Label htmlFor="type">
                                            Verification type
                                        </Label>
                                        <select
                                            id="type"
                                            name="type"
                                            defaultValue="athlete_identity"
                                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs"
                                        >
                                            <option value="athlete_identity">
                                                Identity verification
                                            </option>
                                            <option value="athlete_status">
                                                Athlete status verification
                                            </option>
                                            <option value="organization">
                                                Organization verification
                                            </option>
                                        </select>
                                        {errors.type ? (
                                            <p className="text-sm text-destructive">
                                                {errors.type}
                                            </p>
                                        ) : null}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="organization_id">
                                            Organization (for organization
                                            verification)
                                        </Label>
                                        <Input
                                            id="organization_id"
                                            name="organization_id"
                                            type="number"
                                            placeholder="Organization ID"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="documents">
                                            Documents (PDF/JPG/PNG, max 10MB
                                            each)
                                        </Label>
                                        <Input
                                            id="documents"
                                            name="documents[]"
                                            type="file"
                                            multiple
                                            accept=".pdf,.jpg,.jpeg,.png"
                                            required
                                        />
                                        {errors.documents ? (
                                            <p className="text-sm text-destructive">
                                                {errors.documents}
                                            </p>
                                        ) : null}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="notes">Notes</Label>
                                        <Textarea
                                            id="notes"
                                            name="notes"
                                            rows={3}
                                            placeholder="Anything the reviewers should know…"
                                        />
                                    </div>
                                    <div>
                                        <Button
                                            type="submit"
                                            disabled={processing}
                                        >
                                            {processing
                                                ? 'Submitting…'
                                                : 'Submit for review'}
                                        </Button>
                                    </div>
                                </>
                            )}
                        </Form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">My requests</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {requests.length === 0 ? (
                            <p className="py-4 text-center text-sm text-muted-foreground">
                                No verification requests yet.
                            </p>
                        ) : (
                            <ul className="space-y-3">
                                {requests.map((request) => (
                                    <li
                                        key={request.id}
                                        className="rounded-lg border p-4"
                                    >
                                        <div className="flex items-center justify-between gap-3">
                                            <p className="text-sm font-medium text-foreground capitalize">
                                                {request.type.replaceAll(
                                                    '_',
                                                    ' ',
                                                )}
                                            </p>
                                            <Badge
                                                variant="secondary"
                                                className={
                                                    request.status ===
                                                    'verified'
                                                        ? 'border-transparent bg-success/10 text-success'
                                                        : request.status ===
                                                            'rejected'
                                                          ? 'border-transparent bg-destructive/10 text-destructive'
                                                          : ''
                                                }
                                            >
                                                {request.status}
                                            </Badge>
                                        </div>
                                        <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                                            <FileText
                                                className="size-3.5"
                                                aria-hidden="true"
                                            />
                                            {request.documents.length}{' '}
                                            document(s)
                                            {request.reviewed_at
                                                ? ` · Reviewed ${request.reviewed_at}`
                                                : ''}
                                        </p>
                                        {request.review_notes ? (
                                            <p className="mt-2 rounded-md bg-muted px-3 py-2 text-xs text-muted-foreground">
                                                Reviewer: {request.review_notes}
                                            </p>
                                        ) : null}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

Verification.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Verification', href: '/verification' },
    ],
};
