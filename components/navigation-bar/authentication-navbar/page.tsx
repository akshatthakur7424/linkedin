"use client"

import Image from "next/image";
import { useRouter } from "next/navigation"

export default function AuthenticationNavbar() {
    const router = useRouter();

    const handleSignUp = () => {
        router.push("/signup");
    }
    const handleSignIn = () => {
        router.push("/login");
    }

    return (
        <nav className="flex items-center justify-between px-4 py-4 w-full md:px-[15%]">
            {/* Logo  */}
            <div className="flex items-center"
                onClick={() => router.push("/")}
            >
                <Image
                    width={120}
                    height={3}
                    src="/logo/logo-full.png"
                    alt="LinkedIn Logo"
                    className="object-contain" />
            </div>

            {/* Right buttons  */}
            <div className="flex items-center gap-4">
                <button
                    className="text-md font-medium text-gray-700 hover:text-black cursor-pointer"
                    onClick={handleSignUp}
                >Join now</button>
                <button
                    className="px-4 py-1.5 text-md font-medium border rounded-full border-blue-500 text-blue-500 hover:bg-blue-50 transition cursor-pointer"
                    onClick={handleSignIn}
                >
                    Sign in
                </button>
            </div>
        </nav>

    )
} 