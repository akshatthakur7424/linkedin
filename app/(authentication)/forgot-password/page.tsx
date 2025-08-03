"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import axios from "axios"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const emailSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Please enter a valid email"),
})

type ForgotPasswordFormData = z.infer<typeof emailSchema>

export default function ForgotPassword() {
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(emailSchema),
    })

    const onSubmit = async (data: ForgotPasswordFormData) => {
        console.log("Form data: ", data);
        try {
            const response = await axios.post(
                "/api/auth/forgot-password",
                JSON.stringify(data), // stringified JSON
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data.success) {
                const { token } = response.data;
                await axios.post("/api/auth/set-token", { token });
                toast.success("Verification code sent to your email");
                router.push("/forgot-password/email-verification");
            } else {
                toast.error("Failed to send reset password, please try again after some time.");
            }
        } catch (error: any) {
            toast.error(
                error?.response?.data?.message || "Failed to send reset code"
            );
        }
    };


    const handleBack = () => {
        router.push("/signin")
    }

    return (
        <div className="h-full w-full flex flex-col items-center justify-start gap-2 p-4">
            {/* Forgot Password Form */}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="h-auto w-1/4 flex flex-col items-center justify-start bg-white rounded-md p-4 px-6"
            >
                {/* Heading */}
                <div className="w-full flex flex-col items-start justify-start">
                    <p className="text-3xl font-semibold text-start py-2">Forgot Password</p>
                </div>

                {/* Email field */}
                <div className="grid w-full max-w-sm items-start gap-1.5 my-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="text" {...register("email")} />
                    {errors.email && (
                        <p className="text-sm text-red-500">{errors.email.message}</p>
                    )}
                </div>

                {/* Info */}
                <p className="text-muted-foreground text-sm my-4">
                    We'll send a verification code to this email if it matches an existing LinkedIn account.
                </p>

                {/* Buttons */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-sky-700 text-white rounded-full py-2 my-4 cursor-pointer disabled:opacity-60"
                >
                    {isSubmitting ? "Sending..." : "Next"}
                </button>
                <button
                    type="button"
                    onClick={handleBack}
                    className="w-full text-muted-foreground hover:bg-slate-200 hover:text-slate-800 rounded-full py-2 my-2 cursor-pointer"
                >
                    Back
                </button>
            </form>
        </div>
    )
}
