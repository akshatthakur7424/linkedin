"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa6";
import UploadImage from "./UploadImage";
import UploadBanner from "./UploadBanner";

interface ManageBannerProps {
    initialBanner: string;
}

export function ManageBanner({ initialBanner }: ManageBannerProps) {
    const [banner, setBanner] = useState(initialBanner);

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

                <div className="py-4">
                    <UploadBanner imageUrl={banner} />
                </div>
            </DialogContent>
        </Dialog>
    );
}
