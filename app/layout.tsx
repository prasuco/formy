import type { Metadata } from "next";
import { Sora, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { AntdRegistry } from "@/components/AntdRegistry";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ConfigProvider } from "antd";

const sora = Sora({
    variable: "--font-sora",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    metadataBase: new URL("https://formy.io"),
    title: "Formy | The Backend for Forms",
    description: "Just plug in your forms, we will do the magic. Simple API, robust security, and seamless automation.",
    icons: {
        icon: "/logo.png",
        apple: "/logo.png",
    },
    openGraph: {
        title: "Formy | The Backend for Forms",
        description: "Just plug in your forms, we will do the magic. Simple API, robust security, and seamless automation.",
        siteName: "Formy",
        images: [{ url: "/og-image.svg", width: 1200, height: 630 }],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${sora.variable} ${geistMono.variable} h-full antialiased`}
        >
            <body className="min-h-full flex flex-col bg-background text-foreground">
                <Providers>
                    <AntdRegistry>
                        <ConfigProvider
                            theme={{
                                cssVar: {},
                                token: {
                                    colorPrimary: "#FFC437",
                                    colorLink: "#1c1b1b",
                                    colorInfo: "#FFC437",
                                    colorWarning: "#FFC437",
                                    colorError: "#EA4335",
                                    borderRadius: 8,
                                    colorBgLayout: "#fcf9f8",
                                    colorBgContainer: "#ffffff",
                                    colorBorderSecondary: "#e5e2e1",
                                    colorText: "#1c1b1b",
                                    colorTextSecondary: "#4f4634",
                                    colorBorder: "#e5e2e1",
                                    colorBgElevated: "#ffffff",
                                    boxShadow: "0 1px 3px 0 rgba(0,0,0,0.06)",
                                    fontSize: 14,
                                    fontFamily: "var(--font-sora), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                                },
                                components: {
                                    Table: {
                                        headerBg: "#f6f3f2",
                                        headerBorderRadius: 8,
                                        borderRadius: 8,
                                        cellPaddingBlock: 10,
                                        cellPaddingInline: 16,
                                        borderColor: "#e5e2e1",
                                        headerSplitColor: "#e5e2e1",
                                        rowHoverBg: "#f6f3f2",
                                    },
                                    Form: {
                                        labelColor: "#1c1b1b",
                                        labelFontSize: 14,
                                        verticalLabelMargin: 4,
                                        itemMarginBottom: 16,
                                    },
                                    Card: {
                                        borderRadius: 8,
                                        colorBorderSecondary: "#e5e2e1",
                                    },
                                    Modal: {
                                        borderRadius: 8,
                                    },
                                    Tabs: {
                                        inkBarColor: "#FFC437",
                                        colorBorderSecondary: "#e5e2e1",
                                        horizontalMargin: "0",
                                    },
                                    Menu: {
                                        itemBorderRadius: 8,
                                        subMenuItemBorderRadius: 8,
                                        itemColor: "#4f4634",
                                        itemHoverBg: "#ebe7e7",
                                        itemHoverColor: "#1c1b1b",
                                        itemSelectedBg: "#FFC437",
                                        itemSelectedColor: "#000000",
                                    },
                                    Input: {
                                        borderRadius: 8,
                                        colorBorder: "#e5e2e1",
                                        hoverBorderColor: "#FFC437",
                                        activeBorderColor: "#FFC437",
                                    },
                                    Button: {
                                        borderRadius: 8,
                                        primaryColor: "#000000",
                                        defaultBorderColor: "#e5e2e1",
                                    },
                                },
                            }}
                        >
                            <TooltipProvider delay={200}>
                                <NuqsAdapter>{children}</NuqsAdapter>
                            </TooltipProvider>
                        </ConfigProvider>
                    </AntdRegistry>
                </Providers>
            </body>
        </html>
    );
}
