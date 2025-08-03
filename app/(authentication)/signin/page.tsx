"use client"

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import axios from "axios";

// Zod schema
const signInSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

// Infer form data type from schema
type SignInData = z.infer<typeof signInSchema>;

export default function SignIn() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignInData>({
        resolver: zodResolver(signInSchema),
    });

    const onSubmit = async (data: SignInData) => {
        try {
            const response = await axios.post("/api/auth/signin", data);
            if (response.data.status == "success") {
                toast.success("Signed in successfully!");
                router.push("/feed");
            } else {
                toast.error(response.data.message || "Sign in failed. Try again.");
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Sign in failed. Try again.");
        }
    };

    const handleSignUp = () => router.push("/signup");
    const handleForgotPassword = () => router.push("/forgot-password");

    return (
        <div className="h-full w-full flex flex-col items-center justify-start gap-2 p-4">
            {/* Sign In Form */}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="h-auto w-1/4 flex flex-col items-center justify-start bg-white rounded-md p-4 px-6"
            >
                {/* Heading */}
                <div className="w-full flex items-center justify-start">
                    <p className="text-3xl font-semibold text-start py-2">Sign in</p>
                </div>

                {/* Email Field */}
                <div className="grid w-full max-w-sm items-center gap-1.5 my-2">
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" {...register("email")} />
                    {errors.email && (
                        <p className="text-sm text-red-500">{errors.email.message}</p>
                    )}
                </div>

                {/* Password Field */}
                <div className="grid w-full max-w-sm items-center gap-1.5 my-2">
                    <Label htmlFor="password">Password</Label>
                    <Input type="password" id="password" {...register("password")} />
                    {errors.password && (
                        <p className="text-sm text-red-500">{errors.password.message}</p>
                    )}
                </div>

                {/* Forgot Password */}
                <div className="w-full flex items-center justify-start">
                    <button
                        type="button"
                        onClick={handleForgotPassword}
                        className="text-sky-700 font-medium hover:underline cursor-pointer"
                    >
                        Forgot Password?
                    </button>
                </div>

                {/* Sign In Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-sky-700 text-white rounded-full py-2 my-4 cursor-pointer disabled:opacity-60"
                >
                    {isSubmitting ? "Signing in..." : "Sign in"}
                </button>
            </form>

            {/* Sign Up Link */}
            <div>
                <p className="text-lg text-gray-700 my-2">
                    New to LinkedIn?{" "}
                    <button
                        onClick={handleSignUp}
                        className="text-blue-600 font-medium hover:underline cursor-pointer"
                    >
                        Join now
                    </button>
                </p>
            </div>
        </div>
    );
}
