import { prisma } from "@/app/lib/prisma";
import { randomBytes } from "crypto";

function toSlug(text: string): string {
  return (
    text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 80) || "untitled"
  );
}

export async function generateSlug(title: string): Promise<string> {
  const base = toSlug(title);
  const existing = await prisma.form.findUnique({ where: { slug: base } });
  if (!existing) return base;

  const suffix = randomBytes(3).toString("hex");
  const fallback = `${base}-${suffix}`;
  const exists = await prisma.form.findUnique({ where: { slug: fallback } });
  return exists ? `${fallback}-${Date.now()}` : fallback;
}

export async function ensureSlugUnique(
  slug: string,
  excludeId: string,
): Promise<string> {
  const existing = await prisma.form.findUnique({ where: { slug } });
  if (!existing || existing.id === excludeId) return slug;

  const suffix = randomBytes(3).toString("hex");
  return `${slug}-${suffix}`;
}
