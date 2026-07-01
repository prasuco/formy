"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/app/lib/prisma";
import { auth } from "@/app/lib/auth";

async function getOwnedForm(formId: string) {
    const session = await auth();
    if (!session?.userId) redirect("/auth");

    const form = await prisma.form.findUnique({ where: { id: formId } });
    if (!form || form.createdById !== session.userId) redirect("/dashboard/forms");

    return form;
}

export async function createForm(formData: FormData) {
    const session = await auth();
    if (!session?.userId) redirect("/auth");

    const title = formData.get("title") as string;
    if (!title || !title.trim()) throw new Error("Title is required");

    const form = await prisma.form.create({
        data: {
            title: title.trim(),
            type: "NOSCHEMA",
            createdById: session.userId,
        },
    });

    redirect(`/dashboard/forms/${form.id}`);
}

export async function updateForm(formId: string, formData: FormData) {
    await getOwnedForm(formId);

    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const type = formData.get("type");

    const data: Record<string, unknown> = {};
    if (title?.trim()) data.title = title.trim();
    if (type === "SCHEMA" || type === "NOSCHEMA") data.type = type;
    if (slug !== null) data.slug = slug?.trim() || null;

    await prisma.form.update({ where: { id: formId }, data });
    redirect(`/dashboard/forms/${formId}`);
}

export async function deleteForm(formId: string) {
    const form = await getOwnedForm(formId);

    await prisma.submission.deleteMany({ where: { formId } });
    await prisma.formSchema.deleteMany({ where: { formId } });
    await prisma.form.delete({ where: { id: formId } });

    redirect("/dashboard/forms");
}

export async function deleteSubmission(submissionId: string) {
    const session = await auth();
    if (!session?.userId) redirect("/auth");

    const sub = await prisma.submission.findUnique({
        where: { id: submissionId },
        include: { form: { select: { createdById: true } } },
    });

    if (!sub || sub.form.createdById !== session.userId) return;

    await prisma.submission.delete({ where: { id: submissionId } });
}
