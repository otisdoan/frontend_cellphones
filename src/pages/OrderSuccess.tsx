import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const OrderSuccess = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to top khi vào trang
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header - Thành công */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-24 h-24 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-green-600 mb-2">
            ĐẶT HÀNG THÀNH CÔNG
          </h1>
          <p className="text-gray-600">
            Cảm ơn bạn đã tin tưởng và đặt hàng tại CellphoneS
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
              <span className="font-semibold">{orderId || "WN0303747717"}</span>
            </div>

            <div className="flex justify-between py-2">
              <span className="text-gray-600">Số lượng sản phẩm</span>
              <span className="font-semibold">01</span>
            </div>

            <div className="flex justify-between py-2">
              <span className="text-gray-600">Tổng tiền hàng</span>
              <span className="font-semibold">28.990.000đ</span>
            </div>

            <div className="flex justify-between py-2">
              <span className="text-gray-600">Phí vận chuyển</span>
              <span className="font-semibold text-green-600">Miễn phí</span>
            </div>

            <div className="flex justify-between py-2">
              <span className="text-gray-600">Phương thức thanh toán</span>
              <span className="font-semibold">
                Chuyển khoản ngân hàng qua mã QR
              </span>
            </div>

            <div className="flex justify-between py-2 border-t pt-3">
              <span className="text-gray-600">Giảm giá trực tiếp</span>
              <span className="font-semibold text-red-600">- 3.000.000đ</span>
            </div>

            <div className="flex justify-between py-2">
              <span className="text-gray-600">Chiết khấu Smember</span>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
                  S-MEM
                </span>
                <span className="font-semibold text-red-600">- 130.000đ</span>
              </div>
            </div>

            <div className="flex justify-between py-3 border-t mt-3">
              <span className="text-lg font-semibold">Cần thanh toán</span>
              <span className="text-2xl font-bold text-red-600">
                25.860.000đ
              </span>
            </div>
          </div>
        </div>

        {/* Thông tin nhận hàng */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 pb-2 border-b">
            THÔNG TIN NHẬN HÀNG
          </h2>

          <div className="space-y-3">
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Khách hàng</span>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
                  S-MEM
                </span>
                <span className="font-semibold">LÊ DOÃN HIẾU</span>
              </div>
            </div>

            <div className="flex justify-between py-2">
              <span className="text-gray-600">Số điện thoại</span>
              <span className="font-semibold">0344258554</span>
            </div>

            <div className="flex justify-between py-2">
              <span className="text-gray-600">Email</span>
              <span className="font-semibold">ledoanhieu12a6@gmail.com</span>
            </div>

            <div className="flex justify-between py-2">
              <span className="text-gray-600">Nhận hàng tại</span>
              <span className="font-semibold text-right max-w-md">
                8 Quang Trung, Thị trấn Tam Quan, Huyện Hoài Nhơn, Bình Định
              </span>
            </div>

            <div className="flex justify-between py-2">
              <span className="text-gray-600">Người nhận</span>
              <span className="font-semibold">LÊ DOÃN HIẾU - 0344258558</span>
            </div>
          </div>
        </div>

        {/* Danh sách sản phẩm */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 pb-2 border-b">
            DANH SÁCH SẢN PHẨM
          </h2>

          <div className="flex gap-4 items-start p-4 border rounded-lg">
            <img
              src="/images/product-placeholder.webp"
              alt="iPhone 16 Pro"
              className="w-24 h-24 object-contain"
              onError={(e) => {
                e.currentTarget.src =
                  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"%3E%3Crect x="3" y="3" width="18" height="18" rx="2"/%3E%3Ccircle cx="8.5" cy="8.5" r="1.5"/%3E%3Cpath d="M21 15l-5-5L5 21"/%3E%3C/svg%3E';
              }}
            />
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">
                iPhone 16 Pro 128GB | Chính hãng VN/A-Titan Trắng
              </h3>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-red-600">
                  25.860.000đ
                </span>
                <span className="text-gray-400 line-through">28.990.000đ</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-gray-600">
                Số lượng: <span className="font-semibold text-red-600">1</span>
              </p>
            </div>
          </div>
        </div>

        {/* QR Code và Download App */}
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <h3 className="text-lg font-semibold mb-4">
            Tra cứu và theo dõi đơn hàng tiện lợi trên ứng dụng CellphoneS
          </h3>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
              <svg className="w-40 h-40" viewBox="0 0 100 100">
                <rect width="100" height="100" fill="white" />
                <path
                  d="M10,10 h20 v20 h-20 z M40,10 h5 v5 h-5 z M50,10 h5 v5 h-5 z M60,10 h5 v5 h-5 z M70,10 h20 v20 h-20 z"
                  fill="black"
                />
                <path
                  d="M15,15 h10 v10 h-10 z M75,15 h10 v10 h-10 z"
                  fill="white"
                />
                <path
                  d="M10,40 h5 v5 h-5 z M20,40 h5 v5 h-5 z M30,40 h5 v5 h-5 z M40,40 h5 v5 h-5 z M50,40 h5 v5 h-5 z M60,40 h5 v5 h-5 z M70,40 h5 v5 h-5 z M80,40 h5 v5 h-5 z"
                  fill="black"
                />
                <rect
                  x="35"
                  y="35"
                  width="30"
                  height="30"
                  fill="#d32f2f"
                  rx="4"
                />
                <text
                  x="50"
                  y="55"
                  fontSize="20"
                  fontWeight="bold"
                  fill="white"
                  textAnchor="middle"
                >
                  S
                </text>
                <path
                  d="M10,70 h20 v20 h-20 z M40,70 h5 v5 h-5 z M50,70 h5 v5 h-5 z M60,70 h5 v5 h-5 z M70,70 h5 v5 h-5 z M80,70 h5 v5 h-5 z"
                  fill="black"
                />
                <path d="M15,75 h10 v10 h-10 z" fill="white" />
              </svg>
            </div>

            <div className="flex flex-col gap-3">
              <button className="bg-black text-white px-8 py-3 rounded-lg flex items-center gap-3 hover:bg-gray-800 transition">
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                <div className="text-left">
                  <div className="text-xs">Tải về trên</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </button>

              <button className="bg-black text-white px-8 py-3 rounded-lg flex items-center gap-3 hover:bg-gray-800 transition">
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
                <div className="text-left">
                  <div className="text-xs">TẢI NỘI DUNG TRÊN</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={() => navigate("/")}
            className="flex-1 bg-white border-2 border-red-600 text-red-600 py-3 rounded-lg font-semibold hover:bg-red-50 transition"
          >
            Tiếp tục mua hàng
          </button>
          <button
            onClick={() => navigate("/orders")}
            className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
          >
            Xem đơn hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
