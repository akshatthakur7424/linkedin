import { redirect } from "next/navigation";
import AuthenticationHeroSection from "./_components/hero-section";
import { cookies } from "next/headers";

export default async function Home() {

  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (token) {
    redirect("/feed");
  }

  return (
    <div className="w-screen h-screen flex flex-col justify-start items-center md:gap-0 gap8" >
      <AuthenticationHeroSection />
    </div>
  );
}
