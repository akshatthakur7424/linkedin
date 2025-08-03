"use client"

import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SignUp() {
    const router = useRouter();

    const handleSignIn = () => {
        router.push("/signin")
    }

    const handleSignUp = () => {
        
    }

    return (
        <div className="w-full h-full flex flex-col items-center justify-start gap-2 p-4">

            {/* Heading */}
            <p className="text-3xl m-2 my-4" >Make the most of your professional life</p>

            {/* Signup Form */}
            <div className="h-auto w-1/4 flex flex-col items-center justify-start bg-white rounded-md p-4 px-6">

                {/* Sign Up Form  */}
                <div className="grid w-full max-w-sm items-center gap-3 my-2">
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" />
                </div>
                <div className="grid w-full max-w-sm items-center gap-3 my-2">
                    <Label htmlFor="password">Password</Label>
                    <Input type="password" id="password" />
                </div>

                {/* Terms  */}
                <p className="text-center text-xs text-gray-500 max-w-sm leading-relaxed mt-2">
                    By clicking Agree & Join or Continue, you agree to LinkedIn’s
                    <a href="#" className="text-blue-600 hover:underline"> User Agreement</a>,
                    <a href="#" className="text-blue-600 hover:underline"> Privacy Policy</a>, and
                    <a href="#" className="text-blue-600 hover:underline"> Cookie Policy</a>.
                </p>

                {/* Sign Up Button  */}
                <button
                    className="w-full bg-sky-700 text-white rounded-full py-2 my-4 cursor-poiner"
                    onClick={handleSignUp}
                >
                    Agree & Join
                </button>

                <p className="text-muted-foreground my-4" >or</p>

                {/* Sign In page navigation  */}
                <p className="text-sm text-gray-700">
                    Already on LinkedIn? {" "}
                    <button
                        onClick={handleSignIn}
                        className="text-blue-600 font-medium hover:underline cursor-pointer">
                        Sign in
                    </button>
                </p>
            </div>

        </div >
    )
}