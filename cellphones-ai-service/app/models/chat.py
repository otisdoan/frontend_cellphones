from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime


class ChatRequest(BaseModel):
    """Request model for chat message"""
    message: str = Field(..., description="User's message text")
    session_id: str = Field(..., description="Unique session identifier")
    user_id: Optional[int] = Field(None, description="User ID if authenticated")
    
    class Config:
        json_schema_extra = {
            "example": {
                "message": "Tôi muốn mua điện thoại chụp ảnh tốt",
                "session_id": "sess_abc123",
                "user_id": 456
            }
        }


class ProductInfo(BaseModel):
    """Product information in response"""
    id: int
    name: str
    slug: str
    price: float
    sale_price: Optional[float] = None
    image: str
    rating: Optional[float] = None
    stock: Optional[int] = None
    highlights: List[str] = []
    brand_name: Optional[str] = None
    category_name: Optional[str] = None


class ChatAction(BaseModel):
    """Action button in response"""
    type: str  # "view_product", "add_to_cart", "retry", etc.
    product_id: Optional[int] = None
    label: str


class ChatMetadata(BaseModel):
    """Metadata about the response generation"""
    intent: Optional[str] = None
    confidence: Optional[float] = None
    processing_time: Optional[int] = None  # milliseconds
    llm_tokens: Optional[Dict[str, int]] = None


class ChatResponse(BaseModel):
    """Response model for chat message"""
    message_id: str
    text: str
    products: List[ProductInfo] = []
    quick_replies: List[str] = []
    actions: List[ChatAction] = []
    metadata: Optional[ChatMetadata] = None
    
    class Config:
        json_schema_extra = {
            "example": {
                "message_id": "msg_789",
                "text": "Đây là những điện thoại chụp ảnh tốt nhất...",
                "products": [
                    {
                        "id": 123,
                        "name": "iPhone 15 Pro",
                        "slug": "iphone-15-pro",
                        "price": 29990000,
                        "sale_price": 27990000,
                        "image": "https://cdn.cellphones.com.vn/...",
                        "rating": 4.8,
                        "stock": 15,
                        "highlights": ["Camera 48MP", "Chip A17 Pro"]
                    }
                ],
                "quick_replies": ["So sánh với Samsung S24", "Xem thêm"],
                "actions": [
                    {
                        "type": "view_product",
                        "product_id": 123,
                        "label": "Xem chi tiết"
                    }
                ]
            }
        }


class HealthResponse(BaseModel):
    """Health check response"""
    status: str
    version: str
    services: Dict[str, str]
    timestamp: datetime
