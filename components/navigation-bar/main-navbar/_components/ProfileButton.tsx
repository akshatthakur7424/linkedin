"use client"

import { useRouter } from "next/navigation";
import { useContext } from "react";

import { UserDataContext } from "@/app/context/UserDataContextProvider";
import SmallProfileCard from "@/components/SmallProfileCard";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import axios from "axios";

import { MdArrowDropDown } from "react-icons/md";
import { HiOutlineLogout } from 'react-icons/hi';
import toast from "react-hot-toast";

// delete token function
export function deleteTokenCookie(name: string) {
    document.cookie = `${name}=; Max-Age=0; path=/;`;
}

export default function ProfileButton() {
    const router = useRouter();
    const userData = useContext(UserDataContext);

    // logout function
    const handleLogout = async () => {
        await axios.post("/api/auth/delete-token");
        router.push("/signin");
        toast("Signing out!")
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <div className="cursor-pointer flex flex-col items-center justify-around gap-2" >
                        {/* Profile Icon */}
                        <div className="rounded-full">
                            <img
                                src={userData?.data.image || "/images/profile.jpg"}
                                alt="profile"
                                className="w-8 h-8 rounded-full object-cover"
                            />
                        </div>

                        {/* Profile Text */}
                        <div className="flex items-center justify-between" >
                            <p className="text-sm mt-[-8px]" >Me</p>
                            <MdArrowDropDown className="mt-[-8px]" />
                        </div>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="border-none p-0 m-0" >
                    <DropdownMenuLabel>My Profile</DropdownMenuLabel>
                    <DropdownMenuItem className="h-auto w-50 border-none p-0 m-0" >
                        <SmallProfileCard />
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        className="cursor-pointer p-2"
                        onClick={handleLogout}
                    >
                        <HiOutlineLogout />
                        Sign Out
                    </DropdownMenuItem>
                </DropdownMenuContent>


            </DropdownMenu>
        </>
    )
}