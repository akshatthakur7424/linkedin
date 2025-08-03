"use client"

import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ResetPassword() {
    const router = useRouter();

    const handleSubmit = () => {

    }

    return (
        <div className="h-full w-full flex flex-col items-center justify-start gap-2 p-4">

            {/* Signup Form */}
            <div className="h-auto w-1/4 flex flex-col items-center justify-start bg-white rounded-md p-4 px-6">
                {/* Heading */}
                <div className="w-full flex flex-col items-start justify-start" >
                    <p className="text-3xl font-semibold text-start py-2" >Choose a new password.</p>
                    <p className="text-sm text-start mb-4" >Create a new password that is atlease 8 characters long.</p>
                </div>

                {/* Sign Up Form  */}
                <div className="grid w-full max-w-sm items-center gap-3 my-2">
                    <Label htmlFor="password">New Password</Label>
                    <Input type="password" id="password" />
                </div>
                <div className="grid w-full max-w-sm items-center gap-3 my-2">
                    <Label htmlFor="retype-password">Retype new password</Label>
                    <Input type="password" id="retype-password" />
                </div>

                {/* Submit Button  */}
                <button
                    className="w-full bg-sky-700 text-white rounded-full py-2 my-4 cursor-pointer"
                    onClick={handleSubmit}
                >
                    Submit
                </button>

            </div>

        </div >
    )
}