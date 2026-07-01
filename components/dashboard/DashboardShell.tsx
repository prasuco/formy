"use client";

import { useState } from "react";
import { Layout, Menu, Button, Dropdown, Avatar, Space } from "antd";
import {
    LayoutDashboard,
    FileText,
    Settings,
    Menu as MenuIcon,
    LogOut,
    User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const { Sider, Header, Content } = Layout;

const menuItems = [
    {
        key: "/dashboard",
        icon: <LayoutDashboard size={18} />,
        label: <Link href="/dashboard">Dashboard</Link>,
    },
    {
        key: "/dashboard/forms",
        icon: <FileText size={18} />,
        label: <Link href="/dashboard/forms">Forms</Link>,
    },
    {
        key: "/dashboard/settings",
        icon: <Settings size={18} />,
        label: <Link href="/dashboard/settings">Settings</Link>,
    },
];

export function DashboardShell({
    children,
    user,
}: {
    children: React.ReactNode;
    user?: { email?: string | null };
}) {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const pathname = usePathname();

    return (
        <Layout className="min-h-screen">
            {/* Mobile overlay */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            <Sider
                theme="light"
                breakpoint="lg"
                collapsedWidth={0}
                trigger={null}
                className={`!fixed left-0 top-0 z-50 h-screen border-r border-gray-200 !transition-all lg:!relative ${
                    mobileOpen ? "!w-60" : "!w-0 lg:!w-60"
                } ${collapsed ? "lg:!w-16" : ""}`}
            >
                <div className="flex h-16 items-center justify-center border-b border-gray-200">
                    <span className="text-lg font-bold text-black">
                        {collapsed ? "F" : "Formy"}
                    </span>
                </div>

                <Menu
                    mode="inline"
                    selectedKeys={[pathname]}
                    items={menuItems}
                    className="!border-r-0"
                    inlineCollapsed={collapsed}
                />

                <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 p-4">
                    <Space className="text-sm text-gray-500">
                        <User size={14} />
                        <span className="truncate">{user?.email}</span>
                    </Space>
                </div>
            </Sider>

            <Layout>
                <Header className="!flex !h-16 !items-center !justify-between !bg-white !px-4 !border-b !border-gray-200 lg:!px-6">
                    <Button
                        type="text"
                        icon={<MenuIcon size={20} />}
                        onClick={() => {
                            if (window.innerWidth < 1024) {
                                setMobileOpen(!mobileOpen);
                            } else {
                                setCollapsed(!collapsed);
                            }
                        }}
                        className="!flex !items-center !justify-center"
                    />

                    <Dropdown
                        menu={{
                            items: [
                                {
                                    key: "logout",
                                    icon: <LogOut size={14} />,
                                    label: (
                                        <form action="/api/auth/signout" method="POST">
                                            <Button type="text" htmlType="submit" className="!w-full !text-left">
                                                Sign out
                                            </Button>
                                        </form>
                                    ),
                                },
                            ],
                        }}
                        placement="bottomRight"
                    >
                        <Button type="text" className="!flex !items-center !gap-2">
                            <Avatar size="small" className="!bg-[#FFC437]">
                                {user?.email?.charAt(0).toUpperCase()}
                            </Avatar>
                            <span className="hidden text-sm sm:inline">
                                {user?.email}
                            </span>
                        </Button>
                    </Dropdown>
                </Header>

                <Content className="m-4 min-h-[calc(100vh-5rem)] lg:m-6">
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
}
