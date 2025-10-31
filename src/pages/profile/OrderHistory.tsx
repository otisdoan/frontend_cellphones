import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Order {
  id: string;
  order_number: string;
  created_at: string;
  total_amount: number;
  status: "pending" | "processing" | "delivering" | "completed" | "cancelled";
  items: {
    id: number;
    name: string;
    image: string;
    price: number;
    quantity: number;
  }[];
}

const OrderHistory = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<
    "all" | "pending" | "delivering" | "completed"
  >("all");

  // Mock data - Replace with actual API call
  const [orders] = useState<Order[]>([
    {
      id: "1",
      order_number: "ORD123456",
      created_at: "2024-01-15T10:30:00Z",
      total_amount: 12990000,
      status: "completed",
      items: [
        {
          id: 1,
          name: "iPhone 15 Pro Max 256GB",
          image: "/images/samsung-galaxy-m55-5g-8gb-256gb.webp",
          price: 12990000,
          quantity: 1,
        },
      ],
    },
    {
      id: "2",
      order_number: "ORD123457",
      created_at: "2024-01-20T14:20:00Z",
      total_amount: 8900000,
      status: "delivering",
      items: [
        {
          id: 2,
          name: "Samsung Galaxy S24 Ultra",
          image: "/images/samsung-galaxy-m55-5g-8gb-256gb.webp",
          price: 8900000,
          quantity: 1,
        },
      ],
    },
  ]);

  const getStatusText = (status: Order["status"]) => {
    const statusMap = {
      pending: "Chờ xác nhận",
      processing: "Đang xử lý",
      delivering: "Đang giao hàng",
      completed: "Hoàn thành",
      cancelled: "Đã hủy",
    };
    return statusMap[status];
  };

  const getStatusColor = (status: Order["status"]) => {
    const colorMap = {
      pending: "bg-yellow-100 text-yellow-800",
      processing: "bg-blue-100 text-blue-800",
      delivering: "bg-purple-100 text-purple-800",
      completed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return colorMap[status];
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
      return order.status === "pending" || order.status === "processing";
    if (activeTab === "delivering") return order.status === "delivering";
    if (activeTab === "completed") return order.status === "completed";
    return true;
  });

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
            <div className="text-center py-12">
              <img
                src="/images/chibi2.webp"
                alt="Empty"
                className="w-24 h-28 mx-auto opacity-50"
              />
              <p className="text-gray-500 mt-4">Không có đơn hàng nào</p>
              <button
                onClick={() => navigate("/products")}
                className="mt-4 px-6 py-2 bg-[#d70019] text-white text-sm font-medium rounded-lg hover:bg-[#b8001a] transition-colors"
              >
                Khám phá sản phẩm
              </button>
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
                    {order.items.map((item) => (
                      <div key={item.id} className="flex gap-x-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded border border-gray-200"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 line-clamp-1">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            x{item.quantity}
                          </p>
                          <p className="text-sm font-semibold text-[#d70019]">
                            {item.price.toLocaleString("vi-VN")}đ
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Footer */}
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                    <p className="text-sm text-gray-600">
                      Tổng tiền:{" "}
                      <span className="font-semibold text-[#d70019] text-base">
                        {order.total_amount.toLocaleString("vi-VN")}đ
                      </span>
                    </p>
                    <div className="flex gap-x-2">
                      {order.status === "completed" && (
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
                      {order.status === "delivering" && (
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
