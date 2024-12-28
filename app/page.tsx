"use client"
import Appbar from "@/components/appbar";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div>
      <Appbar/>
      <div className="h-screen flex flex-col justify-center items-center">
        <div className="flex flex-col items-center space-y-5">
          <h1 className="text-5xl font-light text-white">Welcome to Timepass!</h1>
          <p className="text-3xl font-extrabold text-white">A chat App...</p>
        </div>
        <div className="flex flex-col items-center mt-5">
          <button className="text-xl text-white bg-gray-800 focus:ring-2 focus:ring-black font-medium rounded-lg px-5 py-2.5 hover:bg-gray-200 hover:text-black"
        onClick={()=>{
          const token = localStorage.getItem("Token");
          if (token) {
            router.push("/dashboard");
          }
          else{
            router.push("/auth/login");
          }
        }}>
            Kick Start Timepass
          </button>
        </div>
      </div>
    </div>
  );
}
