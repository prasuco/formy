import Header from "@/components/Header";

export default function MarketingLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header />
            <main className="flex-1">{children}</main>
        </>
    );
}
