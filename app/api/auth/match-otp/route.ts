import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyJWT } from "@/app/lib/utils/verifyJWT";
import prisma from "@/app/lib/utils/prismaClient";
import dotenv from "dotenv";

dotenv.config();

// const SECRET_KEY = process.env.SECURITY_KEY;
const SECRET_KEY = process.env.SECURITY_KEY || "";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const userEnteredOtp = body.otp;

        // Get token from cookies
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return NextResponse.json(
                { status: "error", message: "Missing token" },
                { status: 401 }
            );
        }

        // Decode email from JWT
        const email = verifyJWT(token, SECRET_KEY);
        if (!email) {
            return NextResponse.json(
                { status: "error", message: "Invalid JWT token" },
                { status: 401 }
            );
        }

        // Find user by email
        const user = await prisma.user.findUnique({
            where: { email: email as string },
        });

        if (!user) {
            return NextResponse.json(
                { status: "error", message: "User not found" },
                { status: 404 }
            );
        }

        if (user.otp === userEnteredOtp) {
            return NextResponse.json({
                status: "success",
                message: "OTP matched successfully.",
            });
        } else {
            return NextResponse.json({
                status: "error",
                message: `Invalid OTP. Please try again.`,
            });
        }
    } catch (error) {
        console.error("Error verifying OTP:", error);
        return NextResponse.json(
            { status: "error", message: "Server error" },
            { status: 500 }
        );
    }
}
