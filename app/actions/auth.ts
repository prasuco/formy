"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { encode } from "next-auth/jwt";
import bcrypt from "bcryptjs";
import { prisma } from "@/app/lib/prisma";

function getCookieOptions() {
    const isProduction = process.env.NODE_ENV === "production";
    return {
        httpOnly: true,
        sameSite: "lax" as const,
        path: "/",
        secure: isProduction,
        maxAge: 30 * 24 * 60 * 60,
    };
}

async function createSession(user: { id: string; email: string }) {
    const token = await encode({
        token: { id: user.id, email: user.email },
        secret: process.env.NEXTAUTH_SECRET!,
    });

    const cookieName =
        process.env.NODE_ENV === "production"
            ? "__Secure-next-auth.session-token"
            : "next-auth.session-token";

    const cookieStore = await cookies();
    cookieStore.set(cookieName, token, getCookieOptions());
}

export async function login(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) redirect("/auth?error=CredentialsSignin");

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) redirect("/auth?error=CredentialsSignin");

    await createSession(user);
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

    await createSession(user);
    redirect("/dashboard");
}

export async function logout() {
    const cookieStore = await cookies();
    const cookieName =
        process.env.NODE_ENV === "production"
            ? "__Secure-next-auth.session-token"
            : "next-auth.session-token";

    cookieStore.delete(cookieName);
    redirect("/");
}
