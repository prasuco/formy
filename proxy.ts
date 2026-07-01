import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import os from "node:os";

const SESSION_COOKIE =
    process.env.NODE_ENV === "production"
        ? "__Secure-next-auth.session-token"
        : "next-auth.session-token";

const SESSION_DIR = path.join(os.tmpdir(), "formy-sessions");

export default async function proxy(req: NextRequest) {
    const token = req.cookies.get(SESSION_COOKIE)?.value;

    let valid = false;
    if (token) {
        try {
            const raw = await fs.readFile(
                path.join(SESSION_DIR, `sess_${token}`),
                "utf-8"
            );
            const data = JSON.parse(raw);
            valid = !!data._expires && Date.now() < data._expires;
        } catch {
            valid = false;
        }
    }

    const { pathname } = req.nextUrl;
    const isAuthPage = pathname.startsWith("/auth");
    const isDashboard = pathname.startsWith("/dashboard");

    if (valid && isAuthPage) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if (!valid && isDashboard) {
        return NextResponse.redirect(new URL("/auth", req.url));
    }
}

export const config = {
    matcher: ["/dashboard/:path*", "/auth/:path*"],
};
