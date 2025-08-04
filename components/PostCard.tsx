"use client"

import React, { useState } from 'react'
import PostDialog from './PostDialog';
import axios from 'axios';
import toast from 'react-hot-toast';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { FaEllipsisH } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

interface PostCardProps {
    content: string;
    postId: string
    authorId: string;
    authorName: string;
    authorBio: string;
    authorImage: string;
    canEdit: boolean;
    refreshPosts: () => void;
}

const PostCard = (
    { content, postId, authorId, authorName, authorBio, authorImage, canEdit, refreshPosts }: PostCardProps
) => {
    const [textContent, setTextContent] = useState(content);
    const [isLoading, setIsLoading] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleUpdatePost = async () => {
        try {
            setIsLoading(true)
            const response = await axios.patch(`/api/post/${postId}`, {
                content: textContent,
            });
            if (response.data.success) {
                toast.success("Post updated successfully!");
                console.log("Post updated:", response.data);
                await refreshPosts();
            } else {
                toast.error("Failed to upadate post: " + response.data.message);
                console.error("Error updating post:", response.data.message);
            }
        } catch (error: any) {
            console.error("Error updating post:", error.response?.data || error.message);
        } finally {
            setIsLoading(false);
        }
    }
    const handleDeletePost = async () => {
        try {
            setIsLoading(true)
            const response = await axios.delete(`/api/post/${postId}`);
            if (response.data.success) {
                toast.success("Post deleted successfully!");
                console.log("Post deleted:", response.data);
                await refreshPosts();
            } else {
                toast.error("Failed to delete post: " + response.data.message);
                console.error("Error deleting post:", response.data.message);
            }
        } catch (error: any) {
            console.error("Error deleting post:", error.response?.data || error.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="w-full h-auto flex flex-col items-center justify-start rounded-md p-4 mb-4 bg-white" key={authorId}>
            {/* Author Details */}
            <div className='w-full h-auto flex items-center justify-between px-2' >
                <div className='w-full h-auto flex items-center justify-start gap-4' >
                    <div className='h-16 w-16 rounded-full border' >
                        <img src={authorImage || "/profile.jpg"} alt="Profile" className="h-full w-full rounded-full object-cover" />
                    </div>
                    <div className='flex flex-col gap-[2px]' >
                        <div className='text-xl' >{authorName}</div>
                        <div>
                            {authorBio}
                        </div>
                    </div>
                </div>
                <div>
                    {
                        canEdit && (
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <FaEllipsisH size={20} className='text-muted-foreground cursor-pointer' />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem className='cursor-pointer' onClick={() => setIsDialogOpen(true)}>
                                        <FaPen size={20} />Edit Post</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        className='cursor-pointer'
                                        onClick={() => handleDeletePost()}
                                    >
                                        <FaTrash size={20} />Delete Post</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )
                    }

                    <PostDialog
                        open={isDialogOpen}
                        onOpenChange={setIsDialogOpen}
                        userName={authorName}
                        content={textContent}
                        setContent={setTextContent}
                        handlePost={handleUpdatePost}
                        isLoading={isLoading}
                        buttonText="Update Post"
                    />

                </div>
            </div>

            {/* Post Content */}
            <div className="whitespace-pre-wrap w-full h-auto mt-2 p-2 text-lg">
                {content}
            </div>

        </div>
    )
}

export default PostCard