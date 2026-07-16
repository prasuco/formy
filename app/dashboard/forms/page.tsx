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
        orderBy: { createdAt: "desc" },
    });

    const data = forms.map((f) => ({
        id: f.id,
        title: f.title,
        slug: f.slug,
        submissions: f._count.submissions,
        createdAt: f.createdAt.toISOString(),
    }));

    return <FormsList data={data} />;
}
