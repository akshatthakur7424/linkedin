"use client";

import Link from "next/link";
import { FaLinkedin } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 bg-[#f3f2ef] text-[#191919]">
      {/* Logo */}
      <div className="flex items-center gap-2 text-sky-700 text-3xl mb-4">
        <FaLinkedin size={36} />
        <span className="font-bold">Linked</span>
      </div>

      {/* Main content */}
      <div className="bg-white shadow-md rounded-md p-6 md:p-10 text-center max-w-xl w-full">
        <h1 className="text-5xl font-bold text-sky-700 mb-4">404</h1>
        <h2 className="text-xl md:text-2xl font-semibold mb-2">
          Oops! Page not found.
        </h2>
        <p className="text-sm md:text-base text-gray-600 mb-6">
          The page you're looking for doesn’t exist or has been moved.
        </p>

        {/* Go To Home */}
        <Link
          href="/feed"
          className="inline-block bg-sky-700 hover:bg-sky-800 text-white font-semibold py-2 px-6 rounded-full transition duration-300"
        >
          Go to Home
        </Link>
      </div>

      {/* Footer note */}
      <div className="mt-8 text-xs text-gray-500">
        MiniLinkedIn &copy; {new Date().getFullYear()}
      </div>
    </div>
  );
}
