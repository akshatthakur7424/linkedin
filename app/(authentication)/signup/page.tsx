"use client"

import { useRouter } from "next/navigation"

export default function SignUp() {
    const router = useRouter();

    const handleSignIn = () => {
        router.push("/signin")
    }

    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-4">

            {/* Heading */}
            <p>Make the most of your professional life</p>

            {/* Signup Form */}
            <div className="h-auto w-40% flex flex-col items-center justify-start bg-white rounded-md p-4">
                <p className="text-sm text-gray-700">
                    Already on LinkedIn? {" "}
                    <button
                        onClick={handleSignIn}
                        className="text-blue-600 font-medium hover:underline cursor-pointer">
                        Sign in
                    </button>
                </p>
            </div>

        </div>
    )
}