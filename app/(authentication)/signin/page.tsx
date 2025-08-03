"use client"

import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SignIn() {
    const router = useRouter();

    const handleSignUp = () => {
        router.push("/signup")
    }

    const handleSignIn = () => {

    }

    return (
        <div className="h-full w-full flex flex-col items-center justify-start gap-2 p-4">

            {/* Signup Form */}
            <div className="h-auto w-1/4 flex flex-col items-center justify-start bg-white rounded-md p-4 px-6">
                {/* Heading */}
                <div className="w-full flex items-center justify-start" >
                <p className="text-3xl font-semibold text-start py-2" >Sign in</p>
                </div>

                {/* Sign Up Form  */}
                <div className="grid w-full max-w-sm items-center gap-3 my-2">
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" />
                </div>
                <div className="grid w-full max-w-sm items-center gap-3 my-2">
                    <Label htmlFor="password">Password</Label>
                    <Input type="password" id="password" />
                </div>

                {/* Sign Up Button  */}
                <button
                    className="w-full bg-sky-700 text-white rounded-full py-2 my-4 cursor-poiner"
                    onClick={handleSignIn}
                >
                    Sign in
                </button>

            </div>

            {/* Sign Up page navigation  */}
            <div>
                <p className="text-lg text-gray-700 my-2">
                    New to LinkedIn? {" "}
                    <button
                        onClick={handleSignUp}
                        className="text-blue-600 font-medium hover:underline cursor-pointer">
                        Join now
                    </button>
                </p>
            </div>

        </div >
    )
}