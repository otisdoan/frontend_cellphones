# AI Chatbot Integration Guide

## 🎯 Overview

This guide covers the integration between:

- **Express API** (Node.js) - Business logic & database layer
- **FastAPI Service** (Python) - AI/ML workload (embeddings, vector search, LLM)

## 📁 Project Structure

```
cellphones/                          # Express API (Node.js)
├── src/
│   ├── controllers/
│   │   └── chat.controller.js      # Chat proxy controller
│   ├── models/
│   │   └── chat.model.js           # Chat database models
│   ├── routes/
│   │   ├── chat.route.js           # Chat routes
│   │   └── index.js                # Route aggregation
│   └── migrations/
│       └── 003_create_chat_tables.sql
│
cellphones-ai-service/               # FastAPI (Python)
├── app/
│   ├── main.py                      # FastAPI application
│   ├── config.py                    # Configuration
│   ├── services/
│   │   ├── embedding.py             # Text embeddings
│   │   ├── vector_search.py         # Qdrant integration
│   │   ├── llm.py                   # OpenRouter LLM
│   │   └── rag.py                   # RAG pipeline
│   ├── models/
│   │   └── chat.py                  # Request/Response models
│   └── routes/
│       └── chat.py                  # Chat endpoints
└── scripts/
    └── seed_embeddings.py           # Seed product embeddings
```

## 🚀 Quick Start

### 1. Database Setup

**Run migrations to create chat tables:**

