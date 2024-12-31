interface ChatMessageProps {
    sender: string;
    message: string;
    isOwnMessage: boolean;
  }
  
  export default function ChatMessage({
    sender,
    message,
    isOwnMessage,
  }: ChatMessageProps) {
    const isSystemMessage = sender === "system";
  
    return (
      <div
        className={`flex ${
          isSystemMessage
            ? "justify-center"
            : isOwnMessage
            ? "justify-end"
            : "justify-start"
        } mb-3 px-2 md:px-4`}
      >
        <div
          className={`max-w-xs sm:max-w-md md:max-w-lg px-4 py-2 rounded-lg shadow-md ${
            isSystemMessage
              ? "bg-gray-800 text-white text-center text-sm sm:text-base"
              : isOwnMessage
              ? "bg-blue-500 text-white"
              : "bg-white text-black border border-gray-200"
          }`}
        >
          {!isSystemMessage && (
            <p
              className={`font-semibold mb-1 ${
                isOwnMessage ? "text-gray-200" : "text-gray-700"
              } text-sm sm:text-base`}
            >
              {sender}
            </p>
          )}
          <p className="text-sm sm:text-base">{message}</p>
        </div>
      </div>
    );
  }
  