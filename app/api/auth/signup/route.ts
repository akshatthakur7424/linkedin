import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { generateOtp } from "@/app/lib/utils/generateOtp";
import { sendEmail } from "@/app/lib/utils/sendEmail";
import { generateJWT } from "@/app/lib/utils/generateJWT";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email } = body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists, please login." },
        { status: 400 }
      );
    }

    // Generate OTP
    const otp = generateOtp();

    // Create user with OTP
    await prisma.user.create({
      data: {
        name,
        email,
        password: "",
        otp,
      },
    });

    // Send OTP via email
    await sendEmail(email, otp);

    // Generate JWT
    const token = generateJWT(email);

    return NextResponse.json({
      message: "User registered and OTP sent successfully.",
      token: token,
    });
  } catch (error) {
    console.error("Registration Error:", error);
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}
