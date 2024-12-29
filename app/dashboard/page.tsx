  "use client"
  import Appbar from "@/components/appbar";
  import { useEffect, useState } from "react";
  import { useRouter } from "next/navigation";
  import ChatForm from "@/components/chatform";
  import ChatMessage from "@/components/chatmessage";
  import { socket } from "@/lib/SocketClient";

  export default function Dashboard() {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("Token");
      if (!token) {
        router.push("/auth/login");
      }

      socket.on("user_joined", (message: any) => {
        setMessages((prev) => [...prev, { sender: "system", message }]);
      });

      socket.on("message", (data: any) => {
        setMessages((prev) => [...prev, data]);
      });

      return () => {
        socket.off("user_joined");
        socket.off("message");
      };
    }, []);

    const [messages, setMessages] = useState<{ sender: string; message: string }[]>([]);
    const [room, setRoom] = useState("");
    const [userName, setUserName] = useState("");
    const [joined, setJoined] = useState(false);

    const handleSendMessage = (message: string) => {
      const data = { room, message, sender: userName };
      setMessages((prev) => [...prev, { sender: userName, message }]);
      socket.emit("message", data);
    };

    const handleJoinRoom = () => {
      if (room && userName) {
        socket.emit("joinRoom", { room, username: userName });
        setJoined(true);
      }
    };

    return (
      <div className="min-h-screen bg-blue">
        <Appbar />
        <h1 className="flex flex-col text-5xl font-extrabold items-center my-6">Dashboard</h1>
        {!joined ? (
          <div className="flex w-full max-w-lg mx-auto flex-col items-center bg-white p-6 shadow-lg rounded-lg">
            <h1 className="mb-4 text-2xl font-bold text-black">Join a Room</h1>
            <input
              type="text"
              placeholder="Enter your username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="text-black w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              placeholder="Enter room name"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="text-black w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleJoinRoom}
              className="w-full px-4 py-2 text-white rounded-lg bg-blue-500 hover:bg-blue-600 transition"
            >
              Join Room
            </button>
          </div>
        ) : (
          <div className="px-4">
            <h2 className="flex flex-col text-3xl font-extrabold items-center py-4">Room: {room}</h2>
            <div className="h-[400px] max-w-3xl mx-auto overflow-y-auto p-4 mb-4 bg-gray-100 border rounded-lg shadow-sm">
              {messages.map((msg, index) => (
                <ChatMessage
                  key={index}
                  sender={msg.sender}
                  message={msg.message}
                  isOwnMessage={msg.sender === userName}
                />
              ))}
            </div>
            <div className="max-w-3xl mx-auto">
              <ChatForm onSendMessage={handleSendMessage} />
            </div>
          </div>
        )}
      </div>
    );
  }
