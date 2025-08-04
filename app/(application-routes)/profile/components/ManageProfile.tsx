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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa6";

interface ManageProfileProps {
    initialName: string;
    initialBio: string;
    onSave: (updated: { name: string; bio: string }) => void;
}

export function ManageProfile({ initialName, initialBio, onSave }: ManageProfileProps) {
    const [name, setName] = useState(initialName);
    const [bio, setBio] = useState(initialBio);

    useEffect(() => {
        setName(initialName);
        setBio(initialBio);
    }, [initialName, initialBio]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ name, bio });
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
                    <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
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
