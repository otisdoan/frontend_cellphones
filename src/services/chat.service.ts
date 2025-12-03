import axios from "axios";
import type { ChatResponse } from "../types/chat.types";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://backend-cellphones-5.onrender.com";

export const chatService = {
  /**
   * Send message to AI chatbot
   */
  async sendMessage(
    message: string,
    sessionId?: string,
    userId?: number
  ): Promise<ChatResponse> {
    try {
      const response = await axios.post<ChatResponse>(
        `${API_BASE_URL}/api/chat/message`,
        {
          message,
          session_id: sessionId,
          user_id: userId,
        },
        {
          timeout: 30000, // 30 second timeout
        }
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          success: false,
          error: error.response?.data?.error || "Không thể kết nối với server",
        };
      }
      return {
        success: false,
        error: "Đã xảy ra lỗi không xác định",
      };
    }
  },

  /**
   * Get chat history
   */
  async getChatHistory(sessionId: string, limit = 20): Promise<unknown> {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/chat/history/${sessionId}`,
        { params: { limit } }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to get chat history:", error);
      return null;
    }
  },

  /**
   * Submit feedback
   */
  async submitFeedback(
    messageId: number,
    sessionId: string,
    feedback: "positive" | "negative" | "neutral",
    comment?: string
  ): Promise<boolean> {
    try {
      await axios.post(`${API_BASE_URL}/api/chat/feedback`, {
        message_id: messageId,
        session_id: sessionId,
        feedback,
        comment,
      });
      return true;
    } catch (error) {
      console.error("Failed to submit feedback:", error);
      return false;
    }
  },

  /**
   * End chat session
   */
  async endSession(sessionId: string): Promise<boolean> {
    try {
      await axios.post(`${API_BASE_URL}/api/chat/session/${sessionId}/end`);
      return true;
    } catch (error) {
      console.error("Failed to end session:", error);
      return false;
    }
  },

  /**
   * Health check
   */
  async healthCheck(): Promise<boolean> {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/chat/health`);
      return response.data.success;
    } catch {
      return false;
    }
  },
};
