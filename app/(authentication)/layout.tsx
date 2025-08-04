import React from "react";

import AuthenticationNavbar from "@/components/navigation-bar/authentication-navbar/page";
import { ToastProvider } from "@/components/providers/toaster-provider";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <ToastProvider />
            <div className="w-screen h-screen flex flex-col justify-start items-center" >
                <AuthenticationNavbar />
                <div className="bg-[#f3f2ef] w-svw h-svh flex flex-col items-center justify-center gap-2" >
                    {children}
                </div>
            </div>
        </>
    )
} 