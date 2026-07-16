"use client";

import { useTransition, useMemo } from "react";
import { Tabs, Form } from "antd";
import { ArrowLeft, BarChart3, Eye, Code2, Edit3, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  useQueryState,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
} from "nuqs";
import { updateForm, deleteForm, deleteSubmission } from "@/app/actions/forms";
import { FormDetailsTab } from "@/components/dashboard/tabs/FormDetailsTab";
import { FormSubmissionsTab } from "@/components/dashboard/tabs/FormSubmissionsTab";
import { FormIntegrationTab } from "@/components/dashboard/tabs/FormIntegrationTab";
import { FormSettingsTab } from "@/components/dashboard/tabs/FormSettingsTab";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
  webhookUrl: initialWebhookUrl,
}: {
  id: string;
  title: string;
  slug: string;
  submissionCount: number;
  submissions: SubmissionRow[];
  total: number;
  page: number;
  pageSize: number;
  webhookUrl: string | null;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [editForm] = Form.useForm();

  const [tab, setTab] = useQueryState(
    "tab",
    parseAsStringLiteral([
      "details",
      "submissions",
      "integration",
      "settings",
    ] as const)
      .withDefault("details")
      .withOptions({ shallow: false, startTransition }),
  );
  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger
      .withDefault(1)
      .withOptions({ shallow: false, startTransition }),
  );
  const [searchInput, setSearchInput] = useQueryState(
    "search",
    parseAsString
      .withDefault("")
      .withOptions({ shallow: false, startTransition }),
  );

  const handleEdit = (values: Record<string, string>) => {
    const fd = new FormData();
    fd.set("title", values.title);
    fd.set("slug", values.slug || "");
    fd.set("webhookUrl", values.webhookUrl || "");
    startTransition(() => updateForm(id, fd));
  };

  const handleDelete = () => startTransition(() => deleteForm(id));

  const handleExport = (format: string) => {
    const a = document.createElement("a");
    a.href = `/api/forms/${id}/export?format=${format}`;
    a.click();
  };

  const columns = useMemo(
    () => [
      {
        title: <span className="label-caps text-on-surface-variant">ID</span>,
        dataIndex: "id",
        key: "id",
        width: 80,
        render: (rid: string) => (
          <code className="text-xs font-mono text-on-surface-variant">
            {rid.slice(0, 8)}…
          </code>
        ),
      },
      {
        title: <span className="label-caps text-on-surface-variant">Data</span>,
        key: "data",
        render: (_: unknown, record: SubmissionRow) => {
          const entries = Object.entries(record.data).slice(0, 3);
          return (
            <div className="flex flex-wrap gap-1">
              {entries.map(([key, value]) => (
                <Badge
                  key={key}
                  variant="outline"
                  className="text-xs font-mono"
                >
                  {key}: {String(value).slice(0, 30)}
                </Badge>
              ))}
              {Object.keys(record.data).length > 3 && (
                <Badge
                  variant="outline"
                  className="text-xs text-on-surface-variant"
                >
                  +{Object.keys(record.data).length - 3} more
                </Badge>
              )}
            </div>
          );
        },
      },
      {
        title: (
          <span className="label-caps text-on-surface-variant">Submitted</span>
        ),
        dataIndex: "createdAt",
        key: "createdAt",
        width: 180,
        render: (date: Date) => (
          <span className="text-sm text-on-surface-variant">
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
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() =>
                      router.push(
                        `/dashboard/forms/${id}/submissions/${record.id}`,
                      )
                    }
                  />
                }
              >
                <Eye size={14} />
              </TooltipTrigger>
              <TooltipContent>View details</TooltipContent>
            </Tooltip>
            <AlertDialog>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <AlertDialogTrigger
                      render={<Button variant="ghost" size="icon-sm" />}
                    >
                      <Trash2 size={14} className="text-destructive" />
                    </AlertDialogTrigger>
                  }
                />
                <TooltipContent>Delete</TooltipContent>
              </Tooltip>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete this submission?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    variant="destructive"
                    onClick={async () => {
                      await deleteSubmission(record.id);
                      router.refresh();
                    }}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        ),
      },
    ],
    [id, router],
  );

  return (
    <>
      <Button
        variant="ghost"
        onClick={() => router.push("/dashboard/forms")}
        className="-ml-2"
      >
        <ArrowLeft size={16} />
        Back to forms
      </Button>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-on-surface tracking-tight">
            {title}
          </h2>
          <p className="mt-1 text-sm text-on-surface-variant">Form ID: {id}</p>
        </div>
      </div>

      <Tabs
        activeKey={tab}
        onChange={(key) => {
          setTab(key as typeof tab);
          if (key !== "submissions") {
            setPage(1);
            setSearchInput(null);
          }
        }}
        tabPosition="left"
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
                  <span className="rounded-full bg-surface-container-highest px-2 py-0.5 text-xs text-on-surface-variant">
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
                initialWebhookUrl={initialWebhookUrl ?? ""}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            ),
          },
        ]}
      />
    </>
  );
}
