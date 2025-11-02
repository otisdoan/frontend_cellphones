import { useState, useCallback, useEffect } from "react";
import type { ChatMessage, ChatSession } from "../types/chat.types";
import { chatService } from "../services/chat.service";

const STORAGE_KEY = "cellphones_chat_session";

export const useChat = () => {
  const [session, setSession] = useState<ChatSession>(() => {
    // Load session from localStorage
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          messages: parsed.messages.map((msg: ChatMessage) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          })),
          isOpen: false,
          isTyping: false,
        };
      } catch {
        // Invalid data, reset
      }
    }

    return {
      sessionId: null,
      messages: [],
      isOpen: false,
      isTyping: false,
    };
  });

  // Save session to localStorage
  useEffect(() => {
    if (session.messages.length > 0) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          sessionId: session.sessionId,
          messages: session.messages,
        })
      );
    }
  }, [session.sessionId, session.messages]);

  const sendMessage = useCallback(
    async (text: string, userId?: number) => {
      if (!text.trim()) return;

      console.log("📤 Sending message:", text);

      // Add user message
      const userMessage: ChatMessage = {
        id: `user_${Date.now()}`,
        role: "user",
        content: text,
        timestamp: new Date(),
      };

      console.log("👤 User message added:", userMessage);

      setSession((prev) => ({
        ...prev,
        messages: [...prev.messages, userMessage],
        isTyping: true,
      }));

      try {
        // Call API
        const response = await chatService.sendMessage(
          text,
          session.sessionId || undefined,
          userId
        );

        console.log("🔍 Chat API Response:", response);

        if (response.success && response.data) {
          console.log("✅ Success! Adding assistant message:", response.data);

          // Add assistant message
          const assistantMessage: ChatMessage = {
            id: response.data.message_id,
            role: "assistant",
            content: response.data.text,
            products: response.data.products,
            quickReplies: response.data.quick_replies,
            actions: response.data.actions,
            timestamp: new Date(),
          };

          console.log("📝 Assistant message created:", assistantMessage);

          setSession((prev) => ({
            ...prev,
            sessionId: response.data!.session_id,
            messages: [...prev.messages, assistantMessage],
            isTyping: false,
          }));
        } else {
          console.error("❌ API returned error:", response.error);

          // Error message
          const errorMessage: ChatMessage = {
            id: `error_${Date.now()}`,
            role: "assistant",
            content:
              response.error || "Xin lỗi, đã xảy ra lỗi. Vui lòng thử lại sau.",
            timestamp: new Date(),
          };

          setSession((prev) => ({
            ...prev,
            messages: [...prev.messages, errorMessage],
            isTyping: false,
          }));
        }
      } catch (error) {
        console.error("Chat error:", error);

        const errorMessage: ChatMessage = {
          id: `error_${Date.now()}`,
          role: "assistant",
          content:
            "Xin lỗi, không thể kết nối với server. Vui lòng thử lại sau.",
          timestamp: new Date(),
        };

        setSession((prev) => ({
          ...prev,
          messages: [...prev.messages, errorMessage],
          isTyping: false,
        }));
      }
    },
    [session.sessionId]
  );

  const toggleChat = useCallback(() => {
    setSession((prev) => ({
      ...prev,
      isOpen: !prev.isOpen,
    }));
  }, []);

  const clearChat = useCallback(() => {
    if (session.sessionId) {
      chatService.endSession(session.sessionId);
    }

    localStorage.removeItem(STORAGE_KEY);
    setSession({
      sessionId: null,
      messages: [],
      isOpen: false,
      isTyping: false,
    });
  }, [session.sessionId]);

  return {
    messages: session.messages,
    isOpen: session.isOpen,
    isTyping: session.isTyping,
    sessionId: session.sessionId,
    sendMessage,
    toggleChat,
    clearChat,
  };
};
