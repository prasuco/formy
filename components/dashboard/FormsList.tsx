"use client";

import { useState } from "react";
import { Table, Button, Tag } from "antd";
import { Plus, FileText } from "lucide-react";
import Link from "next/link";
import { CreateFormDialog } from "@/components/dashboard/CreateFormDialog";

interface FormRow {
    id: string;
    title: string;
    slug: string | null;
    type: string;
    submissions: number;
}

export function FormsList({ data }: { data: FormRow[] }) {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <div className="mb-4 flex justify-end">
                <Button type="primary" icon={<Plus size={16} />} onClick={() => setOpen(true)}>
                    Create Form
                </Button>
            </div>

            <CreateFormDialog open={open} onClose={() => setOpen(false)} />

            <Table
                dataSource={data}
                rowKey="id"
                pagination={false}
                locale={{
                    emptyText: (
                        <div className="flex flex-col items-center justify-center py-16">
                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#FFC437]/10">
                                <FileText size={32} className="text-[#FFC437]" />
                            </div>
                            <p className="text-sm font-medium text-gray-900">
                                No forms yet
                            </p>
                            <p className="mt-1 text-xs text-gray-500">
                                Create your first form to get started.
                            </p>
                        </div>
                    ),
                }}
                columns={[
                    {
                        title: "Title",
                        dataIndex: "title",
                        key: "title",
                        render: (title: string, record: FormRow) => (
                            <Link
                                href={`/dashboard/forms/${record.id}`}
                                className="flex items-center gap-2 text-[#EA4335] hover:text-[#d33426]"
                            >
                                <FileText size={16} />
                                {title}
                            </Link>
                        ),
                    },
                    {
                        title: "Slug",
                        dataIndex: "slug",
                        key: "slug",
                        render: (slug: string | null) =>
                            slug ? (
                                <code className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                                    {slug}
                                </code>
                            ) : (
                                <span className="text-gray-400">—</span>
                            ),
                    },
                    {
                        title: "Type",
                        dataIndex: "type",
                        key: "type",
                        render: (type: string) => (
                            <Tag color={type === "SCHEMA" ? "blue" : "default"}>
                                {type}
                            </Tag>
                        ),
                    },
                    {
                        title: "Submissions",
                        dataIndex: "submissions",
                        key: "submissions",
                        align: "right",
                    },
                ]}
            />
        </div>
    );
}
