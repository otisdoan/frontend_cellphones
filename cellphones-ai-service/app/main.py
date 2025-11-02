from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import get_settings
from app.routes.chat import router as chat_router
from datetime import datetime

settings = get_settings()

# Create FastAPI app
app = FastAPI(
    title="CellphoneS AI Chat Service",
    description="AI-powered chatbot service for product recommendations",
    version="1.0.0",
    debug=settings.debug
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(chat_router, prefix="/chat", tags=["chat"])


@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "name": "CellphoneS AI Chat Service",
        "version": "1.0.0",
        "status": "running",
        "timestamp": datetime.now().isoformat()
    }


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "version": "1.0.0",
        "services": {
            "fastapi": "running",
            "qdrant": "pending",  # Will check in implementation
            "llm": "pending"
        },
        "timestamp": datetime.now()
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host=settings.app_host,
        port=settings.app_port,
        reload=settings.debug
    )
