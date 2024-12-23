"use client"
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  return <div className="flex justify-center items-center h-screen">
    <button className="mt-8 text-white bg-gray-800 focus:ring-2 focus:ring-black font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 hover:bg-gray-200 hover:text-black"
      onClick={() => {
        router.push("/user/Signin");
      }}>Sign In </button>
    <button className="mt-8 text-white bg-gray-800 focus:ring-2 focus:ring-black font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 hover:bg-gray-200 hover:text-black"
      onClick={() => {
        router.push("/user/Signup");
      }}>Sign Up </button>
  </div>
}
