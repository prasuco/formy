"use client";

import { Card, Descriptions, Tag, Button, Empty, Table } from "antd";
import {
    ArrowLeft,
    Eye,
    BarChart3,
    Link as LinkIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";

export function FormDetails({
    id,
    title,
    slug,
    type,
    submissionCount,
    schema,
    createdAt,
}: {
    id: string;
    title: string;
    slug: string | null;
    type: string;
    submissionCount: number;
    schema: unknown;
    createdAt: Date | null;
}) {
    const router = useRouter();

    const publicUrl = slug
        ? `${typeof window !== "undefined" ? window.location.origin : ""}/f/${slug}`
        : null;

    return (
        <div className="space-y-6">
            <Button
                type="text"
                icon={<ArrowLeft size={16} />}
                onClick={() => router.push("/dashboard/forms")}
                className="!-ml-2"
            >
                Back to forms
            </Button>

            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Form ID: {id}
                    </p>
                </div>

                <div className="flex gap-2">
                    {publicUrl && (
                        <Button icon={<Eye size={16} />}>
                            Preview
                        </Button>
                    )}
                    <Button
                        type="primary"
                        icon={<BarChart3 size={16} />}
                        onClick={() => router.push(`/dashboard/forms/${id}/submissions`)}
                    >
                        Submissions ({submissionCount})
                    </Button>
                </div>
            </div>

            <Card className="!shadow-sm">
                <Descriptions
                    column={{ xs: 1, sm: 2 }}
                    classNames={{ label: "!text-gray-500 !font-normal" }}
                >
                    <Descriptions.Item label="Title">{title}</Descriptions.Item>
                    <Descriptions.Item label="Type">
                        <Tag color={type === "SCHEMA" ? "blue" : "default"}>
                            {type === "SCHEMA" ? "Schema-based" : "No schema"}
                        </Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="Slug">
                        {slug ? (
                            <code className="rounded bg-gray-100 px-2 py-0.5 text-xs">
                                {slug}
                            </code>
                        ) : (
                            <span className="text-gray-400">—</span>
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item label="Submissions">
                        {submissionCount}
                    </Descriptions.Item>
                </Descriptions>
            </Card>

            {publicUrl && (
                <Card title="Public URL" className="!shadow-sm">
                    <div className="flex items-center gap-2">
                        <LinkIcon size={16} className="text-gray-400" />
                        <code className="flex-1 rounded bg-gray-50 px-3 py-2 text-sm text-gray-700">
                            {publicUrl}
                        </code>
                        <Button
                            type="primary"
                            size="small"
                            onClick={() => navigator.clipboard.writeText(publicUrl!)}
                        >
                            Copy
                        </Button>
                    </div>
                </Card>
            )}

            <Card title="Schema" className="!shadow-sm">
                {schema ? (
                    <Table
                        dataSource={
                            Array.isArray(schema)
                                ? (schema as Record<string, unknown>[])
                                : []
                        }
                        rowKey="id"
                        pagination={false}
                        size="small"
                        columns={[
                            {
                                title: "Field",
                                dataIndex: "label",
                                key: "label",
                            },
                            {
                                title: "Type",
                                dataIndex: "type",
                                key: "type",
                                render: (t: string) => <Tag>{t}</Tag>,
                            },
                            {
                                title: "Required",
                                dataIndex: "required",
                                key: "required",
                                render: (r: boolean) =>
                                    r ? (
                                        <span className="text-red-500">Yes</span>
                                    ) : (
                                        <span className="text-gray-400">No</span>
                                    ),
                            },
                        ]}
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                        <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description="No schema defined"
                        />
                    </div>
                )}
            </Card>
        </div>
    );
}
