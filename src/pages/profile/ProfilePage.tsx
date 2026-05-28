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

  const mobileNavItems = useMemo(
    () => [
      {
        key: "overview",
        label: "Tổng quan",
        icon: <FiHome className="text-[1.35rem]" />,
        path: "/profile",
      },
      {
        key: "orders",
        label: "Lịch sử",
        icon: <FiShoppingBag className="text-[1.35rem]" />,
        path: "/profile/orders",
      },
      {
        key: "benefits",
        label: "Ưu đãi",
        icon: <RiTicketLine className="text-[1.35rem]" />,
        path: "/profile/benefits",
      },
      {
        key: "settings",
        label: "Tài khoản",
        icon: <FiUser className="text-[1.35rem]" />,
        path: "/profile/settings",
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
          {/* Logo & Mobile Link */}
          <div className="flex flex-col items-start cursor-pointer hover:opacity-90 duration-200" onClick={() => navigate("/")}>
            <SvgLogoDesktop />
            <a
              href="https://cellphones.com.vn"
              target="_blank"
              rel="noreferrer"
              className="md:hidden text-[9px] text-white hover:underline flex items-center gap-x-0.5 mt-0.5 opacity-90 font-medium"
            >
              <span>cellphones.com.vn</span>
              <FiLink size={7} />
            </a>
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

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-x-6 text-white text-xs md:text-sm font-medium">
            <div className="flex items-center gap-x-1.5 hover:opacity-85 duration-200 cursor-pointer">
              <GrMapLocation className="text-[1.2rem]" />
              <span>Cửa hàng gần bạn</span>
            </div>
            <div className="flex items-center gap-x-1.5 hover:opacity-85 duration-200 cursor-pointer">
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

          {/* Mobile Channel Selector Dropdown */}
          <div className="flex md:hidden bg-[#b30012] border border-[#ff4d4d]/30 rounded-lg px-2.5 py-0.5 text-white flex-col items-start cursor-pointer select-none">
            <span className="text-[8px] opacity-85 leading-none">Kênh thành viên</span>
            <div className="flex items-center gap-x-0.5 mt-0.5 leading-none">
              <span className="text-[11px] font-bold">CellphoneS</span>
              <span className="text-[7px] ml-0.5">▼</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 pb-20 lg:pb-6">
        {/* Smember Card Dashboard */}
        <div className="bg-white rounded-2xl border border-gray-200/60 p-5 md:p-6 shadow-sm">
          {/* Main row layout */}
          <div className="flex flex-col xl:flex-row xl:items-center gap-y-5 xl:gap-y-0">
            {/* Column 1: User details */}
            <div className="flex items-center gap-x-4 xl:pr-5 xl:w-auto flex-shrink-0">
              <div className="w-[64px] h-[64px] bg-[#fce7f3]/40 border-2 border-[#fce7f3] rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
                <Avatar
                  size={56}
                  src="/images/chibi2.webp"
                  className="bg-transparent"
                />
              </div>
              <div className="min-w-0">
                <h2 className="text-[15px] font-bold text-[#292929] leading-tight tracking-tight">
                  {user.fullName ? user.fullName.toUpperCase() : "LÊ DOÃN HIẾU"}
                </h2>
                <div className="flex items-center gap-x-1.5 mt-1">
                  <span className="text-[13px] text-gray-500 font-medium">
                    {showPhone ? user.phone || "0349876354" : "034******54"}
                  </span>
                  <button
                    onClick={() => setShowPhone(!showPhone)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPhone ? <FiEyeOff size={14} /> : <FiEye size={14} />}
                  </button>
                  <span className="bg-[#dfaa43] text-[#292929] font-extrabold text-[10px] px-2 py-[3px] rounded ml-1">
                    S-MEM
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 mt-2 flex items-center gap-x-1 font-medium">
                  <AiOutlineClockCircle size={12} /> Cập nhật lại sau 01/01/2027
                </p>
              </div>
            </div>

            {/* Red Divider 1 */}
            <div className="hidden xl:block w-[3px] bg-[#d70019] rounded-full self-stretch my-2 mx-5 flex-shrink-0" />

            {/* Stat 1: Order count */}
            <div className="flex items-center gap-x-3 xl:px-4 flex-shrink-0 border-t xl:border-t-0 border-gray-100 pt-4 xl:pt-0">
              <div className="w-10 h-10 bg-[#fdf2f2] text-[#d70019] rounded-full flex items-center justify-center flex-shrink-0">
                <AiOutlineShoppingCart className="text-lg" />
              </div>
              <div>
                <div className="text-[22px] font-extrabold text-[#292929] leading-none">5</div>
                <div className="text-[11px] text-gray-400 font-semibold mt-1 leading-tight whitespace-nowrap">
                  Tổng số đơn hàng đã mua
                </div>
              </div>
            </div>

            {/* Red Divider 2 */}
            <div className="hidden xl:block w-[3px] bg-[#d70019] rounded-full self-stretch my-2 mx-5 flex-shrink-0" />

            {/* Stat 2: Accumulation */}
            <div className="flex-1 min-w-0 border-t xl:border-t-0 border-gray-100 pt-4 xl:pt-0 xl:px-2">
              <div className="flex items-center gap-x-3">
                <div className="w-10 h-10 bg-[#fdf2f2] text-[#d70019] rounded-full flex items-center justify-center flex-shrink-0">
                  <RiTicketLine className="text-lg" />
                </div>
                <div className="min-w-0">
                  <div className="text-[22px] font-extrabold text-[#292929] leading-none">25.790.000₫</div>
                  <div className="text-[11px] text-gray-400 font-semibold mt-1 leading-tight">
                    Tổng tiền tích lũy <span className="text-gray-300 font-normal ml-1">• Từ 01/01/2025</span>
                  </div>
                </div>
              </div>
              <div className="mt-2 ml-[52px]">
                <span className="bg-[#f5f5f5] text-[10px] text-gray-500 font-medium px-2.5 py-1 rounded border border-gray-200/60 inline-block">
                  Cần chi tiêu thêm <span className="text-[#d70019] font-bold">24.210.000₫</span> để lên hạng <span className="font-bold text-[#292929]">S-VIP</span>
                </span>
              </div>
            </div>

            {/* Column 4: Brand Channels */}
            <div className="hidden xl:flex items-center gap-x-3 xl:pl-5 xl:border-l xl:border-gray-100 flex-shrink-0 xl:w-[240px]">
              <div className="w-[48px] h-[48px] bg-[#d70019] flex items-center justify-center rounded-xl flex-shrink-0 text-white font-extrabold text-[22px] shadow select-none">
                S
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] text-gray-400 font-semibold block leading-tight">
                  Bạn đang ở kênh thành viên
                </span>
                <Select
                  defaultValue="cellphones"
                  style={{ width: "100%" }}
                  size="small"
                  className="font-bold select-custom-cellphones mt-1"
                  options={[{ value: "cellphones", label: "CellphoneS" }]}
                />
                <a
                  href="https://cellphones.com.vn"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1.5 bg-[#fdf2f2] hover:bg-[#fde2e2] transition-colors text-[10px] text-[#d70019] font-bold py-1 px-2.5 rounded-lg border border-red-100 flex items-center gap-x-1 justify-center w-full"
                >
                  cellphones.com.vn
                  <FiLink size={10} />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom disclaimer */}
          <div className="hidden xl:flex items-center gap-x-2 mt-4 pt-3 border-t border-gray-100 text-[11px] text-gray-400 font-medium">
            <span>Tổng tiền và số đơn hàng được tính chung từ CellphoneS và Điện Thoại Vui.</span>
          </div>
        </div>

        {/* Mobile Nav Bar: grid 4 cols, icon top + text bottom */}
        <div className="md:hidden bg-white rounded-2xl border border-gray-200/60 p-4 mt-4 shadow-sm select-none">
          <div className="grid grid-cols-4 gap-y-4 gap-x-2">
            <Link to="/profile/benefits" className="flex flex-col items-center justify-start text-center">
              <div className="w-10 h-10 rounded-full bg-indigo-50 border-2 border-indigo-200 flex items-center justify-center text-indigo-500 flex-shrink-0">
                <FiShield className="text-[1.15rem]" />
              </div>
              <span className="text-[10px] font-bold text-[#444] mt-1.5 leading-tight max-w-[70px]">{"Hạng thành viên"}</span>
            </Link>
            <Link to="/profile/benefits" className="flex flex-col items-center justify-start text-center">
              <div className="w-10 h-10 rounded-full bg-red-50 border-2 border-red-200 flex items-center justify-center text-[#d70019] flex-shrink-0">
                <RiTicketLine className="text-[1.15rem]" />
              </div>
              <span className="text-[10px] font-bold text-[#444] mt-1.5 leading-tight max-w-[70px]">{"Mã giảm giá"}</span>
            </Link>
            <Link to="/profile/orders" className="flex flex-col items-center justify-start text-center">
              <div className="w-10 h-10 rounded-full bg-amber-50 border-2 border-amber-200 flex items-center justify-center text-amber-600 flex-shrink-0">
                <FiShoppingBag className="text-[1.15rem]" />
              </div>
              <span className="text-[10px] font-bold text-[#444] mt-1.5 leading-tight max-w-[70px]">{"Lịch sử mua hàng"}</span>
            </Link>
            <Link to="/profile/settings" className="flex flex-col items-center justify-start text-center">
              <div className="w-10 h-10 rounded-full bg-rose-50 border-2 border-rose-200 flex items-center justify-center text-[#d70019] flex-shrink-0">
                <IoLocationOutline className="text-[1.2rem]" />
              </div>
              <span className="text-[10px] font-bold text-[#444] mt-1.5 leading-tight max-w-[70px]">{"Sổ địa chỉ"}</span>
            </Link>
            <Link to="/profile/student" className="flex flex-col items-center justify-start text-center">
              <div className="w-10 h-10 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center text-emerald-500 flex-shrink-0">
                <MdOutlineSchool className="text-[1.2rem]" />
              </div>
              <span className="text-[10px] font-bold text-[#444] mt-1.5 leading-tight max-w-[70px]">{"S-Student & S-Teacher"}</span>
            </Link>
            <Link to="/profile/settings" className="flex flex-col items-center justify-start text-center">
              <div className="w-10 h-10 rounded-full bg-slate-50 border-2 border-slate-200 flex items-center justify-center text-slate-500 flex-shrink-0">
                <FiLink className="text-[1.1rem]" />
              </div>
              <span className="text-[10px] font-bold text-[#444] mt-1.5 leading-tight max-w-[70px]">{"Liên kết tài khoản"}</span>
            </Link>
            <Link to="/profile/referral" className="flex flex-col items-center justify-start text-center">
              <div className="w-10 h-10 rounded-full bg-pink-50 border-2 border-pink-200 flex items-center justify-center text-pink-500 flex-shrink-0">
                <FiGift className="text-[1.1rem]" />
              </div>
              <span className="text-[10px] font-bold text-[#444] mt-1.5 leading-tight max-w-[70px]">{"Giới thiệu bạn bè"}</span>
            </Link>
          </div>
        </div>

        {/* Desktop Nav Bar: horizontal scroll, icon left + text right */}
        <div className="hidden md:block bg-white rounded-2xl border border-gray-200/60 py-4 px-5 mt-4 shadow-sm select-none overflow-x-auto scrollbar-hide">
          <div className="flex items-stretch gap-x-2 min-w-max">
            <Link to="/profile/benefits" className="flex items-center gap-x-2.5 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors group">
              <div className="w-10 h-10 rounded-full bg-indigo-50 border-2 border-indigo-200 flex items-center justify-center text-indigo-500 flex-shrink-0 group-hover:shadow-md transition-shadow">
                <FiShield className="text-[1.15rem]" />
              </div>
              <span className="text-[12px] font-semibold text-[#444] whitespace-nowrap">{"Hạng thành viên"}</span>
            </Link>
            <Link to="/profile/benefits" className="flex items-center gap-x-2.5 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors group">
              <div className="w-10 h-10 rounded-full bg-red-50 border-2 border-red-200 flex items-center justify-center text-[#d70019] flex-shrink-0 group-hover:shadow-md transition-shadow">
                <RiTicketLine className="text-[1.15rem]" />
              </div>
              <span className="text-[12px] font-semibold text-[#444] whitespace-nowrap">{"Mã giảm giá"}</span>
            </Link>
            <Link to="/profile/orders" className="flex items-center gap-x-2.5 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors group">
              <div className="w-10 h-10 rounded-full bg-amber-50 border-2 border-amber-200 flex items-center justify-center text-amber-600 flex-shrink-0 group-hover:shadow-md transition-shadow">
                <FiShoppingBag className="text-[1.15rem]" />
              </div>
              <span className="text-[12px] font-semibold text-[#444] whitespace-nowrap">{"Lịch sử mua hàng"}</span>
            </Link>
            <Link to="/profile/settings" className="flex items-center gap-x-2.5 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors group">
              <div className="w-10 h-10 rounded-full bg-rose-50 border-2 border-rose-200 flex items-center justify-center text-[#d70019] flex-shrink-0 group-hover:shadow-md transition-shadow">
                <IoLocationOutline className="text-[1.2rem]" />
              </div>
              <span className="text-[12px] font-semibold text-[#444] whitespace-nowrap">{"Sổ địa chỉ"}</span>
            </Link>
            <Link to="/profile/student" className="flex items-center gap-x-2.5 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors group">
              <div className="w-10 h-10 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center text-emerald-500 flex-shrink-0 group-hover:shadow-md transition-shadow">
                <MdOutlineSchool className="text-[1.2rem]" />
              </div>
              <span className="text-[12px] font-semibold text-[#444] whitespace-nowrap">{"S-Student & S-Teacher"}</span>
            </Link>
            <Link to="/profile/settings" className="flex items-center gap-x-2.5 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors group">
              <div className="w-10 h-10 rounded-full bg-slate-50 border-2 border-slate-200 flex items-center justify-center text-slate-500 flex-shrink-0 group-hover:shadow-md transition-shadow">
                <FiLink className="text-[1.1rem]" />
              </div>
              <span className="text-[12px] font-semibold text-[#444] whitespace-nowrap">{"Liên kết tài khoản"}</span>
            </Link>
            <Link to="/profile/referral" className="flex items-center gap-x-2.5 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors group">
              <div className="w-10 h-10 rounded-full bg-pink-50 border-2 border-pink-200 flex items-center justify-center text-pink-500 flex-shrink-0 group-hover:shadow-md transition-shadow">
                <FiGift className="text-[1.1rem]" />
              </div>
              <span className="text-[12px] font-semibold text-[#444] whitespace-nowrap">{"Giới thiệu bạn bè"}</span>
            </Link>
          </div>
        </div>

        {/* Dashboard Split Body Layout */}
        <div className="lg:flex lg:gap-x-6 mt-6 items-start">
          {/* Left Vertical Sidebar Menu */}
          <div className="hidden lg:block lg:w-72 w-full flex-shrink-0 bg-white rounded-2xl border border-gray-100 p-3 shadow-sm mb-6 lg:mb-0 lg:sticky lg:top-24">
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

      {/* Mobile Bottom Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200/80 flex items-center justify-around py-2 px-4 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] select-none">
        {mobileNavItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.key}
              to={item.path}
              className={`flex flex-col items-center gap-y-0.5 flex-1 transition ${isActive
                ? "text-[#d70019] font-bold"
                : "text-gray-400 hover:text-gray-600 font-semibold"
                }`}
            >
              <div className="text-[1.35rem]">{item.icon}</div>
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </div>

    </div>
  );
};

export default ProfilePage;
