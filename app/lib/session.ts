import { cookies } from "next/headers";
import { promises as fs } from "node:fs";
import path from "node:path";
import os from "node:os";

const SESSION_COOKIE =
    process.env.NODE_ENV === "production"
        ? "__Secure-next-auth.session-token"
        : "next-auth.session-token";

const SESSION_DIR = path.join(os.tmpdir(), "formy-sessions");
const SESSION_TTL = 30 * 24 * 60 * 60 * 1000; // 30 days

function filePath(token: string) {
    return path.join(SESSION_DIR, `sess_${token}`);
}

async function ensureDir() {
    await fs.mkdir(SESSION_DIR, { recursive: true });
}

export async function sessionStart(): Promise<Record<string, unknown> | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE)?.value;
    if (!token) return null;

    try {
        const raw = await fs.readFile(filePath(token), "utf-8");
        const data = JSON.parse(raw);

        if (data._expires && Date.now() > data._expires) {
            await fs.unlink(filePath(token)).catch(() => {});
            return null;
        }

        return data;
    } catch {
        return null;
    }
}

export async function sessionCreate(data: Record<string, unknown>) {
    const token = crypto.randomUUID();
    const expires = Date.now() + SESSION_TTL;

    await ensureDir();
    await fs.writeFile(
        filePath(token),
        JSON.stringify({ ...data, _expires: expires })
    );

    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, token, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: SESSION_TTL / 1000,
    });
}

export async function sessionDestroy() {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE)?.value;
    if (!token) return;

    await fs.unlink(filePath(token)).catch(() => {});
    cookieStore.delete(SESSION_COOKIE);
}

export { SESSION_COOKIE };
