"use client"

import { Separator } from "@/components/ui/separator";
import CreatePost from "./_components/CreatePost";
import PostCard from "@/components/PostCard";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SmallProfileCard from "@/components/SmallProfileCard";

export default function Feeds() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPosts();
    }, [])

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/api/post");
            if (response.data.success) {
                setPosts(response.data.posts)
                console.log("Posts data:", response.data);
            } else {
                toast.error("Failed to fetch posts: " + response.data.message);
                console.error("Error fetching posts:", response.data.message);
            }
        } catch (error: any) {
            console.error("Error creating post:", error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <div className="w-full h-full flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="w-full h-full">
            <div className="w-full h-auto grid grid-cols-12 grid-rows-1 p-4 " >

                {/* Left grid - Profile  */}
                <div className="h-full col-span-3 flex flex-col items-end justify-start px-2">
                    <div className="w-auto h-auto bg-white rounded-md border border-slate-200" >
                        <SmallProfileCard />
                    </div>
                </div>

                {/* Center grid - posts  */}
                <div className="h-full col-span-6 flex flex-col items-center justify-start gap-4 px-4">
                    {/* Create Post form */}
                    <div className="w-full h-auto bg-white rounded-md border border-slate-200" >
                        <CreatePost refreshPosts={fetchPosts} />
                    </div>
                    <Separator />
                    {/* Feeds/Posts  */}
                    <div className="w-full h-auto flex flex-col items-center justify-start bg-transparent rounded-md border border-slate-200" >
                        {
                            posts.map((post) => (
                                <PostCard
                                    key={post.authorId + post.postId}
                                    content={post.content}
                                    postId={post.postId}
                                    authorId={post.authorId}
                                    authorName={post.authorName}
                                    authorBio={post.authorBio}
                                    authorImage={post.authorImage}
                                    canEdit={post.canEdit}
                                    refreshPosts={fetchPosts}
                                />
                            ))
                        }
                    </div>
                </div>

                {/* Right grid*/}
                <div className="h-full col-span-3"></div>

            </div>
        </div>
    )
}