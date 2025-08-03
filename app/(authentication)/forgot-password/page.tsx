"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

export default function ForgotPassword() {
    const router = useRouter();

    const handleNext = () => {

    }

    const handleBack = () => {
        router.push("/signin")
    }


    return (
        <div className="h-full w-full flex flex-col items-center justify-start gap-2 p-4">

            {/* Signup Form */}
            <div className="h-auto w-1/4 flex flex-col items-center justify-start bg-white rounded-md p-4 px-6">
                {/* Heading */}
                <div className="w-full flex flex-col items-start justify-start" >
                    <p className="text-3xl font-semibold text-start py-2" >Forgot Password</p>
                </div>

                {/* Email form  */}
                <div className="grid w-full max-w-sm items-center gap-3 my-2">
                    <Label htmlFor="email">Email</Label>
                    <Input type="text" id="email" />
                </div>

                {/* Info */}
                <p className="text-muted-foreground text-sm my-4" >
                    We'll send a verification code to this email if it matches an existing LinkedIn account.
                </p>

                {/* Sign In Button  */}
                <button
                    className="w-full bg-sky-700 text-white rounded-full py-2 my-4 cursor-pointer"
                    onClick={handleNext}
                >
                    Next
                </button>
                <button
                    className="w-full text-muted-foreground hover:bg-slate-200 hover:text-slate-800 rounded-full py-2 my-2 cursor-pointer"
                    onClick={handleBack}
                >
                    Back
                </button>



            </div>

        </div >
    )
}