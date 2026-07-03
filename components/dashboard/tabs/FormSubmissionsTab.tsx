"use client";

import { Input, Card, Table, Button } from "antd";
import { Eye, Search, Download } from "lucide-react";
import type { ColumnsType } from "antd/es/table";

interface SubmissionRow {
    id: string;
    data: Record<string, unknown>;
    createdAt: Date;
}

export function FormSubmissionsTab({
    formId,
    submissions,
    total,
    page,
    pageSize,
    searchInput,
    onPageChange,
    onSearchChange,
    onExport,
    columns,
}: {
    formId: string;
    submissions: SubmissionRow[];
    total: number;
    page: number;
    pageSize: number;
    searchInput: string;
    onPageChange: (page: number) => void;
    onSearchChange: (value: string | null) => void;
    onExport: () => void;
    columns: ColumnsType<SubmissionRow>;
}) {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">{total} total</p>
                <div className="flex items-center gap-2">
                    <Input
                        placeholder="Search by ID..."
                        prefix={<Search size={14} className="text-gray-400" />}
                        allowClear
                        value={searchInput}
                        onChange={(e) => {
                            onSearchChange(e.target.value || null);
                            onPageChange(1);
                        }}
                        style={{ width: 280 }}
                    />
                    <Button icon={<Download size={16} />} onClick={onExport}>
                        Export CSV
                    </Button>
                </div>
            </div>

            <Card className="!shadow-sm">
                <Table
                    dataSource={submissions}
                    rowKey="id"
                    pagination={{
                        current: page,
                        pageSize,
                        total,
                        onChange: (p) => onPageChange(p),
                        showSizeChanger: false,
                    }}
                    locale={{
                        emptyText: (
                            <div className="flex flex-col items-center justify-center py-16">
                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                                    <Eye size={28} className="text-gray-400" />
                                </div>
                                <p className="text-sm font-medium text-gray-900">
                                    {searchInput
                                        ? "No submissions match your search"
                                        : "No submissions yet"}
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
