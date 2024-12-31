"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Appbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
    <div className="text-white">
      <div className="flex justify-between items-center p-4 lg:px-8">
        <div className="text-2xl sm:text-3xl font-extrabold">
          <a href="#">Timepass</a>
        </div>
        <div className="lg:hidden">
          <button
            className="focus:outline-none text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex space-x-4">
          {!isLoggedIn ? (
            <>
              <button
                className="text-sm lg:text-lg px-3 py-2 focus:ring-2 focus:ring-black font-medium rounded-lg bg-gray-700 hover:bg-gray-600"
                onClick={() => router.push("/auth/login")}
              >
                Log in
              </button>
              <button
                className="text-sm lg:text-lg px-3 py-2 focus:ring-2 focus:ring-black font-medium rounded-lg bg-gray-700 hover:bg-gray-600"
                onClick={() => router.push("/auth/signup")}
              >
                Sign up
              </button>
            </>
          ) : (
            <button
              className="text-sm lg:text-lg px-3 py-2 focus:ring-2 focus:ring-black font-medium rounded-lg bg-gray-700 hover:bg-gray-600"
              onClick={handleLogout}
            >
              Log out
            </button>
          )}
        </div>
      </div>
      {menuOpen && (
        <div className="lg:hidden flex flex-col items-start space-y-2 p-4 bg-gray-700">
          {!isLoggedIn ? (
            <>
              <button
                className="text-sm px-3 py-2 w-full text-left focus:ring-2 focus:ring-black font-medium rounded-lg bg-gray-600 hover:bg-gray-500"
                onClick={() => {
                  router.push("/auth/login");
                  setMenuOpen(false);
                }}
              >
                Log in
              </button>
              <button
                className="text-sm px-3 py-2 w-full text-left focus:ring-2 focus:ring-black font-medium rounded-lg bg-gray-600 hover:bg-gray-500"
                onClick={() => {
                  router.push("/auth/signup");
                  setMenuOpen(false);
                }}
              >
                Sign up
              </button>
            </>
          ) : (
            <button
              className="text-sm px-3 py-2 w-full text-left focus:ring-2 focus:ring-black font-medium rounded-lg bg-gray-600 hover:bg-gray-500"
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
            >
              Log out
            </button>
          )}
        </div>
      )}
    </div>
  );
}
