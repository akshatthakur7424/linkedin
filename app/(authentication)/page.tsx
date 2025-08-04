import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import AuthenticationHeroSection from "./_components/hero-section";

export default async function Home() {
  // accessing token
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  // redirect if user is signed in
  if (token) {
    redirect("/feed");
  }

  return (
    <div className="w-screen h-screen flex flex-col justify-start items-center md:gap-0 gap8" >
      <AuthenticationHeroSection />
    </div>
  );
}
