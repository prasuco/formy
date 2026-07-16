"use client";

import { useTransition } from "react";
import { Lock, AlertTriangle } from "lucide-react";
import { updatePassword, deleteAccount } from "@/app/actions/auth";
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

export function SettingsForm({
  email,
  error,
  success,
}: {
  email: string;
  error?: string;
  success?: string;
}) {
  const [, startTransition] = useTransition();

  return (
    <>
      <div>
        <h1 className="text-xl font-semibold text-on-surface tracking-tight">
          Settings
        </h1>
        <p className="text-sm text-on-surface-variant mt-1">
          Manage your account
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}
      {success && (
        <div className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3">
          <p className="text-sm text-primary-foreground">{success}</p>
        </div>
      )}

      <div className="border border-border-muted rounded-lg bg-surface-container-lowest overflow-hidden">
        <div className="px-6 py-4 border-b border-border-muted">
          <h2 className="text-sm font-semibold text-on-surface">Profile</h2>
        </div>
        <div className="px-6 py-4">
          <p className="text-xs text-on-surface-variant mb-1">Email</p>
          <p className="text-sm text-on-surface font-mono">{email}</p>
        </div>
      </div>

      <div className="border border-border-muted rounded-lg bg-surface-container-lowest overflow-hidden">
        <div className="px-6 py-4 border-b border-border-muted">
          <h2 className="text-sm font-semibold text-on-surface">
            Change Password
          </h2>
        </div>
        <form action={updatePassword} className="px-6 py-4 space-y-4">
          <div className="space-y-2">
            <label htmlFor="currentPassword">Current Password</label>
            <input
              id="currentPassword"
              name="currentPassword"
              type="password"
              required
              placeholder="Enter current password"
              className="block w-full rounded-lg border border-border-muted bg-white px-4 py-2.5 text-sm text-on-surface outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="newPassword">New Password</label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              required
              minLength={8}
              placeholder="Min. 8 characters"
              className="block w-full rounded-lg border border-border-muted bg-white px-4 py-2.5 text-sm text-on-surface outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <Button type="submit">Update Password</Button>
        </form>
      </div>

      <div className="border border-destructive/20 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-destructive/20">
          <h2 className="text-sm font-semibold text-destructive">
            Danger Zone
          </h2>
        </div>
        <div className="px-6 py-4 space-y-4">
          <p className="text-sm text-on-surface-variant leading-relaxed">
            Permanently delete your account and all associated data. This cannot
            be undone.
          </p>
          <AlertDialog>
            <AlertDialogTrigger
              render={
                <Button variant="destructive">
                  <AlertTriangle size={14} />
                  Delete Account
                </Button>
              }
            />
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete your account?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently remove your account, forms, and all
                  submissions.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  variant="destructive"
                  onClick={() => startTransition(() => deleteAccount())}
                >
                  Delete Forever
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </>
  );
}
