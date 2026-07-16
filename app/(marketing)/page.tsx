import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";

export default function Home() {
    return (
        <>
            <Header />

            <main className="pt-16">
                <section className="max-w-5xl mx-auto px-4 md:px-8 pt-24 md:pt-32 pb-20 md:pb-28">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-on-surface leading-[1.05] mb-4">
                            Form submissions, simplified.
                        </h1>
                        <p className="text-lg text-on-surface-variant leading-relaxed mb-10 max-w-lg">
                            One POST endpoint per form. No SDKs, no field builders, no configuration.
                            Just data, collected.
                        </p>
                        <div className="flex items-center gap-4">
                            <Link
                                href="/auth/register"
                                className="inline-flex items-center bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-lg hover:brightness-95 transition-all"
                            >
                                Start building
                            </Link>
                            <Link
                                href="/auth"
                                className="inline-flex items-center text-sm text-on-surface-variant hover:text-on-surface transition-colors"
                            >
                                Sign in →
                            </Link>
                        </div>
                    </div>

                    <div className="mt-16 rounded-xl border border-border-muted bg-surface-container-lowest overflow-hidden">
                        <div className="px-5 py-3 border-b border-border-muted bg-surface-container-low flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
                            <span className="w-2.5 h-2.5 rounded-full bg-primary/60" />
                            <span className="w-2.5 h-2.5 rounded-full bg-outline/30" />
                            <span className="text-xs font-mono text-on-surface-variant ml-2">POST /api/submit</span>
                        </div>
                        <pre className="p-5 text-sm font-mono leading-relaxed text-on-surface overflow-x-auto">{`// Collect submissions with a single POST
fetch("https://formy.io/api/submit", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    slug: "contact",
    name: "Jane Doe",
    email: "jane@example.com",
    message: "Hello!",
  }),
});
// \u2192 201 { "success": true }`}</pre>
                    </div>
                </section>

                <section className="border-t border-border-muted bg-surface-container-low">
                    <div className="max-w-5xl mx-auto px-4 md:px-8 py-20 md:py-24">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            <div>
                                <h3 className="text-sm font-semibold text-on-surface mb-2">One endpoint</h3>
                                <p className="text-sm text-on-surface-variant leading-relaxed">
                                    Create a form, get a URL. POST any JSON or form data. No field definitions, no schemas to write.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-on-surface mb-2">Real-time view</h3>
                                <p className="text-sm text-on-surface-variant leading-relaxed">
                                    Submissions appear instantly in your dashboard. Search, view details, or export as CSV or JSON.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-on-surface mb-2">Webhooks & email</h3>
                                <p className="text-sm text-on-surface-variant leading-relaxed">
                                    Get notified on every submission. Forward data to your own webhook or receive an email. No servers to manage.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-on-surface text-surface">
                    <div className="max-w-5xl mx-auto px-4 md:px-8 py-20 md:py-24 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                            Start collecting submissions in 30 seconds.
                        </h2>
                        <p className="text-sm text-surface/70 max-w-md mx-auto mb-8 leading-relaxed">
                            No credit card. No setup. Just create an account and get your first endpoint.
                        </p>
                        <Link
                            href="/auth/register"
                            className="inline-flex items-center bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-lg hover:brightness-95 transition-all"
                        >
                            Create your first form
                        </Link>
                    </div>
                </section>
            </main>

            <footer className="border-t border-border-muted bg-background">
                <div className="max-w-5xl mx-auto px-4 md:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <Image src="/logo.png" alt="Formy" width={20} height={20} className="h-5 w-auto" />
                        <span className="text-xs text-on-surface-variant">Formy — simple form submissions for developers</span>
                    </div>
                    <div className="text-xs text-on-surface-variant">
                        &copy; {new Date().getFullYear()} Formy
                    </div>
                </div>
            </footer>
        </>
    );
}
