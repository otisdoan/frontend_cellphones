# CellphoneS AI Chat Service

AI-powered chatbot service for product recommendations using FastAPI, OpenRouter, and Qdrant.

## 🚀 Quick Start

### 1. Setup Python Environment

```bash
# Create virtual environment
python3.11 -m venv venv

# Activate venv
source venv/bin/activate  # macOS/Linux
# or
venv\Scripts\activate  # Windows

# Install dependencies
pip install -r requirements.txt
```

### 2. Configure Environment

```bash
# Copy example env file
cp .env.example .env

# Edit .env and add your OpenRouter API key
# OPENROUTER_API_KEY=sk-or-v1-your-key-here
```

### 3. Start Qdrant (Docker)

```bash
docker run -d \
  --name qdrant \
  -p 6333:6333 \
  -p 6334:6334 \
  -v $(pwd)/qdrant_storage:/qdrant/storage \
  qdrant/qdrant
```

### 4. Run FastAPI Server

```bash
uvicorn app.main:app --reload --port 8000
```

Server will be available at: http://localhost:8000

## 📚 API Documentation

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 🔧 Endpoints

### POST /chat/message

Send a chat message and get AI response with product recommendations.

**Request:**

```json
{
  "message": "Tôi muốn mua điện thoại chụp ảnh tốt",
  "session_id": "sess_abc123",
  "user_id": 456
}
```

**Response:**

```json
{
  "message_id": "msg_xyz",
  "text": "Đây là những điện thoại chụp ảnh tốt nhất...",
  "products": [...],
  "quick_replies": [...],
  "actions": [...],
  "metadata": {...}
}
```

### GET /chat/health

Check service health status.

## 📁 Project Structure

```
cellphones-ai-service/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI app
│   ├── config.py            # Settings
│   ├── models/
│   │   └── chat.py          # Pydantic models
│   ├── services/
│   │   ├── embedding.py     # sentence-transformers
│   │   ├── vector_search.py # Qdrant client
│   │   ├── llm.py          # OpenRouter
│   │   └── rag.py          # RAG pipeline
│   └── routes/
│       └── chat.py          # Chat endpoints
├── scripts/
│   └── seed_embeddings.py   # Generate embeddings
├── requirements.txt
├── .env
└── README.md
```

## 🔑 Environment Variables

See `.env.example` for all available configuration options.

Key variables:

- `OPENROUTER_API_KEY`: Your OpenRouter API key
- `QDRANT_URL`: Qdrant server URL (default: http://localhost:6333)
- `EXPRESS_API_URL`: Express API URL (default: http://localhost:3000)
- `EMBEDDING_MODEL`: sentence-transformers model name

## 🧪 Testing

```bash
# Test chat endpoint
curl -X POST http://localhost:8000/chat/message \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Tôi muốn mua iPhone",
    "session_id": "test_1"
  }'

# Test health check
curl http://localhost:8000/chat/health
```

## 📊 Monitoring

Check logs for:

- Embedding generation time
- Vector search results
- LLM response time
- Total processing time

## 🛠️ Development

```bash
# Install dev dependencies
pip install black flake8 pytest

# Format code
black app/

# Run tests
pytest
```

## 📝 License

Proprietary - CellphoneS Internal Use Only
