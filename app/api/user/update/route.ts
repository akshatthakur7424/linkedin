import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";
import { verifyJWT } from "@/lib/verifyJWT";

const JWT_SECRET = process.env.SECURITY_KEY || "";

export async function PUT(req: NextRequest) {
    try {
        // accessing data
        const token = req.cookies.get("token")?.value;
        const { name, bio, image, banner } = await req.json();

        if (!token) {
            return NextResponse.json({ message: "Unauthorized: No token found" }, { status: 401 });
        }

        // Verify the token and get user email
        const userEmail = verifyJWT(token, JWT_SECRET);

        if (!userEmail) {
            return NextResponse.json({ message: "Unauthorized: Invalid token" }, { status: 401 });
        }

        // Check if user exists
        const user = await prisma.user.findUnique({
            where: { email: userEmail },
        });

        if (!user) {
            return NextResponse.json({ message: "Unauthorized: User not found" }, { status: 401 });
        }

        // Update the user record
        const updatedUser = await prisma.user.update({
            where: { email: userEmail },
            data: {
                name,
                bio,
                image,
                banner
            },
            select: {
                name: true,
                email: true,
                bio: true,
                image: true,
                banner: true
            },
        });

        return NextResponse.json({ success: true, user: updatedUser }, { status: 200 });

    } catch (error) {
        console.error("Error updating user profile:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
