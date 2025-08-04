import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import ApplicationNavbar from "@/components/navigation-bar/main-navbar/page";
import { ToastProvider } from "@/components/providers/toaster-provider";
import { UserInitializer } from "@/components/context/UserInitializer";

import { UserContextProvider } from "../context/UserDataContextProvider";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token) {
        redirect("/signup");
    }

    return (
        <>
            <UserContextProvider>
                <UserInitializer>
                    <ToastProvider />
                    <div className="w-screen h-screen flex flex-col justify-start items-center">
                        <ApplicationNavbar />
                        <div className="bg-[#f3f2ef] w-full h-full flex flex-col items-center justify-center gap-2 overflow-y-scroll">
                            {children}
                        </div>
                    </div>
                </UserInitializer>
            </UserContextProvider>

        </>
    );
}



// import { cookies } from 'next/headers';

// import ApplicationNavbar from "@/components/navigation-bar/main-navbar/page";
// import { ToastProvider } from "@/components/providers/toaster-provider";
// import { redirect } from "next/navigation";

// export default function AuthLayout({ children }: {
//     children: React.ReactNode
// }) {
//     const cookieStore = cookies();
//     const token = cookieStore.get('token');

//     if (!token) {
//         redirect("/signup")
//     }

//     return (
//         <>
//             <ToastProvider />
//             <div className="w-screen h-screen flex flex-col justify-start items-center" >
//                 <ApplicationNavbar />
//                 <div className="bg-[#f3f2ef] w-full h-full flex flex-col items-center justify-center gap-2" >
//                     {children}
//                 </div>
//             </div>
//         </>
//     )
// } 