import { auth } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

export default async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();

    const forms = session?.userId
        ? await prisma.form.findMany({
              where: { createdById: session.userId },
              select: { id: true, title: true },
              orderBy: { id: "desc" },
              take: 50,
          })
        : [];

    return (
        <DashboardShell user={session ?? undefined} forms={forms}>
            {children}
        </DashboardShell>
    );
}
