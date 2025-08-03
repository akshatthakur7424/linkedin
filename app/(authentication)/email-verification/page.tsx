"use client"

import { Input } from "@/components/ui/input"

export default function EmailVerification() {

    const handleResendCode = () => {

    }
    const handleSubmit = () => {

    }


    return (
        <div className="h-full w-full flex flex-col items-center justify-start gap-2 p-4">

            {/* Signup Form */}
            <div className="h-auto w-1/4 flex flex-col items-center justify-start bg-white rounded-md p-4 px-6">
                {/* Heading */}
                <div className="w-full flex flex-col items-start justify-start" >
                    <p className="text-3xl font-semibold text-start py-2" >Enter the 6-digit code</p>
                    <p className="text-md  text-start py-2" >Check your email for a verification code.</p>
                </div>

                {/* Verification code form  */}
                <div className="grid w-full max-w-sm items-center gap-3 my-2">
                    <Input type="text" id="text" />
                    <p
                        className="font-semibold text-sky-700 cursor-pointer"
                        onClick={handleResendCode}
                    >
                        Resend Code
                    </p>
                </div>

                {/* Sign In Button  */}
                <button
                    className="w-full bg-sky-700 text-white rounded-full py-2 my-4 cursor-pointer"
                    onClick={handleSubmit}
                >
                    Submit
                </button>

                <p className="text-muted-foreground text-sm" >
                    If you don't see the email in your inbox, check your spam folder.If it's not there, the email address may not be confirmed, or it may not match an existing LinkedIn account.
                </p>

            </div>

        </div >
    )
}