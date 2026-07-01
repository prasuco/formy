"use client";

import { useState } from "react";
import {
    Card,
    Descriptions,
    Tag,
    Button,
    Empty,
    Table,
    Modal,
    Form,
    Input,
    Select,
    Popconfirm,
} from "antd";
import {
    ArrowLeft,
    Eye,
    BarChart3,
    Link as LinkIcon,
    Code2,
    Check,
    Edit3,
    Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { updateForm, deleteForm } from "@/app/actions/forms";
import { useTransition } from "react";

export function FormDetails({
    id,
    title,
    slug,
    type,
    submissionCount,
    schema,
    createdAt,
}: {
    id: string;
    title: string;
    slug: string | null;
    type: string;
    submissionCount: number;
    schema: unknown;
    createdAt: Date | null;
}) {
    const router = useRouter();
    const [editOpen, setEditOpen] = useState(false);
    const [pending, startTransition] = useTransition();
    const [editForm] = Form.useForm();

    const publicUrl = slug
        ? `${typeof window !== "undefined" ? window.location.origin : ""}/f/${slug}`
        : null;

    const handleEdit = (values: Record<string, string>) => {
        const fd = new FormData();
        fd.set("title", values.title);
        fd.set("slug", values.slug || "");
        fd.set("type", values.type);
        startTransition(() => updateForm(id, fd));
    };

    return (
        <div className="space-y-6">
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
                    <p className="mt-1 text-sm text-gray-500">
                        Form ID: {id}
                    </p>
                </div>

                <div className="flex gap-2">
                    {publicUrl && (
                        <Button icon={<Eye size={16} />}>
                            Preview
                        </Button>
                    )}
                    <Button
                        icon={<Edit3 size={16} />}
                        onClick={() => {
                            editForm.setFieldsValue({ title, slug: slug ?? "", type });
                            setEditOpen(true);
                        }}
                    >
                        Edit
                    </Button>
                    <Popconfirm
                        title="Delete this form?"
                        description="All submissions and data will be permanently deleted."
                        onConfirm={() => startTransition(() => deleteForm(id))}
                        okText="Delete"
                        okButtonProps={{ danger: true }}
                    >
                        <Button danger icon={<Trash2 size={16} />}>
                            Delete
                        </Button>
                    </Popconfirm>
                    <Button
                        type="primary"
                        icon={<BarChart3 size={16} />}
                        onClick={() => router.push(`/dashboard/forms/${id}/submissions`)}
                    >
                        Submissions ({submissionCount})
                    </Button>
                </div>
            </div>

            <Card className="!shadow-sm">
                <Descriptions
                    column={{ xs: 1, sm: 2 }}
                    classNames={{ label: "!text-gray-500 !font-normal" }}
                >
                    <Descriptions.Item label="Title">{title}</Descriptions.Item>
                    <Descriptions.Item label="Type">
                        <Tag color={type === "SCHEMA" ? "blue" : "default"}>
                            {type === "SCHEMA" ? "Schema-based" : "No schema"}
                        </Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="Slug">
                        {slug ? (
                            <code className="rounded bg-gray-100 px-2 py-0.5 text-xs">
                                {slug}
                            </code>
                        ) : (
                            <span className="text-gray-400">—</span>
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item label="Submissions">
                        {submissionCount}
                    </Descriptions.Item>
                </Descriptions>
            </Card>

            {publicUrl && (
                <Card title="Public URL" className="!shadow-sm">
                    <div className="flex items-center gap-2">
                        <LinkIcon size={16} className="text-gray-400" />
                        <code className="flex-1 rounded bg-gray-50 px-3 py-2 text-sm text-gray-700">
                            {publicUrl}
                        </code>
                        <Button
                            type="primary"
                            size="small"
                            onClick={() => navigator.clipboard.writeText(publicUrl!)}
                        >
                            Copy
                        </Button>
                    </div>
                </Card>
            )}

            <IntegrationGuide formId={id} slug={slug} />

            <Card title="Schema" className="!shadow-sm">
                {schema ? (
                    <Table
                        dataSource={
                            Array.isArray(schema)
                                ? (schema as Record<string, unknown>[])
                                : []
                        }
                        rowKey="id"
                        pagination={false}
                        size="small"
                        columns={[
                            {
                                title: "Field",
                                dataIndex: "label",
                                key: "label",
                            },
                            {
                                title: "Type",
                                dataIndex: "type",
                                key: "type",
                                render: (t: string) => <Tag>{t}</Tag>,
                            },
                            {
                                title: "Required",
                                dataIndex: "required",
                                key: "required",
                                render: (r: boolean) =>
                                    r ? (
                                        <span className="text-red-500">Yes</span>
                                    ) : (
                                        <span className="text-gray-400">No</span>
                                    ),
                            },
                        ]}
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                        <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description="No schema defined"
                        />
                    </div>
                )}
            </Card>

            <Modal
                title="Edit Form"
                open={editOpen}
                onCancel={() => setEditOpen(false)}
                onOk={() => editForm.submit()}
                confirmLoading={pending}
                okText="Save"
                okButtonProps={{
                    style: { background: "#FFC437", borderColor: "#FFC437", color: "#000" },
                }}
            >
                <Form
                    form={editForm}
                    layout="vertical"
                    onFinish={handleEdit}
                    autoComplete="off"
                >
                    <Form.Item
                        name="title"
                        label="Title"
                        rules={[{ required: true, message: "Enter a title" }]}
                    >
                        <Input placeholder="Form title" />
                    </Form.Item>
                    <Form.Item
                        name="slug"
                        label="Slug"
                        rules={[
                            {
                                pattern: /^[a-z0-9-]*$/,
                                message: "Only lowercase letters, numbers, and hyphens",
                            },
                        ]}
                    >
                        <Input placeholder="my-form-slug" />
                    </Form.Item>
                    <Form.Item name="type" label="Type" rules={[{ required: true }]}>
                        <Select
                            options={[
                                { value: "NOSCHEMA", label: "No schema" },
                                { value: "SCHEMA", label: "Schema-based" },
                            ]}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

function IntegrationGuide({
    formId,
    slug,
}: {
    formId: string;
    slug: string | null;
}) {
    const [htmlCopied, setHtmlCopied] = useState(false);
    const [jsCopied, setJsCopied] = useState(false);

    const endpoint = "/api/submit";
    const identifier = slug ?? formId;
    const identifierField = slug ? "slug" : "formId";

    const htmlSnippet = `<!-- HTML form -->
<form action="${endpoint}" method="POST">
    <input type="hidden" name="${identifierField}" value="${identifier}" />

    <label for="name">Name</label>
    <input type="text" name="name" id="name" required />

    <label for="email">Email</label>
    <input type="email" name="email" id="email" required />

    <button type="submit">Submit</button>
</form>`;

    const jsSnippet = `// JavaScript fetch
const formData = new FormData();
formData.set("${identifierField}", "${identifier}");
formData.set("name", "John Doe");
formData.set("email", "john@example.com");

const res = await fetch("${endpoint}", {
    method: "POST",
    body: formData,
});

const result = await res.json();
// { success: true }`;

    return (
        <Card
            title={
                <span className="flex items-center gap-2">
                    <Code2 size={16} />
                    Integration Guide
                </span>
            }
            className="!shadow-sm"
        >
            <div className="space-y-6">
                <div>
                    <p className="text-sm text-gray-600">
                        Use this endpoint to accept submissions from your own forms.
                        Both <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs">application/json</code> and{" "}
                        <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs">multipart/form-data</code> are accepted.
                    </p>
                </div>

                <div>
                    <h4 className="mb-2 text-sm font-semibold text-gray-700">Endpoint</h4>
                    <div className="flex items-center gap-2">
                        <code className="flex-1 rounded bg-gray-50 px-3 py-2 text-sm text-gray-700">
                            POST {endpoint}
                        </code>
                        <Button
                            size="small"
                            type="text"
                            icon={htmlCopied ? <Check size={14} /> : undefined}
                            onClick={() => {
                                navigator.clipboard.writeText(endpoint);
                                setHtmlCopied(true);
                                setTimeout(() => setHtmlCopied(false), 2000);
                            }}
                        >
                            {htmlCopied ? "Copied" : "Copy"}
                        </Button>
                    </div>
                </div>

                <div>
                    <h4 className="mb-2 text-sm font-semibold text-gray-700">
                        HTML form
                    </h4>
                    <pre className="overflow-x-auto rounded-lg border border-gray-200 bg-gray-50 p-4 text-xs text-gray-800">
                        {htmlSnippet}
                    </pre>
                    <Button
                        size="small"
                        className="mt-2"
                        icon={htmlCopied ? <Check size={14} /> : undefined}
                        onClick={() => {
                            navigator.clipboard.writeText(htmlSnippet);
                            setHtmlCopied(true);
                            setTimeout(() => setHtmlCopied(false), 2000);
                        }}
                    >
                        {htmlCopied ? "Copied" : "Copy HTML"}
                    </Button>
                </div>

                <div>
                    <h4 className="mb-2 text-sm font-semibold text-gray-700">
                        JavaScript fetch
                    </h4>
                    <pre className="overflow-x-auto rounded-lg border border-gray-200 bg-gray-50 p-4 text-xs text-gray-800">
                        {jsSnippet}
                    </pre>
                    <Button
                        size="small"
                        className="mt-2"
                        icon={jsCopied ? <Check size={14} /> : undefined}
                        onClick={() => {
                            navigator.clipboard.writeText(jsSnippet);
                            setJsCopied(true);
                            setTimeout(() => setJsCopied(false), 2000);
                        }}
                    >
                        {jsCopied ? "Copied" : "Copy JS"}
                    </Button>
                </div>
            </div>
        </Card>
    );
}
