"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ENDPOINT = "/api/submit";

function SnippetBlock({ label, code }: { label: string; code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div>
      <h4 className="label-caps text-on-surface-variant mb-2">{label}</h4>
      <pre className="overflow-x-auto rounded-lg border border-border-muted bg-surface-container-highest p-4 text-sm font-mono text-on-surface">
        {code.trim()}
      </pre>
      <Button
        size="sm"
        variant="outline"
        className="mt-2"
        onClick={() => {
          navigator.clipboard.writeText(code.trim());
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }}
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
        {copied ? "Copied" : "Copy"}
      </Button>
    </div>
  );
}

export function FormIntegrationTab({ slug }: { slug: string }) {
  const endpointCopied = useState(false);
  const [, setEndpoint] = endpointCopied;

  const fullEndpoint = `${typeof window !== "undefined" ? window.location.origin : ""}${ENDPOINT}`;

  const jsonSnippet = `fetch("${fullEndpoint}", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    "slug": "${slug}",
    "name": "John Doe",
    "email": "john@example.com"
  })
});`;

  const formHtmlSnippet = `<form action="${fullEndpoint}" method="POST">
  <input type="hidden" name="slug" value="${slug}" />
  <input type="text" name="name" placeholder="Name" required />
  <input type="email" name="email" placeholder="Email" required />
  <button type="submit">Submit</button>
</form>`;

  const curlSnippet = `curl -X POST ${fullEndpoint} \\
  -H "Content-Type: application/json" \\
  -d '{"slug": "${slug}", "name": "John Doe"}'`;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">How to integrate</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm text-on-surface-variant">
            POST JSON or form data to the endpoint below. CORS is enabled for
            all origins.
          </p>

          <div>
            <h4 className="label-caps text-on-surface-variant mb-2">
              Endpoint
            </h4>
            <div className="flex items-center gap-2">
              <code className="flex-1 rounded-lg border border-border-muted bg-surface-container-highest px-3 py-2 text-sm font-mono text-on-surface">
                POST {ENDPOINT}
              </code>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  navigator.clipboard.writeText(fullEndpoint);
                  setEndpoint(true);
                  setTimeout(() => setEndpoint(false), 2000);
                }}
              >
                Copy
              </Button>
            </div>
          </div>

          <SnippetBlock label="Fetch (JSON)" code={jsonSnippet} />
          <SnippetBlock label="HTML form" code={formHtmlSnippet} />
          <SnippetBlock label="cURL" code={curlSnippet} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Request format</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="divide-y divide-border-muted">
            <div className="flex items-start gap-4 py-2.5">
              <dt className="label-caps text-on-surface-variant w-32 shrink-0">
                slug
              </dt>
              <dd className="text-sm text-on-surface">
                Your form&apos;s unique slug (required)
              </dd>
            </div>
            <div className="flex items-start gap-4 py-2.5">
              <dt className="label-caps text-on-surface-variant w-32 shrink-0">
                formId
              </dt>
              <dd className="text-sm text-on-surface">
                Form ID as alternative to slug
              </dd>
            </div>
            <div className="flex items-start gap-4 py-2.5">
              <dt className="label-caps text-on-surface-variant w-32 shrink-0">
                Content-Type
              </dt>
              <dd className="text-sm text-on-surface">
                <code className="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs font-mono">
                  application/json
                </code>{" "}
                or{" "}
                <code className="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs font-mono">
                  multipart/form-data
                </code>
              </dd>
            </div>
            <div className="flex items-start gap-4 py-2.5">
              <dt className="label-caps text-on-surface-variant w-32 shrink-0">
                Response
              </dt>
              <dd className="text-sm text-on-surface">
                <code className="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs font-mono">
                  201 {'{ "success": true }'}
                </code>{" "}
                (JSON) or 303 redirect to success page (form)
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </div>
  );
}
