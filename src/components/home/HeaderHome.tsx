/* eslint-disable react-hooks/exhaustive-deps */
import { TbPointFilled } from "react-icons/tb";
import Marquee from "react-fast-marquee";
import { useEffect, useState, type JSX } from "react";
import { FaTruckFast } from "react-icons/fa6";
import { GoArrowSwitch } from "react-icons/go";
import { AiFillAlert, AiOutlineClockCircle } from "react-icons/ai";
import SvgLogo from "../svg/SvgLogo";
import { Badge, Input } from "antd";
import { IoMdSearch } from "react-icons/io";
import { GrMapLocation } from "react-icons/gr";
import ModalCellphoneS from "../../hooks/useModalCellphoneS";
import ButtonCellphoneS from "../ButtonCellphoneS";
import SpaceCellphoneS from "../SpaceCellphoneS";
import { LuStore } from "react-icons/lu";
import { FiFileText, FiShoppingCart, FiTrash2 } from "react-icons/fi";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { MdOutlinePhoneIphone } from "react-icons/md";
import SvgLogoDesktop from "../svg/SvgLogoDesktop";
import { BiCategory } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/app/hook";
import { fetchCartById } from "../../redux/features/cart/cartSlice";
import { useAuthContext } from "../../context/AuthContext";
import NotificationDropdown from "../modals/NotificationModal";
import { notificationApi } from "../../utils/api/notification.api";

// Mock data for search suggestions dropdown
const trendingSearches = [
  {
    name: "iPhone 17 Series",
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=100&q=80",
  },
  {
    name: "Galaxy S26 Ultra",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=100&q=80",
  },
  {
    name: "MacBook Pro M5 Pro",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100&q=80",
  },
  {
    name: "MacBook Neo",
    image: "https://images.unsplash.com/photo-1496181130204-7552cc145cdb?w=100&q=80",
  },
  {
    name: "OPPO Find X9 Ultra",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=100&q=80",
  },
  {
    name: "iPad Air M4",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=100&q=80",
  },
  {
    name: "Samsung Galaxy Watch8",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&q=80",
  },
  {
    name: "MacBook Air M5",
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=100&q=80",
  },
  {
    name: "iPhone 17e",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100&q=80",
  },
  {
    name: "Quạt cầm tay",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=100&q=80",
  },
];

const searchSuggestions = [
  {
    name: "iPhone",
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=100&q=80",
  },
  {
    name: "iPhone 16 thường cũ",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100&q=80",
  },
  {
    name: "iPad",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=100&q=80",
  },
  {
    name: "iPhone 17 Series",
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=100&q=80",
  },
  {
    name: "iPhone 16",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100&q=80",
  },
];

const suggestedProducts = [
  {
    name: "Apple MacBook Air M1 256GB 2020 | Chính hãng Apple Việt Nam",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=150&q=80",
    salePrice: "15.990.000đ",
    originalPrice: "22.990.000đ",
  },
  {
    name: "iPad Pro 11 inch 2022 M2 Wifi 128GB | Chính hãng Apple Việt Nam",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=150&q=80",
    salePrice: "19.990.000đ",
    originalPrice: "23.990.000đ",
  },
  {
    name: "iPad Gen 10 10.9 inch 2022 Wifi 64GB | Chính hãng Apple Việt Nam",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=150&q=80",
    salePrice: "7.990.000đ",
    originalPrice: "12.990.000đ",
  },
  {
    name: "PC CPS văn phòng Intel i5 Gen 12 - Kèm màn hình",
    image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=150&q=80",
    salePrice: "12.490.000đ",
    originalPrice: "18.990.000đ",
  },
  {
    name: "Laptop Acer Gaming Predator Helios Neo 16 PHN16-71-50H7",
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=150&q=80",
    salePrice: "59.990.000đ",
  },
];

