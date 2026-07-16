"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { prisma } from "@/app/lib/prisma";
import { sessionStart, sessionCreate, sessionDestroy } from "@/app/lib/session";

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

export async function updatePassword(formData: FormData) {
  const session = await sessionStart();
  if (!session?.userId) redirect("/auth");

  const currentPassword = formData.get("currentPassword") as string;
  const newPassword = formData.get("newPassword") as string;

  if (!currentPassword || !newPassword || newPassword.length < 8) {
    redirect(
      "/dashboard/settings?error=Password must be at least 8 characters",
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId as string },
  });
  if (!user) redirect("/auth");

  const isValid = await bcrypt.compare(currentPassword, user.password);
  if (!isValid)
    redirect("/dashboard/settings?error=Current password is incorrect");

  const hashedPassword = await bcrypt.hash(newPassword, 12);
  await prisma.user.update({
    where: { id: session.userId as string },
    data: { password: hashedPassword },
  });

  redirect("/dashboard/settings?success=Password updated successfully");
}

export async function deleteAccount() {
  const session = await sessionStart();
  if (!session?.userId) redirect("/auth");

  const userId = session.userId as string;

  const formIds = await prisma.form.findMany({
    where: { createdById: userId },
    select: { id: true },
  });

  await prisma.submission.deleteMany({
    where: { formId: { in: formIds.map((f) => f.id) } },
  });
  await prisma.form.deleteMany({ where: { createdById: userId } });
  await prisma.user.delete({ where: { id: userId } });

  await sessionDestroy();
  redirect("/");
}

export async function logout() {
  await sessionDestroy();
  redirect("/");
}
