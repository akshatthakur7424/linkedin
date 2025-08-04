"use client"

import React, { useContext, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import axios from 'axios'
import toast from 'react-hot-toast'
import { UserDataContext } from '@/app/context/UserDataContextProvider'

const CreatePost = (
    { refreshPosts }: { refreshPosts: () => void }
) => {
    const [content, setContent] = useState("");
    const [isLoading, setisLoading] = useState(false);
    const userData = useContext(UserDataContext);

    const handlePost = async () => {
        try {
            setisLoading(true)
            const response = await axios.post("/api/post/create", {
                content: content,
            });
            if (response.data.success) {
                toast.success("Post published successfully!");
                console.log("Post created:", response.data);
                await refreshPosts();
            } else {
                toast.error("Failed to create post: " + response.data.message);
                console.error("Error creating post:", response.data.message);
            }
        } catch (error: any) {
            console.error("Error creating post:", error.response?.data || error.message);
        } finally {
            setisLoading(false);
        }
    }

    return (
        <div className='w-full h-auto flex items-center justify-between gap-2 p-4' >
            {/* Profile button */}
            <div className='h-12 w-12 rounded-full border' >
                <img src={userData?.data.image || "/path/to/profile-pic.jpg"} alt="Profile" className="h-full w-full rounded-full object-cover" />
            </div>

            {/* Post creation form  */}
            <div className='w-full h-auto'>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className='w-full h-auto bg-slate-50 rounded-full flex items-center justify-start py-4 cursor-pointer' variant="outline">
                            Start a Post
                        </Button>
                    </DialogTrigger>
                    <DialogContent
                        className="w-full sm:max-w-[800px] md:max-w-[900px] h-[75vh] sm:h-[80vh]
                        flex flex-col items-start justify-between gap-4 p-6">
                        {/* Title and description */}
                        <DialogHeader>
                            <div className='w-full h-auto flex items-center justify-start gap-4' >
                                <div className='h-16 w-16 rounded-full border' >
                                    <img src="/path/to/profile-pic.jpg" alt="Profile" className="h-full w-full rounded-full object-cover" />
                                </div>
                                <div className='flex flex-col gap-[2px]' >
                                    <DialogTitle className='text-xl' >User Name</DialogTitle>
                                    <DialogDescription>
                                        Post to Anyone.
                                    </DialogDescription>
                                </div>
                            </div>
                        </DialogHeader>

                        {/* Post creation Form */}
                        <div className='w-full h-full flex items-center justify-center' >
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full h-full p-3 resize-none focus:outline-none text-xl"
                                placeholder="What's on your mind?"
                            />
                        </div>

                        {/* Post button */}
                        <div className='w-full h-auto flex items-center justify-end border-t pt-4' >
                            <DialogFooter>
                                <Button
                                    className='rounded-full px-8 cursor-pointer'
                                    onClick={() => handlePost()}
                                    disabled={isLoading}
                                >
                                    Post
                                </Button>
                            </DialogFooter>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

        </div>
    )
}

export default CreatePost