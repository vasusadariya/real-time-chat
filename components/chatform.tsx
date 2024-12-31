"use client";
import { useState } from "react";

export default function ChatForm({
  onSendMessage,
}: {
  onSendMessage: (message: string) => void;
}) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() !== "") {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[100px] p-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap gap-2 w-full max-w-2xl"
      >

        <input
          className="flex-1 px-4 py-2 border-2 rounded-lg focus:outline-none text-black placeholder-gray-500 sm:text-base lg:text-lg"
          type="text"
          onChange={(e) => setMessage(e.target.value)}
          value={message} // Controlled input
          placeholder="Type a message..."
        />


        <button
          type="submit"
          className="px-4 py-2 text-sm sm:text-base lg:text-lg text-white font-medium rounded-lg bg-slate-400 hover:bg-blue-400 transition"
        >
          Send
        </button>
      </form>
    </div>
  );
}
