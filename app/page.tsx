"use client";
import Appbar from "@/components/appbar";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleButtonClick = () => {
    try {
      const token = localStorage.getItem("Token");
      if (token) {
        router.push("/dashboard");
      } else {
        router.push("/auth/login");
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen">
      <Appbar />
      <div className="flex flex-col justify-center items-center h-full">
        <div className="flex flex-col items-center space-y-5 text-center">
          <h1 className="text-4xl md:text-6xl font-light text-white">
            Welcome to <span className="font-bold">Timepass!</span>
          </h1>
          <p className="text-2xl md:text-3xl font-extrabold text-white">A Chat App...</p>
        </div>
        <div className="flex flex-col items-center mt-10">
          <button
            className="text-lg md:text-xl text-white bg-gray-800 focus:ring-2 focus:ring-black font-medium rounded-lg px-6 py-3 hover:bg-gray-200 hover:text-black transition-all duration-200"
            onClick={handleButtonClick}
          >
            Kick Start Timepass
          </button>
        </div>
      </div>
    </div>
  );
}
