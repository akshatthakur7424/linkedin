import AuthenticationNavbar from "@/components/navigation-bar/authentication-navbar/page";
import AuthenticationHeroSection from "../components/authentication/hero-section";

export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col justify-start items-center" >
      <AuthenticationNavbar />
      <div className="h-auto w-full flex flex-col items-center justify-center" >
        <AuthenticationHeroSection />
      </div>
    </div>
  );
}
