"use client"

import { useState } from "react";
import axios from "axios";

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

import toast from "react-hot-toast";

export default function EmailVerification() {
    const [otp, setOtp] = useState("");
    const router = useRouter();

    // backend hitting function - resending otp
    const handleResendCode = async () => {
        try {
            const response = await axios.get("/api/auth/resend-otp");
            toast.success("Verification code resent");
            console.log(response)
        } catch (error: any) {
            toast.error(
                "OTP verification failed. Try again."
            );
        }
    };

    // backend hitting function - matching otp
    const handleSubmit = async () => {
        // Validating with regex: must be exactly 6 digits
        const otpPattern = /^\d{6}$/;

        if (!otpPattern.test(otp)) {
            toast.error("Please enter a valid 6-digit code.");
            return;
        }

        try {
            const response = await axios.post("/api/auth/match-otp", { otp: Number(otp) });
            console.log(response)
            if (response.data.status == "success") {
                toast.success("Email verified successfully!");
                router.push("/forgot-password/reset-password")
            } else {
                toast.error("Incorrect OTP");
            }
        } catch (error: any) {
            toast.error(
                "OTP verification failed. Try again."
            );
        }
    };

    return (
        <div className="h-full w-full flex flex-col items-center  md:justify-start justify-center gap-2 p-4">
            {/* Signup Form */}
            <div className="h-auto md:w-1/4 w-full flex flex-col items-center justify-start bg-white rounded-md p-4 px-6">
                {/* Heading */}
                <div className="w-full flex flex-col items-start justify-start">
                    <p className="text-3xl font-semibold text-start py-2">Enter the 6-digit code</p>
                    <p className="text-md text-start py-2">Check your email for a verification code.</p>
                </div>

                {/* Verification code form */}
                <div className="grid w-full max-w-sm items-center gap-3 my-2">
                    <Input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter 6-digit code"
                    />
                    <p
                        className="font-semibold text-sky-700 cursor-pointer"
                        onClick={handleResendCode}
                    >
                        Resend Code
                    </p>
                </div>

                {/* Submit Button */}
                <button
                    className="w-full bg-sky-700 text-white rounded-full py-2 my-4 cursor-pointer"
                    onClick={handleSubmit}
                >
                    Submit
                </button>

                {/* guiding message */}
                <p className="text-muted-foreground text-sm">
                    If you don't see the email in your inbox, check your spam folder. If it's not
                    there, the email address may not be confirmed, or it may not match an existing
                    account.
                </p>
            </div>
        </div>
    );
}
