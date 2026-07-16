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

  const [
    totalForms,
    totalSubmissions,
    recentSubmissions,
    weeklySubmissions,
    recentForms,
    recentActivity,
  ] = await Promise.all([
    prisma.form.count({ where: { createdById: session.userId } }),
    formIdList.length > 0
      ? prisma.submission.count({ where: { formId: { in: formIdList } } })
      : 0,
    formIdList.length > 0
      ? prisma.submission.count({
          where: {
            formId: { in: formIdList },
            createdAt: { gte: thirtyDaysAgo },
          },
        })
      : 0,
    formIdList.length > 0
      ? prisma.submission.count({
          where: {
            formId: { in: formIdList },
            createdAt: { gte: thisWeekStart },
          },
        })
      : 0,
    prisma.form.findMany({
      where: { createdById: session.userId },
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { _count: { select: { submissions: true } } },
    }),
    formIdList.length > 0
      ? prisma.submission.findMany({
          where: { formId: { in: formIdList } },
          orderBy: { createdAt: "desc" },
          take: 10,
          include: { form: { select: { title: true } } },
        })
      : [],
  ]);

  const formattedForms = recentForms.map((f) => ({
    id: f.id,
    title: f.title,
    slug: f.slug,
    submissions: f._count.submissions,
    createdAt: f.createdAt.toISOString(),
  }));

  const formattedActivity = recentActivity.map((s) => ({
    id: s.id,
    formTitle: s.form.title,
    formId: s.formId,
    createdAt: s.createdAt.toISOString(),
  }));

  return (
    <DashboardHome
      totalForms={totalForms}
      totalSubmissions={totalSubmissions}
      recentSubmissions={recentSubmissions}
      weeklySubmissions={weeklySubmissions}
      recentForms={formattedForms}
      recentActivity={formattedActivity}
    />
  );
}
