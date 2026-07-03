import { auth } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import { FormsList } from "@/components/dashboard/FormsList";
import { redirect } from "next/navigation";

export default async function FormsPage() {
    const session = await auth();
    if (!session?.userId) redirect("/auth");

    const forms = await prisma.form.findMany({
        where: { createdById: session.userId },
        include: { _count: { select: { submissions: true } } },
        orderBy: { id: "desc" },
    });

    const data = forms.map((f) => ({
        id: f.id,
        title: f.title,
        slug: f.slug,
        submissions: f._count.submissions,
    }));

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Forms</h2>
                    <p className="mt-1 text-gray-500">Manage your forms.</p>
                </div>
            </div>

            <FormsList data={data} />
        </div>
    );
}
