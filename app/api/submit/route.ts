import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

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
            { status: 400 }
        );
    }

    const form = formId
        ? await prisma.form.findUnique({ where: { id: formId } })
        : await prisma.form.findUnique({ where: { slug } });

    if (!form) {
        return NextResponse.json(
            { error: "Form not found" },
            { status: 404 }
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
            { status: 201 }
        );
    }

    const url = new URL("/success", request.url);
    url.searchParams.set("title", form.title);
    return Response.redirect(url.toString(), 303);
}
