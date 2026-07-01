import Link from "next/link";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-4">
            <Link href="/" className="mb-8 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#FFC437] text-sm font-black text-black">
                    F
                </div>
                <span className="text-xl font-bold text-black">formy</span>
            </Link>
            <div className="w-full max-w-md rounded-2xl border-t-4 border-[#FFC437] bg-white p-8 shadow-lg">
                {children}
            </div>
        </div>
    );
}
