import { useState, useRef, useEffect } from "react";
import { useChat } from "../../hooks/useChat";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import ProductCard from "./ProductCard";
import QuickReplies from "./QuickReplies";
import { MessageCircle, X, Trash2 } from "lucide-react";

const ChatWidget = () => {
  const { messages, isOpen, isTyping, sendMessage, toggleChat, clearChat } =
    useChat();

  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleClearChat = () => {
    clearChat();
    setShowClearConfirm(false);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-50 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white p-3 md:p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 group"
          aria-label="Open chat"
        >
          <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
          {messages.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-yellow-400 text-red-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
              {messages.length}
            </span>
          )}
          <span className="absolute bottom-full right-0 mb-2 hidden group-hover:block bg-gray-900 text-white text-xs md:text-sm px-3 py-1 rounded-lg whitespace-nowrap">
            Hỗ trợ mua hàng 24/7
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-0 right-0 md:bottom-4 md:right-4 z-50 w-full h-full md:w-[400px] md:h-[550px] md:max-h-[calc(100vh-2rem)] bg-white md:rounded-2xl shadow-2xl flex flex-col overflow-hidden border-0 md:border md:border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-red-500 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-base md:text-lg">
                  CellphoneS AI
                </h3>
                <p className="text-xs text-red-100">Hỗ trợ tư vấn sản phẩm</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {messages.length > 0 && (
                <button
                  onClick={() => setShowClearConfirm(true)}
                  className="text-white/80 hover:text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
                  title="Xóa lịch sử chat"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={toggleChat}
                className="text-white/80 hover:text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4 bg-gray-50">
            {messages.length === 0 && (
              <div className="text-center py-8 md:py-12">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <MessageCircle className="w-7 h-7 md:w-8 md:h-8 text-white" />
                </div>
                <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
                  Xin chào! 👋
                </h4>
                <p className="text-gray-600 text-xs md:text-sm px-4">
                  Tôi là trợ lý AI của CellphoneS. Bạn cần tư vấn sản phẩm gì
                  hôm nay?
                </p>
                <div className="mt-4 md:mt-6 space-y-2 px-2">
                  <button
                    onClick={() => sendMessage("Tôi muốn mua iPhone")}
                    className="w-full text-left px-3 md:px-4 py-2 md:py-3 bg-white hover:bg-red-50 rounded-lg text-xs md:text-sm text-gray-700 border border-gray-200 hover:border-red-300 transition-all shadow-sm hover:shadow"
                  >
                    📱 Tư vấn điện thoại iPhone
                  </button>
                  <button
                    onClick={() => sendMessage("Laptop văn phòng giá rẻ")}
                    className="w-full text-left px-3 md:px-4 py-2 md:py-3 bg-white hover:bg-red-50 rounded-lg text-xs md:text-sm text-gray-700 border border-gray-200 hover:border-red-300 transition-all shadow-sm hover:shadow"
                  >
                    💻 Laptop văn phòng giá rẻ
                  </button>
                  <button
                    onClick={() => sendMessage("Tai nghe bluetooth tốt nhất")}
                    className="w-full text-left px-3 md:px-4 py-2 md:py-3 bg-white hover:bg-red-50 rounded-lg text-xs md:text-sm text-gray-700 border border-gray-200 hover:border-red-300 transition-all shadow-sm hover:shadow"
                  >
                    🎧 Tai nghe bluetooth chất lượng
                  </button>
                </div>
              </div>
            )}

            {messages.map((message, index) => (
              <div key={message.id}>
                <ChatMessage message={message} />

                {/* Show products if available */}
                {message.products && message.products.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {message.products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                )}

                {/* Show quick replies if available and is last message */}
                {message.quickReplies &&
                  message.quickReplies.length > 0 &&
                  index === messages.length - 1 && (
                    <QuickReplies
                      replies={message.quickReplies}
                      onReplyClick={sendMessage}
                    />
                  )}
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex items-start gap-2">
                <div className="w-7 h-7 md:w-8 md:h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-3 h-3 md:w-4 md:h-4 text-white" />
                </div>
                <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm border border-gray-100">
                  <div className="flex gap-1">
                    <span
                      className="w-2 h-2 bg-red-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="w-2 h-2 bg-red-400 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="w-2 h-2 bg-red-400 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <ChatInput onSend={sendMessage} disabled={isTyping} />
        </div>
      )}

      {/* Clear Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl p-6 max-w-sm mx-4 shadow-2xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Xóa lịch sử chat?
            </h3>
            <p className="text-gray-600 text-sm mb-6">
              Bạn có chắc muốn xóa toàn bộ lịch sử trò chuyện? Hành động này
              không thể hoàn tác.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleClearChat}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
