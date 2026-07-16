import { auth } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function SubmissionDetailPage({
  params,
}: {
  params: Promise<{ id: string; submissionId: string }>;
}) {
  const session = await auth();
  if (!session?.userId) redirect("/auth");

  const { id: formId, submissionId } = await params;

  const form = await prisma.form.findUnique({ where: { id: formId } });
  if (!form || form.createdById !== session.userId) notFound();

  const submission = await prisma.submission.findUnique({
    where: { id: submissionId },
  });

  if (!submission || submission.formId !== formId) notFound();

  const data = submission.data as Record<string, unknown>;

  return (
    <>
      <Link
        href={`/dashboard/forms/${formId}?tab=submissions`}
        className="inline-flex items-center gap-1.5 text-sm text-on-surface-variant hover:text-on-surface transition-colors -ml-2"
      >
        <ArrowLeft size={16} />
        Back to submissions
      </Link>

      <div>
        <p className="label-caps text-on-surface-variant mb-1">
          Submission Detail
        </p>
        <h2 className="text-2xl font-semibold text-on-surface tracking-tight">
          {form.title}
        </h2>
        <p className="flex items-center gap-1.5 mt-1 text-sm text-on-surface-variant">
          <Calendar size={14} />
          {new Date(submission.createdAt).toLocaleString()}
        </p>
      </div>

      <div className="border border-border-muted rounded-lg bg-surface-container-lowest overflow-hidden">
        <div className="px-6 py-4 border-b border-border-muted">
          <h3 className="text-sm font-semibold text-on-surface flex items-center gap-2">
            <FileText size={16} className="text-primary" />
            Submission Data
          </h3>
        </div>
        <div className="px-6 py-4">
          <dl className="divide-y divide-border-muted">
            <div className="flex items-start gap-4 py-3">
              <dt className="label-caps text-on-surface-variant w-32 shrink-0 pt-0.5">
                ID
              </dt>
              <dd className="text-sm font-mono text-on-surface break-all">
                {submission.id}
              </dd>
            </div>
            {Object.entries(data).map(([key, value]) => (
              <div key={key} className="flex items-start gap-4 py-3">
                <dt className="label-caps text-on-surface-variant w-32 shrink-0 pt-0.5">
                  {key}
                </dt>
                <dd className="text-sm text-on-surface break-words">
                  {String(value)}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </>
  );
}
