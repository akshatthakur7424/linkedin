"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import UploadBanner from "./UploadBanner";

import { FaPen } from "react-icons/fa6";

interface ManageBannerProps {
    initialBanner: string;
}

export function ManageBanner({ initialBanner }: ManageBannerProps) {
    const [banner, setBanner] = useState(initialBanner);

    // storing current banner for rendering 
    useEffect(() => {
        setBanner(initialBanner);
    }, [initialBanner]);


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                    <FaPen size={20} className="text-slate-600 cursor-pointer" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Banner</DialogTitle>
                    <DialogDescription>
                        Upload a new banner image here.
                    </DialogDescription>
                </DialogHeader>

                {/* Upload banner component */}
                <div className="py-4">
                    <UploadBanner imageUrl={banner} />
                </div>
            </DialogContent>
        </Dialog>
    );
}
