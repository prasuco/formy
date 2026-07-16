import { Button } from "@/components/ui/button";
import { register } from "@/app/actions/auth";

export default async function RegisterPage({
    searchParams,
}: {
    searchParams: Promise<{ error?: string }>;
}) {
    const params = await searchParams;

    return (
        <>
            <div className="mb-8">
                <h1 className="text-xl font-semibold text-on-surface tracking-tight">Create an account</h1>
                <p className="text-sm text-on-surface-variant mt-1">Get your first form endpoint in seconds</p>
            </div>

            {params.error ? (
                <div className="mb-6 rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3">
                    <p className="text-sm text-destructive">{params.error}</p>
                </div>
            ) : null}

            <form action={register} className="space-y-5">
                <div className="space-y-2">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="name@company.com"
                        className="block w-full rounded-lg border border-border-muted bg-white px-4 py-2.5 text-sm text-on-surface outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        minLength={8}
                        placeholder="Min. 8 characters"
                        className="block w-full rounded-lg border border-border-muted bg-white px-4 py-2.5 text-sm text-on-surface outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                </div>
                <Button type="submit" className="w-full">
                    Create account
                </Button>
            </form>

            <p className="mt-8 text-center text-sm text-on-surface-variant">
                Already have an account?{" "}
                <a href="/auth" className="text-on-surface font-semibold hover:underline">
                    Sign in
                </a>
            </p>
        </>
    );
}
