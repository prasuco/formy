"use client";

import { useState } from "react";
import { Card, Row, Col, Statistic, Button } from "antd";
import {
    FileText,
    Send,
    Clock,
    Inbox,
    Plus,
} from "lucide-react";
import { CreateFormDialog } from "@/components/dashboard/CreateFormDialog";

export default function DashboardPage() {
    const [open, setOpen] = useState(false);

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
                <p className="mt-1 text-gray-500">
                    Welcome back! Here&apos;s an overview of your forms.
                </p>
            </div>

            <Row gutter={[16, 16]}>
                <Col xs={12} sm={12} lg={6}>
                    <Card className="!shadow-sm">
                        <Statistic
                            title="Total Forms"
                            value={0}
                            prefix={<FileText size={18} className="text-[#FFC437]" />}
                        />
                    </Card>
                </Col>
                <Col xs={12} sm={12} lg={6}>
                    <Card className="!shadow-sm">
                        <Statistic
                            title="Submissions"
                            value={0}
                            prefix={<Send size={18} className="text-blue-600" />}
                        />
                    </Card>
                </Col>
                <Col xs={12} sm={12} lg={6}>
                    <Card className="!shadow-sm">
                        <Statistic
                            title="Unread"
                            value={0}
                            prefix={<Inbox size={18} className="text-amber-600" />}
                        />
                    </Card>
                </Col>
                <Col xs={12} sm={12} lg={6}>
                    <Card className="!shadow-sm">
                        <Statistic
                            title="This Week"
                            value={0}
                            prefix={<Clock size={18} className="text-purple-600" />}
                        />
                    </Card>
                </Col>
            </Row>

            <Row gutter={[16, 16]}>
                <Col xs={24} lg={16}>
                    <Card className="!shadow-sm">
                        <div className="flex flex-col items-center justify-center py-16">
                            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#FFC437]/10">
                                <FileText size={40} className="text-[#FFC437]" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">
                                Create your first form
                            </h3>
                            <p className="mt-1 max-w-sm text-center text-sm text-gray-500">
                                Build a form in seconds. Collect submissions, review
                                responses, and export data — all from one place.
                            </p>
                            <Button
                                type="primary"
                                size="large"
                                icon={<Plus size={18} />}
                                className="mt-6"
                                onClick={() => setOpen(true)}
                            >
                                Create Form
                            </Button>
                        </div>
                    </Card>
                </Col>

                <Col xs={24} lg={8}>
                    <Card title="Quick Actions" className="!shadow-sm">
                        <div className="space-y-3">
                            <Button
                                block
                                type="default"
                                onClick={() => setOpen(true)}
                                className="!border-dashed !border-gray-300 !text-black hover:!border-[#FFC437] hover:!bg-yellow-50"
                            >
                                + Create new form
                            </Button>
                            <Button
                                block
                                type="default"
                                className="!border-dashed !border-gray-300 !text-gray-600"
                            >
                                View all submissions
                            </Button>
                        </div>
                    </Card>
                </Col>
            </Row>

            <CreateFormDialog open={open} onClose={() => setOpen(false)} />
        </div>
    );
}
