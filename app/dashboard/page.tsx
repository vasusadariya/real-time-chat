"use client";
import Appbar from "@/components/appbar";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import ChatForm from "@/components/chatform";
import ChatMessage from "@/components/chatmessage";
import { socket } from "@/lib/SocketClient";

// Helper function to format the timestamp
const formatTime = (timestamp: string) => {
  const date = new Date(timestamp);
  return `${date.toLocaleString("en-US", {
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
  })}`;
};

export default function Dashboard() {
  const router = useRouter();
  const [messages, setMessages] = useState<{ sender: string; message: string; timestamp: string }[]>([]);
  const [room, setRoom] = useState("");
  const [userName, setUserName] = useState("");
  const [joined, setJoined] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (!token) {
      router.push("/auth/login");
    }

    socket.on("user_joined", (message: string) => {
      const timestamp = new Date().toISOString();
      setMessages((prev) => [...prev, { sender: "system", message, timestamp }]);

      // Remove the "user joined" message after 10 seconds
      setTimeout(() => {
        setMessages((prev) => prev.filter((msg) => msg.message !== message));
      }, 10000);
    });

    socket.on("message", (data: { sender: string; message: string }) => {
      const timestamp = new Date().toISOString();
      setMessages((prev) => [...prev, { sender: data.sender, message: data.message, timestamp }]);
    });

    return () => {
      socket.off("user_joined");
      socket.off("message");
    };
  }, [router]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (message: string) => {
    const timestamp = new Date().toISOString();
    const data = { room, message, sender: userName, timestamp };
    setMessages((prev) => [...prev, { sender: userName, message, timestamp }]);
    socket.emit("message", data);
  };

  const handleJoinRoom = () => {
    if (room && userName) {
      socket.emit("joinRoom", { room, username: userName });
      setJoined(true);
    } else {
      alert("Please enter both a username and room name.");
    }
  };

  // Function to determine if it's time to display a timestamp based on the previous message
  const shouldDisplayTime = (currentTimestamp: string, index: number) => {
    if (index === 0) {
      return true; // Show timestamp for the first message
    }

    const previousTimestamp = new Date(messages[index - 1].timestamp);
    const currentTime = new Date(currentTimestamp);

    const diffInMinutes = Math.floor((currentTime.getTime() - previousTimestamp.getTime()) / 60000);
    return diffInMinutes >= 15; // Show timestamp if the difference is 15 minutes or more
  };

  return (
    <div className="min-h-screen bg-blue">
      <Appbar />
      <div className="container mx-auto px-4">
        <h1 className="text-center text-4xl font-extrabold text-white my-6">Dashboard</h1>
        {!joined ? (
          <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Join a Room</h2>
            <input
              type="text"
              placeholder="Enter your username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="block w-full px-4 py-2 mb-4 text-gray-800 border rounded-lg focus:ring-blue-400 focus:border-blue-400"
            />
            <input
              type="text"
              placeholder="Enter room name"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="block w-full px-4 py-2 mb-4 text-gray-800 border rounded-lg focus:ring-blue-400 focus:border-blue-400"
            />
            <button
              onClick={handleJoinRoom}
              className="block w-full px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
            >
              Join Room
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-center text-3xl font-bold text-white mb-4">
              Room: {room}
            </h2>
            <div className="max-w-3xl mx-auto h-[400px] p-4 bg-white border rounded-lg shadow overflow-y-auto">
              {messages.map((msg, index) => (
                <div key={index}>
                  {shouldDisplayTime(msg.timestamp, index) && (
                    <div className="text-center text-xs text-gray-500 my-2">
                      {formatTime(msg.timestamp)}
                    </div>
                  )}
                  <ChatMessage
                    sender={msg.sender}
                    message={msg.message}
                    isOwnMessage={msg.sender === userName}
                  />
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="max-w-3xl mx-auto mt-4">
              <ChatForm onSendMessage={handleSendMessage} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
