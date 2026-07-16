import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ title?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 bg-background">
      <div className="max-w-sm w-full text-center">
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary mx-auto mb-6">
          <CheckCircle size={28} className="text-primary-foreground" />
        </div>
        <h1 className="text-xl font-semibold text-on-surface tracking-tight mb-2">
          Submitted
        </h1>
        <p className="text-sm text-on-surface-variant leading-relaxed mb-8">
          {params.title ? (
            <>
              Your response for{" "}
              <span className="font-medium text-on-surface">
                &lsquo;{params.title}&rsquo;
              </span>{" "}
              was received.
            </>
          ) : (
            "Your response was received."
          )}
        </p>
        <Link
          href="/"
          className="inline-flex items-center bg-primary text-primary-foreground font-medium text-sm px-5 py-2.5 rounded-lg hover:brightness-95 transition-all"
        >
          Back to Formy
        </Link>
      </div>
      <div className="mt-12 text-center">
        <p className="text-xs font-mono tracking-widest uppercase text-primary">
          Form submissions, simplified.
        </p>
      </div>
    </div>
  );
}
