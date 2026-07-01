import { auth } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import { redirect, notFound } from "next/navigation";
import { FormDetails } from "@/components/dashboard/FormDetails";

export default async function FormDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const session = await auth();
    if (!session?.user?.id) redirect("/auth");

    const { id } = await params;

    const form = await prisma.form.findUnique({
        where: { id },
        include: {
            _count: { select: { submissions: true } },
            formSchemas: { orderBy: { createdAt: "desc" }, take: 1 },
        },
    });

    if (!form || form.createdById !== session.user.id) notFound();

    return (
        <FormDetails
            id={form.id}
            title={form.title}
            slug={form.slug}
            type={form.type}
            submissionCount={form._count.submissions}
            schema={form.formSchemas[0]?.schema ?? null}
            createdAt={form.formSchemas[0]?.createdAt ?? null}
        />
    );
}
