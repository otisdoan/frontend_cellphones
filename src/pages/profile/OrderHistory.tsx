import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { orderApi } from "../../utils/api/order.api";
import { useAuthContext } from "../../context/AuthContext";
import { message } from "antd";

interface OrderItem {
  id: number;
  product_id: number;
  product_name: string;
  variant_name?: string;
  image_url?: string;
  price: number;
  sale_price?: number;
  quantity: number;
  total: number;
}

interface Order {
  id: number;
  order_number: string;
  created_at: string;
  total_amount: number;
  user_id?: string | number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  payment_status: "pending" | "paid" | "failed" | "refunded";
  items: OrderItem[];
}

const OrderHistory = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext()!;
  const [activeTab, setActiveTab] = useState<
    "all" | "pending" | "delivering" | "completed"
  >("all");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        if (!user?.id) {
          message.warning("Vui lòng đăng nhập để xem lịch sử đơn hàng");
          setLoading(false);
          return;
        }

        console.log("👤 Fetching orders for user:", user.id);

        // Call API with user_id query param
        const response = await orderApi.getAll();

        console.log("📦 Orders response:", response);

        if (response?.data) {
          const allOrders = Array.isArray(response.data)
            ? response.data
            : [response.data];
          console.log("📋 Parsed orders:", allOrders);

          // Cast and filter by user_id
          const ordersWithItems = allOrders as unknown as Order[];

          console.log("🔍 Orders with items:", ordersWithItems);

          const userOrders = ordersWithItems.filter(
            (order) =>
              order.user_id && String(order.user_id) === String(user.id)
          );

          console.log("✅ User orders:", userOrders);

          // Ensure items array exists
          const safeOrders = userOrders.map((order) => ({
            ...order,
            items: order.items || [],
          }));

          console.log("🛡️ Safe orders:", safeOrders);

          setOrders(safeOrders);
        }
      } catch (error) {
        console.error("❌ Error fetching orders:", error);
        message.error("Không thể tải lịch sử đơn hàng");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const getStatusText = (status: Order["status"]) => {
    const statusMap: Record<Order["status"], string> = {
      pending: "Chờ xác nhận",
      confirmed: "Đã xác nhận",
      shipped: "Đang giao hàng",
      delivered: "Hoàn thành",
      cancelled: "Đã hủy",
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status: Order["status"]) => {
    const colorMap: Record<Order["status"], string> = {
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-blue-100 text-blue-800",
      shipped: "bg-purple-100 text-purple-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return colorMap[status] || "bg-gray-100 text-gray-800";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const filteredOrders = orders.filter((order) => {
    if (activeTab === "all") return true;
    if (activeTab === "pending")
      return order.status === "pending" || order.status === "confirmed";
    if (activeTab === "delivering") return order.status === "shipped";
    if (activeTab === "completed") return order.status === "delivered";
    return true;
  });

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Lịch sử mua hàng
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Quản lý các đơn hàng của bạn
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Lịch sử mua hàng
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Quản lý các đơn hàng của bạn
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b border-gray-200">
          <div className="flex gap-x-8 px-6">
            <button
              onClick={() => setActiveTab("all")}
              className={`py-4 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "all"
                  ? "border-[#d70019] text-[#d70019]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setActiveTab("pending")}
              className={`py-4 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "pending"
                  ? "border-[#d70019] text-[#d70019]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Chờ xử lý
            </button>
            <button
              onClick={() => setActiveTab("delivering")}
              className={`py-4 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "delivering"
                  ? "border-[#d70019] text-[#d70019]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Đang giao
            </button>
            <button
              onClick={() => setActiveTab("completed")}
              className={`py-4 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "completed"
                  ? "border-[#d70019] text-[#d70019]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Hoàn thành
            </button>
          </div>
        </div>

        {/* Orders List */}
        <div className="p-6">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-16">
              <div className="mb-6">
                <svg
                  className="w-24 h-24 mx-auto text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {activeTab === "all" && "Chưa có đơn hàng nào"}
                {activeTab === "pending" && "Không có đơn hàng đang chờ"}
                {activeTab === "delivering" && "Không có đơn hàng đang giao"}
                {activeTab === "completed" && "Chưa có đơn hàng hoàn thành"}
              </h3>
              <p className="text-gray-500 mb-6">
                {activeTab === "all"
                  ? "Hãy khám phá và mua sắm những sản phẩm yêu thích của bạn"
                  : "Thử chuyển sang tab khác để xem đơn hàng"}
              </p>
              {activeTab === "all" && (
                <button
                  onClick={() => navigate("/")}
                  className="px-8 py-3 bg-[#d70019] text-white font-semibold rounded-lg hover:bg-[#b8001a] transition-colors inline-flex items-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Mua sắm ngay
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => navigate(`/order/${order.id}`)}
                >
                  {/* Order Header */}
                  <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-100">
                    <div>
                      <p className="font-semibold text-gray-900">
                        {order.order_number}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatDate(order.created_at)}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {getStatusText(order.status)}
                    </span>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-3">
                    {order.items &&
                    order.items.length > 0 &&
                    order.items[0]?.product_id ? (
                      order.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-start justify-between gap-x-3 p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex gap-x-3 flex-1">
                            <img
                              src={
                                item.image_url ||
                                "/images/product-placeholder.webp"
                              }
                              alt={item.product_name}
                              className="w-20 h-20 object-cover rounded border border-gray-200"
                              onError={(e) => {
                                e.currentTarget.src =
                                  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="%23d1d5db" stroke-width="1.5"%3E%3Crect x="3" y="3" width="18" height="18" rx="2"/%3E%3Ccircle cx="8.5" cy="8.5" r="1.5"/%3E%3Cpath d="M21 15l-5-5L5 21"/%3E%3C/svg%3E';
                              }}
                            />
                            <div className="flex-1 flex flex-col gap-y-1">
                              <p className="font-medium text-gray-900 line-clamp-2">
                                {item.variant_name}
                              </p>
                              {item.variant_name && (
                                <p className="text-sm text-gray-500">
                                  {item.variant_name}
                                </p>
                              )}
                              <div className="flex items-center gap-x-2 mt-1">
                                <span className="text-[#d70019] font-semibold">
                                  {Number(
                                    item.sale_price || item.price
                                  ).toLocaleString("vi-VN")}
                                  đ
                                </span>
                                {item.sale_price &&
                                  item.price !== item.sale_price && (
                                    <span className="line-through text-sm text-gray-400">
                                      {Number(item.price).toLocaleString(
                                        "vi-VN"
                                      )}
                                      đ
                                    </span>
                                  )}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500">Số lượng</p>
                            <p className="font-medium text-gray-900">
                              x{item.quantity}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 bg-gray-50 rounded-lg text-center">
                        <p className="text-sm text-gray-500">
                          Không có thông tin sản phẩm
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Order Footer */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                    <div className="flex flex-col gap-y-1">
                      <p className="text-sm text-gray-600">Thành tiền</p>
                      <p className="text-lg font-bold text-[#d70019]">
                        {Number(order.total_amount).toLocaleString("vi-VN")}đ
                      </p>
                    </div>
                    <div className="flex gap-x-2">
                      {order.status === "delivered" && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle buy again
                          }}
                          className="px-4 py-2 bg-[#d70019] text-white text-sm font-medium rounded-lg hover:bg-[#b8001a] transition-colors"
                        >
                          Mua lại
                        </button>
                      )}
                      {order.status === "shipped" && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle track order
                          }}
                          className="px-4 py-2 bg-white text-[#d70019] text-sm font-medium rounded-lg border border-[#d70019] hover:bg-red-50 transition-colors"
                        >
                          Theo dõi đơn hàng
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/order/${order.id}`);
                        }}
                        className="px-4 py-2 bg-white text-gray-700 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                      >
                        Xem chi tiết
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
