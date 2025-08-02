import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Load JWT secret from env
const JWT_SECRET = process.env.JWT_SECRET || "asdfasdjaperofspdkfneirfpsdferifskdnfiri";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const userEnteredPassword = body.password;

        const token = req.cookies.get("token")?.value;

        if (!token) {
            return NextResponse.json({ message: "Missing token." }, { status: 401 });
        }

        // Decode token and extract email
        let email: string;
        try {
            const decoded = jwt.verify(token, JWT_SECRET) as { email: string };
            email = decoded.email;
        } catch (err) {
            return NextResponse.json({ message: "Invalid token." }, { status: 403 });
        }

        // Get user from DB
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user || !user.password) {
            return NextResponse.json({ message: "User not found or no password stored." }, { status: 404 });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(userEnteredPassword, user.password);

        if (isMatch) {
            return NextResponse.json({ message: "Correct Password" });
        } else {
            return NextResponse.json({ message: "Incorrect Password" }, { status: 401 });
        }

    } catch (error) {
        console.error("Error verifying password:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
