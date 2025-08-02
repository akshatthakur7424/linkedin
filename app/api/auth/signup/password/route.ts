import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyJWT } from "@/app/lib/utils/verifyJWT";
import { hashPassword } from "@/app/lib/utils/hashPassword";
import prisma from "@/app/lib/utils/prismaClient";
import dotenv from "dotenv";

dotenv.config();

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "No token found in cookies." }, { status: 401 });
    }

    const srkKey = process.env.SECURITY_KEY || "";
    const email = verifyJWT(token, srkKey);

    if (!email) {
      return NextResponse.json({ message: "Invalid token." }, { status: 401 });
    }

    const body = await req.json();
    const plainPassword = body.password;

    if (!plainPassword) {
      return NextResponse.json({ message: "Password is required." }, { status: 400 });
    }

    const hashed = await hashPassword(plainPassword);

    const updatedUser = await prisma.user.update({
      where: { email },
      data: { password: hashed },
    });

    return NextResponse.json({
      message: "Password encrypted and saved to database successfully.",
      userId: updatedUser.id,
    });

  } catch (err) {
    console.error("Error saving password:", err);
    return NextResponse.json({ message: "Internal server error." }, { status: 500 });
  }
}
