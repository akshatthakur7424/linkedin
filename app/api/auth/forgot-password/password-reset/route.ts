import { NextRequest, NextResponse } from "next/server";
import { generateOtp } from "@/app/lib/utils/generateOtp";
import { sendEmail } from "@/app/lib/utils/sendEmail";
import { verifyJWT } from "@/app/lib/utils/verifyJWT";
import { cookies } from "next/headers";
import prisma from "@/app/lib/utils/prismaClient";
import dotenv from "dotenv";
import { hashPassword } from "@/app/lib/utils/hashPassword";

dotenv.config();

export async function POST(req: NextRequest) {
    try {
        // accessing data
        const { password } = await req.json();
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
        if (!password) {
            return NextResponse.json({ message: "Password is required" }, { status: 400 });
        }

        // hashing password
        const encryptedPassword = await hashPassword(password);

        // updating password
        await prisma.user.update({
            where: { email: email },
            data: { password: encryptedPassword }
        });

        return NextResponse.json({
            message: "Password upadated successfully.",
        }, { status: 200 });
    } catch (error) {
        console.error("Error resending OTP:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
