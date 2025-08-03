"use client"

import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { IconType } from "react-icons";

interface NavbarButtonProps {
    name: string;
    path: string;
    icon: IconType
}

export default function NavbarButton(
    { name, path, icon: Icon }: NavbarButtonProps
) {
    const pathname = usePathname();
    const router = useRouter();
    const isActive = pathname === path;

    const handleNavigation = () => {
        router.push(path);
    }

    return (
        <div className="h-full flex flex-col items-center justify-start" >
            <button
                className={cn(
                    "h-full p-2 cursor-pointer flex flex-col items-center justify-between",
                    isActive && "border-b-2 border-black"
                )}
                onClick={handleNavigation}
            >
                {Icon && <Icon className="text-3xl" />}
                <p className="text-[12px]" >{name}</p>
            </button>

            {/* highlighting border */}
            {/* {isActive && (
                <div className="border-b-2 border-black w-full"></div>
            )} */}

        </div>
    )
}