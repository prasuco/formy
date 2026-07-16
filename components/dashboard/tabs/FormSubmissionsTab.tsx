"use client";

import { Table } from "antd";
import { Eye, Search, Download } from "lucide-react";
import type { ColumnsType } from "antd/es/table";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
    onExport: (format: string) => void;
    columns: ColumnsType<SubmissionRow>;
}) {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <p className="text-sm text-on-surface-variant">{total} total</p>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                        <Input
                            placeholder="Search by ID..."
                            className="w-[280px] pl-9"
                            value={searchInput}
                            onChange={(e) => {
                                onSearchChange(e.target.value || null);
                                onPageChange(1);
                            }}
                        />
                    </div>
                    <div className="flex items-center gap-1">
                        <Button variant="outline" size="sm" onClick={() => onExport("csv")}>
                            <Download size={14} />
                            CSV
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => onExport("json")}>
                            <Download size={14} />
                            JSON
                        </Button>
                    </div>
                </div>
            </div>

            <div className="bg-surface-container-lowest border border-border-muted rounded-xl overflow-hidden">
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
                            <div className="flex flex-col items-center justify-center py-24">
                                <div className="relative w-32 h-32 mb-6">
                                    <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl opacity-50" />
                                    <div className="relative w-full h-full flex items-center justify-center">
                                        <Eye size={48} className="text-primary/40" />
                                    </div>
                                </div>
                                <p className="text-base font-semibold text-on-surface">
                                    {searchInput
                                        ? "No submissions match your search"
                                        : "No submissions yet"}
                                </p>
                                <p className="mt-1 text-sm text-on-surface-variant">
                                    {searchInput
                                        ? "Try a different search term."
                                        : "POST to /api/submit to start collecting responses."}
                                </p>
                            </div>
                        ),
                    }}
                    columns={columns}
                />
            </div>
        </div>
    );
}
