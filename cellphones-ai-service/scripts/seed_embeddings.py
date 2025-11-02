"""
Script to generate embeddings for all products and upload to Qdrant
"""
import asyncio
import sys
import os
from uuid import uuid5, NAMESPACE_DNS

# Add parent directory to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.services.embedding import get_embedding_service
from app.services.vector_search import get_vector_search_service
from app.config import get_settings
import httpx

settings = get_settings()


async def fetch_all_products():
    """Fetch all products from Express API"""
    try:
        async with httpx.AsyncClient() as client:
            # Fetch with high limit to get all products
            response = await client.get(
                f"{settings.express_api_url}/api/products?limit=1000",
                timeout=30.0
            )
            response.raise_for_status()
            data = response.json()
            
            if data.get("status") == "success":
                products = data.get("data", [])
                print(f"✅ Fetched {len(products)} products from Express API")
                return products
            else:
                print(f"❌ Error: {data.get('message', 'Unknown error')}")
                return []
                
    except Exception as e:
        print(f"❌ Error fetching products: {e}")
        return []


def create_product_text(product):
    """Create text representation of product for embedding"""
    # Convert price to float first
    price = float(product.get('price', 0))
    
    parts = [
        product.get("name", ""),
        product.get("category_name", ""),
        product.get("brand_name", ""),
        product.get("short_description", "")[:200] if product.get("short_description") else "",
        f"{price:,.0f} đồng"
    ]
    
    return " ".join(filter(None, parts))


async def main():
    """Main function to generate and upload embeddings"""
    print("=" * 60)
    print("🚀 CellphoneS Product Embeddings Generator")
    print("=" * 60)
    
    # Initialize services
    print("\n📦 Initializing services...")
    embedding_service = get_embedding_service()
    vector_service = get_vector_search_service()
    
    # Load embedding model
    print("🔄 Loading embedding model...")
    model = embedding_service.load_model()
    vector_dim = embedding_service.get_embedding_dimension()
    print(f"✅ Model loaded: {settings.embedding_model}")
    print(f"   Vector dimension: {vector_dim}")
    
    # Create Qdrant collection
    print(f"\n🔧 Setting up Qdrant collection: {settings.qdrant_collection_name}")
    vector_service.create_collection(vector_size=vector_dim)
    
    # Fetch products
    print("\n📥 Fetching products from Express API...")
    products = await fetch_all_products()
    
    if not products:
        print("❌ No products found. Exiting.")
        return
    
    print(f"\n🔨 Generating embeddings for {len(products)} products...")
    print("   This may take a few minutes...")
    
    # Process in batches
    batch_size = 100
    total_uploaded = 0
    
    for i in range(0, len(products), batch_size):
        batch = products[i:i+batch_size]
        batch_num = (i // batch_size) + 1
        total_batches = (len(products) + batch_size - 1) // batch_size
        
        print(f"\n📦 Processing batch {batch_num}/{total_batches} ({len(batch)} products)...")
        
        # Create texts for embedding
        texts = [create_product_text(p) for p in batch]
        
        # Generate embeddings
        print("   🧠 Generating embeddings...")
        embeddings = embedding_service.generate_embeddings(texts, batch_size=32)
        
        # Prepare payloads - Use UUID5 for consistent IDs
        ids = [str(uuid5(NAMESPACE_DNS, f"product_{p['id']}")) for p in batch]
        payloads = [
            {
                "product_id": int(p["id"]),
                "name": p.get("name", ""),
                "category": p.get("category_name", ""),
                "brand": p.get("brand_name", ""),
                "price": float(p.get("price", 0))
            }
            for p in batch
        ]
        
        # Upload to Qdrant
        print("   📤 Uploading to Qdrant...")
        vector_service.upsert_vectors(
            vectors=embeddings,
            payloads=payloads,
            ids=ids
        )
        
        total_uploaded += len(batch)
        print(f"   ✅ Uploaded {len(batch)} vectors ({total_uploaded}/{len(products)} total)")
    
    # Verify
    print("\n🔍 Verifying collection...")
    info = vector_service.get_collection_info()
    print(f"   Collection info: {info}")
    
    print("\n" + "=" * 60)
    print(f"✅ SUCCESS! Generated and uploaded {total_uploaded} embeddings")
    print("=" * 60)
    print("\n💡 Next steps:")
    print("   1. Start FastAPI server: uvicorn app.main:app --reload")
    print("   2. Test chat endpoint: curl -X POST http://localhost:8000/chat/message ...")
    print("   3. Check health: curl http://localhost:8000/chat/health")
    print("")


if __name__ == "__main__":
    asyncio.run(main())
