import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { auth } from "@/app/lib/auth";

export async function GET(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth();
    if (!session?.userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const form = await prisma.form.findUnique({
        where: { id },
        select: { title: true, createdById: true },
    });

    if (!form || form.createdById !== session.userId) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const submissions = await prisma.submission.findMany({
        where: { formId: id },
        orderBy: { createdAt: "desc" },
    });

    const keys = new Set<string>();
    submissions.forEach((s) => {
        const data = s.data as Record<string, unknown>;
        Object.keys(data).forEach((k) => keys.add(k));
    });
    const headers = ["ID", ...keys, "Submitted"];

    const rows = submissions.map((s) => {
        const data = s.data as Record<string, unknown>;
        return [
            s.id,
            ...headers.slice(1, -1).map((k) => String(data[k] ?? "")),
            s.createdAt.toISOString(),
        ]
            .map((v) => JSON.stringify(v))
            .join(",");
    });

    const csv = "\uFEFF" + [headers.join(","), ...rows].join("\n");

    return new NextResponse(csv, {
        headers: {
            "Content-Type": "text/csv; charset=utf-8",
            "Content-Disposition": `attachment; filename="${form.title.replace(/\s+/g, "_")}_submissions.csv"`,
        },
    });
}
