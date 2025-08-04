"use client"

// next imports
import { useState } from "react";
import { useRouter } from "next/navigation";

// shadcn imports
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// third-party imports
import axios from "axios";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

// form schema
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// form schema
const formSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Email is required." })
        .regex(emailRegex, { message: "Please enter a valid email address." }),

    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long." }),
});

export default function SignUp() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const { isValid, isSubmitting } = form.formState;

    // navigation
    const handleSignIn = () => {
        router.push("/signin");
    };

    // backend hitting function - signup
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        try {
            const res = await axios.post("/api/auth/signup", values, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            toast.success("Registered successfully!");

            const { token } = res.data;

            // Save token to cookie or wherever needed
            await axios.post("/api/auth/set-token", { token });

            router.push("/signup/email-verification");
        } catch (error: any) {
            console.error("Registration Error:", error);
            toast.error(error?.response?.data?.message || "Something went wrong during signup.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-start gap-2 p-4">
            <p className="text-3xl m-2 my-4 md:text-start text-center">Make the most of your professional life</p>

            <div className="h-auto w-full max-w-md flex flex-col items-center justify-start bg-white rounded-md p-6 shadow">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
                        {/* Email */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} className="bg-white" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Password */}
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} className="bg-white" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className="w-full rounded-full bg-sky-700 hover:bg-sky-700 cursor-pointer"
                            disabled={isSubmitting || isLoading}
                        >
                            {isLoading ? "Registering..." : "Agree & Join"}
                        </Button>
                    </form>
                </Form>

                {/* Terms */}
                <p className="text-center text-xs text-gray-500 max-w-sm leading-relaxed mt-4">
                    By clicking Agree & Join or Continue, you agree to LinkedIn’s
                    <a href="#" className="text-blue-600 hover:underline"> User Agreement</a>,
                    <a href="#" className="text-blue-600 hover:underline"> Privacy Policy</a>, and
                    <a href="#" className="text-blue-600 hover:underline"> Cookie Policy</a>.
                </p>

                <p className="text-muted-foreground my-4">or</p>

                <p className="text-sm text-gray-700">
                    Already on LinkedIn?{" "}
                    <button
                        onClick={handleSignIn}
                        className="text-blue-600 font-medium hover:underline cursor-pointer"
                    >
                        Sign in
                    </button>
                </p>
            </div>
        </div>
    );
}
