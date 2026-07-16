"use client";

import Link from "next/link";
import { useState } from "react";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ActivityItem {
    id: string;
    formTitle: string;
    formId: string;
    createdAt: string;
}

export function ActivityLog({
    items,
    page,
    total,
    pageSize,
}: {
    items: ActivityItem[];
    page: number;
    total: number;
    pageSize: number;
}) {
    const totalPages = Math.ceil(total / pageSize);

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-xl font-semibold text-on-surface tracking-tight">Activity</h1>
                <p className="text-sm text-on-surface-variant mt-1">{total} submission{total !== 1 ? "s" : ""}</p>
            </div>

            {items.length === 0 ? (
                <div className="border border-border-muted rounded-lg bg-surface-container-lowest">
                    <div className="flex flex-col items-center justify-center py-24">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                            <FileText size={24} className="text-primary" />
                        </div>
                        <h3 className="text-base font-semibold text-on-surface mb-1">No activity yet</h3>
                        <p className="text-sm text-on-surface-variant">Submissions will appear here.</p>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="space-y-1">
                        {items.map((a) => (
                            <Link
                                key={a.id}
                                href={`/dashboard/forms/${a.formId}/submissions/${a.id}`}
                                className="flex items-center justify-between px-4 py-3 rounded-lg bg-surface-container-lowest border border-border-muted hover:border-primary/30 transition-colors group"
                            >
                                <div className="min-w-0">
                                    <p className="text-sm font-medium text-on-surface group-hover:text-primary transition-colors">
                                        {a.formTitle}
                                    </p>
                                    <p className="text-xs text-on-surface-variant mt-0.5">New submission</p>
                                </div>
                                <p className="text-xs text-on-surface-variant shrink-0 ml-4">{timeAgo(a.createdAt)}</p>
                            </Link>
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <Pagination current={page} total={totalPages} />
                    )}
                </div>
            )}
        </div>
    );
}

function Pagination({ current, total }: { current: number; total: number }) {
    const [page, setPage] = useState(current);

    return (
        <div className="flex items-center justify-center gap-2 mt-6">
            <Button
                variant="outline"
                size="sm"
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
            >
                Previous
            </Button>
            <span className="text-xs text-on-surface-variant px-2">
                Page {page} of {total}
            </span>
            <Button
                variant="outline"
                size="sm"
                disabled={page >= total}
                onClick={() => setPage(page + 1)}
            >
                Next
            </Button>
        </div>
    );
}

function timeAgo(dateStr: string): string {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    if (days < 30) return `${days}d ago`;
    const months = Math.floor(days / 30);
    return `${months}mo ago`;
}
