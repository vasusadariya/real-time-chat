"use client"
import Appbar from "@/components/appbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ChatForm from "@/components/chatform";
import ChatMessage from "@/components/chatmessage";
import { socket } from "@/lib/SocketClient";
export default function dashboard() {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (!token) {
      router.push("/auth/login",);
    };
    socket.on("user_joined", (message: any)=>{
      setMessages((prev)=>                    
        [...prev, {sender:"system", message}]); 
    });
    socket.on("message",(data:any)=>{
      setMessages((prev)=>                    
        [...prev, data]);
    })
    return ()=>{
      socket.off("user_joined");
      socket.off("message");
    }
  });
  
  const [messages, setMessages] =useState<{sender: string, message: string}[]>([]);
  const [room, setRoom] = useState("");
  const [userName, setUserName] = useState("");
  const [joined, setJoined] = useState(false);

  const handleSendMessage = (message:string) => {
    const data ={room, message, sender:userName};
    setMessages((prev)=>                    
      [...prev, {sender:userName, message}]);
    socket.emit("message", data);
  };
  const handleJoinRoom = () => {
    if(room && userName){
      socket.emit("joinRoom", {room, username: userName});
      setJoined(true);
    }
  };
  return <div>
    <div>
      <Appbar />
    </div>
    <h1 className="flex flex-col text-5xl font-extrabold items-center">Dashboard</h1><br />
    {!joined ? (
      <div className="flex w-full max-w-3xl mx-auto flex-col items-center">
      <h1 className="mb-4 text-2xl font-bold">Join a Room</h1>
      <input
      type="text"
      placeholder="Enter your username" value={userName}
      onChange={(e) => setUserName (e. target. value) } className="text-black w-64 px-4 py-2 mb-4 border-2 rounded-lg"
      />
      <input
      type="text"
      placeholder="Enter room name" value={room}
      onChange={(e) => setRoom(e.target.value)}
      className="text-black w-64 px-4 py-2 mb-4 border-2 rounded-lg"
      />
      <button
      onClick={handleJoinRoom}
      className="px-4 py-2 text-white rounded-lg bg-slate-400 hover:bg-blue-400">Join Room</button>
      </div>
    
    ):(
      <div>
  <h2 className="flex flex-col text-3xl font-extrabold items-center py-5 px-5">Room: {room} </h2>
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
    )}
  </div>
}