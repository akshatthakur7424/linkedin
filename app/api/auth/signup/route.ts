import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismaClient";
import { generateOtp } from "@/lib/generateOtp";
import { sendEmail } from "@/lib/sendEmail";
import { generateJWT } from "@/lib/generateJWT";
import { hashPassword } from "@/lib/hashPassword";

export async function POST(req: NextRequest) {
  try {
    // accessing data
    const { email, password } = await req.json();

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

    // validating password
    if (!password) {
      return NextResponse.json({ message: "Password is required." }, { status: 400 });
    }

    // hashing password
    const plainPassword = password;
    const hashedPassword = await hashPassword(plainPassword);

    // Generate OTP
    const otp = generateOtp();

    // Create user with OTP
    const user = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        otp: otp,
      },
    });

    // Send OTP via email
    console.log("Sending email: ", email, "with OTP:", otp);
    await sendEmail(email, otp);

    // Generate JWT
    const token = generateJWT(email, user.id);

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
