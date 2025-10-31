import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ProfileOverview = () => {
  const { user } = useAuthContext()!;
  const navigate = useNavigate();
  const [stats] = useState({
    orders: 4,
    amount: 25790000,
    points: 0,
  });

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Xin chào, {user?.full_name}!
        </h2>
        <p className="text-gray-600">
          Chào mừng bạn đến với trang quản lý tài khoản Smember.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-x-3">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-[#d70019]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.orders}</p>
              <p className="text-sm text-gray-600">Tổng số đơn hàng đã mua</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {stats.amount.toLocaleString("vi-VN")}đ
              </p>
              <p className="text-sm text-gray-600">Tổng tiền tích lũy</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-x-3">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.points}</p>
              <p className="text-sm text-gray-600">Điểm thưởng</p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Info */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Ưu đãi của bạn
        </h3>
        <div className="space-y-2">
          <div className="flex items-center gap-x-2">
            <svg
              className="w-5 h-5 text-[#d70019]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm text-gray-700">
              Đăng ký Tân sinh viên để nhận mã giảm giá đến 10%
            </p>
          </div>
          <div className="flex items-center gap-x-2">
            <svg
              className="w-5 h-5 text-[#d70019]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm text-gray-700">
              Đăng ký S-Business để nhận ưu đãi đặc quyền
            </p>
          </div>
          <div className="flex items-center gap-x-2">
            <svg
              className="w-5 h-5 text-[#d70019]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm text-gray-700">
              Thêm địa chỉ để đặt đơn hàng nhanh hơn
            </p>
          </div>
        </div>
        <div className="mt-4 flex gap-x-3">
          <button
            onClick={() => navigate("/profile/student")}
            className="px-4 py-2 bg-[#d70019] text-white text-sm font-medium rounded-lg hover:bg-[#b8001a] transition-colors"
          >
            Đăng ký ngay
          </button>
          <button
            onClick={() => navigate("/profile/business")}
            className="px-4 py-2 bg-white text-[#d70019] text-sm font-medium rounded-lg border border-[#d70019] hover:bg-red-50 transition-colors"
          >
            Thêm địa chỉ
          </button>
        </div>
      </div>

      {/* Favorite Products Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Sản phẩm yêu thích
          </h3>
          <button
            onClick={() => navigate("/products")}
            className="text-[#d70019] text-sm font-medium hover:underline"
          >
            Xem sản phẩm
          </button>
        </div>
        <div className="text-center py-8">
          <img
            src="/images/chibi2.webp"
            alt="Empty"
            className="w-24 h-28 mx-auto opacity-50"
          />
          <p className="text-gray-500 mt-4">
            Bạn chưa có ưu đãi nào. Xem sản phẩm!
          </p>
          <button
            onClick={() => navigate("/products")}
            className="mt-4 px-6 py-2 bg-[#d70019] text-white text-sm font-medium rounded-lg hover:bg-[#b8001a] transition-colors"
          >
            Xem sản phẩm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;
