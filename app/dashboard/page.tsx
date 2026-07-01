import { auth } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import { redirect } from "next/navigation";
import { DashboardHome } from "@/components/dashboard/DashboardHome";

export default async function DashboardPage() {
    const session = await auth();
    if (!session?.userId) redirect("/auth");

    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const thisWeekStart = new Date();
    thisWeekStart.setDate(thisWeekStart.getDate() - thisWeekStart.getDay());
    thisWeekStart.setHours(0, 0, 0, 0);

    const formIds = await prisma.form.findMany({
        where: { createdById: session.userId },
        select: { id: true },
    });

    const formIdList = formIds.map((f) => f.id);

    const [totalForms, totalSubmissions, recentSubmissions, weeklySubmissions] =
        await Promise.all([
            prisma.form.count({ where: { createdById: session.userId } }),
            formIdList.length > 0
                ? prisma.submission.count({ where: { formId: { in: formIdList } } })
                : 0,
            formIdList.length > 0
                ? prisma.submission.count({
                      where: { formId: { in: formIdList }, createdAt: { gte: thirtyDaysAgo } },
                  })
                : 0,
            formIdList.length > 0
                ? prisma.submission.count({
                      where: { formId: { in: formIdList }, createdAt: { gte: thisWeekStart } },
                  })
                : 0,
        ]);

    const hasForms = totalForms > 0;

    return (
        <DashboardHome
            totalForms={totalForms}
            totalSubmissions={totalSubmissions}
            recentSubmissions={recentSubmissions}
            weeklySubmissions={weeklySubmissions}
            hasForms={hasForms}
        />
    );
}
