"use client";

import { useState } from "react";
import {
    Card,
    Descriptions,
    Button,
    Modal,
    Form,
    Input,
    Popconfirm,
} from "antd";
import {
    ArrowLeft,
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
    submissionCount,
}: {
    id: string;
    title: string;
    slug: string;
    submissionCount: number;
}) {
    const router = useRouter();
    const [editOpen, setEditOpen] = useState(false);
    const [pending, startTransition] = useTransition();
    const [editForm] = Form.useForm();

    const handleEdit = (values: Record<string, string>) => {
        const fd = new FormData();
        fd.set("title", values.title);
        fd.set("slug", values.slug || "");
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
                    <Button
                        icon={<Edit3 size={16} />}
                        onClick={() => {
                            editForm.setFieldsValue({ title, slug });
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
                    <Descriptions.Item label="Slug">
                        <code className="rounded bg-gray-100 px-2 py-0.5 text-xs">
                            {slug}
                        </code>
                    </Descriptions.Item>
                    <Descriptions.Item label="Submissions">
                        {submissionCount}
                    </Descriptions.Item>
                </Descriptions>
            </Card>

            <Card title="Submit Endpoint" className="!shadow-sm">
                <div className="flex items-center gap-2">
                    <LinkIcon size={16} className="text-gray-400" />
                    <code className="flex-1 rounded bg-gray-50 px-3 py-2 text-sm text-gray-700">
                        POST /api/submit (slug: {slug})
                    </code>
                    <Button
                        type="primary"
                        size="small"
                        onClick={() =>
                            navigator.clipboard.writeText(
                                `${typeof window !== "undefined" ? window.location.origin : ""}/api/submit`
                            )
                        }
                    >
                        Copy
                    </Button>
                </div>
            </Card>

            <IntegrationGuide slug={slug} />

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
                </Form>
            </Modal>
        </div>
    );
}

function IntegrationGuide({ slug }: { slug: string }) {
    const [htmlCopied, setHtmlCopied] = useState(false);
    const [jsCopied, setJsCopied] = useState(false);
    const [reactCopied, setReactCopied] = useState(false);
    const [vueCopied, setVueCopied] = useState(false);

    const endpoint = "/api/submit";
    const htmlSnippet = `<!-- HTML form -->
<form action="${endpoint}" method="POST" enctype="multipart/form-data">
    <input type="hidden" name="slug" value="${slug}" />

    <label for="name">Name</label>
    <input type="text" name="name" id="name" required />

    <label for="email">Email</label>
    <input type="email" name="email" id="email" required />

    <button type="submit">Submit</button>
</form>`;

    const jsSnippet = `// JavaScript fetch
const formData = new FormData();
formData.set("slug", "${slug}");
formData.set("name", "John Doe");
formData.set("email", "john@example.com");

const res = await fetch("${endpoint}", {
    method: "POST",
    body: formData,
});

const result = await res.json();
// { success: true }`;

    const reactSnippet = `// React component
import { useState } from "react";

export function MyForm() {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const fd = new FormData(e.target);
    fd.set("slug", "${slug}");

    const res = await fetch("${endpoint}", {
      method: "POST",
      body: fd,
    });

    if (res.ok) alert("Submitted!");
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" required />
      <input name="email" type="email" placeholder="Email" required />
      <button type="submit" disabled={submitting}>
        {submitting ? "Sending..." : "Submit"}
      </button>
    </form>
  );
}`;

    const vueSnippet = `<!-- Vue 3 component -->
<template>
  <form @submit.prevent="handleSubmit">
    <input name="name" placeholder="Name" required />
    <input name="email" type="email" placeholder="Email" required />
    <button :disabled="submitting">
      {{ submitting ? "Sending..." : "Submit" }}
    </button>
  </form>
</template>

<script setup>
import { ref } from "vue";

const submitting = ref(false);

async function handleSubmit(e) {
  submitting.value = true;
  const fd = new FormData(e.target);
  fd.set("slug", "${slug}");

  const res = await fetch("${endpoint}", { method: "POST", body: fd });
  if (res.ok) alert("Submitted!");
  submitting.value = false;
}
</script>`;

    const jsonSnippet = `// JSON API — POST with application/json
const res = await fetch("${endpoint}", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    "slug": "${slug}",
    "name": "John Doe",
    "email": "john@example.com"
  })
});

const result = await res.json();
// 201: { success: true }`;

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
                    <p className="mb-1 text-sm text-gray-600">
                        Submit data from your own frontend. CORS is enabled for all origins.
                        Accepts{" "}
                        <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs">
                            multipart/form-data
                        </code>{" "}
                        and{" "}
                        <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs">
                            application/json
                        </code>
                        .
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
                    <h4 className="mb-2 text-sm font-semibold text-gray-700">JSON API</h4>
                    <pre className="overflow-x-auto rounded-lg border border-gray-200 bg-gray-50 p-4 text-xs text-gray-800">
                        {jsonSnippet}
                    </pre>
                    <Button
                        size="small"
                        className="mt-2"
                        icon={jsCopied ? <Check size={14} /> : undefined}
                        onClick={() => {
                            navigator.clipboard.writeText(jsonSnippet);
                            setJsCopied(true);
                            setTimeout(() => setJsCopied(false), 2000);
                        }}
                    >
                        {jsCopied ? "Copied" : "Copy JSON"}
                    </Button>
                </div>

                <div>
                    <h4 className="mb-2 text-sm font-semibold text-gray-700">HTML form</h4>
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
                    <h4 className="mb-2 text-sm font-semibold text-gray-700">React component</h4>
                    <pre className="overflow-x-auto rounded-lg border border-gray-200 bg-gray-50 p-4 text-xs text-gray-800">
                        {reactSnippet}
                    </pre>
                    <Button
                        size="small"
                        className="mt-2"
                        icon={reactCopied ? <Check size={14} /> : undefined}
                        onClick={() => {
                            navigator.clipboard.writeText(reactSnippet);
                            setReactCopied(true);
                            setTimeout(() => setReactCopied(false), 2000);
                        }}
                    >
                        {reactCopied ? "Copied" : "Copy React"}
                    </Button>
                </div>

                <div>
                    <h4 className="mb-2 text-sm font-semibold text-gray-700">Vue 3 component</h4>
                    <pre className="overflow-x-auto rounded-lg border border-gray-200 bg-gray-50 p-4 text-xs text-gray-800">
                        {vueSnippet}
                    </pre>
                    <Button
                        size="small"
                        className="mt-2"
                        icon={vueCopied ? <Check size={14} /> : undefined}
                        onClick={() => {
                            navigator.clipboard.writeText(vueSnippet);
                            setVueCopied(true);
                            setTimeout(() => setVueCopied(false), 2000);
                        }}
                    >
                        {vueCopied ? "Copied" : "Copy Vue"}
                    </Button>
                </div>
            </div>
        </Card>
    );
}
