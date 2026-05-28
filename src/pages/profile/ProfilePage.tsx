/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useMemo, type ReactNode } from "react";
import { useNavigate, Outlet, useLocation, Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import {
  FiHome,
  FiShoppingBag,
  FiSearch,
  FiGift,
  FiUser,
  FiLogOut,
  FiShield,
  FiEye,
  FiEyeOff,
  FiLink,
  FiShoppingCart,
} from "react-icons/fi";
import {
  MdOutlineSchool,
  MdOutlinePhoneInTalk,
  MdOutlineDescription,
  MdOutlineSecurity,
} from "react-icons/md";
import { RiTicketLine } from "react-icons/ri";
import { IoLocationOutline } from "react-icons/io5";
import { BiMessageDetail } from "react-icons/bi";
import { GrMapLocation } from "react-icons/gr";
import { AiOutlineClockCircle, AiOutlineShoppingCart } from "react-icons/ai";
import { Avatar, Badge, Select } from "antd";
import SvgLogoDesktop from "../../components/svg/SvgLogoDesktop";
import { useAppSelector } from "../../redux/app/hook";
import { authApi } from "../../utils/api/auth.api";

interface MenuItem {
  key: string;
  label: string;
  icon: ReactNode;
  path: string;
  badge?: string;
  isNew?: boolean;
}

const ProfilePage = () => {
  const { user } = useAuthContext()!;
  const navigate = useNavigate();
  const location = useLocation();
  const [activeKey, setActiveKey] = useState("overview");
  const [showPhone, setShowPhone] = useState(false);
  const { totalCart } = useAppSelector((state) => state.cart);

  const menuItems: MenuItem[] = useMemo(
    () => [
      {
        key: "overview",
        label: "Tổng quan",
        icon: <FiHome className="text-[1.25rem]" />,
        path: "/profile",
      },
      {
        key: "orders",
        label: "Lịch sử mua hàng",
        icon: <FiShoppingBag className="text-[1.25rem]" />,
        path: "/profile/orders",
      },
      {
        key: "warranty",
        label: "Tra cứu bảo hành",
        icon: <FiSearch className="text-[1.25rem]" />,
        path: "/profile/warranty",
      },
      {
        key: "exchange",
        label: "Lịch sử thu cũ",
        icon: <AiOutlineClockCircle className="text-[1.25rem]" />,
        path: "/profile/warranty",
      },
      {
        key: "business",
        label: "Ưu đãi và đơn hàng S-Business",
        icon: <FiGift className="text-[1.25rem]" />,
        path: "/profile/business",
      },
      {
        key: "student",
        label: "Ưu đãi S-Student và S-Teacher",
        icon: <MdOutlineSchool className="text-[1.25rem]" />,
        path: "/profile/student",
      },
      {
        key: "referral",
        label: "Giới thiệu bạn bè",
        icon: <FiGift className="text-[1.25rem]" />,
        path: "/profile/referral",
        isNew: true,
      },
      {
        key: "settings",
        label: "Thông tin tài khoản",
        icon: <FiUser className="text-[1.25rem]" />,
        path: "/profile/settings",
      },
      {
        key: "stores",
        label: "Tìm kiếm cửa hàng",
        icon: <FiSearch className="text-[1.25rem]" />,
        path: "/profile/stores",
      },
      {
        key: "policy",
        label: "Chính sách bảo hành",
        icon: <MdOutlineSecurity className="text-[1.25rem]" />,
        path: "/profile/terms",
      },
      {
        key: "feedback",
        label: "Góp ý - Phản hồi - Hỗ trợ",
        icon: <BiMessageDetail className="text-[1.25rem]" />,
        path: "/profile/terms",
      },
      {
        key: "terms",
        label: "Điều khoản sử dụng",
        icon: <MdOutlineDescription className="text-[1.25rem]" />,
        path: "/profile/terms",
      },
    ],
    []
  );


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

  const handleLogout = async () => {
    try {
      await authApi.logout();
      window.location.href = "/";
    } catch (error) {
      console.error("Error occurred while logging out:", error);
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#f3f4f6] text-[#292929] antialiased">
      {/* Header */}
      <div className="bg-[#d70019] sticky top-0 left-0 z-50 py-3 shadow-md">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between gap-x-4">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer hover:opacity-90 duration-200"
            onClick={() => navigate("/")}
          >
            <SvgLogoDesktop />
          </div>

          {/* Search Input */}
          <div className="flex-1 max-w-[500px] relative hidden sm:block">
            <input
              type="text"
              placeholder="Bạn muốn mua gì hôm nay?"
              className="w-full py-2 pl-10 pr-4 rounded-lg bg-white border-none text-sm focus:outline-none shadow-inner"
            />
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[1.2rem]" />
          </div>

          {/* Nav Links */}
          <div className="flex items-center gap-x-6 text-white text-xs md:text-sm font-medium">
            <div className="md:flex items-center gap-x-1.5 hidden hover:opacity-85 duration-200 cursor-pointer">
              <GrMapLocation className="text-[1.2rem]" />
              <span>Cửa hàng gần bạn</span>
            </div>
            <div className="md:flex items-center gap-x-1.5 hidden hover:opacity-85 duration-200 cursor-pointer">
              <MdOutlinePhoneInTalk className="text-[1.2rem]" />
              <span>1800 2097</span>
            </div>
            <div
              onClick={() => navigate("/cart")}
              className="flex items-center gap-x-2 bg-white/10 hover:bg-white/20 transition-colors py-1.5 px-3 rounded-lg cursor-pointer"
            >
              <span className="whitespace-nowrap">Giỏ hàng</span>
              <Badge count={totalCart} size="small" offset={[2, -2]}>
                <FiShoppingCart className="text-white text-[1.3rem]" />
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        {/* Smember Card Dashboard */}
        <div className="bg-white rounded-2xl border border-gray-200/60 p-5 shadow-sm flex flex-col xl:flex-row xl:items-stretch gap-y-4 xl:gap-y-0 justify-between">
          {/* Column 1: User details */}
          <div className="flex items-center gap-4 xl:w-[28%] flex-shrink-0">
            <div className="w-[68px] h-[68px] bg-[#fce7f3]/50 border border-[#fce7f3] rounded-full flex items-center justify-center p-1 flex-shrink-0">
              <Avatar
                size={58}
                src="/images/chibi2.webp"
                className="bg-transparent flex-shrink-0"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-bold text-[#1f2937] leading-tight truncate">
                {user.fullName ? user.fullName.toUpperCase() : "LÊ DOÃN HIẾU"}
              </h2>
              <div className="flex items-center gap-x-2 mt-1">
                <span className="text-xs text-gray-500 font-semibold tracking-wider">
                  {showPhone ? user.phone || "0349876354" : "034******54"}
                </span>
                <button
                  onClick={() => setShowPhone(!showPhone)}
                  className="text-gray-400 hover:text-gray-600 transition flex items-center"
                >
                  {showPhone ? <FiEyeOff size={13} /> : <FiEye size={13} />}
                </button>
                <span className="bg-[#dfaa43] text-black font-extrabold text-[10px] px-2 py-0.5 rounded leading-none">
                  S-MEM
                </span>
              </div>
              <p className="text-[10px] text-gray-400 mt-2 flex items-center gap-x-1 font-medium">
                <AiOutlineClockCircle className="text-gray-400" /> Cập nhật lại sau 01/01/2027
              </p>
            </div>
          </div>

          {/* Red Divider 1 */}
          <div className="hidden xl:block w-[2px] bg-[#d70019] mx-4 self-center h-[52px]"></div>

          {/* Column 2: Stats - Order count */}
          <div className="flex-1 flex items-center gap-x-3 pl-0 xl:pl-2 border-l-2 xl:border-l-0 border-[#d70019] min-w-0">
            <div className="w-11 h-11 bg-[#fdf2f2] text-[#d70019] rounded-full flex items-center justify-center flex-shrink-0 font-bold">
              <AiOutlineShoppingCart className="text-[1.4rem]" />
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900 leading-none">5</div>
              <div className="text-xs text-gray-400 font-bold mt-1.5 leading-none">
                Tổng số đơn hàng đã mua
              </div>
            </div>
          </div>

          {/* Red Divider 2 */}
          <div className="hidden xl:block w-[2px] bg-[#d70019] mx-4 self-center h-[52px]"></div>

          {/* Column 3: Stats - Accumulation details */}
          <div className="flex-[1.5] flex flex-col justify-center pl-0 xl:pl-2 border-l-2 xl:border-l-0 border-[#d70019] min-w-0">
            <div className="flex items-center gap-x-3">
              <div className="w-11 h-11 bg-[#fdf2f2] text-[#d70019] rounded-full flex items-center justify-center flex-shrink-0">
                <RiTicketLine className="text-[1.4rem]" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900 leading-none">25.790.000₫</div>
                <div className="text-xs text-gray-400 font-bold mt-1.5 leading-none">
                  Tổng tiền tích lũy <span className="text-gray-300 ml-1">• Từ 01/01/2025</span>
                </div>
              </div>
            </div>
            {/* Upgrade text inside grey background pill */}
            <div className="mt-2.5">
              <div className="bg-[#f3f4f6] text-[10px] text-gray-500 font-semibold px-2 py-1 rounded border border-gray-100 inline-block">
                Cần chi tiêu thêm <span className="text-[#d70019] font-bold">24.210.000₫</span> để lên hạng <span className="font-bold text-gray-800">S-VIP</span>
              </div>
            </div>
          </div>

          {/* Column 4: Brand Channels */}
          <div className="flex items-center gap-3 xl:w-[26%] flex-shrink-0 border-t xl:border-t-0 border-gray-100 pt-4 xl:pt-0 min-w-0">
            {/* Big S Logo square */}
            <div className="w-12 h-12 bg-[#d70019] flex items-center justify-center rounded-xl flex-shrink-0 text-white font-extrabold text-2xl shadow-sm tracking-tighter select-none">
              S
            </div>
            <div className="flex-1 min-w-0 flex flex-col">
              <span className="text-[10px] text-gray-400 font-bold tracking-tight">
                Bạn đang ở kênh thành viên
              </span>
              <div className="mt-1 w-full">
                <Select
                  defaultValue="cellphones"
                  style={{ width: "100%" }}
                  size="small"
                  className="font-bold select-custom-cellphones"
                  options={[{ value: "cellphones", label: "CellphoneS" }]}
                />
              </div>
              <a
                href="https://cellphones.com.vn"
                target="_blank"
                rel="noreferrer"
                className="mt-1.5 bg-[#fdf2f2] hover:bg-[#fde2e2] transition text-[10px] text-[#d70019] font-bold py-1 px-2.5 rounded-lg border border-red-100 flex items-center gap-x-1.5 justify-center w-full"
              >
                <span>cellphones.com.vn</span>
                <FiLink size={10} className="text-[#d70019]" />
              </a>
            </div>
          </div>
        </div>

        {/* Horizontal Navigation Actions bar */}
        <div className="bg-white rounded-2xl border border-gray-200/60 p-4 mt-4 flex items-center justify-start gap-x-6 overflow-x-auto scrollbar-hide shadow-sm select-none w-full">
          <Link
            to="/profile/benefits"
            className="flex items-center gap-x-2.5 hover:bg-gray-50 py-1.5 px-2.5 rounded-xl duration-150 cursor-pointer flex-shrink-0"
          >
            <div className="w-9 h-9 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 flex-shrink-0 border border-indigo-100/50">
              <FiShield className="text-[1.15rem]" />
            </div>
            <div className="text-xs font-bold text-[#292929] leading-tight whitespace-nowrap">
              Hạng thành viên
            </div>
          </Link>

          <Link
            to="/profile/benefits"
            className="flex items-center gap-x-2.5 hover:bg-gray-50 py-1.5 px-2.5 rounded-xl duration-150 cursor-pointer flex-shrink-0"
          >
            <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center text-[#d70019] flex-shrink-0 border border-red-100/50">
              <RiTicketLine className="text-[1.2rem]" />
            </div>
            <div className="text-xs font-bold text-[#292929] leading-tight whitespace-nowrap">
              Mã giảm giá
            </div>
          </Link>

          <Link
            to="/profile/orders"
            className="flex items-center gap-x-2.5 hover:bg-gray-50 py-1.5 px-2.5 rounded-xl duration-150 cursor-pointer flex-shrink-0"
          >
            <div className="w-9 h-9 rounded-full bg-amber-50 flex items-center justify-center text-amber-700 flex-shrink-0 border border-amber-100/50">
              <FiShoppingBag className="text-[1.15rem]" />
            </div>
            <div className="text-xs font-bold text-[#292929] leading-tight whitespace-nowrap">
              Lịch sử mua hàng
            </div>
          </Link>

          <Link
            to="/profile/settings"
            className="flex items-center gap-x-2.5 hover:bg-gray-50 py-1.5 px-2.5 rounded-xl duration-150 cursor-pointer flex-shrink-0"
          >
            <div className="w-9 h-9 rounded-full bg-rose-50 flex items-center justify-center text-[#d70019] flex-shrink-0 border border-rose-100/50">
              <IoLocationOutline className="text-[1.2rem]" />
            </div>
            <div className="text-xs font-bold text-[#292929] leading-tight whitespace-nowrap">
              Sổ địa chỉ
            </div>
          </Link>

          <Link
            to="/profile/student"
            className="flex items-center gap-x-2.5 hover:bg-gray-50 py-1.5 px-2.5 rounded-xl duration-150 cursor-pointer flex-shrink-0"
          >
            <div className="w-9 h-9 rounded-full bg-orange-50 flex items-center justify-center text-orange-600 flex-shrink-0 border border-orange-100/50">
              <MdOutlineSchool className="text-[1.2rem]" />
            </div>
            <div className="text-xs font-bold text-[#292929] leading-tight whitespace-nowrap">
              S-Student & S-Teacher
            </div>
          </Link>

          <Link
            to="/profile/settings"
            className="flex items-center gap-x-2.5 hover:bg-gray-50 py-1.5 px-2.5 rounded-xl duration-150 cursor-pointer flex-shrink-0"
          >
            <div className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 flex-shrink-0 border border-slate-200/50">
              <FiLink className="text-[1.15rem]" />
            </div>
            <div className="text-xs font-bold text-[#292929] leading-tight whitespace-nowrap">
              Liên kết tài khoản
            </div>
          </Link>

          <Link
            to="/profile/referral"
            className="flex items-center gap-x-2.5 hover:bg-gray-50 py-1.5 px-2.5 rounded-xl duration-150 cursor-pointer flex-shrink-0"
          >
            <div className="w-9 h-9 rounded-full bg-pink-50 flex items-center justify-center text-pink-600 flex-shrink-0 border border-pink-100/50">
              <FiGift className="text-[1.15rem]" />
            </div>
            <div className="text-xs font-bold text-[#292929] leading-tight whitespace-nowrap">
              Giới thiệu bạn bè
            </div>
          </Link>
        </div>

        {/* Dashboard Split Body Layout */}
        <div className="lg:flex lg:gap-x-6 mt-6 items-start">
          {/* Left Vertical Sidebar Menu */}
          <div className="lg:w-72 w-full flex-shrink-0 bg-white rounded-2xl border border-gray-100 p-3 shadow-sm mb-6 lg:mb-0 lg:sticky lg:top-24">
            <div className="flex flex-col gap-y-1">
              {menuItems.map((item) => (
                <div
                  key={item.key}
                  className={`flex items-center gap-x-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-150 ${activeKey === item.key
                    ? "bg-red-50 text-[#d70019] font-bold"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium"
                    }`}
                  onClick={() => handleMenuClick(item)}
                >
                  <div
                    className={
                      activeKey === item.key ? "text-[#d70019]" : "text-gray-400"
                    }
                  >
                    {item.icon}
                  </div>
                  <span className="flex-1 text-sm">{item.label}</span>
                  {item.isNew && (
                    <span className="bg-[#d70019] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">
                      Mới
                    </span>
                  )}
                </div>
              ))}

              {/* Logout */}
              <div
                className="flex items-center gap-x-3 px-3 py-2.5 rounded-xl cursor-pointer text-gray-500 hover:bg-gray-50 hover:text-[#d70019] transition-all duration-150 mt-2 border-t border-gray-100 pt-4"
                onClick={handleLogout}
              >
                <FiLogOut className="text-[1.25rem] text-gray-400" />
                <span className="flex-1 text-sm font-semibold">Đăng xuất</span>
              </div>
            </div>

            {/* Premium App Download banner block */}
            <div className="bg-[#f9fafb] rounded-xl p-4 mt-6 border border-gray-200/60 flex flex-col items-center text-center shadow-sm">
              <div className="text-xs font-bold text-[#292929] leading-tight max-w-[200px]">
                Mua sắm dễ dàng - Ưu đãi ngập tràn cùng app CellphoneS
              </div>
              <div className="w-[100px] h-[100px] bg-white rounded-lg border p-1 mt-3.5 flex items-center justify-center shadow-sm">
                <img
                  src="/images/QR_appGeneral.webp"
                  alt="QR Code"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col gap-y-2 mt-3.5 w-full">
                <a
                  href="https://play.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center transition-opacity hover:opacity-85"
                >
                  <img
                    src="/images/downloadANDROID.webp"
                    alt="Google Play"
                    className="h-9 object-contain"
                  />
                </a>
                <a
                  href="https://apps.apple.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center transition-opacity hover:opacity-85"
                >
                  <img
                    src="/images/downloadiOS.webp"
                    alt="App Store"
                    className="h-9 object-contain"
                  />
                </a>
              </div>
            </div>
          </div>

          {/* Right Nested Content Area */}
          <div className="flex-1 min-w-0">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
