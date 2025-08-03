import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthenticationNavbar from "@/components/navigation-bar/authentication-navbar/page";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LinkedIn",
  description: "Mini linkedin to create and publish posts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthenticationNavbar />
        <div className="bg-[#f3f2ef] w-full h-full flex flex-col items-center justify-center gap-2" >
          {children}
        </div>
      </body>
    </html>
  );
}
