interface ChatMessageProps {
    sender: string;
    message: string;
    isOwnMessage: boolean;  
}

export default function ChatMessage({ sender, message, isOwnMessage }: ChatMessageProps) {
    const isSystemMessage = sender === "system";

    return (
        <div
            className={`flex ${
                isSystemMessage
                    ? "justify-center"
                    : isOwnMessage
                    ? "justify-end"
                    : "justify-start"
            } mb-3`}
        >
            <div
                className={`max-w-sm px-4 py-2 rounded-lg shadow-md ${
                    isSystemMessage
                        ? "bg-gray-800 text-white text-center text-base"
                        : isOwnMessage
                        ? "bg-blue-500 text-white"
                        : "bg-white text-black border border-gray-200"
                }`}
            >
                {!isSystemMessage && (
                    <p className="text-base font-semibold mb-1 text-gray-700">
                        {sender}
                    </p>
                )}
                <p className="text-base">{message}</p>
            </div>
        </div>
    );
}
