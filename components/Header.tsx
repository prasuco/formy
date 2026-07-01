export default function Header() {
    return (
        <header className="bg-white">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <a className="block text-black" href="/">
                    <span className="sr-only">Home</span>
                    <svg
                        className="h-8"
                        viewBox="0 0 28 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >

                    </svg>
                </a>

                <a
                    href="/auth"
                    className="rounded-md bg-[#FFC437] px-5 py-2.5 text-sm font-medium text-black transition hover:bg-[#f0b82e]"
                >
                    Get Started
                </a>
            </div>
        </header>
    )
}
