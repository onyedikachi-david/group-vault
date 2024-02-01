import Link from "next/link"
import { JSX, SVGProps } from "react"

export default function JoinPot() {
    return (
        <div key="1" className="flex flex-col min-h-screen bg-gray-900 text-white">
            <header className="px-4 lg:px-6 h-14 flex items-center bg-gradient-to-r from-purple-600 to-blue-500">
                <Link className="flex items-center justify-center" href="#">
                    <MountainIcon className="h-6 w-6 text-white" />
                    <span className="sr-only">GroupVault</span>
                </Link>
                <nav className="ml-auto flex gap-4 sm:gap-6">
                    <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
                        Features
                    </Link>
                    <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
                        Pricing
                    </Link>
                    <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
                        About
                    </Link>
                    <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
                        Contact
                    </Link>
                </nav>
            </header>
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-purple-600 to-blue-500">
                    <div className="container px-4 md:px-6">
                        <div className="grid gap-6 lg:grid-cols-1 xl:grid-cols-2">
                            <div className="flex flex-col justify-center space-y-4">
                                <div className="space-y-2">
                                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-white">
                                        Group Vaults
                                    </h1>
                                    <p className="max-w-[600px] text-gray-200 md:text-xl">
                                        Join a group vault and start your savings journey today.
                                    </p>
                                </div>
                            </div>
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 overflow-auto max-h-[500px] scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-900">
                                <div className="rounded-md bg-white text-gray-900 p-4 shadow-lg transform transition-transform hover:scale-105">
                                    <h2 className="text-2xl font-bold mb-2">Vault 1</h2>
                                    <p className="text-sm mb-2">This is a description for Vault 1.</p>
                                    <p className="text-sm mb-2">Contribution: $100</p>
                                    <p className="text-sm mb-2">Penalty: $20</p>
                                    <p className="text-sm mb-2">Status: Active</p>
                                    <p className="text-sm mb-2">Pot Cycle: Weekly</p>
                                    <Link
                                        className="inline-flex h-10 items-center justify-center rounded-md bg-blue-500 text-white px-8 text-sm font-medium shadow transition-colors hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 mt-4"
                                        href="#"
                                    >
                                        Join Vault
                                    </Link>
                                </div>
                                <div className="rounded-md bg-white text-gray-900 p-4 shadow-lg transform transition-transform hover:scale-105">
                                    <h2 className="text-2xl font-bold mb-2">Vault 2</h2>
                                    <p className="text-sm mb-2">This is a description for Vault 2.</p>
                                    <p className="text-sm mb-2">Contribution: $200</p>
                                    <p className="text-sm mb-2">Penalty: $40</p>
                                    <p className="text-sm mb-2">Status: Inactive</p>
                                    <p className="text-sm mb-2">Pot Cycle: Monthly</p>
                                    <Link
                                        className="inline-flex h-10 items-center justify-center rounded-md bg-blue-500 text-white px-8 text-sm font-medium shadow transition-colors hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 mt-4"
                                        href="#"
                                    >
                                        Join Vault
                                    </Link>
                                </div>
                                <div className="rounded-md bg-white text-gray-900 p-4 shadow-lg transform transition-transform hover:scale-105">
                                    <h2 className="text-2xl font-bold mb-2">Vault 3</h2>
                                    <p className="text-sm mb-2">This is a description for Vault 3.</p>
                                    <p className="text-sm mb-2">Contribution: $150</p>
                                    <p className="text-sm mb-2">Penalty: $30</p>
                                    <p className="text-sm mb-2">Status: Active</p>
                                    <p className="text-sm mb-2">Pot Cycle: Daily</p>
                                    <Link
                                        className="inline-flex h-10 items-center justify-center rounded-md bg-blue-500 text-white px-8 text-sm font-medium shadow transition-colors hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 mt-4"
                                        href="#"
                                    >
                                        Join Vault
                                    </Link>
                                </div>
                            </div>
                            <div className="flex justify-center mt-6">
                                <Link
                                    className="inline-flex h-10 items-center justify-center rounded-md bg-blue-500 text-white px-8 text-sm font-medium shadow transition-colors hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                                    href="#"
                                >
                                    See More Vaults
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-700">
                <p className="text-xs text-gray-300">© 2024 GroupVault Inc. All rights reserved.</p>
                <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                    <Link className="text-xs hover:underline underline-offset-4" href="#">
                        Terms of Service
                    </Link>
                    <Link className="text-xs hover:underline underline-offset-4" href="#">
                        Privacy
                    </Link>
                </nav>
            </footer>
        </div>
    )
}

function MountainIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
        </svg>
    )
}
