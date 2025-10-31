# Hệ thống Notification & Profile - CellphoneS

## 📋 Tổng quan

Hệ thống thông báo và quản lý profile hoàn chỉnh cho website CellphoneS, bao gồm:

- ✅ Notification Modal với Smember section
- ✅ User Profile với 10+ trang con
- ✅ Backend APIs đầy đủ
- ✅ Database migrations & seeding

---

## 🎯 Các tính năng đã triển khai

### 1. Backend (Node.js + Express + Sequelize)

#### Models

- **notification.model.js**: Model cho bảng notifications
  - Fields: id, user_id, type (ENUM), title, message, order_id, order_number, is_read, icon_type, metadata (JSON)
  - Foreign keys: user_id → users.id, order_id → orders.id

#### Associations (associations.js)

```javascript
User hasMany Notifications
Notification belongsTo User
Order hasMany Notifications
Notification belongsTo Order
```

#### API Endpoints

```
GET    /api/notifications/user/:userId          - Lấy tất cả notifications
GET    /api/notifications/user/:userId?type=order - Filter theo type
PATCH  /api/notifications/:id/read              - Đánh dấu đã đọc
PATCH  /api/notifications/user/:userId/read-all - Đánh dấu tất cả đã đọc
GET    /api/notifications/user/:userId/unread-count - Đếm số chưa đọc
DELETE /api/notifications/:id                   - Xóa notification
```

#### File Structure

```
cellphones/src/
├── models/
│   ├── notification.model.js
│   └── associations.js
├── repositories/
│   └── notification.repository.js
├── services/
│   └── notification.service.js
├── controllers/
│   └── notification.controller.js
├── routes/
│   ├── notification.route.js
│   └── index.js (updated)
└── migrations/
    ├── 001_create_notifications_table.sql
    ├── 002_seed_notifications.sql
    └── README.md
```

---

### 2. Frontend (React + TypeScript + Ant Design)

#### Components

**NotificationModal.tsx** - Modal thông báo chính

- Smember section với thông tin user
- 2 tabs: "Tất cả" và "Đơn hàng"
- List notifications với icons động (cart/bag)
- Timestamps với custom getTimeAgo()
- Mark as read functionality
- Navigate to order details

**ProfilePage.tsx** - Trang profile chính

- Sidebar menu với 10 items
- User info header với avatar, badges (S-Member, S-Student)
- Points display: Xu & Smember
- Active menu highlighting
- Outlet cho child routes

#### Profile Sub-Pages

1. **ProfileOverview.tsx** - Tổng quan

   - Stats cards: Tổng đơn hàng, Tổng tiền, Điểm thưởng
   - Benefits info section
   - Favorite products (empty state)

2. **OrderHistory.tsx** - Lịch sử đơn hàng

   - 4 tabs: Tất cả, Chờ xử lý, Đang giao, Hoàn thành
   - Order cards với product images
   - Status badges với colors
   - Buttons: Mua lại, Theo dõi đơn hàng

3. **WarrantyCheck.tsx** - Tra cứu bảo hành

   - Search form với Serial/IMEI
   - Result display với warranty status
   - Instructions cho iPhone/Android

4. **BenefitsPage.tsx** - Hàng thành viên và ưu đãi

   - Benefits grid với images
   - Filter tabs: Tất cả, Khả dụng, Đã sử dụng
   - CTA sections

5. **BusinessPage.tsx** - Ưu đãi S-Business

   - Registration form cho doanh nghiệp
   - Benefits showcase
   - Contact hotline

6. **StudentPage.tsx** - Ưu đãi S-Student/Teacher

   - Registration form
   - Student benefits display
   - Campaign banners

7. **AccountSettings.tsx** - Thông tin tài khoản
   - 3 tabs: Thông tin cá nhân, Địa chỉ, Bảo mật
   - Edit personal info
   - Manage addresses
   - Security settings

#### API Client

**notification.api.ts**

```typescript
interface NotificationProps {
  id: number;
  user_id: number;
  type: "order" | "promotion" | "system" | "smember";
  title: string;
  message: string;
  order_id?: number;
  order_number?: string;
  is_read: boolean;
  icon_type?: string;
  metadata?: unknown;
  created_at: string;
}

// Methods
getAll(userId: number, type?: string)
getUnreadCount(userId: number)
markAsRead(id: number)
markAllAsRead(userId: number)
delete(id: number)
```

#### File Structure

```
src/
├── components/
│   ├── modals/
│   │   └── NotificationModal.tsx
│   └── home/
│       └── HeaderHome.tsx (updated)
├── pages/
│   └── profile/
│       ├── ProfilePage.tsx
│       ├── ProfileOverview.tsx
│       ├── OrderHistory.tsx
│       ├── WarrantyCheck.tsx
│       ├── BenefitsPage.tsx
│       ├── BusinessPage.tsx
│       ├── StudentPage.tsx
│       └── AccountSettings.tsx
├── utils/
│   └── api/
│       └── notification.api.ts
├── constants/
│   └── API_URL.ts (updated)
└── routes.tsx (updated)
```

