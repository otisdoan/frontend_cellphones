from sentence_transformers import SentenceTransformer
from typing import List, Union
import numpy as np
from functools import lru_cache
from app.config import get_settings

settings = get_settings()


class EmbeddingService:
    """Service for generating text embeddings using sentence-transformers"""
    
    def __init__(self):
        self.model = None
        self.model_name = settings.embedding_model
        self.device = settings.embedding_device
        
    def load_model(self):
        """Load the embedding model (lazy loading)"""
        if self.model is None:
            print(f"Loading embedding model: {self.model_name}")
            self.model = SentenceTransformer(
                self.model_name,
                device=self.device
            )
            print(f"Model loaded successfully on {self.device}")
        return self.model
    
    def generate_embedding(self, text: str) -> List[float]:
        """
        Generate embedding vector for a single text
        
        Args:
            text: Input text string
            
        Returns:
            List of floats representing the embedding vector
        """
        model = self.load_model()
        embedding = model.encode(text, convert_to_numpy=True)
        return embedding.tolist()
    
    def generate_embeddings(self, texts: List[str], batch_size: int = 32) -> List[List[float]]:
        """
        Generate embedding vectors for multiple texts
        
        Args:
            texts: List of input text strings
            batch_size: Batch size for processing
            
        Returns:
            List of embedding vectors
        """
        model = self.load_model()
        embeddings = model.encode(
            texts,
            batch_size=batch_size,
            convert_to_numpy=True,
            show_progress_bar=True
        )
        return embeddings.tolist()
    
    def get_embedding_dimension(self) -> int:
        """Get the dimension of embedding vectors"""
        model = self.load_model()
        return model.get_sentence_embedding_dimension()


# Singleton instance
@lru_cache()
def get_embedding_service() -> EmbeddingService:
    """Get singleton embedding service instance"""
    return EmbeddingService()
