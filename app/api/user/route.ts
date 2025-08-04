import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";
import { verifyJWT } from "@/lib/verifyJWT";

const JWT_SECRET = process.env.SECURITY_KEY || "";

export async function GET(req: NextRequest) {
    try {
        // Extract token from cookies
        const token = req.cookies.get("token")?.value;

        if (!token) {
            return NextResponse.json({ message: "Unauthorized: No token found" }, { status: 401 });
        }

        // Verifying JWT and extracting email
        const userEmail = verifyJWT(token, JWT_SECRET);

        if (!userEmail) {
            return NextResponse.json({ message: "Unauthorized: Invalid token" }, { status: 401 });
        }

        // Checkcking if user exists in database
        const user = await prisma.user.findUnique({
            where: { email: userEmail },
            select: {
                name: true,
                bio: true,
                email: true,
                image: true,
                banner: true
            },
        });

        if (!user) {
            return NextResponse.json({ message: "Unauthorized: User not found" }, { status: 401 });
        }

        // sending response
        return NextResponse.json({ success: true, user }, { status: 200 });

    } catch (error) {
        console.error("Error fetching user details:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
