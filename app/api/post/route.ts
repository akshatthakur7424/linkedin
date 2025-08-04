import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";
import { verifyJWT, verifyJWTGetID } from "@/lib/verifyJWT";

const JWT_SECRET = process.env.SECURITY_KEY || "";

export async function GET(req: NextRequest) {
    try {
        // accessing token
        const token = await req.cookies.get("token")?.value;

        if (!token) {
            return NextResponse.json({ message: "Unauthorized: No token found" }, { status: 401 });
        }

        // verifying
        const userEmail = verifyJWT(token, JWT_SECRET);

        if (!userEmail) {
            return NextResponse.json({ message: "Unauthorized: Invalid token" }, { status: 401 });
        }

        // Ensuring user exists in DB
        const userExists = await prisma.user.findUnique({
            where: { email: userEmail },
            select: { id: true },
        });

        if (!userExists) {
            return NextResponse.json({ message: "Unauthorized: User not found" }, { status: 401 });
        }

        // Fetching all posts with author details
        const posts = await prisma.post.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        bio: true,
                        image: true,
                    },
                },
            },
        });

        const userId = verifyJWTGetID(token, JWT_SECRET);

        // Transforming the data
        const formattedPosts = posts.map((post) => ({
            content: post.content,
            postId: post.id,
            authorId: post.author.id,
            authorName: post.author.name || "",
            authorBio: post.author.bio || "",
            authorImage: post.author.image || "",
            canEdit: post.author.id === userId
        }));

        // Sending response
        return NextResponse.json({ success: true, posts: formattedPosts }, { status: 200 });

    } catch (error) {
        console.error("Error fetching posts:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
