"use client"

import { Separator } from "@/components/ui/separator";
import CreatePost from "./_components/CreatePost";

export default function Feeds() {
    return (
        <div className="w-full h-full">
            <div className="w-full h-full grid grid-cols-12 grid-rows-1 p-4 " >

                {/* Left grid - Profile  */}
                <div className="h-full col-span-3 flex flex-col items-end justify-start px-2">
                    <div className="w-auto h-auto bg-white rounded-md border border-slate-200" >
                        Profile card
                    </div>
                </div>

                {/* Center grid - posts  */}
                <div className="h-full col-span-6 flex flex-col items-center justify-start gap-4 px-4">
                    {/* Create Post form */}
                    <div className="w-full h-auto bg-white rounded-md border border-slate-200" >
                        <CreatePost />
                    </div>
                    <Separator />
                    {/* Feeds/Posts  */}
                    <div className="w-full h-auto flex flex-col items-center justify-start bg-white rounded-md border border-slate-200" >
                        posts feed
                    </div>
                </div>

                {/* Right grid*/}
                <div className="h-full col-span-3"></div>

            </div>
        </div>
    )
}