from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    """Application settings loaded from environment variables"""
    
    # OpenRouter
    openrouter_api_key: str
    openrouter_base_url: str = "https://openrouter.ai/api/v1"
    primary_model: str = "anthropic/claude-3-haiku"
    fallback_model: str = "openai/gpt-3.5-turbo"
    cheap_model: str = "google/gemini-flash-1.5"
    
    # Embeddings
    embedding_model: str = "sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2"
    embedding_device: str = "cpu"
    
    # Qdrant
    qdrant_url: str = "http://localhost:6333"
    qdrant_collection_name: str = "cellphones_products"
    
    # Express API
    express_api_url: str = "http://localhost:3000"
    
    # LLM Config
    max_tokens: int = 500
    temperature: float = 0.7
    top_k_results: int = 5
    
    # App Config
    app_host: str = "0.0.0.0"
    app_port: int = 8000
    debug: bool = True
    
    class Config:
        env_file = ".env"
        case_sensitive = False


@lru_cache()
def get_settings() -> Settings:
    """Get cached settings instance"""
    return Settings()
