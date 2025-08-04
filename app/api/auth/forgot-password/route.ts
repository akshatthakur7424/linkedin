import { NextRequest, NextResponse } from "next/server";

import { generateOtp } from "@/lib/generateOtp";
import { sendEmail } from "@/lib/sendEmail";
import prisma from "@/lib/prismaClient";

import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
    try {
        // accessing data
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ message: "Email is required" }, { status: 400 });
        }

        // checking for user
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 401 });
        }

        const newOtp = generateOtp();

        // updating otp
        await prisma.user.update({
            where: { email },
            data: { otp: newOtp },
        });

        console.log("OTP updated in DB:", newOtp);

        // sending mail
        await sendEmail(email, newOtp);
        console.log("Email sent to:", email);

        // Generate JWT token
        const tokenPayload = { email: user.email, id: user.id };
        const securityKey = process.env.SECURITY_KEY;

        if (!securityKey) {
            console.error("SECURITY_KEY is not set in .env");
            return NextResponse.json({ message: "Server misconfiguration" }, { status: 500 });
        }

        // cerating token
        const token = jwt.sign(tokenPayload, securityKey, { expiresIn: "7d" });
        console.log("Generated JWT:", token);

        // sending response
        return NextResponse.json({
            success: true,
            message: "OTP sent to email successfully.",
            token: token,
        }, { status: 200 });

    } catch (error) {
        console.error("Error in resend-otp route:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
