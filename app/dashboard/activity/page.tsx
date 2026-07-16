import { auth } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import { redirect } from "next/navigation";
import { ActivityLog } from "@/components/dashboard/ActivityLog";

export default async function ActivityPage() {
    const session = await auth();
    if (!session?.userId) redirect("/auth");

    const pageSize = 25;

    const formIds = await prisma.form.findMany({
        where: { createdById: session.userId },
        select: { id: true },
    });

    const formIdList = formIds.map((f) => f.id);

    const total = formIdList.length > 0
        ? await prisma.submission.count({ where: { formId: { in: formIdList } } })
        : 0;

    const items = formIdList.length > 0
        ? await prisma.submission.findMany({
              where: { formId: { in: formIdList } },
              orderBy: { createdAt: "desc" },
              take: pageSize,
              include: { form: { select: { title: true } } },
          })
        : [];

    const activity = items.map((s) => ({
        id: s.id,
        formTitle: s.form.title,
        formId: s.formId,
        createdAt: s.createdAt.toISOString(),
    }));

    return (
        <ActivityLog
            items={activity}
            page={1}
            total={total}
            pageSize={pageSize}
        />
    );
}
