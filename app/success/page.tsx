import Link from "next/link";
import { Button } from "antd";
import { CheckCircle } from "lucide-react";

export default async function SuccessPage({
    searchParams,
}: {
    searchParams: Promise<{ title?: string }>;
}) {
    const params = await searchParams;

    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-4">
            <div className="w-full max-w-md text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
                    <CheckCircle size={48} className="text-green-500" />
                </div>

                <h1 className="text-2xl font-bold text-gray-900">
                    Submission received!
                </h1>
                <p className="mt-2 text-gray-500">
                    {params.title
                        ? `Your response for "${params.title}" has been submitted successfully.`
                        : "Your response has been submitted successfully."}
                </p>
                <p className="mt-1 text-sm text-gray-400">
                    Thank you for your time.
                </p>

                <Link href="/">
                    <Button type="primary" className="mt-8 !bg-[#FFC437] !text-black !border-none">
                        Back to Formy
                    </Button>
                </Link>
            </div>
        </div>
    );
}
