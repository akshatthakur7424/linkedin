"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import axios from "axios"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import toast from "react-hot-toast"

// Zod schema
const formSchema = z
    .object({
        password: z
            .string()
            .min(8, "Password must be at least 8 characters"),
        confirmPassword: z.string().min(1, "Please confirm your password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"], // attach error to this field
    });

type ResetPasswordFormData = z.infer<typeof formSchema>;

export default function ResetPassword() {
    // hooks initialization
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ResetPasswordFormData>({
        resolver: zodResolver(formSchema),
    });

    // backend hitting function - reseting password
    const onSubmit = async (data: ResetPasswordFormData) => {
        try {
            // You can include token verification here if needed (e.g., from URL params)
            const response = await axios.post("/api/auth/forgot-password/password-reset", {
                password: data.password,
            });

            if (response.data.success) {
                toast.success("Password reset successfully!");
                router.push("/feed");
            } else {
                toast.error("Failed to reset password. Please try again.");
            }

        } catch (error: any) {
            toast.error(
                error?.response?.data?.message || "Failed to reset password"
            );
        }
    };

    return (
        <div className="h-full w-full flex flex-col items-center  md:justify-start justify-center gap-2 p-4">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="h-auto md:w-1/4 w-full flex flex-col items-center justify-start bg-white rounded-md p-4 px-6"
            >
                {/* Heading */}
                <div className="w-full flex flex-col items-start justify-start">
                    <p className="text-3xl font-semibold text-start py-2">
                        Choose a new password.
                    </p>
                    <p className="text-sm text-start mb-4">
                        Create a new password that is at least 8 characters long.
                    </p>
                </div>

                {/* New Password */}
                <div className="grid w-full max-w-sm items-start gap-1.5 my-2">
                    <Label htmlFor="password">New Password</Label>
                    <Input
                        type="password"
                        id="password"
                        {...register("password")}
                    />
                    {errors.password && (
                        <p className="text-sm text-red-500">{errors.password.message}</p>
                    )}
                </div>

                {/* Confirm Password */}
                <div className="grid w-full max-w-sm items-start gap-1.5 my-2">
                    <Label htmlFor="confirmPassword">Retype New Password</Label>
                    <Input
                        type="password"
                        id="confirmPassword"
                        {...register("confirmPassword")}
                    />
                    {errors.confirmPassword && (
                        <p className="text-sm text-red-500">
                            {errors.confirmPassword.message}
                        </p>
                    )}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-sky-700 text-white rounded-full py-2 my-4 cursor-pointer disabled:opacity-60"
                >
                    {isSubmitting ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
    );
}
