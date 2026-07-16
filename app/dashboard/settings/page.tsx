import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import { SettingsForm } from "@/components/dashboard/SettingsForm";

export default async function SettingsPage({
    searchParams,
}: {
    searchParams: Promise<{ error?: string; success?: string }>;
}) {
    const session = await auth();
    if (!session?.userId) redirect("/auth");

    const params = await searchParams;

    return (
        <SettingsForm email={session.email ?? ""} error={params.error} success={params.success} />
    );
}
