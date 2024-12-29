"use client"
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Appbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("Token");
    setIsLoggedIn(false); 
    router.push("/");
  };

  return (
    <div className="flex justify-between mt-4 m-4 pl-4 pt-2">
      <div className="text-4xl font-extrabold text-white">
        <a href="#">Timepass</a>
      </div>
      <div className="space-x-4">
        {!isLoggedIn ? (
          <div>
            <button
              className="text-3xl px-2 py-1 pb-2 text-white focus:ring-2 focus:ring-black font-medium rounded-lg hover:bg-gray-200 hover:text-black"
              onClick={() => router.push("/auth/login")}
            >
              Log in
            </button>
            <button
              className="text-3xl text-white px-2 py-1 pb-2 focus:ring-2 focus:ring-black font-medium rounded-lg hover:bg-gray-200 hover:text-black"
              onClick={() => router.push("/auth/signup")}
            >
              Sign up
            </button>
          </div>
        ) : (
          <button
            className="text-3xl text-white px-2 py-1 pb-2 focus:ring-2 focus:ring-black font-medium rounded-lg hover:bg-gray-200 hover:text-black"
            onClick={handleLogout}
          >
            Log out
          </button>
        )}
      </div>
    </div>
  );
}
