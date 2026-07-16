import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { sendNotification } from "@/app/lib/email";

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
      { status: 400, headers: corsHeaders },
    );
  }

  const form = formId
    ? await prisma.form.findUnique({
        where: { id: formId },
        include: { createdBy: { select: { email: true } } },
      })
    : await prisma.form.findUnique({
        where: { slug },
        include: { createdBy: { select: { email: true } } },
      });

  if (!form) {
    return NextResponse.json(
      { error: "Form not found" },
      { status: 404, headers: corsHeaders },
    );
  }

  const { formId: _f, slug: _s, ...rest } = body;

  const sub = await prisma.submission.create({
    data: {
      formId: form.id,
      data: rest as object,
    },
  });

  const host = request.headers.get("host") ?? "localhost:3000";
  const proto = request.headers.get("x-forwarded-proto") ?? "http";
  const origin = `${proto}://${host}`;

  if (form.webhookUrl) {
    fetch(form.webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "submission.created",
        formId: form.id,
        formTitle: form.title,
        submissionId: sub.id,
        data: rest,
        submittedAt: sub.createdAt.toISOString(),
      }),
    }).catch(() => {});
  }

  await sendNotification({
    to: form.createdBy.email,
    logoUrl: `${origin}/logo.png`,
    formTitle: form.title,
    submissionId: sub.id,
    data: rest as Record<string, unknown>,
    submittedAt: sub.createdAt.toISOString(),
  });

  if (contentType.includes("application/json")) {
    return NextResponse.json(
      { success: true },
      { status: 201, headers: corsHeaders },
    );
  }

  const redirectUrl = new URL("/success", origin);
  redirectUrl.searchParams.set("title", form.title);

  return NextResponse.redirect(redirectUrl.toString(), {
    status: 303,
    headers: corsHeaders,
  });
}
