import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import { CodeBlock } from "@/components/CodeBlock";
import { _React, Html5, _Vue, AngularIcon, Curl } from "@dev.icons/react";

export default function Home() {
  return (
    <>
      <Header />

      <main className="pt-16">
        <section className="max-w-5xl mx-auto px-4 md:px-8 pt-24 md:pt-32 pb-20 md:pb-28">
          <div className="text-center mb-12">
            <p className="text-xs font-mono tracking-widest uppercase text-primary mb-4 bg-accent-foreground rounded-full px-2 py-1 mx-auto w-fit">
              Form submissions, simplified
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-normal text-on-surface  mb-4">
              Integrate once
              <br />{" "}
              <span className=" text-primary px-3 py-1 inline-block ">
                Collect
              </span>
              forever.
            </h1>
            <p className="text-lg text-on-surface-variant leading-relaxed max-w-md mx-auto ">
              One POST endpoint per form. Any JSON or FORM. No SDK, no field
              builder, no config.
            </p>
          </div>

          <CodeBlock />

          <div className="flex items-center justify-center gap-4 mt-10">
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
              Sign in &rarr;
            </Link>
          </div>

          <div className="flex items-center justify-center gap-8 mt-12 text-on-surface-variant/30">
            <span className="text-xs font-mono text-on-surface-variant/50 mr-2">
              Any stack
            </span>
            <_React size={22} />
            <Html5 size={22} />
            <_Vue size={22} />
            <AngularIcon size={22} />
            <Curl size={22} />
          </div>
        </section>

        <section className="border-t border-border-muted bg-surface-container-low">
          <div className="max-w-5xl mx-auto px-4 md:px-8 py-20 md:py-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div>
                <h3 className="text-sm font-semibold text-on-surface mb-2">
                  One endpoint
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Create a form, get a URL. POST any JSON or form data. No field
                  definitions, no schemas to write.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-on-surface mb-2">
                  Real-time view
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Submissions appear instantly in your dashboard. Search, view
                  details, or export as CSV or JSON.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-on-surface mb-2">
                  Webhooks &amp; email
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Get notified on every submission. Forward data to your own
                  webhook or receive an email. No servers to manage.
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
              No credit card. No setup. Just create an account and get your
              first endpoint.
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
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-12 flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="Formy"
                width={22}
                height={22}
                className="h-5 w-auto"
              />
              <span className="text-sm font-semibold text-on-surface tracking-tight">
                Formy
              </span>
            </div>
            <p className="text-xs text-on-surface-variant max-w-xs text-center md:text-left leading-relaxed">
              Form submissions, simplified. One POST endpoint per form. Any
              JSON. No SDK.
            </p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-3">
            <div className="flex items-center gap-4 text-xs text-on-surface-variant">
              <Link
                href="/auth"
                className="hover:text-on-surface transition-colors"
              >
                Sign in
              </Link>
              <Link
                href="/auth/register"
                className="hover:text-on-surface transition-colors"
              >
                Register
              </Link>
            </div>
            <p className="text-xs text-on-surface-variant/60">
              &copy; {new Date().getFullYear()} Formy
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
