"use client";

import { useState } from "react";
import { config } from "@/app/lib/config";

const submitUrl = config.submitUrl;

const snippets = {
  fetch: `fetch("${submitUrl}", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    slug: "contact",
    name: "Jane Doe",
    email: "jane@example.com",
    message: "Hello!",
  }),
});`,
  curl: `curl -X POST ${submitUrl} \\
  -H "Content-Type: application/json" \\
  -d '{
    "slug": "contact",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "message": "Hello!"
  }'`,
  html: `<form action="${submitUrl}" method="POST">
  <input type="hidden" name="slug" value="contact">
  <input type="text" name="name" placeholder="Name">
  <input type="email" name="email" placeholder="Email">
  <textarea name="message" placeholder="Message"></textarea>
  <button type="submit">Send</button>
</form>`,
};

type Tab = keyof typeof snippets;

const labels: Record<Tab, string> = {
  fetch: "fetch",
  curl: "curl",
  html: "HTML form",
};

export function CodeBlock() {
  const [tab, setTab] = useState<Tab>("fetch");
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(snippets[tab]).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="max-w-2xl mx-auto rounded-xl border border-border-muted bg-surface-container-lowest overflow-hidden">
      <div className="px-5 py-3 border-b border-border-muted bg-surface-container-low flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-primary/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-outline/30" />

        <div className="flex items-center gap-0.5 ml-2 bg-surface-container-high rounded-lg p-0.5">
          {(Object.keys(snippets) as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`text-xs font-mono px-2.5 py-1 rounded-md transition-all ${
                tab === t
                  ? "bg-surface-container-lowest text-on-surface shadow-sm"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              {labels[t]}
            </button>
          ))}
        </div>

        <button
          onClick={copy}
          className="ml-auto text-xs text-on-surface-variant hover:text-on-surface transition-colors px-2 py-1 rounded hover:bg-surface-container-high"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="p-5 text-sm font-mono leading-relaxed text-on-surface overflow-x-auto select-all">
        {snippets[tab]}
      </pre>
      <div className="px-5 py-3 border-t border-border-muted bg-surface-container-low/50 text-xs font-mono text-primary">
        <span className="text-on-surface-variant mr-2">&rarr;</span> 201{" "}
        {`{ "success": true }`}
      </div>
    </div>
  );
}
