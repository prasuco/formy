"use client";

import { Card, Descriptions, Button } from "antd";
import { Link as LinkIcon } from "lucide-react";

export function FormDetailsTab({
    title,
    slug,
    submissionCount,
}: {
    title: string;
    slug: string;
    submissionCount: number;
}) {
    return (
        <div className="space-y-8">
            <Card className="!shadow-sm">
                <Descriptions
                    column={{ xs: 1, sm: 2 }}
                    classNames={{ label: "!text-gray-500 !font-normal" }}
                >
                    <Descriptions.Item label="Title">{title}</Descriptions.Item>
                    <Descriptions.Item label="Slug">
                        <code className="rounded bg-gray-100 px-2 py-0.5 text-xs">
                            {slug}
                        </code>
                    </Descriptions.Item>
                    <Descriptions.Item label="Submissions">
                        {submissionCount}
                    </Descriptions.Item>
                </Descriptions>
            </Card>

            <Card title="Submit Endpoint" className="!shadow-sm">
                <div className="flex items-center gap-2">
                    <LinkIcon size={16} className="text-gray-400" />
                    <code className="flex-1 rounded bg-gray-50 px-3 py-2 text-sm text-gray-700">
                        POST /api/submit (slug: {slug})
                    </code>
                    <Button
                        type="primary"
                        size="small"
                        onClick={() =>
                            navigator.clipboard.writeText(
                                `${typeof window !== "undefined" ? window.location.origin : ""}/api/submit`
                            )
                        }
                    >
                        Copy
                    </Button>
                </div>
            </Card>
        </div>
    );
}
