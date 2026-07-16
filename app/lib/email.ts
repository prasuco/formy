import { render } from "@react-email/components";
import { NotificationEmail } from "@/components/emails/NotificationEmail";

const resendKey = process.env.RESEND_KEY ?? "";
const resendFrom = process.env.RESEND_FROM ?? "";

export async function sendNotification(opts: {
  to: string;
  logoUrl: string;
  formTitle: string;
  submissionId: string;
  data: Record<string, unknown>;
  submittedAt: string;
}) {
  const html = render(
    NotificationEmail({
      logoUrl: opts.logoUrl,
      formTitle: opts.formTitle,
      submissionId: opts.submissionId,
      data: opts.data,
      submittedAt: opts.submittedAt,
    }),
  );

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: resendFrom,
      to: opts.to,
      subject: `New submission — ${opts.formTitle}`,
      html,
    }),
  });

  if (!res.ok) {
    console.error("Failed to send email notification", await res.text());
  }
}
