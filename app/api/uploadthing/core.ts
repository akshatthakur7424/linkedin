import { createUploadthing, type FileRouter } from "uploadthing/next";
import { verifyJWTGetID } from "@/lib/verifyJWT";
import { NextRequest } from "next/server";

const f = createUploadthing();
const JWT_SECRET = process.env.SECURITY_KEY || "";

const handleAuth = async (ctx: { req: NextRequest }) => {
    const token = ctx.req.cookies.get("token")?.value;

    if (!token) {
        throw new Error("No token provided");
    }

    const userId = verifyJWTGetID(token, JWT_SECRET);

    if (!userId) {
        throw new Error("Unauthorized Access to the media service");
    }

    return { userId };
};

export const ourFileRouter = {
    // Defining file uploading routes
    profileImage: f(
        { image: { maxFileSize: "16MB", maxFileCount: 1 } }
    )
        .middleware(({ req }) => handleAuth({ req }))
        .onUploadComplete(({ metadata, file }) => {
            console.log("Upload complete for userId:", metadata.userId);
            console.log("file url", file.url);
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

// fileObjectReturnedFromUploadthings: {
//   name: 'third.mp4',
//   size: 2086135,
//   type: 'video/mp4',
//   customId: null,
//   key: 'Gqh15NEuEBXWDSYtERrH829cfQKOJEmIHbL5Mjzo6SqT0Ula',
//   url: [Getter],
//   appUrl: [Getter],
//   ufsUrl: 'https://zdoqlzq6g3.ufs.sh/f/Gqh15NEuEBXWDSYtERrH829cfQKOJEmIHbL5Mjzo6SqT0Ula',
//   fileHash: 'ed9ba870d64f620c3dd80ae551cd9088'
// }