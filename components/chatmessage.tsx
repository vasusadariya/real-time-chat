
interface Chatmessageprops {
    sender: string;
    message: string;
    isOwnMessage: boolean;  
}
export default function ChatMessage({sender, message, isOwnMessage}:Chatmessageprops){
    const isSystemMessage = sender === "system";
    return (
        <div className={`flex ${
            isSystemMessage 
            ? "justify-center" 
            : isOwnMessage 
            ? "justify-end"
            :"justify-start"
            } mb-3`}>
        <div className={`max-w-xs px-4 py-2 rounded-lg ${
            isSystemMessage 
            ? "bg-gray-800 text-white text-center text-xs " 
            : isOwnMessage 
            ? "bg-blue-500 text-white"
            :"bg-white text-black"
        }`}>
            {!isSystemMessage && <p className="text-sm font-bold">{sender}</p>}
            <p>{message}</p>
            </div>        
            <div className=""></div>
        </div>
    )
}