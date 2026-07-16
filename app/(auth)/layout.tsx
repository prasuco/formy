import Link from "next/link";
import Image from "next/image";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-4 bg-background">
            <Link href="/" className="mb-8">
                <Image src="/logo.png" alt="Formy" width={36} height={36} className="h-9 w-auto" />
            </Link>
            <div className="w-full max-w-sm bg-surface-container-lowest border border-border-muted rounded-xl p-8">
                {children}
            </div>
            <div className="mt-8 flex items-center gap-4 text-xs text-on-surface-variant">
                <Link href="/" className="hover:text-on-surface transition-colors">Home</Link>
                <span className="text-border-muted">/</span>
                <a href="#" className="hover:text-on-surface transition-colors">Privacy</a>
                <span className="text-border-muted">/</span>
                <a href="#" className="hover:text-on-surface transition-colors">Terms</a>
            </div>
        </div>
    );
}
