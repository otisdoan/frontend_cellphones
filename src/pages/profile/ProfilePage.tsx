import { useState, useEffect, useMemo, type ReactNode } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import {
  FiHome,
  FiShoppingBag,
  FiSearch,
  FiHeart,
  FiGift,
  FiUser,
  FiLogOut,
} from "react-icons/fi";
import { MdOutlineSchool } from "react-icons/md";
import { Avatar, Badge } from "antd";
import SvgLogoDesktop from "../../components/svg/SvgLogoDesktop";
import { FiShoppingCart } from "react-icons/fi";
import { useAppSelector } from "../../redux/app/hook";

interface MenuItem {
  key: string;
  label: string;
  icon: ReactNode;
  path: string;
  badge?: number;
}

const ProfilePage = () => {
  const { user } = useAuthContext()!;
  const navigate = useNavigate();
  const location = useLocation();
  const [activeKey, setActiveKey] = useState("overview");
  const { totalCart } = useAppSelector((state) => state.cart);

  const menuItems: MenuItem[] = useMemo(
    () => [
      {
        key: "overview",
        label: "Tổng quan",
        icon: <FiHome className="text-[1.2rem]" />,
        path: "/profile",
      },
      {
        key: "orders",
        label: "Lịch sử mua hàng",
        icon: <FiShoppingBag className="text-[1.2rem]" />,
        path: "/profile/orders",
      },
      {
        key: "warranty",
        label: "Tra cứu bảo hành",
        icon: <FiSearch className="text-[1.2rem]" />,
        path: "/profile/warranty",
      },
      {
        key: "benefits",
        label: "Hàng thành viên và ưu đãi",
        icon: <FiHeart className="text-[1.2rem]" />,
        path: "/profile/benefits",
      },
      {
        key: "business",
        label: "Ưu đãi S-Business",
        icon: <FiGift className="text-[1.2rem]" />,
        path: "/profile/business",
      },
      {
        key: "student",
        label: "Ưu đãi S-Student/Teacher",
        icon: <MdOutlineSchool className="text-[1.2rem]" />,
        path: "/profile/student",
      },
      {
        key: "referral",
        label: "Giới thiệu bạn bè",
        icon: <FiUser className="text-[1.2rem]" />,
        path: "/profile/referral",
        badge: 0,
      },
      {
        key: "settings",
        label: "Thông tin tài khoản",
        icon: <FiUser className="text-[1.2rem]" />,
        path: "/profile/settings",
      },
      {
        key: "stores",
        label: "Tìm kiếm cửa hàng",
        icon: <FiSearch className="text-[1.2rem]" />,
        path: "/profile/stores",
      },
      {
        key: "terms",
        label: "Điều khoản",
        icon: <FiUser className="text-[1.2rem]" />,
        path: "/profile/terms",
      },
    ],
    []
  );

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    const currentPath = location.pathname;
    const currentItem = menuItems.find((item) => item.path === currentPath);
    if (currentItem) {
      setActiveKey(currentItem.key);
    }
  }, [location.pathname, menuItems]);
  const handleMenuClick = (item: MenuItem) => {
    setActiveKey(item.key);
    navigate(item.path);
  };

  const handleLogout = () => {
    // Clear auth data
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#d70019] sticky top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 md:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div
              className="flex items-center gap-x-3 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <SvgLogoDesktop />
              <div className="hidden md:block">
                <h1 className="text-white text-xl font-bold">Smember</h1>
                <p className="text-white/80 text-xs">Thông tin tài khoản</p>
              </div>
            </div>

            {/* Navigation Icons */}
            <div className="flex items-center gap-x-3">
              {/* Cart Icon with Badge */}
              <div
                onClick={() => navigate("/cart")}
                className="relative cursor-pointer"
              >
                <div className="bg-white/20 hover:bg-white/30 transition-colors rounded-lg p-2 flex items-center justify-center">
                  <Badge
                    count={totalCart}
                    style={{
                      backgroundColor: "#fff",
                      color: "#d70019",
                      fontWeight: "bold",
                      fontSize: "10px",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                    }}
                  >
                    <FiShoppingCart className="text-white text-[1.4rem]" />
                  </Badge>
                </div>
              </div>

              {/* Back to Home - Only visible on desktop */}
              <button
                onClick={() => navigate("/")}
                className="hidden md:flex items-center gap-x-2 bg-white/20 hover:bg-white/30 transition-colors px-4 py-2 rounded-lg text-white text-sm font-medium"
              >
                <span>Về trang chủ</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 md:px-8 lg:flex lg:gap-x-6">
        {/* Sidebar */}
        <div className="lg:w-64 bg-white rounded-lg shadow-sm mb-6 lg:mb-0 lg:sticky lg:top-6 lg:h-fit">
          {/* User Info */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-x-3">
              <Avatar size={48} src={user.avatar_url} className="bg-[#d70019]">
                {user.full_name?.charAt(0).toUpperCase()}
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {user.full_name}
                </p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-x-2">
              <Badge
                count="S-Member"
                style={{ backgroundColor: "#d70019" }}
                className="text-xs"
              />
              <Badge
                count="S-Student"
                style={{ backgroundColor: "#52c41a" }}
                className="text-xs"
              />
            </div>
            <div className="mt-3 text-xs text-gray-600">
              <p>Bạn đang ở kênh thành viên</p>
              <p className="font-medium text-[#d70019] mt-1">
                Ban đang tích lũy: <span className="font-bold">0 điểm</span>
              </p>
              <p className="text-gray-500 mt-1">
                Cần phát sinh đơn hàng S-VIP để tích lũy: 24.210.000đ
              </p>
            </div>
          </div>

          {/* Menu Items */}
          <div className="p-2">
            {menuItems.map((item) => (
              <div
                key={item.key}
                className={`flex items-center gap-x-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${
                  activeKey === item.key
                    ? "bg-red-50 text-[#d70019]"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => handleMenuClick(item)}
              >
                <div
                  className={
                    activeKey === item.key ? "text-[#d70019]" : "text-gray-500"
                  }
                >
                  {item.icon}
                </div>
                <span className="flex-1 text-sm font-medium">{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <Badge
                    count={item.badge}
                    style={{ backgroundColor: "#d70019" }}
                  />
                )}
              </div>
            ))}

            {/* Logout */}
            <div
              className="flex items-center gap-x-3 px-3 py-2.5 rounded-lg cursor-pointer text-gray-700 hover:bg-gray-50 transition-colors mt-2 border-t border-gray-200 pt-4"
              onClick={handleLogout}
            >
              <FiLogOut className="text-[1.2rem] text-gray-500" />
              <span className="flex-1 text-sm font-medium">Đăng xuất</span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
