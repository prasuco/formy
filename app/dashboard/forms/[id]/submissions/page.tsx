import { auth } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import { redirect, notFound } from "next/navigation";
import { FormSubmissions } from "@/components/dashboard/FormSubmissions";

export default async function SubmissionsPage({
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
        select: { id: true, title: true, createdById: true },
    });

    if (!form || form.createdById !== session.userId) notFound();

    const where = {
        formId: id,
        ...(search
            ? {
                  OR: [
                      { id: { contains: search, mode: "insensitive" as const } },
                  ],
              }
            : {}),
    };

    const [total, submissions] = await Promise.all([
        prisma.submission.count({ where }),
        prisma.submission.findMany({
            where,
            orderBy: { createdAt: "desc" },
            skip: (page - 1) * pageSize,
            take: pageSize,
        }),
    ]);

    const data = submissions.map((s) => ({
        id: s.id,
        data: s.data as Record<string, unknown>,
        createdAt: s.createdAt,
    }));

    return (
        <FormSubmissions
            formId={form.id}
            formTitle={form.title}
            data={data}
            total={total}
            page={page}
            pageSize={pageSize}
            search={search}
        />
    );
}
