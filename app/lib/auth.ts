import { sessionStart } from "@/app/lib/session";

export async function auth() {
  const data = await sessionStart();
  if (!data?.userId) return null;
  return data as { userId: string; email: string };
}
