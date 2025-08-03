"use client"

import { useRouter } from "next/navigation"

export default function AuthenticationHeroSection() {
    const router = useRouter();

    const handleSignUp = () => {
        router.push("/signup");
    }
    const handleSignIn = () => {
        router.push("/signin");
    }

    return (
        <div className="h-full flex flex-col md:flex-row md:items-center items-start md:justify-center justify-start md:gap-8 px-4 md:pr-16 py-10">
            {/* Left Section  */}
            <div className="md:h-full h-1/3 w-full md:w-1/2 flex flex-col items-center md:items-start justify-start text-center md:text-left space-y-6">

                {/* Heading */}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-500">Welcome to your<br />professional network</h1>

                {/* Button */}
                <div className="flex flex-col space-y-3 w-full max-w-sm">
                    <button
                        className="w-full px-4 py-2 rounded-full border border-gray-400 text-gray-800 hover:bg-gray-100 transition cursor-pointer"
                        onClick={handleSignIn}
                    >
                        Sign in with email
                    </button>
                </div>

                {/* Terms  */}
                <p className="text-xs text-gray-500 max-w-sm leading-relaxed">
                    By clicking Continue to join or sign in, you agree to LinkedIn’s
                    <a href="#" className="text-blue-600 hover:underline"> User Agreement</a>,
                    <a href="#" className="text-blue-600 hover:underline"> Privacy Policy</a>, and
                    <a href="#" className="text-blue-600 hover:underline"> Cookie Policy</a>.
                </p>

                {/* Join now  */}
                <p className="text-sm text-gray-700">
                    New to LinkedIn? {" "}
                    <button
                        onClick={handleSignUp}
                        className="text-blue-600 font-medium hover:underline cursor-pointer">
                         Join now
                    </button>
                </p>
            </div>

            {/* Right Section  */}
            <div className="md:h-full w-full md:w-1/2 mt-10 md:mt-0 flex flex-col items-center justify-start">
                <img src="/authentication/hero-section.png" alt="LinkedIn Banner" className="h-auto w-full max-w-md md:max-w-full object-cover rounded" />
            </div>

        </div>

    )
}