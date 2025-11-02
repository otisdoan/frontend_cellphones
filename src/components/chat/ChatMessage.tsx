import type { ChatMessage as ChatMessageType } from "../../types/chat.types";

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex items-start gap-2 ${isUser ? "flex-row-reverse" : ""}`}
    >
      {/* Avatar */}
      {!isUser && (
        <div className="w-7 h-7 md:w-8 md:h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center flex-shrink-0">
          <svg
            className="w-3 h-3 md:w-4 md:h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </div>
      )}

      {/* Message bubble */}
      <div
        className={`max-w-[80%] md:max-w-[75%] rounded-2xl px-3 md:px-4 py-2 md:py-3 shadow-sm ${
          isUser
            ? "bg-gradient-to-r from-red-600 to-red-500 text-white rounded-tr-none"
            : "bg-white text-gray-800 rounded-tl-none border border-gray-100"
        }`}
      >
        <p className="text-xs md:text-sm whitespace-pre-wrap break-words leading-relaxed">
          {message.content}
        </p>

        {/* Timestamp */}
        <p
          className={`text-xs mt-1 md:mt-2 ${
            isUser ? "text-red-100" : "text-gray-400"
          }`}
        >
          {message.timestamp.toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
