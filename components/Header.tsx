import Link from "next/link";
import Image from "next/image";

export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border-muted">
            <div className="max-w-5xl mx-auto h-16 flex items-center justify-between px-4 md:px-8">
                <Link href="/" className="flex items-center gap-2">
                    <Image src="/logo.png" alt="Formy" width={28} height={28} className="h-7 w-auto" />
                </Link>
                <div className="flex items-center gap-6">
                    <Link
                        href="/auth"
                        className="text-sm text-on-surface-variant hover:text-on-surface transition-colors"
                    >
                        Sign in
                    </Link>
                    <Link
                        href="/auth/register"
                        className="text-sm font-semibold bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:brightness-95 transition-all"
                    >
                        Get Started
                    </Link>
                </div>
            </div>
        </header>
    );
}
