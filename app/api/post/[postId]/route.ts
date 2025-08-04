import { type NextRequest, NextResponse} from 'next/server'
import prisma from "@/lib/prismaClient";
import { verifyJWTGetID } from "@/lib/verifyJWT";

const JWT_SECRET = process.env.SECURITY_KEY || "";

// Corrected PATCH function
export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ postId: string }> }) { 
    try {
        //accessing data
        const { postId } = await params; 
        const { content } = await req.json();
        const token = req.cookies.get("token")?.value;

        // returning if missing data
        if (!postId) {
            return NextResponse.json({ message: "Invalid post ID" }, { status: 400 });
        }
        if (!content) {
            return NextResponse.json({ message: "Invalid content" }, { status: 400 });
        }
        if (!token) {
            return NextResponse.json({ message: "Unauthorized: No token found" }, { status: 401 });
        }

        // verifying user
        const userId = verifyJWTGetID(token, JWT_SECRET);
        // returning if unauthorized user
        if (!userId) {
            return NextResponse.json({ message: "Unauthorized access: Invalid token" }, { status: 401 });
        }

        // fetching post
        const existingPost = await prisma.post.findUnique({ where: { id: postId } });

        if (!existingPost) {
            return NextResponse.json({ message: "Post not found" }, { status: 404 });
        }

        // authorizing user for the related post
        if (existingPost.authorId !== userId) {
            return NextResponse.json({ message: "Forbidden: You can't edit this post" }, { status: 403 });
        }

        // updating post 
        const updatedPost = await prisma.post.update({
            where: { id: postId },
            data: { content },
        });

        return NextResponse.json({ success: true, message: "Post updated", post: updatedPost }, { status: 200 });

    } catch (error) {
        console.error("Error updating post:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

// Corrected DELETE function
export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ postId: string }> }) { 
    try {
        // accessing data
        const { postId } = await params; 
        const token = req.cookies.get("token")?.value;

        // returning if missing data
        if (!postId) {
            return NextResponse.json({ message: "Invalid post ID" }, { status: 400 });
        }
        if (!token) {
            return NextResponse.json({ message: "Unauthorized: No token found" }, { status: 401 });
        }

        // verifying user
        const userId = verifyJWTGetID(token, JWT_SECRET);
        if (!userId) {
            return NextResponse.json({ message: "Unauthorized access: Invalid token" }, { status: 401 });
        }

        // finding post
        const existingPost = await prisma.post.findUnique({ where: { id: postId } });

        if (!existingPost) {
            return NextResponse.json({ message: "Post not found" }, { status: 404 });
        }

        // authorizing user related to post
        if (existingPost.authorId !== userId) {
            return NextResponse.json({ message: "Forbidden: You can't delete this post" }, { status: 403 });
        }

        // deleting post
        await prisma.post.delete({ where: { id: postId } });

        return NextResponse.json({ success: true, message: "Post deleted" }, { status: 200 });

    } catch (error) {
        console.error("Error deleting post:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}