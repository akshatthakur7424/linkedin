"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MdArrowDropDown } from "react-icons/md";

export default function ProfileButton() {
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
                    <DropdownMenuItem>Sign Out</DropdownMenuItem>
                </DropdownMenuContent>


            </DropdownMenu>
        </>
    )
}