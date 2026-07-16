"use client";

import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  FileText,
  Activity,
  Settings,
  Menu as MenuIcon,
  LogOut,
  User,
  Command,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/app/actions/auth";
import { CommandPalette } from "@/components/dashboard/CommandPalette";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface FormItem {
  id: string;
  title: string;
}

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Overview" },
  { href: "/dashboard/forms", icon: FileText, label: "Forms" },
  { href: "/dashboard/activity", icon: Activity, label: "Activity" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
];

export function DashboardShell({
  children,
  user,
  forms,
}: {
  children: React.ReactNode;
  user?: { email?: string | null };
  forms: FormItem[];
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setPaletteOpen(true);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="flex min-h-screen bg-background">
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-40 bg-surface-container-low border-r border-border-muted flex flex-col transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="px-4 py-5 border-b border-border-muted space-y-1">
          <div className="flex items-center gap-2 justify-center">
            <Image
              src="/logo.png"
              alt="Formy"
              width={24}
              height={24}
              className="h-6 w-auto"
            />
            <span className="text-sm font-semibold text-on-surface tracking-tight">
              Formy
            </span>
          </div>
        </div>

        <nav className="flex-1 px-2 py-3 space-y-0.5">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground font-medium"
                    : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
                }`}
              >
                <Icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col lg:ml-40">
        <header className="flex h-14 items-center justify-between bg-surface-container-lowest border-b border-border-muted px-4 lg:px-6 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-on-surface-variant p-1"
            >
              <MenuIcon size={18} />
            </button>
            <button
              onClick={() => setPaletteOpen(true)}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-high text-xs text-on-surface-variant hover:text-on-surface transition-colors"
            >
              <Command size={14} />
              <span>Cmd+K</span>
            </button>
          </div>
          <button
            onClick={() => setPaletteOpen(true)}
            className="sm:hidden text-on-surface-variant p-1"
          >
            <Command size={18} />
          </button>

          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <button
                    type="button"
                    className="flex items-center gap-2 p-1 rounded-lg hover:bg-surface-container-high transition-colors"
                  />
                }
              >
                <Avatar size="sm">
                  <AvatarFallback className="bg-primary text-primary-foreground text-[10px]">
                    {user?.email?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem>
                  <Link
                    href="/dashboard/settings"
                    className="flex w-full items-center gap-1.5 text-sm"
                  >
                    <User size={14} />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <form action={logout} className="w-full">
                    <button
                      type="submit"
                      className="flex w-full items-center gap-1.5 text-sm"
                    >
                      <LogOut size={14} />
                      Sign out
                    </button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto space-y-8">{children}</div>
        </main>
      </div>

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        forms={forms}
      />
    </div>
  );
}
