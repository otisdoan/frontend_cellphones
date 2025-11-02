from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct, Filter, SearchRequest
from typing import List, Dict, Any, Optional
from functools import lru_cache
from app.config import get_settings

settings = get_settings()


class VectorSearchService:
    """Service for vector similarity search using Qdrant"""
    
    def __init__(self):
        self.client = None
        self.collection_name = settings.qdrant_collection_name
        self.qdrant_url = settings.qdrant_url
        
    def get_client(self) -> QdrantClient:
        """Get Qdrant client (lazy initialization)"""
        if self.client is None:
            print(f"Connecting to Qdrant at {self.qdrant_url}")
            self.client = QdrantClient(url=self.qdrant_url)
            print("Connected to Qdrant successfully")
        return self.client
    
    def collection_exists(self) -> bool:
        """Check if collection exists"""
        try:
            client = self.get_client()
            collections = client.get_collections().collections
            return any(c.name == self.collection_name for c in collections)
        except Exception as e:
            print(f"Error checking collection: {e}")
            return False
    
    def create_collection(self, vector_size: int = 384):
        """
        Create collection if it doesn't exist
        
        Args:
            vector_size: Dimension of embedding vectors (384 for MiniLM)
        """
        client = self.get_client()
        
        if not self.collection_exists():
            print(f"Creating collection: {self.collection_name}")
            client.create_collection(
                collection_name=self.collection_name,
                vectors_config=VectorParams(
                    size=vector_size,
                    distance=Distance.COSINE
                )
            )
            print(f"Collection {self.collection_name} created successfully")
        else:
            print(f"Collection {self.collection_name} already exists")
    
    def upsert_vectors(
        self,
        vectors: List[List[float]],
        payloads: List[Dict[str, Any]],
        ids: Optional[List[int]] = None
    ):
        """
        Insert or update vectors in the collection
        
        Args:
            vectors: List of embedding vectors
            payloads: List of metadata dictionaries
            ids: Optional list of IDs (auto-generated if not provided)
        """
        client = self.get_client()
        
        if ids is None:
            ids = list(range(len(vectors)))
        
        points = [
            PointStruct(
                id=point_id,
                vector=vector,
                payload=payload
            )
            for point_id, vector, payload in zip(ids, vectors, payloads)
        ]
        
        client.upsert(
            collection_name=self.collection_name,
            points=points
        )
        print(f"Upserted {len(points)} vectors to {self.collection_name}")
    
    def search(
        self,
        query_vector: List[float],
        top_k: int = 5,
        score_threshold: float = 0.0,
        filter_conditions: Optional[Filter] = None
    ) -> List[Dict[str, Any]]:
        """
        Search for similar vectors
        
        Args:
            query_vector: Query embedding vector
            top_k: Number of results to return
            score_threshold: Minimum similarity score (0-1)
            filter_conditions: Optional Qdrant filter
            
        Returns:
            List of search results with payload and score
        """
        client = self.get_client()
        
        results = client.search(
            collection_name=self.collection_name,
            query_vector=query_vector,
            limit=top_k,
            score_threshold=score_threshold,
            query_filter=filter_conditions
        )
        
        return [
            {
                "id": result.id,
                "score": result.score,
                "payload": result.payload
            }
            for result in results
        ]
    
    def get_collection_info(self) -> Dict[str, Any]:
        """Get information about the collection"""
        client = self.get_client()
        
        try:
            info = client.get_collection(self.collection_name)
            return {
                "name": info.config.params.vectors.size,
                "vectors_count": info.vectors_count,
                "status": info.status
            }
        except Exception as e:
            return {"error": str(e)}


# Singleton instance
@lru_cache()
def get_vector_search_service() -> VectorSearchService:
    """Get singleton vector search service instance"""
    return VectorSearchService()
