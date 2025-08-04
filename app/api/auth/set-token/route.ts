import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { token } = await req.json();
    
    const response = NextResponse.json({ message: "Token set in cookie" });

    // Use the `cookies` property on the response to set the cookie.
    response.cookies.set({
        name: "token",
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
}


// import { NextRequest, NextResponse } from "next/server";
// import { cookies } from "next/headers";
// export async function POST(req: NextRequest) {
//     const { token } = await req.json();

//     const cookieStore = cookies();

//     cookieStore.set({
//         name: "token",
//         value: token,
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "lax",
//         path: "/",
//         maxAge: 60 * 60 * 24 * 7, // 7 days
//     });

//     return NextResponse.json({ message: "Token set in cookie" });
// }
