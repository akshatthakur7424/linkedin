import { NextRequest, NextResponse } from "next/server";
import { generateOtp } from "@/app/lib/utils/generateOtp";
import { sendEmail } from "@/app/lib/utils/sendEmail";
import { verifyJWT } from "@/app/lib/utils/verifyJWT";
import { cookies } from "next/headers";
import prisma from "@/app/lib/utils/prismaClient";
import dotenv from "dotenv";

dotenv.config();

export async function POST(req: NextRequest) {
    try {
        // Get token from cookies
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        const SECRET_KEY = process.env.SECURITY_KEY || "";

        if (!token) {
            return NextResponse.json({ message: "No token found in cookies" }, { status: 401 });
        }

        const email = verifyJWT(token, SECRET_KEY);

        if (!email) {
            return NextResponse.json({ message: "Invalid token" }, { status: 403 });
        }

        console.log("Resending OTP to", email);

        const newOtp = generateOtp();

        await prisma.user.update({
            where: { email },
            data: { otp: newOtp },
        });

        console.log("OTP updated in DB:", newOtp);

        await sendEmail(email, newOtp);

        return NextResponse.json({
            message: "Another OTP has been sent to the same email successfully.",
        });
    } catch (error) {
        console.error("Error resending OTP:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}