import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/app/lib/utils/prismaClient";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const userEmail = body.email;

        console.log("User Entered Email:", userEmail);

        if (!userEmail) {
            return NextResponse.json({ message: "Email is required." }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { email: userEmail },
        });

        if (!user) {
            return NextResponse.json({ message: "User not found in database." }, { status: 404 });
        }

        const payload = { email: userEmail };
        const securityKey = process.env.SECURITY_KEY || "";
 
        const token = jwt.sign(payload, securityKey);

        console.log("Generated JWT:", token);

        return NextResponse.json({
            message: "User found in database.",
            token,
        });

    } catch (err) {
        console.error("Error generating token:", err);
        return NextResponse.json({ message: "Internal server error." }, { status: 500 });
    }
}
