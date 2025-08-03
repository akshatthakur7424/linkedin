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
        // access data
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ message: "Email is required" }, { status: 400 });
        }

        // checking user 
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json({ message: "User not found " }, { status: 401 })
        }

        const newOtp = generateOtp();

        await prisma.user.update({
            where: { email },
            data: { otp: newOtp },
        });

        console.log("OTP updated in DB:", newOtp);

        await sendEmail(email, newOtp);

        return NextResponse.json({
            message: "OTP sent to email successfully.",
        }, { status: 200 });
    } catch (error) {
        console.error("Error resending OTP:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
