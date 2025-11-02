export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  products?: ProductCard[];
  quickReplies?: string[];
  actions?: ChatAction[];
  timestamp: Date;
  isLoading?: boolean;
}

export interface ProductCard {
  id: number;
  name: string;
  slug: string;
  price: number;
  sale_price: number;
  image: string;
  rating?: number;
  stock?: number;
  highlights?: string[];
}

export interface ChatAction {
  type: "view_product" | "add_to_cart" | "compare" | "call_support";
  product_id?: number;
  label?: string;
  url?: string;
}

export interface ChatResponse {
  success: boolean;
  data?: {
    session_id: string;
    message_id: string;
    text: string;
    products: ProductCard[];
    quick_replies: string[];
    actions: ChatAction[];
    metadata: {
      intent?: string;
      confidence?: number;
      processing_time?: number;
    };
  };
  error?: string;
}

export interface ChatSession {
  sessionId: string | null;
  messages: ChatMessage[];
  isOpen: boolean;
  isTyping: boolean;
}
