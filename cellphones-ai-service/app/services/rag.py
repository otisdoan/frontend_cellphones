import httpx
from typing import List, Dict, Any, Optional
from app.services.embedding import get_embedding_service
from app.services.vector_search import get_vector_search_service
from app.services.llm import get_llm_service
from app.config import get_settings
import time

settings = get_settings()


class RAGService:
    """RAG (Retrieval Augmented Generation) Pipeline Service"""
    
    def __init__(self):
        self.embedding_service = get_embedding_service()
        self.vector_service = get_vector_search_service()
        self.llm_service = get_llm_service()
        self.express_api_url = settings.express_api_url
        self.top_k = settings.top_k_results
    
    async def fetch_product_details(self, product_ids: List[int]) -> List[Dict[str, Any]]:
        """
        Fetch full product details from Express API
        
        Args:
            product_ids: List of product IDs
            
        Returns:
            List of product details
        """
        if not product_ids:
            return []
        
        try:
            async with httpx.AsyncClient() as client:
                # Call Express API to get products by IDs
                response = await client.get(
                    f"{self.express_api_url}/api/products",
                    params={"ids": ",".join(map(str, product_ids))},
                    timeout=10.0
                )
                response.raise_for_status()
                data = response.json()
                
                if data.get("status") == "success":
                    return data.get("data", [])
                return []
                
        except Exception as e:
            print(f"Error fetching products from Express API: {e}")
            return []
    
    async def process_query(
        self,
        user_query: str,
        session_id: str,
        chat_history: Optional[List[Dict[str, str]]] = None
    ) -> Dict[str, Any]:
        """
        Process user query through RAG pipeline
        
        Args:
            user_query: User's message
            session_id: Session identifier
            chat_history: Previous conversation
            
        Returns:
            Dict with response text, products, metadata
        """
        start_time = time.time()
        
        try:
            # Step 1: Generate embedding for query
            print(f"[RAG] Generating embedding for query: {user_query[:50]}...")
            query_embedding = self.embedding_service.generate_embedding(user_query)
            
            # Step 2: Vector search in Qdrant
            print(f"[RAG] Searching vector database...")
            search_results = self.vector_service.search(
                query_vector=query_embedding,
                top_k=self.top_k,
                score_threshold=0.3  # Minimum similarity threshold
            )
            
            print(f"[RAG] Found {len(search_results)} similar products")
            
            # Step 3: Fetch full product details
            if search_results:
                product_ids = [result["payload"].get("product_id") for result in search_results]
                products = await self.fetch_product_details(product_ids)
            else:
                products = []
            
            # Step 4: Generate LLM response
            print(f"[RAG] Generating LLM response...")
            messages = self.llm_service.create_product_recommendation_prompt(
                user_query=user_query,
                products=products,
                chat_history=chat_history
            )
            
            llm_response = self.llm_service.generate_response(messages)
            
            # Calculate processing time
            processing_time = int((time.time() - start_time) * 1000)  # milliseconds
            
            return {
                "success": True,
                "text": llm_response["text"],
                "products": products[:3],  # Return top 3 products
                "metadata": {
                    "intent": "product_recommendation",  # Can be enhanced with intent classification
                    "confidence": search_results[0]["score"] if search_results else 0.0,
                    "processing_time": processing_time,
                    "llm_tokens": llm_response["tokens"],
                    "model_used": llm_response["model_used"],
                    "products_found": len(products)
                }
            }
            
        except Exception as e:
            print(f"[RAG] Error in pipeline: {e}")
            return {
                "success": False,
                "text": "Xin lỗi, hệ thống đang gặp sự cố. Bạn có thể thử lại hoặc liên hệ hotline 1800.2097 để được hỗ trợ.",
                "products": [],
                "metadata": {
                    "error": str(e),
                    "processing_time": int((time.time() - start_time) * 1000)
                }
            }
    
    def generate_quick_replies(
        self,
        products: List[Dict[str, Any]],
        user_query: str
    ) -> List[str]:
        """Generate contextual quick reply suggestions"""
        replies = []
        
        if len(products) >= 2:
            replies.append("So sánh 2 sản phẩm này")
        
        if products:
            replies.append("Xem thêm tùy chọn khác")
            replies.append("Sản phẩm này có bảo hành không?")
        else:
            replies.append("Tôi cần tư vấn thêm")
            replies.append("Liên hệ nhân viên")
        
        return replies[:3]  # Max 3 quick replies