---

## 🗺️ Routes Configuration

```typescript
/profile                  → ProfilePage (parent)
├── /profile              → ProfileOverview (index)
├── /profile/orders       → OrderHistory
├── /profile/warranty     → WarrantyCheck
├── /profile/benefits     → BenefitsPage
├── /profile/business     → BusinessPage
├── /profile/student      → StudentPage
└── /profile/settings     → AccountSettings
```

---

## 🗄️ Database Schema

### Bảng `notifications`

```sql
CREATE TABLE `notifications` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `user_id` BIGINT UNSIGNED NOT NULL,
  `type` ENUM('order', 'promotion', 'system', 'smember') DEFAULT 'order',
  `title` VARCHAR(255) NOT NULL,
  `message` TEXT,
  `order_id` BIGINT UNSIGNED,
  `order_number` VARCHAR(50),
  `is_read` BOOLEAN DEFAULT FALSE,
  `icon_type` VARCHAR(50) COMMENT 'cart, bag, bell, gift',
  `metadata` JSON COMMENT 'Additional data',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  INDEX `idx_user_id` (`user_id`),
  INDEX `idx_order_id` (`order_id`),
  INDEX `idx_type` (`type`),
  INDEX `idx_is_read` (`is_read`),
  INDEX `idx_created_at` (`created_at`),
  INDEX `idx_user_type_read` (`user_id`, `type`, `is_read`),
  INDEX `idx_user_created` (`user_id`, `created_at` DESC),

  CONSTRAINT `fk_notifications_user`
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_notifications_order`
    FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

## 🚀 Hướng dẫn chạy

### 1. Chạy Database Migrations

```bash
# Tạo bảng notifications
mysql -u username -p database_name < cellphones/src/migrations/001_create_notifications_table.sql

# Seed dữ liệu mẫu
mysql -u username -p database_name < cellphones/src/migrations/002_seed_notifications.sql
```

### 2. Khởi động Backend

```bash
cd cellphones
npm install
npm run dev
```

### 3. Khởi động Frontend

```bash
npm install
npm run dev
```

---

## 🎨 Design System

### Colors

- Primary Red: `#d70019`
- Hover Red: `#b8001a`
- Gray Text: `#6b7280`
- Border: `#e5e7eb`

### Components

- Ant Design: Modal, Badge, Avatar
- React Icons: FiHome, FiShoppingBag, etc.
- Custom: NotificationModal, ProfilePage

---

## 📊 Sample Data

Migration `002_seed_notifications.sql` tạo 8 notifications mẫu:

- 4 Order notifications (pending, delivering, completed)
- 2 Promotion notifications (sales, student discounts)
- 1 Smember welcome notification
- 1 System notification (policy update)

---

## ✅ Checklist Hoàn thành

### Backend

- [x] notification.model.js với đầy đủ fields
- [x] associations.js cho relationships
- [x] notification.repository.js (CRUD operations)
- [x] notification.service.js (business logic)
- [x] notification.controller.js (HTTP handlers)
- [x] notification.route.js (Express routes)
- [x] Migration script 001_create_notifications_table.sql
- [x] Seed script 002_seed_notifications.sql

### Frontend

- [x] NotificationModal component
- [x] notification.api.ts client
- [x] HeaderHome integration với badge
- [x] ProfilePage layout
- [x] ProfileOverview page
- [x] OrderHistory page
- [x] WarrantyCheck page
- [x] BenefitsPage page
- [x] BusinessPage page
- [x] StudentPage page
- [x] AccountSettings page
- [x] Routes configuration

---

## 🔧 Các bước tiếp theo

1. **Chạy migrations** để tạo bảng notifications
2. **Test API endpoints** bằng Postman/Thunder Client
3. **Test UI flows**:
   - Click notification icon → modal mở
   - Switch tabs Tất cả/Đơn hàng
   - Mark notifications as read
   - Navigate to profile pages
4. **Responsive design** cho mobile
5. **Polish UI** để match 100% với screenshots

---

## 📝 Notes

- Metadata field dùng JSON cho flexibility
- Indexes được optimize cho queries thường dùng
- Foreign keys có CASCADE delete/update
- TypeScript strict mode compatible
- All components follow React best practices

---

## 🐛 Known Issues

- Cần check ERD.png để verify database schema
- Một số profile sub-pages cần thêm functionality (ReferralPage, StoreLocator, TermsPage)
- Mobile responsive chưa được test đầy đủ

---

## 👥 Contact

Nếu có vấn đề, vui lòng kiểm tra:

1. Database connection trong `cellphones/src/configs/database.config.js`
2. API endpoints trong frontend `src/constants/API_URL.ts`
3. CORS configuration trong backend `src/index.js`
