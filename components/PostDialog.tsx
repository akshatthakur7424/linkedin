"use client"

import React, { useContext } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'
import { UserDataContext } from '@/app/context/UserDataContextProvider';

interface PostDialogProps {
    userName: string;
    content: string;
    setContent: (value: string) => void;
    handlePost: () => Promise<void>;
    isLoading: boolean;
    buttonText: string
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const PostDialog = (
    { userName, content, setContent, handlePost, isLoading, buttonText, open, onOpenChange }: PostDialogProps
) => {
    const userData = useContext(UserDataContext);

    return (
        <div>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent
                    className="w-full sm:max-w-[800px] md:max-w-[900px] h-[75vh] sm:h-[80vh]
                        flex flex-col items-start justify-between gap-4 p-6">
                    {/* Title and description */}
                    <DialogHeader>
                        <div className='w-full h-auto flex items-center justify-start gap-4' >
                            <div className='h-16 w-16 rounded-full border' >
                                <img src={userData?.data.image || "/images/profile.jpg"} alt="Profile" className="h-full w-full rounded-full object-cover" />
                            </div>
                            <div className='flex flex-col gap-[2px]' >
                                <DialogTitle className='text-xl' >{userName}</DialogTitle>
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
                                {buttonText}
                            </Button>
                        </DialogFooter>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default PostDialog