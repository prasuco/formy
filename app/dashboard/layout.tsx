import { auth } from "@/app/lib/auth";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { ConfigProvider } from "antd";

export default async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#FFC437",
                    colorLink: "#EA4335",
                    colorInfo: "#EA4335",
                    borderRadius: 8,
                },
            }}
        >
            <DashboardShell user={session ?? undefined}>
                {children}
            </DashboardShell>
        </ConfigProvider>
    );
}
