import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request: NextRequest) {
    let body: Record<string, unknown>;

    const contentType = request.headers.get("content-type") ?? "";

    if (contentType.includes("application/json")) {
        body = await request.json();
    } else {
        const fd = await request.formData();
        body = Object.fromEntries(fd.entries());
    }

    const formId = body.formId as string | undefined;
    const slug = body.slug as string | undefined;

    if (!formId && !slug) {
        return NextResponse.json(
            { error: "formId or slug is required" },
            { status: 400, headers: corsHeaders }
        );
    }

    const form = formId
        ? await prisma.form.findUnique({ where: { id: formId } })
        : await prisma.form.findUnique({ where: { slug } });

    if (!form) {
        return NextResponse.json(
            { error: "Form not found" },
            { status: 404, headers: corsHeaders }
        );
    }

    const { formId: _f, slug: _s, ...rest } = body;

    await prisma.submission.create({
        data: {
            formId: form.id,
            data: rest as object,
        },
    });

    if (contentType.includes("application/json")) {
        return NextResponse.json(
            { success: true },
            { status: 201, headers: corsHeaders }
        );
    }

    const host = request.headers.get("host") ?? "localhost:3000";
    const proto = request.headers.get("x-forwarded-proto") ?? "http";
    const redirectUrl = new URL("/success", `${proto}://${host}`);
    redirectUrl.searchParams.set("title", form.title);

    return NextResponse.redirect(redirectUrl.toString(), { status: 303, headers: corsHeaders });
}
