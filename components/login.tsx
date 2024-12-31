"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEventHandler, useState } from "react";

export default function LogIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // New state for loading

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    setIsLoading(true); // Start loading

    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password,
      });

      if (response.status === 200 && response.data.token) {
        localStorage.setItem("Token", response.data.token);
        console.log("Token", response.data.token);
        router.push("/dashboard");
      }
    } 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (error: any) {
      console.error("Login error response:", error.response);

      const status = error.response?.status;

      if (status === 401) {
        alert("Invalid credentials. Please check your email and password.");
      } else if (status === 404) {
        alert("All fields are required. Please fill in the form.");
      } else {
        alert("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow-md">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">Sign In</h1>
        </div>
        <div>
          <LabelledInput
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            placeholder="email@gmail.com"
          />
          <LabelledInput
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            type="password"
            placeholder="********"
          />
          <button
            onClick={handleLogin}
            type="button"
            disabled={isLoading} // Disable button during loading
            className={`mt-6 w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-4 border-t-4 border-white rounded-full animate-spin mx-auto"></div> // Loader centered
            ) : (
              "Log In"
            )}
          </button>
        </div>
        <p className="mt-6 text-sm text-gray-600 text-center">
          Don&apos;t have an account?{" "}
          <a className="underline text-blue-600 hover:text-blue-800" href="/auth/signup">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

function LabelledInput({ label, placeholder, type, onChange }: LabelledInputType) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        onChange={onChange}
        type={type || "text"}
        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900"
        placeholder={placeholder}
        required
      />
    </div>
  );
}

interface LabelledInputType {
  label: string;
  placeholder: string;
  type?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}
