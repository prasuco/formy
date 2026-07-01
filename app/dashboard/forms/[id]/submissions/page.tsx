import { auth } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import { redirect, notFound } from "next/navigation";
import { FormSubmissions } from "@/components/dashboard/FormSubmissions";

export default async function SubmissionsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const session = await auth();
    if (!session?.user?.id) redirect("/auth");

    const { id } = await params;

    const form = await prisma.form.findUnique({
        where: { id },
        select: { id: true, title: true, createdById: true },
    });

    if (!form || form.createdById !== session.user.id) notFound();

    const submissions = await prisma.submission.findMany({
        where: { formId: id },
        orderBy: { createdAt: "desc" },
    });

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
        />
    );
}
