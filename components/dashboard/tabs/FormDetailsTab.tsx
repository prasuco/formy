"use client";

import { Descriptions } from "antd";
import { Link as LinkIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function FormDetailsTab({
  title,
  slug,
  submissionCount,
}: {
  title: string;
  slug: string;
  submissionCount: number;
}) {
  const endpoint = `${typeof window !== "undefined" ? window.location.origin : ""}/api/submit`;

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <Descriptions
            column={{ xs: 1, sm: 2 }}
            classNames={{
              label: "!text-on-surface-variant !font-normal !text-sm",
            }}
          >
            <Descriptions.Item
              label={<span className="label-caps">Title</span>}
            >
              <span className="text-on-surface font-semibold">{title}</span>
            </Descriptions.Item>
            <Descriptions.Item label={<span className="label-caps">Slug</span>}>
              <code className="rounded bg-surface-container-highest px-2 py-0.5 text-sm font-mono text-on-surface">
                {slug}
              </code>
            </Descriptions.Item>
            <Descriptions.Item
              label={<span className="label-caps">Submissions</span>}
            >
              <span className="text-on-surface font-bold">
                {submissionCount}
              </span>
            </Descriptions.Item>
          </Descriptions>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Submit Endpoint</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <LinkIcon size={16} className="text-on-surface-variant" />
            <code className="flex-1 rounded-lg border border-border-muted bg-surface-container-highest px-3 py-2 text-sm font-mono text-on-surface">
              POST /api/submit (slug: {slug})
            </code>
            <Button
              size="sm"
              onClick={() => navigator.clipboard.writeText(endpoint)}
            >
              Copy
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
