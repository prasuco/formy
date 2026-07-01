import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function proxy(req: NextRequest) {
    const token = await getToken({ req });
    const { pathname } = req.nextUrl;

    const isAuthPage = pathname.startsWith("/auth");
    const isDashboard = pathname.startsWith("/dashboard");

    if (token && isAuthPage) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if (!token && isDashboard) {
        return NextResponse.redirect(new URL("/auth", req.url));
    }
}

export const config = {
    matcher: ["/dashboard/:path*", "/auth/:path*"],
};
