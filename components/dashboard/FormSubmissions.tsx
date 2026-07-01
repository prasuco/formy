"use client";

import { Card, Table, Button, Tag, Empty, Tooltip } from "antd";
import { ArrowLeft, Eye } from "lucide-react";
import { useRouter } from "next/navigation";

interface SubmissionRow {
    id: string;
    data: Record<string, unknown>;
    createdAt: Date;
}

export function FormSubmissions({
    formId,
    formTitle,
    data,
}: {
    formId: string;
    formTitle: string;
    data: SubmissionRow[];
}) {
    const router = useRouter();

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            width: 80,
            render: (id: string) => (
                <code className="text-xs text-gray-500">
                    {id.slice(0, 8)}…
                </code>
            ),
        },
        {
            title: "Data",
            key: "data",
            render: (_: unknown, record: SubmissionRow) => {
                const entries = Object.entries(record.data).slice(0, 3);
                return (
                    <div className="flex flex-wrap gap-1">
                        {entries.map(([key, value]) => (
                            <Tag key={key} className="!text-xs">
                                {key}: {String(value).slice(0, 30)}
                            </Tag>
                        ))}
                        {Object.keys(record.data).length > 3 && (
                            <Tag className="!text-xs !text-gray-400">
                                +{Object.keys(record.data).length - 3} more
                            </Tag>
                        )}
                    </div>
                );
            },
        },
        {
            title: "Submitted",
            dataIndex: "createdAt",
            key: "createdAt",
            width: 180,
            render: (date: Date) => (
                <span className="text-sm text-gray-600">
                    {new Date(date).toLocaleString()}
                </span>
            ),
        },
        {
            title: "",
            key: "actions",
            width: 60,
            render: (_: unknown, record: SubmissionRow) => (
                <Tooltip title="View details">
                    <Button
                        type="text"
                        size="small"
                        icon={<Eye size={14} />}
                        onClick={() =>
                            router.push(
                                `/dashboard/forms/${formId}/submissions/${record.id}`
                            )
                        }
                    />
                </Tooltip>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            <Button
                type="text"
                icon={<ArrowLeft size={16} />}
                onClick={() => router.push(`/dashboard/forms/${formId}`)}
                className="!-ml-2"
            >
                Back to form
            </Button>

            <div>
                <h2 className="text-2xl font-bold text-gray-900">Submissions</h2>
                <p className="mt-1 text-sm text-gray-500">
                    {formTitle} &middot; {data.length} total
                </p>
            </div>

            <Card className="!shadow-sm">
                <Table
                    dataSource={data}
                    rowKey="id"
                    pagination={{ pageSize: 20, showSizeChanger: false }}
                    locale={{
                        emptyText: (
                            <div className="flex flex-col items-center justify-center py-16">
                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                                    <Eye size={28} className="text-gray-400" />
                                </div>
                                <p className="text-sm font-medium text-gray-900">
                                    No submissions yet
                                </p>
                                <p className="mt-1 text-xs text-gray-500">
                                    Share your form to start collecting responses.
                                </p>
                            </div>
                        ),
                    }}
                    columns={columns}
                />
            </Card>
        </div>
    );
}
