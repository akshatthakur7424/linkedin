import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "@/app/lib/utils/prismaClient";

export async function POST(req: NextRequest) {
    try {
        const { email: userEmail, password: userEnteredPassword } = await req.json();

        console.log("User Entered Email:", userEmail);

        // checking data 
        if (!userEmail) {
            return NextResponse.json({ message: "Email is required." }, { status: 400 });
        }
        if (!userEnteredPassword) {
            return NextResponse.json({ message: "Password is required." }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { email: userEmail },
        });

        if (!user) {
            return NextResponse.json({ message: "User not found, please signin." }, { status: 404 });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(userEnteredPassword, user.password);

        // generating JWT token
        const payload = { email: user.email, id: user.id };
        const securityKey = process.env.SECURITY_KEY || "";
        const token = jwt.sign(payload, securityKey);
        console.log("Generated JWT:", token);

        if (isMatch) {
            return NextResponse.json({
                message: "Authenticated successfully.",
                token: token
            });
        } else {
            return NextResponse.json({ message: "Incorrect Password" }, { status: 401 });
        }

    } catch (err) {
        console.error("Error generating token:", err);
        return NextResponse.json({ message: "Internal server error." }, { status: 500 });
    }
}