const relatedLinks = [
  "iPhone giá sỉ Sẵn hàng VN A giao nhanh đủ VAT",
  "iPhone Black Friday Siêu sale Black Friday iPhone giá sốc",
];

interface MarqueeProps {
  icon: JSX.Element;
  content: string;
}

const HeaderHome = () => {
  const marquee: MarqueeProps[] = [
    {
      icon: <FaTruckFast />,
      content: "Giao nhanh - Miễn phí cho đơn 300k",
    },
    {
      icon: <GoArrowSwitch />,
      content: "Thu cũ giá ngon - Lên đời tiết kiệm",
    },
    {
      icon: <AiFillAlert />,
      content: "Sản phẩm Chính hãng - Xuất VAT đầy đủ",
    },
  ];
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openLogin, setOpenLogin] = useState<boolean>(false);
  const [openNotification, setOpenNotification] = useState<boolean>(false);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [history, setHistory] = useState<string[]>(["iPhone 17 Series"]);
  const dispatch = useAppDispatch();
  const { user, login } = useAuthContext()!;
  const { totalCart } = useAppSelector((state) => state.cart);

  const handleCart = () => {
    if (login && user?.id) {
      dispatch(fetchCartById(user?.id));
      navigate("/cart");
    } else {
      setOpenLogin(true);
    }
  };

  const fetchUnreadCount = async () => {
    if (user?.id) {
      try {
        const response = await notificationApi.getUnreadCount(user.id);
        setUnreadCount(response.data.count);
      } catch (error) {
        console.error("Error fetching unread count:", error);
      }
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCartById(user?.id));
      fetchUnreadCount();
    }
  }, [user?.id]);

  return (
    <>
      <div className="bg-color md:w-full pb-4 sticky top-0 left-0 z-50">
        <div className="w-full">
          <div className="md:flex md:items-center px-4 xl:px-24 2xl:px-28 max-w-screen-2xl mx-auto">
            <div className="md:w-[60%]">
              <Marquee speed={40}>
                <div className="flex mt-2">
                  {marquee.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-x-2 font-medium text-white text-[0.8rem] mr-1"
                    >
                      <div className="text-[1.2rem]"> {item.icon}</div>
                      {item.content}
                      <TbPointFilled />
                    </div>
                  ))}
                </div>
              </Marquee>
            </div>
            <div className="md:flex md:items-center justify-between md:flex-1 md:mt-2 md:gap-x-2 hidden">
              <SpaceCellphoneS />
              <div className="md:flex md:items-center md:gap-x-2 md:text-white md:text-[0.8rem]">
                <LuStore />
                <p>Cửa hàng gần bạn</p>
              </div>
              <SpaceCellphoneS />
              <div className="md:flex md:items-center md:gap-x-1 md:text-white md:text-[0.8rem]">
                <FiFileText />
                <p>Tra cứu đơn hàng</p>
              </div>
              <SpaceCellphoneS />
              <div className="md:flex md:items-center md:gap-x-1 md:text-white md:text-[0.8rem]">
                <MdOutlinePhoneInTalk />
                <p>1800 2097</p>
              </div>
              <SpaceCellphoneS />
              <div className="md:flex md:items-center md:gap-x-1 md:text-white md:text-[0.8rem]">
                <MdOutlinePhoneIphone />
                <p>Tải ứng dụng</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-x-2 md:gap-x-4 mt-4 px-4 xl:px-32 2xl:px-40 max-w-screen-2xl mx-auto ">
            <div
              className="md:hidden cursor-pointer"
              onClick={() => navigate("/")}
            >
              <SvgLogo width="38" height="40" />
            </div>
            <div
              className="hidden md:block cursor-pointer hover:scale-95 duration-500 transform"
              onClick={() => navigate("/")}
            >
              <SvgLogoDesktop />
            </div>
            <ButtonCellphoneS
              className="bg-[#e45464] text-white rounded-[10px] w-[25%] hidden md:block"
              children={
                <div className="flex items-center gap-x-2">
                  <BiCategory className="text-[1.5rem]" />
                  <p className="text-[0.8rem]">Danh mục</p>
                  <IoIosArrowDown className="text-[1.2rem]" />
                </div>
              }
              onClick={() => setIsOpen(true)}
            />
            <ButtonCellphoneS
              className="bg-[#e45464] text-white rounded-[10px] hidden md:block w-[25%]"
              children={
                <div className="flex items-center gap-x-2">
                  <GrMapLocation className="text-[1.5rem]" />
                  <p className="text-[0.8rem]">Bình Định</p>
                  <IoIosArrowDown className="text-[1.2rem]" />
                </div>
              }
              onClick={() => setIsOpen(true)}
            />
            <div className="relative flex-1 md:min-w-[350px] min-w-[150px]">
              <Input
                placeholder="Bạn muốn mua gì hôm nay?"
                prefix={<IoMdSearch className="text-[1.5rem] text-gray-400" />}
                className="py-2 rounded-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleSearchKeyPress}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                allowClear
              />
              {isFocused && (
                <div
                  className="absolute top-[calc(100%+8px)] left-0 w-[95vw] md:w-[500px] bg-white rounded-xl shadow-2xl border border-gray-100 z-50 text-black text-left p-4 max-h-[85vh] overflow-y-auto"
                  onMouseDown={(e) => e.preventDefault()}
                >
                  {/* Triangle notch */}
                  <div className="before:content-[''] before:absolute before:-top-2 before:left-8 before:w-4 before:h-4 before:bg-white before:rotate-45 before:border-l before:border-t before:border-gray-100" />
                  
                  {searchQuery.trim() === "" ? (
                    /* IMAGE 1: Empty search query showing Search History & Trending */
                    <div className="flex flex-col gap-y-4">
                      {history.length > 0 && (
                        <div>
                          <div className="flex items-center justify-between font-semibold text-[0.95rem] text-gray-900 mb-2">
                            <span className="flex items-center gap-x-2">
                              <AiOutlineClockCircle className="text-gray-500 text-[1.1rem]" />
                              Lịch sử tìm kiếm
                            </span>
                            <span
                              className="text-xs text-gray-500 hover:text-red-500 cursor-pointer flex items-center gap-x-1 font-normal"
                              onClick={() => setHistory([])}
                            >
                              Xoá tất cả <FiTrash2 />
                            </span>
                          </div>
                          <div className="flex flex-col gap-y-1">
                            {history.map((item, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-x-2 text-sm text-gray-600 hover:bg-gray-50 cursor-pointer rounded-lg py-1.5 px-2 duration-150"
                                onClick={() => {
                                  setSearchQuery(item);
                                  navigate(`/search?q=${encodeURIComponent(item)}`);
                                }}
                              >
                                <AiOutlineClockCircle className="text-gray-400" />
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div>
                        <div className="font-semibold text-[0.95rem] text-gray-900 flex items-center gap-x-2 mb-3">
                          <span>🔥 Xu hướng tìm kiếm</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {trendingSearches.map((item, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-x-3 p-2 rounded-xl hover:bg-gray-50 duration-200 cursor-pointer border border-transparent hover:border-gray-100"
                              onClick={() => {
                                setSearchQuery(item.name);
                                if (!history.includes(item.name)) {
                                  setHistory([item.name, ...history].slice(0, 5));
                                }
                                navigate(`/search?q=${encodeURIComponent(item.name)}`);
                              }}
                            >
                              <div className="w-[2.5rem] h-[2.5rem] flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 flex items-center justify-center p-1">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-full object-contain"
                                />
                              </div>
                              <span className="text-sm font-medium text-gray-700 line-clamp-1">
                                {item.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* IMAGE 2: Query not empty showing suggestions, suggested products, and links */
                    <div className="flex flex-col gap-y-4">
                      <div>
                        <div className="font-semibold text-[0.95rem] text-gray-900 bg-[#f8f9fa] p-2 rounded-t-lg flex items-center gap-x-2 border-t border-x border-gray-200">
                          <IoMdSearch className="text-[#d70019] text-[1.1rem]" />
                          <span>Có phải bạn muốn tìm</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 p-3 border-x border-b border-gray-200 rounded-b-lg bg-white">
                          {searchSuggestions
                            .filter((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase()))
                            .map((item, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-x-3 p-1.5 rounded-lg hover:bg-gray-50 duration-150 cursor-pointer"
                                onClick={() => {
                                  setSearchQuery(item.name);
                                  if (!history.includes(item.name)) {
                                    setHistory([item.name, ...history].slice(0, 5));
                                  }
                                  navigate(`/search?q=${encodeURIComponent(item.name)}`);
                                }}
                              >
                                <div className="w-8 h-8 flex-shrink-0 bg-gray-50 rounded border flex items-center justify-center p-0.5">
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-contain"
                                  />
                                </div>
                                <span className="text-sm text-gray-700 line-clamp-1 font-medium">
                                  {item.name}
                                </span>
                              </div>
                            ))}
                          {searchSuggestions.filter((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                            <div className="col-span-2 text-sm text-gray-500 text-center py-2">
                              Bấm Enter để tìm kiếm "{searchQuery}"
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <div className="font-semibold text-[0.95rem] text-gray-900 bg-[#f8f9fa] p-2 rounded-t-lg flex items-center gap-x-2 border-t border-x border-gray-200">
                          <span>🔥 Sản phẩm gợi ý</span>
                        </div>
                        <div className="flex flex-col border-x border-b border-gray-200 rounded-b-lg overflow-hidden bg-white">
                          {suggestedProducts
                            .filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
                            .map((item, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-x-4 p-3 border-b last:border-b-0 hover:bg-gray-50 duration-200 cursor-pointer"
                                onClick={() => {
                                  navigate(`/search?q=${encodeURIComponent(item.name)}`);
                                }}
                              >
                                <div className="w-[3.5rem] h-[3.5rem] flex-shrink-0 bg-white rounded border flex items-center justify-center p-1">
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-contain"
                                  />
                                </div>
                                <div className="flex-1 flex flex-col justify-center">
                                  <span className="text-sm font-medium text-gray-800 line-clamp-2 leading-tight mb-1 hover:text-red-500">
                                    {item.name}
                                  </span>
                                  <div className="flex items-baseline">
                                    <span className="text-red-600 text-sm font-bold">
                                      {item.salePrice}
                                    </span>
                                    {item.originalPrice && (
                                      <span className="text-gray-400 text-xs line-through ml-2">
                                        {item.originalPrice}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          {suggestedProducts.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                            <div className="text-sm text-gray-500 text-center py-4">
                              Không tìm thấy sản phẩm gợi ý phù hợp
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <div className="font-semibold text-[0.95rem] text-gray-900 bg-[#f8f9fa] p-2 rounded-t-lg flex items-center gap-x-2 border-t border-x border-gray-200">
                          <FiFileText className="text-[#d70019] text-[1.1rem]" />
                          <span>Thông tin liên quan</span>
                        </div>
                        <div className="p-3 border-x border-b border-gray-200 rounded-b-lg bg-white flex flex-col gap-y-2.5">
                          {relatedLinks.map((link, idx) => (
                            <div
                              key={idx}
                              className="text-sm text-[#0066cc] hover:text-red-500 hover:underline cursor-pointer font-medium"
                              onClick={() => {
                                setSearchQuery(link);
                                navigate(`/search?q=${encodeURIComponent(link)}`);
                              }}
                            >
                              {link}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="hidden md:block">
              <div className="md:flex items-center md:gap-x-4">
                <div
                  className="md:flex md:items-center md:gap-x-2 md:text-white cursor-pointer hover:bg-[#d02637] p-3 rounded-lg"
                  onClick={handleCart}
                >
                  <p className="whitespace-nowrap md:text-[0.9rem]">Giỏ hàng</p>
                  <Badge size="small" count={totalCart}>
                    <FiShoppingCart className="text-white text-[1.5rem]" />
                  </Badge>
                </div>
                {login ? (
                  <NotificationDropdown
                    open={openNotification}
                    onClose={() => {
                      setOpenNotification(false);
                      fetchUnreadCount();
                    }}
                  >
                    <div className="relative">
                      <ButtonCellphoneS
                        className="bg-[#e45464] cursor-pointer relative"
                        children={
                          <div className="md:flex md:items-center md:gap-x-2 text-white">
                            <p>{user?.fullName}</p>
                            <FaRegUserCircle className="text-[1.5rem] text-white" />
                            {unreadCount > 0 && (
                              <Badge
                                count={unreadCount}
                                size="small"
                                className="absolute -top-1 -right-1"
                              />
                            )}
                          </div>
                        }
                        onClick={() => setOpenNotification(true)}
                      />
                    </div>
                  </NotificationDropdown>
                ) : (
                  <ButtonCellphoneS
                    className="bg-[#e45464]"
                    children={
                      <div className="md:flex md:items-center md:gap-x-2 text-white">
                        <p>Đăng nhập</p>
                        <FaRegUserCircle className="text-[1.5rem] text-white" />
                      </div>
                    }
                    onClick={() => setOpenLogin(true)}
                  />
                )}
              </div>
            </div>
            <ButtonCellphoneS
              className="bg-[#e45464] text-white rounded-[10px] w-[10rem] md:hidden"
              children={
                <div className="flex items-center gap-x-2">
                  <GrMapLocation className="text-[1.5rem]" />
                  <p className="text-[0.8rem]">
                    Xem giá tại
                    <br />
                    Bình Định
                  </p>
                </div>
              }
              onClick={() => setIsOpen(true)}
            />
            <ModalCellphoneS
              children={"Le Doan Hieu"}
              open={isOpen}
              onCancel={() => setIsOpen(false)}
            />
            {/* Mobile - Cart Icon */}
            {login ? (
              <div
                className="md:hidden cursor-pointer relative flex items-center"
                onClick={handleCart}
              >
                <Badge size="small" count={totalCart} offset={[-5, 5]}>
                  <div className="bg-[#e45464] p-3 h-[3rem] rounded-lg">
                    <FiShoppingCart className="text-white text-[1.5rem]" />
                  </div>
                </Badge>
              </div>
            ) : (
              <div
                className="md:hidden cursor-pointer"
                onClick={() => setOpenLogin(true)}
              >
                <FiShoppingCart className="text-[1.5rem] text-white" />
              </div>
            )}
          </div>
        </div>
        <ModalCellphoneS
          children={
            <div className="bg-white rounded-lg p-4 flex flex-col items-center w-[20rem]">
              <span className="text-[#d70019] font-medium text-[2rem] text-center">
                Smember
              </span>
              <img src="/images/chibi2.webp" className="object-contain" />
              <p className="font-bold opacity-80">
                Vui lòng đăng nhập tài khoản Smember để xem ưu đãi và thanh toán
                dễ dàng hơn.
              </p>
              <div className="flex gap-x-4 mt-4">
                <ButtonCellphoneS
                  children="Đăng ký"
                  className="bg-white w-[10rem]"
                  defaultHoverBg="white"
                  onClick={() => navigate("/register")}
                />
                <ButtonCellphoneS
                  children="Đăng nhập"
                  className="text-white w-[10rem]"
                  onClick={() => navigate("/login")}
                />
              </div>
            </div>
          }
          open={openLogin}
          onCancel={() => setOpenLogin(false)}
          className="flex justify-center top-1/4"
        />
      </div>
    </>
  );
};

export default HeaderHome;
