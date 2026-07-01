"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { prisma } from "@/app/lib/prisma";
import { sessionCreate, sessionDestroy } from "@/app/lib/session";

export async function login(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) redirect("/auth?error=CredentialsSignin");

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) redirect("/auth?error=CredentialsSignin");

    await sessionCreate({ userId: user.id, email: user.email });
    redirect("/dashboard");
}

export async function register(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
        redirect("/auth/register?error=Email already in use");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
        data: { email, password: hashedPassword },
    });

    await sessionCreate({ userId: user.id, email: user.email });
    redirect("/dashboard");
}

export async function logout() {
    await sessionDestroy();
    redirect("/");
}
