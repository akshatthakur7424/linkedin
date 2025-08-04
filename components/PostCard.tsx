"use client"

import React from 'react'
import { FaEllipsisH } from "react-icons/fa";

interface PostCardProps {
    content: string;
    authorId: string;
    authorName: string;
    authorBio: string;
    authorImage: string
}

const PostCard = (
    { content, authorId, authorName, authorBio, authorImage }: PostCardProps
) => {
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
                    <FaEllipsisH size={20} className='text-muted-foreground cursor-pointer' />
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