"use client";

import { useState } from "react";
import { FileText, Send, Plus, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { CreateFormDialog } from "@/components/dashboard/CreateFormDialog";
import { Button } from "@/components/ui/button";

interface FormItem {
    id: string;
    title: string;
    slug: string;
    submissions: number;
    createdAt: string;
}

interface ActivityItem {
    id: string;
    formTitle: string;
    formId: string;
    createdAt: string;
}

export function DashboardHome({
    totalForms,
    totalSubmissions,
    recentSubmissions,
    weeklySubmissions,
    recentForms,
    recentActivity,
}: {
    totalForms: number;
    totalSubmissions: number;
    recentSubmissions: number;
    weeklySubmissions: number;
    recentForms: FormItem[];
    recentActivity: ActivityItem[];
}) {
    const [open, setOpen] = useState(false);
    const hasForms = totalForms > 0;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-xl font-semibold text-on-surface tracking-tight">Overview</h1>
                <p className="text-sm text-on-surface-variant mt-1">
                    {hasForms
                        ? `${totalSubmissions} total submissions across ${totalForms} forms`
                        : "Create your first form to get started"}
                </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: "Total Forms", value: totalForms, icon: FileText },
                    { label: "Submissions", value: totalSubmissions, icon: Send },
                    { label: "Last 30 Days", value: recentSubmissions, icon: Send },
                    { label: "This Week", value: weeklySubmissions, icon: Send },
                ].map((stat) => (
                    <div key={stat.label} className="bg-surface-container-lowest border border-border-muted rounded-lg p-5">
                        <p className="text-xs text-on-surface-variant mb-1">{stat.label}</p>
                        <p className="text-2xl font-bold text-on-surface">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="flex items-center gap-4">
                <Button onClick={() => setOpen(true)}>
                    <Plus size={16} />
                    New form
                </Button>
                {hasForms && (
                    <Link
                        href="/dashboard/forms"
                        className="inline-flex shrink-0 items-center justify-center rounded-lg border border-border bg-background hover:bg-muted hover:text-foreground h-8 gap-1.5 px-2.5 text-sm font-medium whitespace-nowrap transition-all"
                    >
                        <FileText size={16} />
                        View all forms
                    </Link>
                )}
            </div>

            <CreateFormDialog open={open} onClose={() => setOpen(false)} />

            {hasForms && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-surface-container-lowest border border-border-muted rounded-lg p-5">
                        <h2 className="text-sm font-semibold text-on-surface mb-4">Recent forms</h2>
                        {recentForms.length === 0 ? (
                            <p className="text-sm text-on-surface-variant">No forms yet</p>
                        ) : (
                            <div className="space-y-3">
                                {recentForms.map((f) => (
                                    <Link
                                        key={f.id}
                                        href={`/dashboard/forms/${f.id}`}
                                        className="flex items-center justify-between group"
                                    >
                                        <div>
                                            <p className="text-sm font-medium text-on-surface group-hover:text-primary transition-colors">
                                                {f.title}
                                            </p>
                                            <p className="text-xs text-on-surface-variant mt-0.5">
                                                {f.submissions} submission{f.submissions !== 1 ? "s" : ""}
                                            </p>
                                        </div>
                                        <ArrowUpRight size={14} className="text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="bg-surface-container-lowest border border-border-muted rounded-lg p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-sm font-semibold text-on-surface">Recent activity</h2>
                            <Link
                                href="/dashboard/activity"
                                className="text-xs text-primary hover:underline"
                            >
                                View all
                            </Link>
                        </div>
                        {recentActivity.length === 0 ? (
                            <p className="text-sm text-on-surface-variant">No activity yet</p>
                        ) : (
                            <div className="space-y-3">
                                {recentActivity.map((a) => (
                                    <Link
                                        key={a.id}
                                        href={`/dashboard/forms/${a.formId}/submissions/${a.id}`}
                                        className="flex items-center justify-between group"
                                    >
                                        <div className="min-w-0">
                                            <p className="text-sm text-on-surface truncate group-hover:text-primary transition-colors">
                                                New submission on {a.formTitle}
                                            </p>
                                            <p className="text-xs text-on-surface-variant mt-0.5">
                                                {timeAgo(a.createdAt)}
                                            </p>
                                        </div>
                                        <ArrowUpRight size={14} className="text-on-surface-variant shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
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
    return `${days}d ago`;
}
