"use client"
import Appbar from "@/components/appbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ChatForm from "@/components/chatform";
import ChatMessage from "@/components/chatmessage";
export default function dashboard() {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (!token) {
      router.push("/auth/login",);
    }
  });
  const [messages, setMessages] =useState<{sender: string, message: string}[]>([]);
  const [room, setRoom] = useState("");
  const [userName, setUserName] = useState("");
  const [joined, setJoined] = useState(false);
  const handleSendMessage = (message:string) => {
    // Send message to server
    console.log("Sending message:", message);
  };
  return <div>
    <div>
      <Appbar />
    </div>
    <h1 className="flex flex-col text-5xl font-extrabold items-center">Dashboard</h1><br />
    <h2 className="flex flex-col text-3xl font-extrabold items-center py-5 px-5">Room:1</h2>
    <div className="h-[500px] overflow-y-auto p-4 mb-4 bg-gray-200 border-2 rounded-lg">
      {messages.map((msg,index) => (
        <ChatMessage 
        key={index} 
        sender={msg.sender}
        message={msg.message}
        isOwnMessage={msg.sender === userName}  
        />
     ) )}
    </div>
    <ChatForm onSendMessage={handleSendMessage}/>
   </div>
}