\`\`\`bash
cd cellphones

# Connect to your PostgreSQL database

psql -U your_db_user -d cellphones_db -f src/migrations/003_create_chat_tables.sql
\`\`\`

**Tables created:**

- `chat_sessions` - User chat sessions
- `chat_messages` - Chat message history
- `chat_analytics` - Analytics events
- `chat_feedback` - User feedback

### 2. Express API Configuration

**Add to your `.env` file:**

\`\`\`env

# FastAPI Service URL

FASTAPI_URL=http://localhost:8000
\`\`\`

**Install dependencies:**

\`\`\`bash
cd cellphones
npm install uuid # Already installed
\`\`\`

### 3. FastAPI Configuration

**Update `.env` in cellphones-ai-service:**

\`\`\`env

# OpenRouter API Key (Get from https://openrouter.ai)

OPENROUTER_API_KEY=sk-or-v1-YOUR_ACTUAL_KEY_HERE

# Qdrant Vector Database

QDRANT_URL=http://localhost:6333
QDRANT_COLLECTION_NAME=cellphones_products

# LLM Configuration

PRIMARY_MODEL=anthropic/claude-3-haiku
FALLBACK_MODELS=openai/gpt-3.5-turbo,google/gemini-flash-1.5

# Express API URL

EXPRESS_API_URL=http://localhost:3000

# Embedding Model

EMBEDDING_MODEL=sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2
EMBEDDING_DEVICE=cpu
\`\`\`

### 4. Start Services

**Terminal 1 - Qdrant (already running):**
\`\`\`bash

# Verify Qdrant is running

curl http://localhost:6333/

# Should return: {"title":"qdrant - vector search engine","version":"1.15.5"}

\`\`\`

**Terminal 2 - FastAPI:**
\`\`\`bash
cd cellphones-ai-service
source venv/bin/activate
uvicorn app.main:app --reload --port 8000

# Or if already running in background, check:

curl http://127.0.0.1:8000/
\`\`\`

**Terminal 3 - Express API:**
\`\`\`bash
cd cellphones
npm run dev

# Server should start on http://localhost:3000

\`\`\`

### 5. Seed Product Embeddings

**Generate embeddings for all products:**

\`\`\`bash
cd cellphones-ai-service
source venv/bin/activate

# Make sure Express API is running first!

python scripts/seed_embeddings.py
\`\`\`

This will:

1. Fetch all products from Express API
2. Generate embeddings in batches (100 products/batch)
3. Upload to Qdrant with metadata
4. Show progress and final count

**Estimated time:** 2-3 hours for 10,000 products

## 🧪 Testing

### Health Check

**Test FastAPI health:**
\`\`\`bash
curl http://localhost:8000/chat/health
\`\`\`

**Test Express proxy health:**
\`\`\`bash
curl http://localhost:3000/api/chat/health
\`\`\`

### Send Test Message

\`\`\`bash
curl -X POST http://localhost:3000/api/chat/message \\
-H "Content-Type: application/json" \\
-d '{
"message": "Tôi muốn mua iPhone giá dưới 20 triệu",
"user_id": 1
}'
\`\`\`

**Expected response:**
\`\`\`json
{
"success": true,
"data": {
"session_id": "session_abc-123...",
"message_id": "msg_xyz-456...",
"text": "Dạ, em tìm thấy một số iPhone phù hợp với ngân sách của anh/chị...",
"products": [
{
"id": 123,
"name": "iPhone 14 128GB",
"price": 18990000,
"image_url": "...",
"similarity_score": 0.85
}
],
"quick_replies": [
"Xem chi tiết sản phẩm",
"So sánh với iPhone 15",
"Tư vấn trả góp"
],
"metadata": {
"intent": "product_search",
"confidence": 0.92,
"processing_time": 1250
}
}
}
\`\`\`

### Get Chat History

\`\`\`bash
curl http://localhost:3000/api/chat/history/session_abc-123
\`\`\`

### Submit Feedback

\`\`\`bash
curl -X POST http://localhost:3000/api/chat/feedback \\
-H "Content-Type: application/json" \\
-d '{
"message_id": 1,
"session_id": "session_abc-123",
"feedback": "positive",
"comment": "Rất hữu ích!"
}'
\`\`\`

## 📡 API Endpoints

### Express API (Proxy Layer)

| Endpoint                            | Method | Description        |
| ----------------------------------- | ------ | ------------------ |
| `/api/chat/health`                  | GET    | Health check       |
| `/api/chat/message`                 | POST   | Send message to AI |
| `/api/chat/history/:session_id`     | GET    | Get chat history   |
| `/api/chat/feedback`                | POST   | Submit feedback    |
| `/api/chat/session/:session_id/end` | POST   | End session        |

### FastAPI (AI Service)

| Endpoint        | Method | Description          |
| --------------- | ------ | -------------------- |
| `/chat/health`  | GET    | Service health check |
| `/chat/message` | POST   | Process AI query     |
| `/docs`         | GET    | Interactive API docs |

## 🔧 Troubleshooting

### FastAPI not responding

\`\`\`bash

# Check if FastAPI is running

ps aux | grep uvicorn

# Check logs

tail -f cellphones-ai-service/fastapi.log

# Restart FastAPI

cd cellphones-ai-service
./venv/bin/uvicorn app.main:app --reload --port 8000
\`\`\`

### Express can't connect to FastAPI

\`\`\`bash

# Verify FASTAPI_URL in Express .env

echo $FASTAPI_URL # Should be http://localhost:8000

# Test connection

curl http://localhost:8000/chat/health
\`\`\`

### Qdrant not accessible

\`\`\`bash

# Check if Docker container is running

docker ps | grep qdrant

# Restart Qdrant

docker restart qdrant

# Check Qdrant logs

docker logs qdrant
\`\`\`

### OpenRouter API errors

- Verify API key is correct in `.env`
- Check API quota at https://openrouter.ai/
- Review error messages in FastAPI logs

### Database connection issues

\`\`\`bash

# Test PostgreSQL connection

psql -U your_db_user -d cellphones_db -c "SELECT 1"

# Verify chat tables exist

psql -U your*db_user -d cellphones_db -c "\\dt chat*\*"
\`\`\`

## 📊 Database Schema

### chat_sessions

- `id` - Primary key
- `session_id` - Unique session identifier
- `user_id` - Foreign key to users table
- `started_at` - Session start time
- `last_activity_at` - Last message time
- `ended_at` - Session end time
- `metadata` - JSONB (IP, user agent, etc.)

### chat_messages

- `id` - Primary key
- `session_id` - Foreign key to chat_sessions
- `role` - 'user' | 'assistant' | 'system'
- `content` - Message text
- `products_shown` - JSONB array of products
- `metadata` - JSONB (intent, confidence, etc.)

### chat_analytics

- `id` - Primary key
- `session_id` - Session reference
- `event_type` - Event name
- `event_data` - JSONB event details

### chat_feedback

- `id` - Primary key
- `message_id` - Foreign key to chat_messages
- `session_id` - Session reference
- `feedback` - 'positive' | 'negative' | 'neutral'
- `comment` - Optional text feedback

## 🔐 Security Notes

1. **API Keys**: Never commit `.env` files
2. **CORS**: Configure `CORS_ORIGIN` in Express
3. **Rate Limiting**: Add rate limiting middleware to Express
4. **Input Validation**: Yup schemas in controllers
5. **SQL Injection**: Using parameterized queries
6. **XSS Protection**: Sanitize user input

## 📈 Performance Tips

1. **Caching**: Add Redis for frequently asked questions
2. **Connection Pool**: Configure PostgreSQL pool size
3. **Batch Processing**: Use batched embedding generation
4. **CDN**: Cache product images
5. **Monitoring**: Add logging and metrics (Winston, Prometheus)

## 🎨 Frontend Integration

Example React component:

\`\`\`typescript
import { useState } from 'react';
import axios from 'axios';

function ChatWidget() {
const [sessionId, setSessionId] = useState(null);
const [messages, setMessages] = useState([]);
const [input, setInput] = useState('');

const sendMessage = async () => {
const response = await axios.post('/api/chat/message', {
message: input,
session_id: sessionId,
user_id: getCurrentUserId()
});

    setSessionId(response.data.data.session_id);
    setMessages([...messages, {
      role: 'user',
      content: input
    }, {
      role: 'assistant',
      content: response.data.data.text,
      products: response.data.data.products
    }]);
    setInput('');

};

return (
<div className="chat-widget">
{/_ Chat UI here _/}
</div>
);
}
\`\`\`

## 📝 Next Steps

1. ✅ Database migrations complete
2. ✅ Express proxy layer implemented
3. ⏳ Run migrations on PostgreSQL
4. ⏳ Get OpenRouter API key
5. ⏳ Seed product embeddings
6. ⏳ Test end-to-end flow
7. ⏳ Build frontend chat widget
8. ⏳ Deploy to production

## 🆘 Support

- **FastAPI Docs**: http://localhost:8000/docs
- **Qdrant UI**: http://localhost:6333/dashboard
- **OpenRouter**: https://openrouter.ai/docs
- **GitHub Issues**: Create issue in repository

---

**Built with ❤️ using Express, FastAPI, Qdrant, and OpenRouter**
