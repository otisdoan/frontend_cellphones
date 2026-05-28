import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FiInfo, FiX, FiChevronRight, FiHeart } from "react-icons/fi";

const ProfileOverview = () => {
  const authContext = useAuthContext();
  const navigate = useNavigate();
  const [showBanner1, setShowBanner1] = useState(true);
  const [showBanner2, setShowBanner2] = useState(true);

  // Mock data matching the design images
  const [recentOrders] = useState([
    {
      id: 1,
      orderNumber: "WN0303783572",
      date: "03/11/2025",
      status: "Đã hủy",
      title: "iPhone 15 256GB | Chính hãng VN/A - Đen",
      price: 22990000,
      total: 20786000,
      image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=200&q=80",
    },
    {
      id: 2,
      orderNumber: "WN0303747717",
      date: "24/10/2025",
      status: "Đã hủy",
      title: "iPhone 16 Pro 128GB | Chính hãng VN/A - Titan Trắng",
      price: 28990000,
      total: 25860000,
      image: "https://images.unsplash.com/photo-1726853744319-ef8a1de2a3d9?w=200&q=80",
    },
    {
      id: 3,
      orderNumber: "WN0303724155",
      date: "17/10/2025",
      status: "Đã hủy",
      title: "OPPO Reno12 F 5G - Cam",
      price: 9490000,
      total: 6490000,
      image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=200&q=80",
    },
  ]);

  const [favorites] = useState([
    {
      id: 1,
      name: "Samsung Galaxy S25 Ultra 12GB 256GB",
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=200&q=80",
      salePrice: 26990000,
      originalPrice: 33380000,
    },
    {
      id: 2,
      name: "Nothing Phone 2A Plus 5G 12GB 256GB",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&q=80",
      salePrice: 8290000,
      originalPrice: 11490000,
    },
    {
      id: 3,
      name: "iPhone 13 256GB | Chính hãng VN/A",
      image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=200&q=80",
      salePrice: 14990000,
      originalPrice: 20290000,
    },
  ]);

  const [banners] = useState([
    {
      id: 1,
      title: "Say Hi! S-Student & S-Teacher",
      subtitle: "Đón hạng thành viên mới - Ưu đãi giảm thêm đến 10% lên đến 5 triệu",
      bgClass: "from-teal-400 to-emerald-500",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&q=80",
    },
    {
      id: 2,
      title: "ĐẶC QUYỀN ONLINE",
      subtitle: "Ưu đãi đến 50% - Giao hàng nhanh 2h, trả góp 0%",
      bgClass: "from-purple-600 to-indigo-700",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80",
    },
    {
      id: 3,
      title: "Tặng Ngay Voucher 10%",
      subtitle: "Khi mua Điện thoại - Laptop, trị giá lên đến 1 triệu",
      bgClass: "from-red-500 to-orange-500",
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&q=80",
    },
  ]);

  if (!authContext || authContext.loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
        <p className="text-gray-500 font-medium">Đang tải thông tin tổng quan...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Blue Alert Banners */}
      {showBanner1 && (
        <div className="bg-[#ebf5ff] border border-[#d2e9ff] rounded-2xl p-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-x-3 text-sm text-[#0066cc] font-semibold">
            <FiInfo className="text-[1.2rem] flex-shrink-0" />
            <span>Đăng ký S-Business để nhận ưu đãi đặc quyền!</span>
          </div>
          <div className="flex items-center gap-x-4">
            <button
              onClick={() => navigate("/profile/business")}
              className="text-sm font-bold text-[#0066cc] hover:underline"
            >
              Đăng ký ngay
            </button>
            <button
              onClick={() => setShowBanner1(false)}
              className="text-[#0066cc] hover:text-[#004fa3] transition"
            >
              <FiX size={16} />
            </button>
          </div>
        </div>
      )}

      {showBanner2 && (
        <div className="bg-[#ebf5ff] border border-[#d2e9ff] rounded-2xl p-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-x-3 text-sm text-[#0066cc] font-semibold">
            <FiInfo className="text-[1.2rem] flex-shrink-0" />
            <span>Thêm địa chỉ để đặt đơn hàng nhanh hơn.</span>
          </div>
          <div className="flex items-center gap-x-4">
            <button
              onClick={() => navigate("/profile/settings")}
              className="text-sm font-bold text-[#0066cc] hover:underline"
            >
              Thêm địa chỉ
            </button>
            <button
              onClick={() => setShowBanner2(false)}
              className="text-[#0066cc] hover:text-[#004fa3] transition"
            >
              <FiX size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Main Double Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left wider column: Đơn hàng gần đây */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-gray-900">
              Đơn hàng gần đây
            </h3>
            <button
              onClick={() => navigate("/profile/orders")}
              className="text-xs text-[#0066cc] hover:underline font-bold flex items-center"
            >
              Xem tất cả <FiChevronRight />
            </button>
          </div>

          <div className="flex flex-col gap-y-3">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="border border-gray-100 rounded-xl p-4 bg-white flex flex-col gap-y-3 relative hover:shadow-sm duration-200"
              >
                {/* Order Item Header */}
                <div className="flex items-center justify-between text-xs pb-2 border-b border-gray-50">
                  <div className="flex flex-wrap gap-x-2">
                    <span className="font-semibold text-gray-800">
                      Đơn hàng: <span className="text-[#292929]">#{order.orderNumber}</span>
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="text-gray-400 font-medium">
                      Ngày đặt hàng: {order.date}
                    </span>
                  </div>
                  <span className="bg-red-50 text-[#d70119] font-bold px-2 py-0.5 rounded text-[10px]">
                    {order.status}
                  </span>
                </div>

                {/* Order Item Body */}
                <div className="flex items-center gap-x-4">
                  <div className="w-[4.5rem] h-[4.5rem] flex-shrink-0 bg-gray-50 border rounded-lg overflow-hidden flex items-center justify-center p-1.5">
                    <img
                      src={order.image}
                      alt={order.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-gray-800 line-clamp-2 leading-snug">
                      {order.title}
                    </h4>
                    <p className="text-[10px] text-gray-400 mt-1 font-medium">
                      {order.price.toLocaleString("vi-VN")}₫
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0 flex flex-col justify-center items-end">
                    <div className="text-[10px] text-gray-400 font-medium leading-none">
                      Tổng thanh toán:
                    </div>
                    <div className="text-sm font-bold text-[#d70119] mt-1 leading-none">
                      {order.total.toLocaleString("vi-VN")}₫
                    </div>
                    <button
                      onClick={() => navigate(`/profile/orders`)}
                      className="text-[10px] text-[#0066cc] font-bold hover:underline mt-2 flex items-center leading-none"
                    >
                      Xem chi tiết <FiChevronRight />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right narrower column: Ưu đãi của bạn */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex flex-col justify-start h-full">
          <h3 className="text-base font-bold text-gray-900 mb-4">
            Ưu đãi của bạn
          </h3>
          <div className="flex flex-col items-center text-center py-6 my-auto">
            <div className="relative w-24 h-24 flex items-center justify-center">
              {/* Visual empty benefits illustration overlay */}
              <div className="absolute w-20 h-20 bg-red-50 rounded-full blur-md opacity-70" />
              <img
                src="/images/chibi2.webp"
                alt="rabbit chibi placeholder"
                className="w-16 h-20 object-contain relative z-10 animate-bounce duration-1000"
              />
            </div>
            <p className="text-xs font-semibold text-gray-500 mt-4 leading-relaxed">
              Bạn chưa có ưu đãi nào.{" "}
              <span
                onClick={() => navigate("/")}
                className="text-[#d70019] font-bold hover:underline cursor-pointer ml-1"
              >
                Xem sản phẩm
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Sản phẩm yêu thích (Favorite Products) */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm mt-4">
        <h3 className="text-base font-bold text-gray-900 mb-4">
          Sản phẩm yêu thích
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {favorites.map((product) => (
            <div
              key={product.id}
              className="border border-gray-100 rounded-2xl p-4 bg-white hover:shadow-md transition duration-200 relative flex gap-x-4 items-center"
            >
              <div className="w-[4.5rem] h-[4.5rem] flex-shrink-0 bg-white rounded-lg flex items-center justify-center p-1 border">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1 min-w-0 pr-6">
                <h4 className="text-xs font-bold text-gray-800 line-clamp-2 leading-snug">
                  {product.name}
                </h4>
                <div className="mt-2 flex flex-col">
                  <span className="text-sm font-bold text-[#d70019] leading-none">
                    {product.salePrice.toLocaleString("vi-VN")}₫
                  </span>
                  <span className="text-[10px] text-gray-400 line-through mt-1 leading-none">
                    {product.originalPrice.toLocaleString("vi-VN")}₫
                  </span>
                </div>
              </div>
              <div className="absolute bottom-4 right-4 text-[#0066cc] cursor-pointer hover:scale-115 duration-150">
                <FiHeart className="text-[1.3rem] fill-[#0066cc]" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chương trình nổi bật (Featured Programs) */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm mt-4">
        <h3 className="text-base font-bold text-gray-900 mb-4">
          Chương trình nổi bật
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="rounded-2xl overflow-hidden hover:shadow-md transition duration-200 border border-gray-100 flex flex-col bg-white"
            >
              <div className="h-36 overflow-hidden relative">
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold text-gray-800 line-clamp-1 uppercase tracking-wider">
                    {banner.title}
                  </h4>
                  <p className="text-[11px] text-gray-500 mt-1 leading-normal font-medium">
                    {banner.subtitle}
                  </p>
                </div>
                <button className="text-[10px] font-bold text-[#d70019] hover:underline mt-4 text-left self-start">
                  Xem chi tiết &gt;
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Indicators dot bar */}
        <div className="flex items-center justify-center gap-x-2 mt-5">
          <span className="w-4 h-1 bg-[#d70019] rounded-full" />
          <span className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
          <span className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;
