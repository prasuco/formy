"use client";

import { useState } from "react";
import { Card, Button } from "antd";
import { Check } from "lucide-react";

export function FormIntegrationTab({ slug }: { slug: string }) {
    const [jsonCopied, setJsonCopied] = useState(false);
    const [htmlCopied, setHtmlCopied] = useState(false);

    const endpoint = "/api/submit";

    const jsonSnippet = `fetch("${endpoint}", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    "slug": "${slug}",
    "name": "John Doe",
    "email": "john@example.com"
  })
});`;

    const htmlSnippet = `<form action="${endpoint}" method="POST" enctype="multipart/form-data">
  <input type="hidden" name="slug" value="${slug}" />
  <input type="text" name="name" placeholder="Name" required />
  <input type="email" name="email" placeholder="Email" required />
  <button type="submit">Submit</button>
</form>`;

    return (
        <Card className="!shadow-sm">
            <div className="space-y-8">
                <div>
                    <p className="mb-1 text-sm text-gray-600">
                        Submit data from your own frontend. CORS is enabled for all origins.
                        Accepts{" "}
                        <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs">
                            multipart/form-data
                        </code>{" "}
                        and{" "}
                        <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs">
                            application/json
                        </code>
                        .
                    </p>
                </div>

                <div>
                    <h4 className="mb-2 text-sm font-semibold text-gray-700">Endpoint</h4>
                    <div className="flex items-center gap-2">
                        <code className="flex-1 rounded bg-gray-50 px-3 py-2 text-sm text-gray-700">
                            POST {endpoint}
                        </code>
                        <Button
                            size="small"
                            type="text"
                            icon={jsonCopied ? <Check size={14} /> : undefined}
                            onClick={() => {
                                navigator.clipboard.writeText(endpoint);
                                setJsonCopied(true);
                                setTimeout(() => setJsonCopied(false), 2000);
                            }}
                        >
                            {jsonCopied ? "Copied" : "Copy"}
                        </Button>
                    </div>
                </div>

                <div>
                    <h4 className="mb-2 text-sm font-semibold text-gray-700">Fetch (JSON)</h4>
                    <pre className="overflow-x-auto rounded-lg border border-gray-200 bg-gray-50 p-4 text-xs text-gray-800">
                        {jsonSnippet}
                    </pre>
                    <Button
                        size="small"
                        className="mt-2"
                        icon={jsonCopied ? <Check size={14} /> : undefined}
                        onClick={() => {
                            navigator.clipboard.writeText(jsonSnippet);
                            setJsonCopied(true);
                            setTimeout(() => setJsonCopied(false), 2000);
                        }}
                    >
                        {jsonCopied ? "Copied" : "Copy"}
                    </Button>
                </div>

                <div>
                    <h4 className="mb-2 text-sm font-semibold text-gray-700">Form action</h4>
                    <pre className="overflow-x-auto rounded-lg border border-gray-200 bg-gray-50 p-4 text-xs text-gray-800">
                        {htmlSnippet}
                    </pre>
                    <Button
                        size="small"
                        className="mt-2"
                        icon={htmlCopied ? <Check size={14} /> : undefined}
                        onClick={() => {
                            navigator.clipboard.writeText(htmlSnippet);
                            setHtmlCopied(true);
                            setTimeout(() => setHtmlCopied(false), 2000);
                        }}
                    >
                        {htmlCopied ? "Copied" : "Copy"}
                    </Button>
                </div>
            </div>
        </Card>
    );
}
