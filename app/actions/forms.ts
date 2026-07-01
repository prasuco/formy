"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/app/lib/prisma";
import { auth } from "@/app/lib/auth";

export async function createForm(formData: FormData) {
    const session = await auth();
    if (!session?.user?.id) redirect("/auth");

    const title = formData.get("title") as string;
    if (!title || !title.trim()) throw new Error("Title is required");

    const form = await prisma.form.create({
        data: {
            title: title.trim(),
            type: "NOSCHEMA",
            createdById: session.user.id,
        },
    });

    redirect(`/dashboard/forms/${form.id}`);
}
