import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { auth } from "@/app/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const format = request.nextUrl.searchParams.get("format") ?? "csv";

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

  if (format === "json") {
    const data = submissions.map((s) => ({
      id: s.id,
      ...(s.data as Record<string, unknown>),
      submitted: s.createdAt.toISOString(),
    }));
    return NextResponse.json(data, {
      headers: {
        "Content-Disposition": `attachment; filename="${form.title.replace(/\s+/g, "_")}_submissions.json"`,
      },
    });
  }

  const keys = new Set<string>();
  submissions.forEach((s) => {
    Object.keys(s.data as Record<string, unknown>).forEach((k) => keys.add(k));
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

  return new NextResponse("\uFEFF" + [headers.join(","), ...rows].join("\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${form.title.replace(/\s+/g, "_")}_submissions.csv"`,
    },
  });
}
