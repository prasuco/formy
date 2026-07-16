import Link from "next/link";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 bg-background">
      <Link href="/" className="mb-6">
        <Image
          src="/logo.png"
          alt="Formy"
          width={36}
          height={36}
          className="h-9 w-auto"
        />
      </Link>
      <p className="text-xs font-mono tracking-widest uppercase text-primary mb-8">
        Form submissions, simplified.
      </p>
      <div className="w-full max-w-sm bg-surface-container-lowest border border-border-muted rounded-xl p-8">
        {children}
      </div>
      <div className="mt-8 text-xs text-on-surface-variant">
        <Link href="/" className="hover:text-on-surface transition-colors">
          Home
        </Link>
      </div>
    </div>
  );
}
