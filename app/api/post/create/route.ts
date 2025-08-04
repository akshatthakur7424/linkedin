import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prismaClient";
import { verifyJWTGetID } from "@/lib/verifyJWT";

// environment variable
const JWT_SECRET = process.env.SECURITY_KEY || "";

export async function POST(req: NextRequest) {
    try {
        // accessing data 
        const { content } = await req.json();
        const token = req.cookies.get("token")?.value;

        // returning if missing data
        if (!content) {
            return NextResponse.json({ message: "Invalid content" }, { status: 400 });
        }
        if (!token) {
            return NextResponse.json({ message: "Unauthorized: No token found" }, { status: 401 });
        }

        // validating token
        const id = verifyJWTGetID(token, JWT_SECRET);

        if (!id) {
            return NextResponse.json({ message: "Unauthorized access: No id found in the token" }, { status: 401 });
        }

        // Save post to DB
        const post = await prisma.post.create({
            data: {
                content,
                authorId: id,
            },
        });

        // return response
        return NextResponse.json({ success: true, message: "Post created", post }, { status: 201 });

    } catch (err) {
        console.error("Error creating post:", err);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
