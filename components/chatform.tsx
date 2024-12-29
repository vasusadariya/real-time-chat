"use client"
import { useState } from "react";

export default function ChatForm({
    onSendMessage,
}:{
    onSendMessage:(message:string) =>void;
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
        <div className="flex items-center justify-center min-h-[100px]">
            <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
                <input
                    className="flex-1 px-9 border-2 py-2 rounded-lg focus:outline-none text-black items-center"
                    type="text"
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                />
                <button
                    type="submit"
                    className="px-4 py-2 text-white font-medium rounded-lg bg-slate-400 hover:bg-blue-400"
                >Send</button>
            </form>
        </div>
    );
}
