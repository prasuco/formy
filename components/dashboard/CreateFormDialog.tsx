"use client";

import { Modal, Form, Input } from "antd";
import { useTransition } from "react";
import { createForm } from "@/app/actions/forms";

export function CreateFormDialog({
    open,
    onClose,
}: {
    open: boolean;
    onClose: () => void;
}) {
    const [pending, startTransition] = useTransition();
    const [form] = Form.useForm();

    return (
        <Modal
            title="Create Form"
            open={open}
            onCancel={onClose}
            onOk={() => form.submit()}
            confirmLoading={pending}
            okText="Create"
            okButtonProps={{
                style: { background: "#FFC437", borderColor: "#FFC437", color: "#000" },
            }}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={(values) => {
                    const fd = new FormData();
                    fd.set("title", values.title);
                    startTransition(() => createForm(fd));
                }}
                autoComplete="off"
            >
                <Form.Item
                    name="title"
                    label="Form title"
                    rules={[{ required: true, message: "Enter a title" }]}
                >
                    <Input placeholder="e.g. Customer Feedback" autoFocus />
                </Form.Item>
            </Form>
        </Modal>
    );
}
