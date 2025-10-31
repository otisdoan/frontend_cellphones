# Thiết kế AI Chatbox cho Cellphones — Tóm tắt (Tiếng Việt)

Mục đích: Thêm tính năng Chatbox AI (Tiếng Việt) giúp người dùng tìm sản phẩm, tư vấn, so sánh, trả lời thắc mắc và gợi ý hành động (xem chi tiết, thêm vào giỏ hàng).

## 1. Mục tiêu nhanh

- Trả lời tiếng Việt, thân thiện và chính xác.
- Hỗ trợ tìm sản phẩm bằng semantic + keyword search.
- Gợi ý tối đa 3 sản phẩm kèm link/ảnh/giá.
- MVP hoạt động với chi phí rất thấp (hoặc free tiers).

## 2. Kiến trúc tổng quan

- Frontend: React + TypeScript (component ChatBox, message list, composer, card results). Giao tiếp với backend bằng REST (non-streaming) cho MVP, sau đó streaming bằng SSE/WebSocket.
- Backend: Node/Express (tích hợp vào `cellphones` backend hoặc service tách riêng). Endpoint chính: `POST /api/ai-chat` (non-streaming) và tuỳ chọn `GET /api/ai-chat/stream` cho streaming.
- Retrieval: Hybrid search
  - Exact search: ElasticSearch/Algolia (keyword + facets) — dùng khi cần lọc chính xác.
  - Semantic search: Vector DB (Pinecone/Supabase Vector/FAISS) — semantic matching.
- LLM & Embeddings: LLM để sinh phản hồi; embeddings để truy vấn semantic.

## 3. Dữ liệu & schema sản phẩm

Mỗi document sản phẩm cần tối thiểu:

- id, title, slug/url, price, brand, category_ids, tags
- short_description, description, specs (key-value), image, in_stock, updated_at
- (Dev) source_text_for_embedding = title + short_description + flattened specs

## 4. Quy trình ETL (bước tiếp theo)

- Viết script ETL lấy dữ liệu từ backend `cellphones` (repositories hiện có).
- Chuẩn hoá schema, xuất `data/products.json`.
- Compute embeddings (batch) bằng sentence-transformers (dev free) hoặc OpenAI (đắt hơn) và lưu/đẩy vào vector store.
- Thiết lập incremental sync (cron/webhook) để cập nhật khi sản phẩm thay đổi.

## 5. Lưu ý kỹ thuật cho MVP "free/chi phí thấp" (khuyến nghị)

- Embeddings: `sentence-transformers` (model `all-MiniLM-L6-v2`) chạy local trên CPU.
- Vector store: FAISS (local) để truy vấn top-K nhanh.
- LLM: Hugging Face Inference API (free tier) hoặc local LLM (llama.cpp) nếu bạn có hạ tầng; bắt đầu với HF Inference để giảm công vận hành.
- Flow MVP: query ➜ compute embedding local ➜ FAISS top-K ➜ build prompt với top-K ➜ gọi HF/LLM để generate reply ➜ trả về text + products.

## 6. API contract (MVP)

- POST /api/ai-chat
  - Request: { sessionId?: string, message: string, filters?: { minPrice?, maxPrice?, brand?[] } }
  - Response: { text: string, products: [{id,title,price,url,image,score}], meta: { retrieved_count, latency_ms }}

## 7. Prompt design (nguyên tắc)

- System prompt: giới hạn assistant là trợ lý bán hàng, ưu tiên dữ liệu đính kèm, KHÔNG Bịa giá/cấu hình.
- Kèm retrieved docs (id/title/price/specs ngắn) trong prompt. Yêu cầu trả lời ngắn gọn (≤120 từ) + một JSON block chứa tối đa 3 sản phẩm (dễ parse).

## 8. Frontend UI (MVP)

- Floating Chat button → pane chat.
- Message list, composer, show streaming indicator.
- Product card: image, title, price, rating, CTA (Xem chi tiết / Thêm vào giỏ).
- Quick actions: lọc theo giá, brand, xem thêm.

## 9. Monitoring & bảo mật

- Giám sát: latency (retrieval & LLM), token cost, fallback rate, CTR trên card, feedback thumb up/down.
- Bảo mật: không đưa PII vào prompt, lưu logs đã sanitize, quản lý keys bằng env/secret store, rate-limit endpoint.

## 10. Acceptance criteria cho MVP

- Người dùng gửi câu hỏi tiếng Việt và nhận trả lời ≤ 5s (non-streaming).
- Trả về tối đa 3 sản phẩm thực tế, link hoạt động, Add-to-cart từ UI.
- Tỷ lệ fallback (không tìm thấy) < 10% trong pilot.

## 11. Kế hoạch triển khai (cao cấp)

1. Viết script ETL export `products.json` từ backend. (Bắt đầu ngay sau bạn OK).
2. Compute embeddings local bằng `sentence-transformers` và build FAISS index.
3. Xây endpoint `/api/ai-chat` trong backend: gọi FAISS, build prompt, gọi HF Inference API, trả về kết quả.
4. Tạo React ChatBox MVP gọi endpoint và render card.
5. Pilot nội bộ + tune prompt + chuyển lên Pinecone/managed LLM khi cần scale.

## 12. Tiếp theo tôi sẽ làm (sau khi bạn chấp nhận)

- Tạo file script ETL (`scripts/etl/export_products.ts` hoặc Python) dùng repository backend để xuất dữ liệu.
- Tạo script compute embeddings + build FAISS index (`scripts/etl/embeddings_faiss.py`).
- Thêm endpoint `/api/ai-chat` (Node) mẫu dùng FAISS-local + HF Inference.
- Tạo React ChatBox MVP.

---

Nếu bạn đồng ý với thiết kế (hoặc muốn chỉnh 1 vài điểm như chỉ dùng open-source LLM hoàn toàn self-host), reply `OK` (hoặc mô tả chỉnh sửa). Sau khi bạn OK mình sẽ bắt đầu viết code ETL và endpoint (bước 2 in-progress).
