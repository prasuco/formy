"use client";

import { useEffect, useCallback } from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { LayoutDashboard, FileText, Settings, Plus } from "lucide-react";

interface FormItem {
    id: string;
    title: string;
}

export function CommandPalette({
    open,
    onClose,
    forms,
}: {
    open: boolean;
    onClose: () => void;
    forms: FormItem[];
}) {
    const router = useRouter();

    const run = useCallback(
        (action: () => void) => {
            onClose();
            action();
        },
        [onClose]
    );

    useEffect(() => {
        if (!open) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[100]">
            <div className="fixed inset-0 bg-black/40" onClick={onClose} />
            <div className="fixed inset-0 flex items-start justify-center pt-[15vh]">
                <div className="w-full max-w-lg bg-surface-container-lowest border border-border-muted rounded-xl shadow-2xl overflow-hidden">
                    <Command>
                        <Command.Input
                            placeholder="Search pages, forms, or actions..."
                            className="w-full px-5 py-4 text-sm bg-transparent border-b border-border-muted outline-none placeholder:text-on-surface-variant/50"
                            autoFocus
                        />
                        <Command.List className="max-h-72 overflow-y-auto p-2">
                            <Command.Empty className="py-8 text-center text-sm text-on-surface-variant">
                                No results
                            </Command.Empty>

                            <Command.Group heading="Pages">
                                <Command.Item
                                    onSelect={() => run(() => router.push("/dashboard"))}
                                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm cursor-pointer data-[selected=true]:bg-surface-container-high"
                                >
                                    <LayoutDashboard size={15} className="text-on-surface-variant" />
                                    Overview
                                </Command.Item>
                                <Command.Item
                                    onSelect={() => run(() => router.push("/dashboard/forms"))}
                                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm cursor-pointer data-[selected=true]:bg-surface-container-high"
                                >
                                    <FileText size={15} className="text-on-surface-variant" />
                                    Forms
                                </Command.Item>
                                <Command.Item
                                    onSelect={() => run(() => router.push("/dashboard/activity"))}
                                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm cursor-pointer data-[selected=true]:bg-surface-container-high"
                                >
                                    <FileText size={15} className="text-on-surface-variant" />
                                    Activity
                                </Command.Item>
                                <Command.Item
                                    onSelect={() => run(() => router.push("/dashboard/settings"))}
                                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm cursor-pointer data-[selected=true]:bg-surface-container-high"
                                >
                                    <Settings size={15} className="text-on-surface-variant" />
                                    Settings
                                </Command.Item>
                            </Command.Group>

                            <Command.Group heading="Actions">
                                <Command.Item
                                    onSelect={() => run(() => router.push("/dashboard/forms?create=true"))}
                                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm cursor-pointer data-[selected=true]:bg-surface-container-high"
                                >
                                    <Plus size={15} className="text-on-surface-variant" />
                                    Create new form
                                </Command.Item>
                            </Command.Group>

                            {forms.length > 0 && (
                                <Command.Group heading="Forms">
                                    {forms.map((form) => (
                                        <Command.Item
                                            key={form.id}
                                            onSelect={() => run(() => router.push(`/dashboard/forms/${form.id}`))}
                                            className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm cursor-pointer data-[selected=true]:bg-surface-container-high"
                                        >
                                            <FileText size={15} className="text-on-surface-variant" />
                                            {form.title}
                                        </Command.Item>
                                    ))}
                                </Command.Group>
                            )}
                        </Command.List>
                    </Command>
                </div>
            </div>
        </div>
    );
}
