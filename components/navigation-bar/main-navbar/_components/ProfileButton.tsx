"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import axios from "axios";
import { useRouter } from "next/navigation";
import { MdArrowDropDown } from "react-icons/md";

export function deleteTokenCookie(name: string) {
    document.cookie = `${name}=; Max-Age=0; path=/;`;
}

export default function ProfileButton() {
    const router = useRouter();

    const handleLogout = async () => {
        await axios.post("/api/auth/delete-token");
        router.push("/signin");
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <div className="cursor-pointer flex flex-col items-center justify-around gap-2" >
                        {/* Profile Icon */}
                        <div className="rounded-full">
                            <img
                                src="/images/profile.png"
                                alt="profile"
                                className="w-6 h-6 rounded-full object-cover"
                            />
                        </div>

                        {/* Profile Text */}
                        <div className="flex items-center justify-between" >
                            <p className="text-sm" >Me</p>
                            <MdArrowDropDown />
                        </div>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Profile short description</DropdownMenuLabel>
                    <DropdownMenuItem>Akshat Singh Thakur</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={handleLogout}
                    >Sign Out
                    </DropdownMenuItem>
                </DropdownMenuContent>


            </DropdownMenu>
        </>
    )
}