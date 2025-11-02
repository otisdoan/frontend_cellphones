from fastapi import APIRouter, HTTPException, status
from app.models.chat import ChatRequest, ChatResponse, ProductInfo, ChatAction, ChatMetadata, HealthResponse
from app.services.rag import RAGService
from app.services.vector_search import get_vector_search_service
from datetime import datetime
import uuid

router = APIRouter()
rag_service = RAGService()


@router.post("/message", response_model=ChatResponse)
async def chat_message(request: ChatRequest):
    """
    Process chat message and return AI response
    
    Args:
        request: ChatRequest with message, session_id, user_id
        
    Returns:
        ChatResponse with AI-generated text and product recommendations
    """
    try:
        # Process query through RAG pipeline
        result = await rag_service.process_query(
            user_query=request.message,
            session_id=request.session_id,
            chat_history=None  # TODO: Fetch from database
        )
        
        if not result["success"]:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=result["metadata"].get("error", "Internal server error")
            )
        
        # Format products
        products = [
            ProductInfo(
                id=p.get("id"),
                name=p.get("name", ""),
                slug=p.get("slug", ""),
                price=float(p.get("price", 0)),
                sale_price=float(p.get("sale_price")) if p.get("sale_price") else None,
                image=p.get("product_image", [None])[0] if p.get("product_image") else "",
                rating=float(p.get("rating", 0)) if p.get("rating") else None,
                stock=p.get("stock"),
                highlights=p.get("highlights", [])[:3],
                brand_name=p.get("brand_name"),
                category_name=p.get("category_name")
            )
            for p in result["products"]
        ]
        
        # Generate quick replies
        quick_replies = rag_service.generate_quick_replies(
            products=result["products"],
            user_query=request.message
        )
        
        # Generate actions for each product
        actions = []
        for product in products:
            actions.append(
                ChatAction(
                    type="view_product",
                    product_id=product.id,
                    label="Xem chi tiết"
                )
            )
        
        # Create response
        response = ChatResponse(
            message_id=f"msg_{uuid.uuid4().hex[:12]}",
            text=result["text"],
            products=products,
            quick_replies=quick_replies,
            actions=actions,
            metadata=ChatMetadata(
                intent=result["metadata"].get("intent"),
                confidence=result["metadata"].get("confidence"),
                processing_time=result["metadata"].get("processing_time"),
                llm_tokens=result["metadata"].get("llm_tokens")
            )
        )
        
        return response
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error in chat_message endpoint: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred while processing your message"
        )


@router.get("/health", response_model=HealthResponse)
async def health():
    """Health check for AI service"""
    vector_service = get_vector_search_service()
    
    # Check services
    services_status = {
        "fastapi": "running",
        "embeddings": "unknown",
        "qdrant": "unknown",
        "llm": "unknown"
    }
    
    try:
        # Check Qdrant
        if vector_service.collection_exists():
            services_status["qdrant"] = "connected"
        else:
            services_status["qdrant"] = "no_collection"
    except:
        services_status["qdrant"] = "error"
    
    # Check embeddings
    try:
        from app.services.embedding import get_embedding_service
        embed_service = get_embedding_service()
        embed_service.load_model()
        services_status["embeddings"] = "loaded"
    except:
        services_status["embeddings"] = "error"
    
    return HealthResponse(
        status="healthy",
        version="1.0.0",
        services=services_status,
        timestamp=datetime.now()
    )
