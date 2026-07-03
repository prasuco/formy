"use client";

import { useTransition, useMemo } from "react";
import { Tabs, Button, Tag, Tooltip, Popconfirm, Form } from "antd";
import { ArrowLeft, BarChart3, Eye, Code2, Edit3, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQueryState, parseAsInteger, parseAsString } from "nuqs";
import { updateForm, deleteForm, deleteSubmission } from "@/app/actions/forms";
import { FormDetailsTab } from "@/components/dashboard/tabs/FormDetailsTab";
import { FormSubmissionsTab } from "@/components/dashboard/tabs/FormSubmissionsTab";
import { FormIntegrationTab } from "@/components/dashboard/tabs/FormIntegrationTab";
import { FormSettingsTab } from "@/components/dashboard/tabs/FormSettingsTab";

interface SubmissionRow {
    id: string;
    data: Record<string, unknown>;
    createdAt: Date;
}

export function FormTabs({
    id,
    title,
    slug,
    submissionCount,
    submissions: initialSubmissions,
    total: initialTotal,
    page: _page,
    pageSize,
}: {
    id: string;
    title: string;
    slug: string;
    submissionCount: number;
    submissions: SubmissionRow[];
    total: number;
    page: number;
    pageSize: number;
}) {
    const router = useRouter();
    const [pending, startTransition] = useTransition();
    const [editForm] = Form.useForm();

    const [page, setPage] = useQueryState(
        "page",
        parseAsInteger.withDefault(1).withOptions({ shallow: false, startTransition })
    );
    const [searchInput, setSearchInput] = useQueryState(
        "search",
        parseAsString.withDefault("").withOptions({ shallow: false, startTransition })
    );

    const handleEdit = (values: Record<string, string>) => {
        const fd = new FormData();
        fd.set("title", values.title);
        fd.set("slug", values.slug || "");
        startTransition(() => updateForm(id, fd));
    };

    const handleDelete = () => startTransition(() => deleteForm(id));

    const handleExport = () => {
        const a = document.createElement("a");
        a.href = `/api/forms/${id}/export`;
        a.click();
    };

    const columns = useMemo(
        () => [
            {
                title: "ID",
                dataIndex: "id",
                key: "id",
                width: 80,
                render: (rid: string) => (
                    <code className="text-xs text-gray-500">{rid.slice(0, 8)}…</code>
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
                                        `/dashboard/forms/${id}/submissions/${record.id}`
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
        [id, router]
    );

    return (
        <div className="space-y-8">
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
                    <p className="mt-1 text-sm text-gray-500">Form ID: {id}</p>
                </div>
            </div>

            <Tabs
                defaultActiveKey="details"
                items={[
                    {
                        key: "details",
                        label: (
                            <span className="flex items-center gap-2">
                                <BarChart3 size={16} />
                                Details
                            </span>
                        ),
                        children: (
                            <FormDetailsTab
                                title={title}
                                slug={slug}
                                submissionCount={submissionCount}
                            />
                        ),
                    },
                    {
                        key: "submissions",
                        label: (
                            <span className="flex items-center gap-2">
                                <Eye size={16} />
                                Submissions
                                {submissionCount > 0 && (
                                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                                        {submissionCount}
                                    </span>
                                )}
                            </span>
                        ),
                        children: (
                            <FormSubmissionsTab
                                formId={id}
                                submissions={initialSubmissions}
                                total={initialTotal}
                                page={page}
                                pageSize={pageSize}
                                searchInput={searchInput}
                                onPageChange={setPage}
                                onSearchChange={setSearchInput}
                                onExport={handleExport}
                                columns={columns}
                            />
                        ),
                    },
                    {
                        key: "integration",
                        label: (
                            <span className="flex items-center gap-2">
                                <Code2 size={16} />
                                Integration
                            </span>
                        ),
                        children: <FormIntegrationTab slug={slug} />,
                    },
                    {
                        key: "settings",
                        label: (
                            <span className="flex items-center gap-2">
                                <Edit3 size={16} />
                                Settings
                            </span>
                        ),
                        children: (
                            <FormSettingsTab
                                id={id}
                                editForm={editForm}
                                pending={pending}
                                initialTitle={title}
                                initialSlug={slug}
                                handleEdit={handleEdit}
                                handleDelete={handleDelete}
                            />
                        ),
                    },
                ]}
            />
        </div>
    );
}
