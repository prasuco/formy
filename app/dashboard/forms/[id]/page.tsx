import { auth } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import { Prisma } from "@/app/generated/prisma/client";
import { redirect, notFound } from "next/navigation";
import { FormTabs } from "@/components/dashboard/FormTabs";

export default async function FormDetailPage({
    params,
    searchParams,
}: {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ page?: string; pageSize?: string; search?: string }>;
}) {
    const session = await auth();
    if (!session?.userId) redirect("/auth");

    const { id } = await params;
    const sp = await searchParams;
    const page = Math.max(1, parseInt(sp.page ?? "1", 10) || 1);
    const pageSize = Math.min(100, Math.max(1, parseInt(sp.pageSize ?? "20", 10) || 20));
    const search = (sp.search ?? "").trim();

    const form = await prisma.form.findUnique({
        where: { id },
        include: {
            _count: { select: { submissions: true } },
        },
    });

    if (!form || form.createdById !== session.userId) notFound();

    const searchClause = search
        ? Prisma.sql`AND "data"::text ILIKE ${"%" + search + "%"}`
        : Prisma.empty;

    const [totalResult, submissions] = await Promise.all([
        prisma.$queryRaw<[{ count: bigint }]>(
            Prisma.sql`SELECT COUNT(*)::int as count FROM "Submission" WHERE "formId" = ${id} ${searchClause}`
        ),
        prisma.$queryRaw<
            Array<{ id: string; formId: string; data: Prisma.JsonValue; createdAt: Date }>
        >(
            Prisma.sql`
                SELECT * FROM "Submission"
                WHERE "formId" = ${id} ${searchClause}
                ORDER BY "createdAt" DESC
                LIMIT ${pageSize} OFFSET ${(page - 1) * pageSize}
            `
        ),
    ]);

    const total = Number(totalResult[0].count);
    const data = submissions.map((s) => ({
        id: s.id,
        data: s.data as Record<string, unknown>,
        createdAt: s.createdAt,
    }));

    return (
        <FormTabs
            id={form.id}
            title={form.title}
            slug={form.slug}
            submissionCount={form._count.submissions}
            submissions={data}
            total={total}
            page={page}
            pageSize={pageSize}
        />
    );
}
