from openai import OpenAI
from typing import List, Dict, Any, Optional
from functools import lru_cache
from app.config import get_settings

settings = get_settings()


class LLMService:
    """Service for LLM interactions via OpenRouter"""
    
    def __init__(self):
        self.client = OpenAI(
            base_url=settings.openrouter_base_url,
            api_key=settings.openrouter_api_key
        )
        self.primary_model = settings.primary_model
        self.fallback_model = settings.fallback_model
        self.max_tokens = settings.max_tokens
        self.temperature = settings.temperature
    
    def generate_response(
        self,
        messages: List[Dict[str, str]],
        model: Optional[str] = None,
        temperature: Optional[float] = None,
        max_tokens: Optional[int] = None
    ) -> Dict[str, Any]:
        """
        Generate response from LLM
        
        Args:
            messages: List of message dicts with 'role' and 'content'
            model: Model name (uses primary_model if not specified)
            temperature: Sampling temperature
            max_tokens: Maximum tokens in response
            
        Returns:
            Dict with 'text', 'model_used', 'tokens' info
        """
        model = model or self.primary_model
        temperature = temperature or self.temperature
        max_tokens = max_tokens or self.max_tokens
        
        try:
            response = self.client.chat.completions.create(
                model=model,
                messages=messages,
                temperature=temperature,
                max_tokens=max_tokens,
                # OpenRouter-specific: enable fallback
                extra_body={
                    "provider": {
                        "order": ["Anthropic", "OpenAI"],
                        "allow_fallbacks": True
                    }
                }
            )
            
            return {
                "text": response.choices[0].message.content,
                "model_used": response.model,
                "tokens": {
                    "prompt": response.usage.prompt_tokens,
                    "completion": response.usage.completion_tokens,
                    "total": response.usage.total_tokens
                },
                "finish_reason": response.choices[0].finish_reason
            }
            
        except Exception as e:
            print(f"Error with {model}, trying fallback: {e}")
            # Try fallback model
            try:
                response = self.client.chat.completions.create(
                    model=self.fallback_model,
                    messages=messages,
                    temperature=temperature,
                    max_tokens=max_tokens
                )
                
                return {
                    "text": response.choices[0].message.content,
                    "model_used": response.model,
                    "tokens": {
                        "prompt": response.usage.prompt_tokens,
                        "completion": response.usage.completion_tokens,
                        "total": response.usage.total_tokens
                    },
                    "finish_reason": response.choices[0].finish_reason,
                    "fallback": True
                }
            except Exception as fallback_error:
                raise Exception(f"Both primary and fallback models failed: {fallback_error}")
    
    def create_product_recommendation_prompt(
        self,
        user_query: str,
        products: List[Dict[str, Any]],
        chat_history: Optional[List[Dict[str, str]]] = None
    ) -> List[Dict[str, str]]:
        """
        Create prompt for product recommendation
        
        Args:
            user_query: User's question/request
            products: List of relevant products
            chat_history: Previous conversation messages
            
        Returns:
            List of messages for LLM
        """
        # System prompt
        system_prompt = """Bạn là trợ lý AI thông minh của CellphoneS - cửa hàng bán lẻ điện thoại, laptop, phụ kiện hàng đầu Việt Nam.

NHIỆM VỤ:
- Tư vấn sản phẩm phù hợp với nhu cầu và ngân sách khách hàng
- Giải thích thông số kỹ thuật dễ hiểu
- So sánh sản phẩm khách quan
- Cung cấp thông tin chính xác về giá, khuyến mãi, bảo hành

QUY TẮC BẮT BUỘC:
1. Luôn thân thiện, chuyên nghiệp, nhiệt tình
2. Trả lời NGẮN GỌN, đi thẳng vào vấn đề (max 150 từ)
3. Nếu không chắc chắn → thừa nhận và đề xuất liên hệ nhân viên
4. KHÔNG BẠO ĐẶT giá cả, khuyến mãi, thông số kỹ thuật
5. Chỉ giới thiệu TỐI ĐA 3 sản phẩm mỗi lần
6. Hỏi làm rõ nhu cầu nếu câu hỏi mơ hồ
7. Sử dụng tiếng Việt tự nhiên, tránh thuật ngữ quá kỹ thuật

ĐỊNH DẠNG TRẢ LỜI:
- Bắt đầu bằng câu ngắn thể hiện hiểu nhu cầu
- Giải thích ngắn gọn TẠI SAO gợi ý sản phẩm này
- Kết thúc bằng câu hỏi mở để tiếp tục hội thoại"""

        # Products context
        products_text = "\n\n".join([
            f"{i+1}. {p['name']}\n"
            f"   - Giá: {float(p.get('price', 0)):,.0f} đ\n"
            f"   - Danh mục: {p.get('category', 'N/A')}\n"
            f"   - Thương hiệu: {p.get('brand', 'N/A')}"
            for i, p in enumerate(products[:5])  # Limit to top 5
        ])
        
        context = f"\nSẢN PHẨM ĐANG CÓ:\n{products_text}" if products else "\nKhông tìm thấy sản phẩm phù hợp."
        
        messages = [
            {"role": "system", "content": system_prompt + context}
        ]
        
        # Add chat history if provided
        if chat_history:
            messages.extend(chat_history[-5:])  # Last 5 messages
        
        # Add current user query
        messages.append({"role": "user", "content": user_query})
        
        return messages


# Singleton instance
@lru_cache()
def get_llm_service() -> LLMService:
    """Get singleton LLM service instance"""
    return LLMService()
