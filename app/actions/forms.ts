"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/app/lib/prisma";
import { auth } from "@/app/lib/auth";
import { generateSlug, ensureSlugUnique } from "@/app/lib/slug";

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

    const slug = await generateSlug(title.trim());

    const form = await prisma.form.create({
        data: {
            title: title.trim(),
            slug,
            createdById: session.userId,
        },
    });

    redirect(`/dashboard/forms/${form.id}`);
}

export async function updateForm(formId: string, formData: FormData) {
    await getOwnedForm(formId);

    const title = formData.get("title") as string;
    const slug = (formData.get("slug") as string)?.trim();

    const data: Record<string, unknown> = {};
    if (title?.trim()) data.title = title.trim();
    if (slug) data.slug = await ensureSlugUnique(slug, formId);

    await prisma.form.update({ where: { id: formId }, data });
    redirect(`/dashboard/forms/${formId}`);
}

export async function deleteForm(formId: string) {
    await getOwnedForm(formId);

    await prisma.submission.deleteMany({ where: { formId } });
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
