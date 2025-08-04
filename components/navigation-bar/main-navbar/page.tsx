"use client"

import { useRouter } from "next/navigation"
import Image from "next/image";

import NavbarButton from "./_components/navButton";
import ProfileButton from "./_components/ProfileButton";

import { FaHouse } from "react-icons/fa6";

export default function ApplicationNavbar() {
    const router = useRouter();

    // nav items list
    const navbarItems = [
        {
            name: "Home",
            path: "/feed",
            icon: FaHouse
        },
    ]

    return (
        <nav className="h-16 w-full bg-white flex items-center justify-between px-4 md:px-[15%]">
            {/* Logo  */}
            <div className="flex items-center cursor-pointer"
                onClick={() => router.push("/")}
            >
                <Image
                    width={120}
                    height={30}
                    src="/logo/logo-full.png"
                    alt="LinkedIn Logo"
                    className="object-contain" />
            </div>

            {/* Right buttons */}
            <div className="h-full flex items-center justify-center gap-0" >
                {
                    navbarItems.map((item, index) => (
                        <NavbarButton name={item.name} path={item.path} icon={item.icon} key={index} />
                    ))
                }
                {/* Profile button */}
                <div className="ml-6 flex items-center justify-center" >
                    <ProfileButton />
                </div>
            </div>


        </nav>

    )
} 