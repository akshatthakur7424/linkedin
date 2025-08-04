"use client";

import { useEffect, useState } from "react";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import UploadImage from "./UploadImage";

import { FaPen } from "react-icons/fa6";

interface ManageProfileProps {
    initialName: string;
    initialBio: string;
    profileImage: string;
    onSave: (updated: { name: string; bio: string, image: string }) => void;
}

export function ManageProfile({ initialName, initialBio, profileImage, onSave }: ManageProfileProps) {
    const [name, setName] = useState(initialName);
    const [bio, setBio] = useState(initialBio);
    const [image, setImage] = useState(profileImage)

    // stroring current data for rendering
    useEffect(() => {
        setName(initialName);
        setBio(initialBio);
        setImage(profileImage)
    }, [initialName, initialBio]);

    // query hitting function 
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ name, bio, image });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                    <FaPen size={20} className="text-slate-600 cursor-pointer" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>

                    {/* Headings */}
                    <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>

                    {/* Main Controls - Editing/Managing */}
                    <div className="grid gap-4 py-4">
                        {/* Image */}
                        <div>
                            <UploadImage imageUrl={image} />
                        </div>

                        {/* Name */}
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        {/* Bio */}
                        <div className="grid gap-2">
                            <Label htmlFor="email">Bio</Label>
                            <Input
                                id="bio"
                                type="text"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                            />
                        </div>
                    </div>


                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" type="button">
                                Cancel
                            </Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button type="submit">Save</Button>
                        </DialogClose>
                    </DialogFooter>

                </form>
            </DialogContent>
        </Dialog>
    );
}
