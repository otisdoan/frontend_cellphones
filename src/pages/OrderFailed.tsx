import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { XCircle } from "lucide-react";
import { orderApi } from "../utils/api/order.api";
import { message } from "antd";

interface OrderItem {
  id: number;
  product_id: number;
  product_name: string;
  variant_name?: string;
  sku: string;
  price: number;
  sale_price?: number;
  quantity: number;
  total: number;
  image_url?: string;
}

interface OrderData {
  id: number;
  order_number: string;
  total_amount: number;
  subtotal: number;
  shipping_fee: number;
  discount_amount: number;
  payment_method: string;
  payment_status: string;
  status: string;
  guest_email?: string;
  guest_phone?: string;
  items: OrderItem[];
}

const OrderFailed = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const handlePaymentCallback = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const paymentCode = params.get("code");
        const paymentStatus = params.get("status");

        if (orderId) {
          // Update order nếu payment thất bại
          if (paymentCode !== "00" || paymentStatus === "CANCELLED") {
            await orderApi.update(orderId, {
              payment_status: "failed",
              status: "cancelled",
            });
            message.error("Thanh toán không thành công");
          }

          // Fetch order details
          const response = await orderApi.getById(orderId);
          if (response?.data) {
            setOrder(response.data as unknown as OrderData);
          }
        }
      } catch (error) {
        console.error("Error:", error);
        message.error("Có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    };

    handlePaymentCallback();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang xử lý...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header - Thất bại */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 text-center">
          <div className="flex justify-center mb-4">
            <XCircle className="w-24 h-24 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-red-600 mb-2">
            ĐẶT HÀNG KHÔNG THÀNH CÔNG
          </h1>
          <p className="text-gray-600">
            Vui lòng kiểm tra lại thông tin đặt hàng & thanh toán
          </p>
        </div>

        {/* Thông tin đơn hàng */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 pb-2 border-b">
            THÔNG TIN ĐỌN HÀNG
          </h2>

          <div className="space-y-3">
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Mã đơn hàng</span>
              <span className="font-semibold">
                {order?.order_number || orderId}
              </span>
            </div>

            <div className="flex justify-between py-2">
              <span className="text-gray-600">Số lượng sản phẩm</span>
              <span className="font-semibold">{order?.items?.length || 0}</span>
            </div>

            <div className="flex justify-between py-2">
              <span className="text-gray-600">Tổng tiền hàng</span>
              <span className="font-semibold">
                {Number(order?.subtotal || 0).toLocaleString("vi-VN")}đ
              </span>
            </div>

            <div className="flex justify-between py-2">
              <span className="text-gray-600">Phí vận chuyển</span>
              <span className="font-semibold text-green-600">
                {Number(order?.shipping_fee || 0) === 0
                  ? "Miễn phí"
                  : `${Number(order?.shipping_fee).toLocaleString("vi-VN")}đ`}
              </span>
            </div>

            <div className="flex justify-between py-2">
              <span className="text-gray-600">Phương thức thanh toán</span>
              <span className="font-semibold">
                {order?.payment_method === "bank_transfer"
                  ? "Chuyển khoản ngân hàng qua mã QR"
                  : "Thanh toán online"}
              </span>
            </div>

            {Number(order?.discount_amount || 0) > 0 && order && (
              <div className="flex justify-between py-2 border-t pt-3">
                <span className="text-gray-600">Giảm giá</span>
                <span className="font-semibold text-red-600">
                  - {Number(order.discount_amount).toLocaleString("vi-VN")}đ
                </span>
              </div>
            )}

            <div className="flex justify-between py-3 border-t mt-3">
              <span className="text-lg font-semibold text-red-600">
                Tổng cần thanh toán
              </span>
              <span className="text-2xl font-bold text-red-600">
                {Number(order?.total_amount || 0).toLocaleString("vi-VN")}đ
              </span>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
              <p className="text-red-800 font-medium">
                ⚠️ Trạng thái: Thanh toán thất bại
              </p>
              <p className="text-red-600 text-sm mt-1">
                Đơn hàng của bạn chưa được thanh toán thành công. Vui lòng thử
                lại hoặc chọn phương thức thanh toán khác.
              </p>
            </div>
          </div>
        </div>

        {/* Danh sách sản phẩm */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 pb-2 border-b">
            DANH SÁCH SẢN PHẨM
          </h2>

          <div className="space-y-4">
            {order?.items && order.items.length > 0 ? (
              order.items.map((item: OrderItem, index: number) => (
                <div
                  key={index}
                  className="flex gap-4 items-start p-4 border rounded-lg opacity-60"
                >
                  <img
                    src={item.image_url || "/images/product-placeholder.webp"}
                    alt={item.product_name}
                    className="w-24 h-24 object-contain"
                    onError={(e) => {
                      e.currentTarget.src =
                        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"%3E%3Crect x="3" y="3" width="18" height="18" rx="2"/%3E%3Ccircle cx="8.5" cy="8.5" r="1.5"/%3E%3Cpath d="M21 15l-5-5L5 21"/%3E%3C/svg%3E';
                    }}
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">
                      {item.product_name}
                      {item.variant_name && (
                        <span className="text-gray-500 text-sm ml-2">
                          ({item.variant_name})
                        </span>
                      )}
                    </h3>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-red-600">
                        {Number(item.sale_price || item.price).toLocaleString(
                          "vi-VN"
                        )}
                        đ
                      </span>
                      {item.sale_price && item.price > item.sale_price && (
                        <span className="text-gray-400 line-through">
                          {Number(item.price).toLocaleString("vi-VN")}đ
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-600">
                      Số lượng:{" "}
                      <span className="font-semibold text-red-600">
                        {item.quantity}
                      </span>
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-8">
                Không có sản phẩm
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/")}
            className="flex-1 bg-white border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
          >
            Quay lại trang chủ
          </button>
          <button
            onClick={() => {
              if (orderId) {
                navigate(`/cart/payment`);
              }
            }}
            className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
          >
            Thử lại thanh toán
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderFailed;
