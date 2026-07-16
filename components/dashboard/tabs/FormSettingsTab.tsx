"use client";

import type { FormInstance } from "antd";
import { Form, Input as AntInput } from "antd";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

export function FormSettingsTab({
  id,
  editForm,
  pending,
  initialTitle,
  initialSlug,
  initialWebhookUrl,
  handleEdit,
  handleDelete,
}: {
  id: string;
  editForm: FormInstance;
  pending: boolean;
  initialTitle: string;
  initialSlug: string;
  initialWebhookUrl: string;
  handleEdit: (values: Record<string, string>) => void;
  handleDelete: () => void;
}) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">General</CardTitle>
        </CardHeader>
        <CardContent>
          <Form
            form={editForm}
            layout="vertical"
            onFinish={handleEdit}
            initialValues={{
              title: initialTitle,
              slug: initialSlug,
              webhookUrl: initialWebhookUrl,
            }}
            className="max-w-md space-y-4"
          >
            <Form.Item
              name="title"
              label={
                <span className="label-caps text-on-surface-variant">
                  Title
                </span>
              }
              rules={[{ required: true, message: "Title is required" }]}
            >
              <AntInput placeholder="Form title" className="w-full" />
            </Form.Item>
            <Form.Item
              name="slug"
              label={
                <span className="label-caps text-on-surface-variant">Slug</span>
              }
              rules={[
                {
                  pattern: /^[a-z0-9-]*$/,
                  message: "Only lowercase letters, numbers, and hyphens",
                },
              ]}
            >
              <AntInput placeholder="form-slug" className="w-full" />
            </Form.Item>
            <Form.Item
              name="webhookUrl"
              label={
                <span className="label-caps text-on-surface-variant">
                  Webhook URL
                </span>
              }
              extra={
                <span className="text-xs text-on-surface-variant">
                  POST request with submission data on each new entry.
                </span>
              }
            >
              <AntInput
                placeholder="https://example.com/webhook"
                className="w-full"
              />
            </Form.Item>
            <Button type="submit" disabled={pending}>
              {pending ? "Saving..." : "Save"}
            </Button>
          </Form>
        </CardContent>
      </Card>

      <Card className="border-destructive/20">
        <CardHeader>
          <CardTitle className="text-base text-destructive">
            Danger Zone
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-on-surface-variant mb-4">
            Once you delete this form, all submissions will be permanently
            removed.
          </p>
          <AlertDialog>
            <AlertDialogTrigger render={<Button variant="destructive" />}>
              Delete Form
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete this form?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. All submissions will be deleted.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction variant="destructive" onClick={handleDelete}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
}
