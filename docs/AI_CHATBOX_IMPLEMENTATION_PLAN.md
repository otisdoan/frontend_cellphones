# Kế Hoạch Triển Khai AI Chatbox - CellphoneS

> **Ngày tạo:** 02/11/2025  
> **Phiên bản:** 1.0  
> **Người đề xuất:** AI Technical Consultant  
> **Mục đích:** Tài liệu kỹ thuật chi tiết cho việc tích hợp AI Chatbox vào website bán hàng CellphoneS

---

## 📋 Mục Lục

1. [Tổng Quan](#1-tổng-quan)
2. [Phân Tích Tech Stack](#2-phân-tích-tech-stack)
3. [Kiến Trúc Hệ Thống](#3-kiến-trúc-hệ-thống)
4. [Luồng Xử Lý Chi Tiết](#4-luồng-xử-lý-chi-tiết)
5. [API Specification](#5-api-specification)
6. [Database Schema](#6-database-schema)
7. [Roadmap & Timeline](#7-roadmap--timeline)
8. [Budget & Cost Analysis](#8-budget--cost-analysis)
9. [Risk Assessment](#9-risk-assessment)
10. [Setup Instructions](#10-setup-instructions)

---

## 1. Tổng Quan

### 1.1 Mục Tiêu Dự Án

Xây dựng chatbox AI thông minh tích hợp vào website CellphoneS với khả năng:

- ✅ Tư vấn sản phẩm dựa trên nhu cầu khách hàng (RAG-based)
- ✅ Tra cứu giá, thông số kỹ thuật real-time
- ✅ So sánh sản phẩm thông minh
- ✅ Hỗ trợ tra cứu đơn hàng, bảo hành
- ✅ Chuyển tiếp sang nhân viên khi cần

### 1.2 Phạm Vi MVP (Minimum Viable Product)

**Trong scope:**

- Chat interface với sản phẩm suggestions
- RAG retrieval cho sản phẩm (embedding-based search)
- Integration với database hiện tại
- Basic analytics & logging

**Ngoài scope (Phase 2):**

- Voice input/output
- Multi-language
- Advanced personalization
- Mobile app integration

---

## 2. Phân Tích Tech Stack

### 2.1 Stack Hiện Tại (Đã Có)

#### Frontend

```json
{
  "framework": "React 19.1.0",
  "routing": "React Router DOM 7.6.2",
  "state": "Redux Toolkit 2.8.2",
  "ui": "Ant Design 5.26.1",
  "styling": "TailwindCSS 3.4.17",
  "build": "Vite 6.3.5",
  "language": "TypeScript 5.8.3"
}
```

#### Backend (Main API - Node.js)

```json
{
  "runtime": "Node.js",
  "framework": "Express 5.1.0",
  "database": "PostgreSQL (Sequelize 6.37.7)",
  "auth": "JWT (jsonwebtoken 9.0.2)",
  "storage": "Cloudinary 1.41.3",
  "payment": "@payos/node 2.0.3"
}
```

#### Backend (AI Service - Python)

```json
{
  "runtime": "Python 3.11+",
  "framework": "FastAPI 0.109.0",
  "async": "asyncio + uvicorn",
  "validation": "Pydantic v2",
  "ai_libs": "langchain, sentence-transformers"
}
```

**✅ Đánh giá:** Kiến trúc microservices hybrid (Node.js + Python) rất tốt cho AI workload!

### 2.2 Tech Stack Mới Cần Thêm

#### A. AI Service (LLM)

**Lựa chọn được chọn: OpenRouter (Multi-Model Gateway)**

| Provider       | Model         | Cost (Input) | Cost (Output) | Latency | Quality   |
| -------------- | ------------- | ------------ | ------------- | ------- | --------- |
| **OpenRouter** | GPT-3.5-turbo | $0.30/1M     | $0.60/1M      | ~1-2s   | ⭐⭐⭐⭐  |
| **OpenRouter** | Claude Haiku  | $0.25/1M     | $1.25/1M      | ~0.8s   | ⭐⭐⭐⭐½ |
| **OpenRouter** | Gemini Flash  | $0.075/1M    | $0.30/1M      | ~0.5s   | ⭐⭐⭐⭐  |
| **OpenRouter** | Llama 3 8B    | $0.06/1M     | $0.06/1M      | ~0.3s   | ⭐⭐⭐½   |
| OpenAI Direct  | GPT-3.5       | $0.50/1M     | $1.50/1M      | ~1-2s   | ⭐⭐⭐⭐  |

**Quyết định:** Dùng **OpenRouter** với chiến lược multi-model:

- **Primary:** Claude Haiku (tốt nhất cho tiếng Việt + nhanh)
- **Fallback 1:** GPT-3.5-turbo (nếu Haiku rate limit)
- **Fallback 2:** Gemini Flash (siêu rẻ, dự phòng)

**Tại sao OpenRouter tốt hơn OpenAI Direct:**

1. ✅ **Rẻ hơn 20-40%** - Same models, better pricing
2. ✅ **100+ models** - Không bị vendor lock-in
3. ✅ **Auto fallback** - Nếu 1 model down → tự chuyển sang model khác
4. ✅ **Higher rate limits** - Pooled từ nhiều providers
5. ✅ **Unified API** - 1 API key cho tất cả models
6. ✅ **Easy A/B testing** - Switch models trong 1 dòng code

**OpenRouter API Example:**

```python
# Tương thích 100% với OpenAI SDK
from openai import OpenAI

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key="sk-or-v1-..."  # OpenRouter API key
)

response = client.chat.completions.create(
    model="anthropic/claude-3-haiku",  # hoặc "openai/gpt-3.5-turbo"
    messages=[{"role": "user", "content": "..."}]
)
```

**Dependencies cần thêm (Python FastAPI service):**

```json
{
  "openai": "^1.12.0",
  "httpx": "^0.26.0",
  "langchain": "^0.1.0"
}
```

#### B. Vector Database

**Lựa chọn được chọn: Qdrant (Self-hosted)**

| Option       | Pros                 | Cons              | Cost           |
| ------------ | -------------------- | ----------------- | -------------- |
| **Pinecone** | Managed, dễ dùng     | $70/month minimum | $70-200/mo     |
| **Qdrant**   | Free self-host, fast | Cần maintain      | $0 (VPS cost)  |
| **Weaviate** | Feature-rich         | Complex setup     | $0 (self-host) |
| **Chroma**   | Lightweight          | Limited scale     | $0             |

**Quyết định:** **Qdrant (Self-hosted)** trên VPS hiện tại

**Lý do:**

- Miễn phí (chạy trên VPS hiện tại)
- Performance cao (Rust-based)
- Easy Docker deployment
- REST API đơn giản
- Scale tốt (đủ cho 100K+ products)

**Dependencies:**

```json
{
  "@qdrant/js-client-rest": "^1.11.0"
}
```

#### C. Embedding Model

**Lựa chọn: OpenAI text-embedding-3-small**

```
Chi phí: $0.02 / 1M tokens
Dimensions: 1536 (có thể reduce to 512)
Quality: Rất tốt cho tiếng Việt
```

**Alternative (miễn phí):**

```
sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2
- Free
- Chạy local
- Quality tốt cho tiếng Việt
- 384 dimensions
```

**Quyết định:** Dùng OpenAI cho MVP (quality cao), có thể switch sang local model sau để optimize cost.

### 2.3 Tech Stack Tổng Hợp (Kiến Trúc Hybrid)

```
┌─────────────────────────────────────────────────────────────┐
│ Frontend (React 19 + TypeScript)                            │
│ ├─ UI: Ant Design + Custom Chat Widget                     │
│ ├─ State: Redux Toolkit + React Query                      │
│ └─ HTTP: Axios → Express API                               │
└────────────────────┬────────────────────────────────────────┘
                     │ HTTPS
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ Backend API (Node.js + Express 5.1.0)                       │
│ ├─ Business Logic: Products, Orders, Users, Auth           │
│ ├─ Database: PostgreSQL via Sequelize                      │
│ ├─ Chat Orchestration: Route chat requests → FastAPI       │
│ └─ HTTP Client: Axios → FastAPI service                    │
└────────────────────┬────────────────────────────────────────┘
                     │ Internal HTTP (Port 8000)
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ AI Service (Python 3.11 + FastAPI)                          │
│ ├─ Framework: FastAPI + Uvicorn (async)                    │
│ ├─ LLM: OpenRouter (Claude Haiku primary)                  │
│ ├─ Embeddings: sentence-transformers (local, free!)        │
│ ├─ Vector Search: Qdrant client                            │
│ ├─ RAG Pipeline: Langchain                                 │
│ └─ Caching: Redis (optional)                               │
└────────────────────┬────────────────────────────────────────┘
                     │
        ┌────────────┼────────────┐
        ▼            ▼            ▼
┌──────────────┐ ┌─────────┐ ┌──────────────┐
│ Qdrant       │ │ OpenR   │ │ PostgreSQL   │
│ Vector DB    │ │ outer   │ │ (Products)   │
│ (Docker)     │ │ API     │ │              │
└──────────────┘ └─────────┘ └──────────────┘

Infrastructure:
├─ Frontend: Vercel (static hosting)
├─ Express API: VPS (existing)
├─ FastAPI Service: VPS (Docker container, port 8000)
├─ Qdrant: VPS (Docker container, port 6333)
└─ PostgreSQL: VPS (existing)
```

**Communication Flow:**

```
User Browser
  ↓ (HTTPS)
Express API (Port 3000)
  ├─ /api/products → PostgreSQL (existing routes)
  ├─ /api/orders → PostgreSQL
  └─ /api/chat/* → Forward to FastAPI (new)
        ↓ (HTTP internal)
FastAPI Service (Port 8000)
  ├─ /chat/message → RAG pipeline
  │   ├─ Embed query (local model)
  │   ├─ Search Qdrant
  │   ├─ Fetch products from PostgreSQL
  │   └─ Call OpenRouter → Response
  └─ /chat/health → Health check
```

---

## 3. Kiến Trúc Hệ Thống

### 3.1 Architecture Diagram

```
┌──────────────────────────────────────────────────────────────┐
│                        USER BROWSER                          │
│  ┌────────────────────────────────────────────────────┐     │
│  │  React Chat Widget (Ant Design)                    │     │
│  │  - Message List                                     │     │
│  │  - Input Field                                      │     │
│  │  - Product Cards                                    │     │
│  │  - Quick Replies                                    │     │
│  └─────────────────┬──────────────────────────────────┘     │
└────────────────────┼──────────────────────────────────────────┘
                     │ HTTPS (Axios)
                     │
┌────────────────────▼──────────────────────────────────────────┐
│         BACKEND API (Express.js - Port 3000)                  │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │  POST /api/chat/message (Proxy Layer)                  │ │
│  │  ┌──────────────────────────────────────────────────┐  │ │
│  │  │ 1. Validate request (auth, rate limit)          │  │ │
│  │  │ 2. Log to PostgreSQL (chat_sessions)            │  │ │
│  │  │ 3. Forward to FastAPI:                          │  │ │
│  │  │    POST http://localhost:8000/chat/message      │  │ │
│  │  │ 4. Receive response from FastAPI                │  │ │
│  │  │ 5. Save response to PostgreSQL                  │  │ │
│  │  │ 6. Return to Frontend                           │  │ │
│  │  └──────────────────────────────────────────────────┘  │ │
│  └─────────────────────────────────────────────────────────┘ │
│           │                                                   │
│           │ HTTP Internal (localhost:8000)                    │
│           ▼                                                   │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │    AI SERVICE (FastAPI - Port 8000)                    │ │
│  │  ┌──────────────────────────────────────────────────┐  │ │
│  │  │ RAG Pipeline:                                    │  │ │
│  │  │ 1. Embedding query (sentence-transformers)      │  │ │
│  │  │ 2. Vector search (Qdrant)                       │  │ │
│  │  │ 3. Fetch products (PostgreSQL via Express API)  │  │ │
│  │  │ 4. Assemble prompt (Langchain)                  │  │ │
│  │  │ 5. Call LLM (OpenRouter)                        │  │ │
│  │  │ 6. Format response                              │  │ │
│  │  └──────────────────────────────────────────────────┘  │ │
│  └─────────────────────────────────────────────────────────┘ │
│           │                    │                    │         │
│  ┌────────▼──────┐   ┌────────▼────────┐   ┌──────▼──────┐ │
│  │ PostgreSQL    │   │ Qdrant Vector   │   │ OpenRouter  │ │
│  │ (Products,    │   │ DB (Embeddings) │   │ API (Claude │ │
│  │  Chat Logs)   │   │ Port 6333       │   │  Haiku)     │ │
│  └───────────────┘   └─────────────────┘   └─────────────┘ │
└───────────────────────────────────────────────────────────────┘
```

### 3.2 Data Flow Diagram

```
User Query: "Tôi cần điện thoại chụp ảnh tốt, tầm 15 triệu"
     │
     ▼
┌─────────────────────────────────────────────────────────┐
│ Step 1: Frontend sends to Backend                      │
│ POST /api/chat/message                                  │
│ Body: {                                                 │
│   sessionId: "sess_123",                                │
│   message: "Tôi cần điện thoại chụp ảnh tốt...",       │
│   userId: "user_456"                                    │
│ }                                                       │
└─────────────────────────┬───────────────────────────────┘
                          ▼
┌─────────────────────────────────────────────────────────┐
│ Step 2: Intent Classification (Backend)                │
│ - Detect intent: "product_recommendation"              │
│ - Extract entities: {                                   │
│     category: "điện thoại",                            │
│     feature: "chụp ảnh tốt",                           │
│     budget: "15 triệu"                                  │
│   }                                                     │
└─────────────────────────┬───────────────────────────────┘
                          ▼
┌─────────────────────────────────────────────────────────┐
│ Step 3: RAG Retrieval (FastAPI Service)                │
│ A. Create embedding của query                           │
│    sentence-transformers (local, free!):                │
│    Model: paraphrase-multilingual-MiniLM-L12-v2         │
│    "điện thoại chụp ảnh tốt 15 triệu" → [0.123, ...]   │
│    Latency: ~50ms (local GPU) hoặc ~200ms (CPU)        │
│                                                         │
│ B. Search Vector DB (Qdrant)                            │
│    POST http://localhost:6333/collections/products/     │
│         points/search                                   │
│    Query vector → Top 5 similar products:               │
│    - iPhone 13 (similarity: 0.89)                       │
│    - Samsung S23 (0.87)                                 │
│    - Xiaomi 13T (0.85)                                  │
│    - OPPO Reno 10 (0.82)                                │
│    - vivo V29 (0.80)                                    │
│                                                         │
│ C. Fetch full product details từ PostgreSQL            │
│    GET http://localhost:3000/api/products/by-ids        │
│    (call Express API from FastAPI)                      │
│    → Giá, specs, stock, images, reviews                 │
└─────────────────────────┬───────────────────────────────┘
                          ▼
┌─────────────────────────────────────────────────────────┐
│ Step 4: Assemble Prompt                                 │
│ System: "Bạn là trợ lý tư vấn CellphoneS..."           │
│ Context:                                                │
│   - User budget: 15 triệu                               │
│   - Need: chụp ảnh tốt                                  │
│   - Products found:                                     │
│     1. iPhone 13 - 14.9tr - Camera 12MP dual            │
│     2. Samsung S23 - 15.5tr - Camera 50MP               │
│     ...                                                 │
│ History: [last 5 messages]                              │
│ User: "Tôi cần điện thoại chụp ảnh tốt, tầm 15 tr"     │
└─────────────────────────┬───────────────────────────────┘
                          ▼
┌─────────────────────────────────────────────────────────┐
│ Step 5: Call OpenRouter API (via FastAPI)              │
│ POST https://openrouter.ai/api/v1/chat/completions     │
│ {                                                       │
│   model: "anthropic/claude-3-haiku",  // Primary       │
│   messages: [...prompt above...],                       │
│   temperature: 0.7,                                     │
│   max_tokens: 500,                                      │
│   provider: {                                           │
│     order: ["Anthropic", "OpenAI"],  // Fallback order │
│     allow_fallbacks: true                               │
│   }                                                     │
│ }                                                       │
│                                                         │
│ Response (từ Claude Haiku):                             │
│ "Với ngân sách 15 triệu và nhu cầu chụp ảnh đẹp,       │
│ mình gợi ý 3 mẫu sau:                                   │
│ 1. iPhone 13 (14.9tr) - Camera ổn định, chất lượng     │
│ ảnh tốt trong mọi điều kiện...                          │
│ 2. Samsung S23 (15.5tr) - Camera 50MP, chụp đêm xuất   │
│ sắc, zoom tốt...                                        │
│ Bạn thích kiểu máy nào hơn ạ?"                          │
│                                                         │
│ If Claude fails → Auto fallback to GPT-3.5              │
└─────────────────────────┬───────────────────────────────┘
                          ▼
┌─────────────────────────────────────────────────────────┐
│ Step 6: Format Response (Backend)                       │
│ {                                                       │
│   text: "Với ngân sách 15 triệu...",                   │
│   products: [                                           │
│     {                                                   │
│       id: 123,                                          │
│       name: "iPhone 13",                                │
│       price: 14900000,                                  │
│       image: "https://...",                             │
│       slug: "/iphone-13"                                │
│     },                                                  │
│     ...                                                 │
│   ],                                                    │
│   quickReplies: [                                       │
│     "So sánh 2 máy này",                                │
│     "Xem thêm điện thoại khác",                         │
│     "Điện thoại chụp đêm tốt"                           │
│   ],                                                    │
│   actions: [                                            │
│     {type: "view_product", productId: 123},             │
│     {type: "add_to_cart", productId: 123}               │
│   ]                                                     │
│ }                                                       │
└─────────────────────────┬───────────────────────────────┘
                          ▼
┌─────────────────────────────────────────────────────────┐
│ Step 7: Log & Save (Backend)                            │
│ INSERT INTO chat_messages (session_id, user_message,   │
│   ai_response, products_shown, created_at)              │
│                                                         │
│ INSERT INTO chat_analytics (intent, products_clicked,  │
│   conversion, session_id)                               │
└─────────────────────────┬───────────────────────────────┘
                          ▼
┌─────────────────────────────────────────────────────────┐
│ Step 8: Frontend Renders                                │
│ - AI message với text                                   │
│ - Product cards (image, name, price, buttons)           │
│ - Quick reply chips                                     │
│ - Typing indicator → hidden                             │
└─────────────────────────────────────────────────────────┘
```

---

## 4. Luồng Xử Lý Chi Tiết

### 4.1 User Flow - Happy Path

```
1. User vào trang chủ CellphoneS
   └─> Chatbox widget xuất hiện (bottom-right)

2. User click vào chatbox
   └─> Modal/Drawer mở ra
   └─> Hiển thị greeting message:
       "Xin chào! Tôi là trợ lý AI của CellphoneS.
        Bạn cần tìm sản phẩm gì hôm nay?"
   └─> Quick replies suggestions:
       • Tư vấn điện thoại
       • Xem laptop gaming
       • Kiểm tra bảo hành

3. User nhập: "Tôi muốn mua laptop cho làm đồ họa"
   └─> Frontend: Show typing indicator
   └─> Backend: Process (1-2 giây)

4. AI response:
   "Để làm đồ họa tốt, bạn cần laptop có:
   - Card đồ họa rời (RTX series)
   - RAM từ 16GB
   - Màn hình màu sắc chính xác

   Bạn có ngân sách khoảng bao nhiêu để mình tư vấn
   chính xác hơn ạ?"

   Quick replies:
   • Dưới 20 triệu
   • 20-30 triệu
   • 30-40 triệu
   • Trên 40 triệu

5. User click: "20-30 triệu"
   └─> AI response với product cards:

   "Với 20-30 triệu, mình gợi ý 3 máy phù hợp nhất:

   [Product Card 1: ASUS TUF Gaming A15]
   [Product Card 2: MSI Creator M16]
   [Product Card 3: Acer Nitro 5]

   Bạn muốn xem chi tiết máy nào?"

6. User click "Xem chi tiết" trên MSI Creator M16
   └─> Navigate to product page
   └─> Chat history preserved

7. User quay lại chat, hỏi: "Máy này có bán trả góp không?"
   └─> AI: "MSI Creator M16 có hỗ trợ trả góp:
       - 0% lãi suất 6 tháng
       - Duyệt online 15 phút
       - Trả trước 30%

       Bạn muốn tư vấn thêm về trả góp không?"
```

### 4.2 Edge Cases & Error Handling

#### Case 1: Không tìm thấy sản phẩm phù hợp

```
User: "Tôi muốn điện thoại 2 triệu chơi game AAA"
     │
     ▼
RAG retrieval: No products match (budget too low for AAA gaming)
     │
     ▼
AI Response: "Với ngân sách 2 triệu, hiện tại không có máy
chơi game AAA mượt ạ.

Mình có 2 gợi ý:
1. Tăng ngân sách lên 5-7 triệu để có máy chơi game tốt
2. Xem điện thoại 2 triệu phù hợp dùng hàng ngày

Bạn muốn xem loại nào?"
```

#### Case 2: AI không tự tin (low confidence)

```
User: "Tôi muốn fix lỗi điện thoại không sạc được"
     │
     ▼
Intent detection: technical_support (confidence: 0.4 < threshold 0.7)
     │
     ▼
Trigger: Transfer to agent

AI Response: "Vấn đề này hơi kỹ thuật, để mình kết nối
bạn với nhân viên hỗ trợ nhé.

[Button: Kết nối nhân viên ngay]
[Button: Tự xử lý]"

If user clicks "Kết nối nhân viên":
  → Create ticket in CRM
  → Notify online agent
  → Switch to live chat mode
```

#### Case 3: OpenAI API Error

```
LLM API call fails (timeout/rate limit)
     │
     ▼
Fallback Response:
"Xin lỗi, hệ thống đang quá tải. Bạn có thể:
1. Thử lại sau 1 phút
2. Liên hệ hotline: 1800.2097
3. Để lại tin nhắn, chúng tôi sẽ phản hồi sớm

[Button: Thử lại]
[Button: Liên hệ hotline]"

Backend: Log error to monitoring system (Sentry)
```

#### Case 4: Inappropriate Content

```
User: [spam/offensive message]
     │
     ▼
Content filter (backend):
  - Check for spam keywords
  - Sentiment analysis
     │
     ▼
If flagged:
  - Don't send to OpenAI (save cost)
  - Return generic response:
    "Xin lỗi, tôi chỉ hỗ trợ tư vấn sản phẩm và dịch vụ
     của CellphoneS. Bạn cần hỗ trợ gì về sản phẩm không?"
  - Log incident
```

---

## 5. API Specification

### 5.1 POST /api/chat/message

**Request:**

```json
{
  "sessionId": "sess_abc123",
  "message": "Tôi muốn mua điện thoại chụp ảnh tốt",
  "userId": "user_456" // optional, nếu logged in
}
```

**Response (Success 200):**

```json
{
  "status": "success",
  "data": {
    "messageId": "msg_789",
    "text": "Để chụp ảnh đẹp, bạn nên chú ý...",
    "products": [
      {
        "id": 123,
        "name": "iPhone 15 Pro",
        "slug": "iphone-15-pro",
        "price": 29990000,
        "salePrice": 27990000,
        "image": "https://cdn.cellphones.com.vn/...",
        "rating": 4.8,
        "stock": 15,
        "highlights": ["Camera 48MP", "Chip A17 Pro"]
      }
    ],
    "quickReplies": ["So sánh với Samsung S24", "Xem điện thoại Android"],
    "actions": [
      {
        "type": "view_product",
        "productId": 123,
        "label": "Xem chi tiết"
      },
      {
        "type": "add_to_cart",
        "productId": 123,
        "label": "Thêm vào giỏ"
      }
    ],
    "metadata": {
      "intent": "product_recommendation",
      "confidence": 0.92,
      "processingTime": 1850, // ms
      "llmTokens": {
        "prompt": 450,
        "completion": 180
      }
    }
  }
}
```

**Response (Error 500):**

```json
{
  "status": "error",
  "error": {
    "code": "LLM_API_ERROR",
    "message": "Hệ thống tạm thời quá tải, vui lòng thử lại sau",
    "fallback": {
      "text": "Bạn có thể liên hệ hotline 1800.2097 để được hỗ trợ ngay",
      "actions": [
        {
          "type": "retry",
          "label": "Thử lại"
        },
        {
          "type": "contact_hotline",
          "label": "Gọi hotline"
        }
      ]
    }
  }
}
```

### 5.2 GET /api/chat/history/:sessionId

**Response:**

```json
{
  "status": "success",
  "data": {
    "sessionId": "sess_abc123",
    "messages": [
      {
        "id": "msg_1",
        "role": "assistant",
        "content": "Xin chào! Tôi là trợ lý AI...",
        "timestamp": "2025-11-02T10:30:00Z"
      },
      {
        "id": "msg_2",
        "role": "user",
        "content": "Tôi muốn mua điện thoại",
        "timestamp": "2025-11-02T10:30:15Z"
      }
    ],
    "metadata": {
      "totalMessages": 10,
      "startedAt": "2025-11-02T10:30:00Z",
      "lastActivity": "2025-11-02T10:45:30Z"
    }
  }
}
```

### 5.3 POST /api/chat/feedback

**Request:**

```json
{
  "messageId": "msg_789",
  "feedback": "positive", // "positive" | "negative"
  "comment": "Rất hữu ích!" // optional
}
```

**Response:**

```json
{
  "status": "success",
  "message": "Cảm ơn phản hồi của bạn!"
}
```

### 5.4 POST /api/chat/transfer-to-agent

**Request:**

```json
{
  "sessionId": "sess_abc123",
  "reason": "technical_issue", // or "complex_query", "complaint"
  "context": "User cần hỗ trợ về bảo hành"
}
```

**Response:**

```json
{
  "status": "success",
  "data": {
    "ticketId": "ticket_999",
    "estimatedWaitTime": 120, // seconds
    "agentStatus": "online", // "online" | "busy" | "offline"
    "message": "Đã tạo yêu cầu hỗ trợ. Nhân viên sẽ phản hồi trong vài phút."
  }
}
```

---

## 6. Database Schema

### 6.1 New Tables

#### Table: chat_sessions

```sql
CREATE TABLE chat_sessions (
  id BIGSERIAL PRIMARY KEY,
  session_id VARCHAR(255) UNIQUE NOT NULL,
  user_id BIGINT REFERENCES users(id),
  started_at TIMESTAMP DEFAULT NOW(),
  last_activity_at TIMESTAMP DEFAULT NOW(),
  ended_at TIMESTAMP,
  metadata JSONB, -- {device, browser, referrer}
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_chat_sessions_session_id ON chat_sessions(session_id);
CREATE INDEX idx_chat_sessions_user_id ON chat_sessions(user_id);
```

#### Table: chat_messages

```sql
CREATE TABLE chat_messages (
  id BIGSERIAL PRIMARY KEY,
  session_id VARCHAR(255) NOT NULL REFERENCES chat_sessions(session_id),
  role VARCHAR(20) NOT NULL, -- 'user' | 'assistant' | 'system'
  content TEXT NOT NULL,
  products_shown JSONB, -- Array of product IDs shown in this message
  metadata JSONB, -- {intent, confidence, tokens, latency}
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_chat_messages_session_id ON chat_messages(session_id);
CREATE INDEX idx_chat_messages_created_at ON chat_messages(created_at);
```

#### Table: chat_analytics

```sql
CREATE TABLE chat_analytics (
  id BIGSERIAL PRIMARY KEY,
  session_id VARCHAR(255) NOT NULL,
  event_type VARCHAR(50) NOT NULL, -- 'message', 'product_view', 'add_to_cart', 'conversion'
  event_data JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_chat_analytics_session_id ON chat_analytics(session_id);
CREATE INDEX idx_chat_analytics_event_type ON chat_analytics(event_type);
CREATE INDEX idx_chat_analytics_created_at ON chat_analytics(created_at);
```

#### Table: chat_feedback

```sql
CREATE TABLE chat_feedback (
  id BIGSERIAL PRIMARY KEY,
  message_id BIGINT REFERENCES chat_messages(id),
  feedback VARCHAR(20) NOT NULL, -- 'positive' | 'negative'
  comment TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 6.2 Existing Tables Updates

#### Table: products (add column)

```sql
ALTER TABLE products
ADD COLUMN embedding_id VARCHAR(255), -- ID trong Qdrant
ADD COLUMN embedding_updated_at TIMESTAMP;

CREATE INDEX idx_products_embedding_id ON products(embedding_id);
```

---

## 7. Roadmap & Timeline

### Phase 1: Foundation (Tuần 1-2) - 2 tuần

**Tuần 1: Data Preparation & Infrastructure**

- [ ] Day 1-2: Setup Qdrant (Docker)
  - Pull Docker image
  - Configure & run container
  - Test connection từ Node.js
- [ ] Day 3-4: Export & Clean Product Data
  - Script export products từ PostgreSQL
  - Clean & normalize text (remove HTML, special chars)
  - Create product descriptions cho embedding
  - Format: "{name} - {category} - {brand} - {key_specs} - {price_range}"
- [ ] Day 5-7: Generate Embeddings & Seed Vector DB
  - Script: batch embedding generation (100 products/batch)
  - Upload to Qdrant với metadata
  - Test vector search quality
  - Tune similarity thresholds

**Tuần 2: Backend Development (Hybrid Node.js + Python)**

- [ ] Day 1-2: FastAPI Service Setup
  - Docker setup cho FastAPI
  - Project structure (routes, services, models)
  - OpenRouter integration
  - Health check endpoints
- [ ] Day 3-4: RAG Pipeline (Python)
  - sentence-transformers embedding service
  - Qdrant vector search
  - Langchain RAG chain
  - Product fetch from Express API
- [ ] Day 5-6: Express API Integration
  - POST /api/chat/message (proxy to FastAPI)
  - Database logging (chat_sessions, chat_messages)
  - Auth & rate limiting
  - Error handling
- [ ] Day 7: Testing & Refinement
  - Integration tests (Express ↔ FastAPI)
  - Tune prompts
  - Performance optimization

### Phase 2: Frontend & Integration (Tuần 3-4) - 1.5 tuần

**Tuần 3: Chat Widget UI**

- [ ] Day 1-2: Component Structure
  - ChatWidget container
  - MessageList component
  - MessageInput component
  - ProductCard component
- [ ] Day 3-4: State Management
  - Redux slice cho chat
  - API integration
  - Optimistic updates
  - Error handling
- [ ] Day 5-7: Polish & UX
  - Typing indicator
  - Quick replies
  - Product actions
  - Responsive design
  - Animations

**Tuần 4 (3-4 ngày): Integration & Testing**

- [ ] Day 1-2: End-to-End Testing
  - Test flows
  - Fix bugs
  - Performance tuning
- [ ] Day 3-4: Soft Launch Prep
  - Analytics setup
  - Monitoring
  - Documentation
  - Training data for team

### Phase 3: Launch & Iterate (Tuần 5-6) - 2 tuần

**Tuần 5: Soft Launch**

- [ ] Day 1: Deploy to staging
- [ ] Day 2-3: Internal testing (team + select users)
- [ ] Day 4-5: Fix critical bugs
- [ ] Day 6-7: Prepare production deployment

**Tuần 6: Production & Monitor**

- [ ] Day 1: Deploy to 10% traffic
- [ ] Day 2-7: Monitor, iterate, scale gradually

**Total MVP Timeline: 5-6 tuần**

---

## 8. Budget & Cost Analysis

### 8.1 Development Cost (One-time)

| Task                          | Person        | Days         | Cost (ước tính)   |
| ----------------------------- | ------------- | ------------ | ----------------- |
| Backend API Development       | Backend Dev   | 10           | Internal          |
| Frontend Chat Widget          | Frontend Dev  | 8            | Internal          |
| Data Preparation & Embeddings | Data Engineer | 5            | Internal          |
| Testing & QA                  | QA Engineer   | 5            | Internal          |
| DevOps (Docker, deployment)   | DevOps        | 2            | Internal          |
| **Total**                     | -             | **~30 days** | **Internal team** |

_Assuming internal team. If outsource: ~$15,000-25,000 USD_

### 8.2 Infrastructure Cost (Monthly)

| Service                                | Usage                         | Cost/Month (USD)  |
| -------------------------------------- | ----------------------------- | ----------------- |
| **OpenRouter API**                     |                               |                   |
| - Claude Haiku (primary)               | 50K messages @ 400 tokens avg | ~$7.50            |
| - GPT-3.5 (fallback)                   | 10K messages @ 400 tokens     | ~$1.80            |
| **Embeddings** (sentence-transformers) | Unlimited (local)             | **$0 (FREE!)**    |
| **Qdrant** (Self-hosted)               | Docker on VPS                 | $0 (existing VPS) |
| **FastAPI Service**                    | Docker on VPS                 | $0 (existing VPS) |
| **VPS Upgrade** (if needed)            | +2GB RAM for FastAPI          | ~$5-10            |
| **Monitoring** (Sentry free tier)      | <5K events/month              | $0                |
| **Total Base**                         |                               | **~$8-20/month**  |

**Scale Projections (với OpenRouter):**

| Traffic Level | Messages/Month | LLM Cost | Embedding Cost | Total/Month   |
| ------------- | -------------- | -------- | -------------- | ------------- |
| Small (MVP)   | 10K            | ~$2      | $0             | **~$2-10**    |
| Medium        | 50K            | ~$10     | $0             | **~$10-20**   |
| Large         | 200K           | ~$40     | $0             | **~$40-60**   |
| Very Large    | 500K           | ~$100    | $0             | **~$100-130** |

**So sánh với OpenAI trực tiếp:**

- MVP: $2-10/tháng vs $13-33/tháng → **Tiết kiệm 70%!**
- Large: $40-60/tháng vs $120-150/tháng → **Tiết kiệm 60%!**
- Embeddings: $0 (local) vs $50-100/tháng → **Tiết kiệm 100%!**

### 8.3 Cost Optimization Strategies

**Đã áp dụng (Built-in):**

1. ✅ **OpenRouter thay OpenAI** → tiết kiệm 20-40%
2. ✅ **Local embeddings** (sentence-transformers) → tiết kiệm 100% embedding cost
3. ✅ **Self-host Qdrant** → save $70-200/month vs Pinecone
4. ✅ **FastAPI Python** → efficient async processing

**Immediate (MVP):**

1. Cache common queries (Redis) → save 30-50% API calls
2. Intent classifier → skip LLM cho FAQ đơn giản
3. Smart model routing:
   - Simple queries → Gemini Flash ($0.075/1M) - siêu rẻ
   - Normal queries → Claude Haiku ($0.25/1M) - balanced
   - Complex queries → GPT-4 ($30/1M) - chỉ khi cần
4. Rate limiting aggressive → prevent abuse

**After MVP (nếu traffic cao):**

1. Fine-tune Llama 3 8B on own data → self-host hoàn toàn (FREE!)
2. Hybrid approach: 80% queries → local model, 20% → cloud
3. Smart caching với embeddings similarity
4. Prompt compression techniques

### 8.4 ROI Projections

**Assumptions:**

- Current: 5 support agents, $800/month each = $4,000/month
- Chatbot handles 60% of queries → save 3 agents = $2,400/month
- Conversion increase 10% (e.g., 100 orders → 110 orders/month)
- Average order value: 10M VND (~$400 USD)
- Profit margin: 15%

**Savings/Revenue:**

- Support cost saved: $2,400/month
- Extra revenue: 10 orders × $400 × 15% = $600/month
- **Total benefit: ~$3,000/month**

**Costs:**

- Development: $0 (internal, already paid)
- Infrastructure: ~$50/month (at scale)

**Net benefit: ~$2,950/month**
**Payback period: Immediate (since dev is internal)**

---

## 9. Risk Assessment

### 9.1 Technical Risks

| Risk                               | Probability | Impact | Mitigation                                                                                            |
| ---------------------------------- | ----------- | ------ | ----------------------------------------------------------------------------------------------------- |
| **AI Hallucination** (wrong info)  | Medium      | High   | - Use RAG (facts from DB)<br>- Add validation layer<br>- Confidence thresholds<br>- Disclaimers       |
| **High Latency** (>3s response)    | Medium      | Medium | - Optimize vector search<br>- Use streaming responses<br>- Cache common queries<br>- CDN for frontend |
| **Cost Overrun** (API usage spike) | Low         | Medium | - Rate limiting<br>- Cost alerts<br>- Intent filtering<br>- Cache heavily                             |
| **Qdrant Downtime**                | Low         | High   | - Docker auto-restart<br>- Health checks<br>- Fallback to simple search                               |
| **Data Quality** (poor embeddings) | Medium      | Medium | - Manual review sample<br>- A/B test prompts<br>- Continuous improvement                              |

### 9.2 Business Risks

| Risk                                      | Probability | Impact | Mitigation                                                                                  |
| ----------------------------------------- | ----------- | ------ | ------------------------------------------------------------------------------------------- |
| **Low Adoption** (users don't use)        | Medium      | High   | - Prominent placement<br>- Incentives (coupon for chat)<br>- A/B test UI<br>- User feedback |
| **Poor UX** (frustrating responses)       | Medium      | High   | - Extensive testing<br>- Quick replies<br>- Easy agent transfer<br>- Feedback loop          |
| **Privacy Concerns**                      | Low         | Medium | - Clear privacy policy<br>- Opt-in data usage<br>- Anonymize logs<br>- GDPR compliance      |
| **Competitor Advantage** (they do better) | Medium      | Low    | - Continuous improvement<br>- Unique data advantage<br>- Fast iteration                     |

### 9.3 Contingency Plans

**Plan A: If AI quality is poor**

- Fallback to rule-based chatbot for 80% cases
- Use AI only for complex queries
- Invest in fine-tuning

**Plan B: If cost too high**

- Switch to local embedding model (free)
- Use smaller LLM (Llama 3 8B self-hosted)
- More aggressive caching

**Plan C: If adoption low**

- Gamification (points for using chat)
- Exclusive deals via chatbot
- Marketing campaign
- Partnership with influencers

---

## 10. Setup Instructions

### 10.1 Prerequisites

**Required:**

- Node.js 18+ (backend đã có)
- Python 3.11+ (for FastAPI service)
- PostgreSQL (đã có)
- Docker (for Qdrant + FastAPI)
- OpenRouter API key

**Accounts to create:**

1. OpenRouter Platform: https://openrouter.ai
   - Sign up with GitHub/Google
   - Generate API key (Settings → Keys)
   - Add payment method ($5 minimum recommended)
   - Set usage limits ($50/month recommended)
   - Enable models: Claude Haiku, GPT-3.5, Gemini Flash

### 10.2 Step-by-Step Setup

#### Step 1: Setup Qdrant Vector DB

```bash
# Pull Qdrant Docker image
docker pull qdrant/qdrant

# Run Qdrant container
docker run -d \
  --name qdrant \
  -p 6333:6333 \
  -p 6334:6334 \
  -v $(pwd)/qdrant_storage:/qdrant/storage \
  qdrant/qdrant

# Verify it's running
curl http://localhost:6333/
# Should return: {"title":"qdrant - vector search engine",...}
```

#### Step 2: Setup FastAPI Service

```bash
# Create FastAPI project
mkdir cellphones-ai-service
cd cellphones-ai-service

# Create Python virtual environment
python3.11 -m venv venv
source venv/bin/activate  # On macOS/Linux

# Install dependencies
pip install fastapi==0.109.0 \
  uvicorn[standard]==0.27.0 \
  openai==1.12.0 \
  langchain==0.1.0 \
  sentence-transformers==2.3.1 \
  qdrant-client==1.7.0 \
  pydantic==2.6.0 \
  httpx==0.26.0 \
  python-dotenv==1.0.0

# Create requirements.txt
pip freeze > requirements.txt
```

**Project Structure:**

```
cellphones-ai-service/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI app
│   ├── config.py            # Settings
│   ├── models/
│   │   ├── __init__.py
│   │   └── chat.py          # Pydantic models
│   ├── services/
│   │   ├── __init__.py
│   │   ├── embedding.py     # sentence-transformers
│   │   ├── vector_search.py # Qdrant client
│   │   ├── llm.py          # OpenRouter
│   │   └── rag.py          # RAG pipeline
│   └── routes/
│       ├── __init__.py
│       └── chat.py          # Chat endpoints
├── Dockerfile
├── requirements.txt
└── .env
```

#### Step 3: Environment Variables

**FastAPI Service** - Create `.env` in `cellphones-ai-service/`:

```env
# OpenRouter
OPENROUTER_API_KEY=sk-or-v1-...your-key...
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
PRIMARY_MODEL=anthropic/claude-3-haiku
FALLBACK_MODEL=openai/gpt-3.5-turbo
CHEAP_MODEL=google/gemini-flash-1.5

# Embeddings (Local)
EMBEDDING_MODEL=sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2
EMBEDDING_DEVICE=cpu  # or 'cuda' if have GPU

# Qdrant
QDRANT_URL=http://localhost:6333
QDRANT_COLLECTION_NAME=cellphones_products

# Express API (for product fetch)
EXPRESS_API_URL=http://localhost:3000

# Config
MAX_TOKENS=500
TEMPERATURE=0.7
TOP_K_RESULTS=5
```

**Express API** - Update `.env` in `cellphones/`:

```env
# Existing vars...

# FastAPI Service
FASTAPI_URL=http://localhost:8000

# Chat Config
CHAT_MAX_HISTORY=10
CHAT_RESPONSE_TIMEOUT=30000
CHAT_RATE_LIMIT=10 # requests per minute per user
```

#### Step 4: Database Migration

```bash
cd cellphones/src/migrations

# Run SQL migrations
psql -U your_user -d cellphones_db -f 003_create_chat_tables.sql
```

Create `003_create_chat_tables.sql`:

```sql
-- (Copy from section 6.1 above)
```

#### Step 5: Generate Embeddings (Initial Seed)

Create Python script `cellphones-ai-service/scripts/seed_embeddings.py`:

```python
import asyncio
from sentence_transformers import SentenceTransformer
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct
import httpx
import os
from dotenv import load_dotenv

load_dotenv()

async def fetch_products():
    """Fetch all products from Express API"""
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{os.getenv('EXPRESS_API_URL')}/api/products")
        return response.json()['data']

async def generate_embeddings():
    # Load model
    print("Loading embedding model...")
    model = SentenceTransformer(os.getenv('EMBEDDING_MODEL'))

    # Connect to Qdrant
    qdrant = QdrantClient(url=os.getenv('QDRANT_URL'))

    # Create collection
    collection_name = os.getenv('QDRANT_COLLECTION_NAME')
    try:
        qdrant.recreate_collection(
            collection_name=collection_name,
            vectors_config=VectorParams(size=384, distance=Distance.COSINE)
        )
        print(f"Created collection: {collection_name}")
    except Exception as e:
        print(f"Collection exists or error: {e}")

    # Fetch products
    print("Fetching products from Express API...")
    products = await fetch_products()
    print(f"Found {len(products)} products")

    # Generate embeddings and upload
    batch_size = 100
    for i in range(0, len(products), batch_size):
        batch = products[i:i+batch_size]

        # Create text for embedding
        texts = [
            f"{p['name']} {p.get('category', '')} {p.get('brand', '')} "
            f"{p.get('description', '')[:200]} {p.get('price', '')}"
            for p in batch
        ]

        # Generate embeddings
        print(f"Generating embeddings for batch {i//batch_size + 1}...")
        embeddings = model.encode(texts, show_progress_bar=True)

        # Upload to Qdrant
        points = [
            PointStruct(
                id=p['id'],
                vector=embeddings[idx].tolist(),
                payload={
                    "product_id": p['id'],
                    "name": p['name'],
                    "category": p.get('category'),
                    "brand": p.get('brand'),
                    "price": p.get('price')
                }
            )
            for idx, p in enumerate(batch)
        ]

        qdrant.upsert(collection_name=collection_name, points=points)
        print(f"Uploaded {len(points)} embeddings")

    print("✅ Done! Embeddings generated and uploaded to Qdrant")

if __name__ == "__main__":
    asyncio.run(generate_embeddings())
```

Run:

```bash
cd cellphones-ai-service
source venv/bin/activate
python scripts/seed_embeddings.py
```

#### Step 6: Start Services & Test

**Terminal 1 - Start Qdrant:**

```bash
docker run -d --name qdrant -p 6333:6333 qdrant/qdrant
```

**Terminal 2 - Start FastAPI:**

```bash
cd cellphones-ai-service
source venv/bin/activate
uvicorn app.main:app --reload --port 8000
```

**Terminal 3 - Start Express API:**

```bash
cd cellphones
npm run dev
```

**Test FastAPI directly:**

```bash
curl -X POST http://localhost:8000/chat/message \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Tôi muốn mua điện thoại chụp ảnh tốt",
    "session_id": "test_session_1"
  }'
```

**Test through Express (proxy):**

```bash
curl -X POST http://localhost:3000/api/chat/message \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "test_session_1",
    "message": "Tôi muốn mua điện thoại chụp ảnh tốt"
  }'
```

#### Step 7: Frontend Integration

Update `src/main.tsx` to include ChatWidget:

```tsx
// See implementation in Phase 2
```

---

## 11. Next Steps

### Immediate Actions (This Week)

1. [ ] Review this document with team
2. [ ] Get approval for tech stack (FastAPI + OpenRouter)
3. [ ] Create OpenRouter account & get API key (https://openrouter.ai)
4. [ ] Setup Python 3.11+ environment
5. [ ] Setup Qdrant Docker container (30 min)
6. [ ] Run database migrations (15 min)

### Week 1 Tasks

1. [ ] Setup FastAPI project structure
2. [ ] Implement sentence-transformers embedding service
3. [ ] Export product data & generate embeddings (2-3 hours for 10K products)
4. [ ] Test vector search quality
5. [ ] Start FastAPI RAG pipeline development

### Questions to Resolve

1. Who will be the technical owner of this project?
2. What's the target launch date?
3. Do we need approval for OpenRouter spending (~$10-20/month)?
4. Do we have a developer familiar with Python/FastAPI? (or need training?)
5. VPS có đủ resource cho FastAPI service không? (cần +2GB RAM)
6. How to measure success (KPIs)?

---

## 12. Appendix

### A. Sample Prompts

**System Prompt (v1):**

```
Bạn là trợ lý AI thông minh của CellphoneS - cửa hàng bán lẻ điện thoại,
laptop, phụ kiện hàng đầu Việt Nam.

NHIỆM VỤ:
- Tư vấn sản phẩm phù hợp với nhu cầu và ngân sách khách hàng
- Giải thích thông số kỹ thuật dễ hiểu
- So sánh sản phẩm khách quan
- Cung cấp thông tin chính xác về giá, khuyến mãi, bảo hành

QUY TẮC BẮT BUỘC:
1. Luôn thân thiện, chuyên nghiệp, nhiệt tình
2. Trả lời NGẮN GỌN, đi thẳng vào vấn đề (max 150 từ)
3. Nếu không chắc chắn → thừa nhận và đề xuất liên hệ nhân viên
4. KHÔNG BẠO ĐẶT giá cả, khuyến mãi, thông số kỹ thuật
5. Chỉ giới thiệu TỐI ĐA 3 sản phẩm mỗi lần
6. Hỏi làm rõ nhu cầu nếu câu hỏi mơ hồ
7. Sử dụng tiếng Việt tự nhiên, tránh thuật ngữ quá kỹ thuật

ĐỊNH DẠNG TRẢ LỜI:
- Bắt đầu bằng câu ngắn thể hiện hiểu nhu cầu
- Giải thích ngắn gọn TẠI SAO gợi ý sản phẩm này
- Kết thúc bằng câu hỏi mở để tiếp tục hội thoại

SẢN PHẨM ĐANG CÓ:
{products_context}

LỊCH SỬ HỘI THOẠI:
{chat_history}
```

### B. Monitoring Metrics

**Track these KPIs:**

1. **Usage Metrics:**

   - Daily active users (DAU)
   - Messages per session
   - Session duration
   - Return rate

2. **Quality Metrics:**

   - User satisfaction (feedback ratio)
   - Agent transfer rate (target: <20%)
   - Response accuracy (manual review)
   - Average response time (target: <2s)

3. **Business Metrics:**

   - Conversion rate (chat → purchase)
   - Average order value from chat
   - Products clicked from chat
   - Cart additions from chat

4. **Technical Metrics:**
   - API latency (p50, p95, p99)
   - Error rate
   - OpenAI API cost per message
   - Cache hit rate

### C. Glossary

- **RAG**: Retrieval Augmented Generation - kỹ thuật kết hợp tìm kiếm ngữ nghĩa với LLM
- **Embedding**: Vector đại diện cho văn bản trong không gian nhiều chiều
- **Vector DB**: Database chuyên lưu và tìm kiếm vectors
- **LLM**: Large Language Model (GPT, Claude, etc.)
- **Intent**: Mục đích/ý định của người dùng trong câu hỏi
- **Hallucination**: LLM bịa đặt thông tin không có trong context

---

**Prepared by:** AI Technical Consultant  
**Date:** November 2, 2025  
**Version:** 1.0  
**Status:** Ready for Review

**Contact for questions:**  
Technical: [your-email]  
Business: [stakeholder-email]
