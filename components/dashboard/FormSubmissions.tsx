"use client";

import { useTransition, useMemo } from "react";
import {
    Card,
    Table,
    Button,
    Tag,
    Empty,
    Tooltip,
    Popconfirm,
    Input,
} from "antd";
import {
    ArrowLeft,
    Eye,
    Trash2,
    Search,
    Download,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useQueryState, parseAsInteger, parseAsString } from "nuqs";
import { deleteSubmission } from "@/app/actions/forms";

interface SubmissionRow {
    id: string;
    data: Record<string, unknown>;
    createdAt: Date;
}

export function FormSubmissions({
    formId,
    formTitle,
    data,
    total,
    page: initialPage,
    pageSize: initialPageSize,
    search: initialSearch,
}: {
    formId: string;
    formTitle: string;
    data: SubmissionRow[];
    total: number;
    page: number;
    pageSize: number;
    search: string;
}) {
    const router = useRouter();
    const [, startTransition] = useTransition();

    const [page, setPage] = useQueryState(
        "page",
        parseAsInteger
            .withDefault(1)
            .withOptions({ shallow: false, startTransition })
    );
    const [searchInput, setSearchInput] = useQueryState(
        "search",
        parseAsString.withDefault("").withOptions({ shallow: false, startTransition })
    );

    const columns = useMemo(
        () => [
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
                width: 100,
                render: (_: unknown, record: SubmissionRow) => (
                    <div className="flex gap-1">
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
                        <Popconfirm
                            title="Delete this submission?"
                            onConfirm={async () => {
                                await deleteSubmission(record.id);
                                router.refresh();
                            }}
                            okText="Delete"
                            okButtonProps={{ danger: true }}
                        >
                            <Tooltip title="Delete">
                                <Button
                                    type="text"
                                    size="small"
                                    danger
                                    icon={<Trash2 size={14} />}
                                />
                            </Tooltip>
                        </Popconfirm>
                    </div>
                ),
            },
        ],
        [formId, router]
    );

    const handleExport = () => {
        const a = document.createElement("a");
        a.href = `/api/forms/${formId}/export`;
        a.click();
    };

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

            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Submissions</h2>
                    <p className="mt-1 text-sm text-gray-500">
                        {formTitle} &middot; {total} total
                    </p>
                </div>
                <Button icon={<Download size={16} />} onClick={handleExport}>
                    Export CSV
                </Button>
            </div>

            <div className="flex items-center gap-2">
                <Input
                    placeholder="Search by ID..."
                    prefix={<Search size={14} className="text-gray-400" />}
                    allowClear
                    value={searchInput}
                    onChange={(e) => {
                        setSearchInput(e.target.value || null);
                        setPage(1);
                    }}
                    style={{ width: 280 }}
                />
            </div>

            <Card className="!shadow-sm">
                <Table
                    dataSource={data}
                    rowKey="id"
                    pagination={{
                        current: page,
                        pageSize: initialPageSize,
                        total,
                        onChange: (p) => setPage(p),
                        showSizeChanger: false,
                    }}
                    locale={{
                        emptyText: (
                            <div className="flex flex-col items-center justify-center py-16">
                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                                    <Eye size={28} className="text-gray-400" />
                                </div>
                                <p className="text-sm font-medium text-gray-900">
                                    {searchInput ? "No submissions match your search" : "No submissions yet"}
                                </p>
                                <p className="mt-1 text-xs text-gray-500">
                                    {searchInput
                                        ? "Try a different search term."
                                        : "Share your form to start collecting responses."}
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
