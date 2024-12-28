"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEventHandler, useState } from "react";

export default function SignUP() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, Setname] = useState("");       

    const handleLogin = async () => {
        if (!email || !password) {
            alert("Please fill all fields");
            return;
        }
        try {
            const response = await axios.post("http://localhost:3000/api/auth/signup", {
                email,
                password,
                name,
            });

            if (response.status === 201) {
                alert("Registration successful! You can now log in.");
                router.push("/auth/login");
            }
        } catch (error: any) {
            console.error("Login error response:", error.response);

            const status = error.response?.status;

            if (status === 401) {
                alert("Invalid credentials. Please check your email and password.");
            } else if (status === 404) {
                alert("All fields are required. Please fill in the form.");
            } else {
                alert("An unexpected error occurred. Please try again later.");
            }
        }
    };

    return (
        <div className="h-screen flex justify-center items-center flex-col">
            <div className="flex justify-center">
                <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
                    <div className="px-10">
                        <div className="text-4xl font-extrabold space-x-5 text-black">Sign Up</div>
                    </div>
                    <div className="pt-2">
                        <LabelledInput
                        onChange={(e) => {
                                Setname(e.target.value);
                            }}
                            label="Name"
                            placeholder="Full Name"
                        />
                        <LabelledInput
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            label="Email"
                            placeholder="email@gmail.com"
                        />
                        <LabelledInput
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            label="Password"
                            type="password"
                            placeholder="********"
                        />
                        <button
                            onClick={handleLogin}
                            type="button"
                            className="mt-8 w-full text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
                        >
                            Sign Up
                        </button>
                    </div>
                    <p className="text-sm text-gray-600 mt-4 text-center">
                        Don't have an account?{' '}
                        <a className="underline text-gray-800" href="/auth/signup">
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

function LabelledInput({ label, placeholder, type, onChange }: LabelledInputType) {
    return <div>
        <label className="block mb-2 text-sm text-black font-semibold pt-4">{label}</label>
        <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
    </div>
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    type?: string;
    onChange: ChangeEventHandler<HTMLInputElement>
}