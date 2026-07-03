import { Card, Button, Popconfirm, Form, Input } from "antd";
import { Trash2 } from "lucide-react";
import type { FormInstance } from "antd/es/form";

export function FormSettingsTab({
    id,
    editForm,
    pending,
    initialTitle,
    initialSlug,
    handleEdit,
    handleDelete,
}: {
    id: string;
    editForm: FormInstance;
    pending: boolean;
    initialTitle: string;
    initialSlug: string;
    handleEdit: (values: Record<string, string>) => void;
    handleDelete: () => void;
}) {
    return (
        <div className="space-y-8 max-w-lg">
            <Card title="General" className="!shadow-sm">
                <Form
                    form={editForm}
                    layout="vertical"
                    onFinish={handleEdit}
                    autoComplete="off"
                    initialValues={{ title: initialTitle, slug: initialSlug }}
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
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={pending}
                            style={{ background: "#FFC437", borderColor: "#FFC437", color: "#000" }}
                        >
                            Save Changes
                        </Button>
                    </Form.Item>
                </Form>
            </Card>

            <Card
                title={<span className="text-red-600">Danger Zone</span>}
                className="!shadow-sm !border-red-200"
            >
                <p className="mb-4 text-sm text-gray-600">
                    Once you delete a form, all submissions and data are permanently removed.
                </p>
                <Popconfirm
                    title="Delete this form?"
                    description="All submissions and data will be permanently deleted."
                    onConfirm={handleDelete}
                    okText="Delete"
                    okButtonProps={{ danger: true }}
                >
                    <Button danger icon={<Trash2 size={16} />}>
                        Delete Form
                    </Button>
                </Popconfirm>
            </Card>
        </div>
    );
}
