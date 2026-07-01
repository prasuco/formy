import { Button } from "antd";
import { register } from "@/app/actions/auth";

export default async function RegisterPage({
    searchParams,
}: {
    searchParams: Promise<{ error?: string }>;
}) {
    const params = await searchParams;

    return (
        <>
            <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">
                Create your account
            </h1>

            {params.error ? (
                <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                    {params.error}
                </p>
            ) : null}

            <form action={register} className="space-y-4">
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 outline-none focus:border-black focus:ring-1 focus:ring-black"
                    />
                </div>

                <div>
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        minLength={8}
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 outline-none focus:border-black focus:ring-1 focus:ring-black"
                    />
                </div>

                <Button
                    htmlType="submit"
                    block
                    type="primary"
                    className="!bg-black !text-white !font-semibold !border-none hover:!bg-gray-800"
                >
                    Create account
                </Button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-500">
                Already have an account?{" "}
                <a
                    href="/auth"
                    className="font-medium text-black underline underline-offset-2 hover:text-gray-600"
                >
                    Sign in
                </a>
            </p>
        </>
    );
}
