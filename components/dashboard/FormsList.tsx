"use client";

import { useState, useTransition } from "react";
import { Plus, FileText, Trash2 } from "lucide-react";
import Link from "next/link";
import { CreateFormDialog } from "@/components/dashboard/CreateFormDialog";
import { deleteForm } from "@/app/actions/forms";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface FormRow {
  id: string;
  title: string;
  slug: string;
  submissions: number;
  createdAt: string;
}

export function FormsList({ data }: { data: FormRow[] }) {
  const [open, setOpen] = useState(false);
  const [, startTransition] = useTransition();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-on-surface tracking-tight">
            Forms
          </h1>
          <p className="text-sm text-on-surface-variant mt-1">
            {data.length} form{data.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Button onClick={() => setOpen(true)}>
          <Plus size={16} />
          New form
        </Button>
      </div>

      <CreateFormDialog open={open} onClose={() => setOpen(false)} />

      {data.length === 0 ? (
        <div className="border border-border-muted rounded-lg bg-surface-container-lowest">
          <div className="flex flex-col items-center justify-center py-24">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <FileText size={24} className="text-primary" />
            </div>
            <h3 className="text-base font-semibold text-on-surface mb-1">
              No forms yet
            </h3>
            <p className="text-sm text-on-surface-variant mb-6">
              Create your first form to start collecting submissions.
            </p>
            <Button size="lg" onClick={() => setOpen(true)}>
              <Plus size={18} />
              Create your first form
            </Button>
          </div>
        </div>
      ) : (
        <div className="border border-border-muted rounded-lg overflow-hidden bg-surface-container-lowest">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Slug</th>
                <th className="text-right">Submissions</th>
                <th className="hidden sm:table-cell">Created</th>
                <th className="w-12" />
              </tr>
            </thead>
            <tbody>
              {data.map((form) => (
                <tr key={form.id}>
                  <td>
                    <Link
                      href={`/dashboard/forms/${form.id}`}
                      className="text-sm font-medium text-on-surface hover:text-primary transition-colors"
                    >
                      {form.title}
                    </Link>
                  </td>
                  <td>
                    <code>/ {form.slug}</code>
                  </td>
                  <td className="text-right">
                    <span className="text-sm font-semibold text-on-surface">
                      {form.submissions}
                    </span>
                  </td>
                  <td className="hidden sm:table-cell">
                    <span className="text-xs text-on-surface-variant">
                      {formatDate(form.createdAt)}
                    </span>
                  </td>
                  <td>
                    <AlertDialog>
                      <AlertDialogTrigger
                        render={
                          <button
                            type="button"
                            className="p-1 text-on-surface-variant hover:text-destructive transition-colors rounded"
                          />
                        }
                      >
                        <Trash2 size={14} />
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete this form?</AlertDialogTitle>
                          <AlertDialogDescription>
                            All submissions will be permanently deleted.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            variant="destructive"
                            onClick={() =>
                              startTransition(() => deleteForm(form.id))
                            }
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
