/* eslint-disable react-hooks/exhaustive-deps */
import { TbPointFilled } from "react-icons/tb";
import Marquee from "react-fast-marquee";
import { useEffect, useState, type JSX } from "react";
import { FaTruckFast } from "react-icons/fa6";
import { GoArrowSwitch } from "react-icons/go";
import { AiFillAlert } from "react-icons/ai";
import SvgLogo from "../svg/SvgLogo";
import { Badge, Input } from "antd";
import { IoMdSearch } from "react-icons/io";
import { GrMapLocation } from "react-icons/gr";
import ModalCellphoneS from "../../hooks/useModalCellphoneS";
import ButtonCellphoneS from "../ButtonCellphoneS";
import { GoBell } from "react-icons/go";
import SpaceCellphoneS from "../SpaceCellphoneS";
import { LuStore } from "react-icons/lu";
import { FiFileText } from "react-icons/fi";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { MdOutlinePhoneIphone } from "react-icons/md";
import SvgLogoDesktop from "../svg/SvgLogoDesktop";
import { BiCategory } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/app/hook";
import { fetchCartById } from "../../redux/features/cart/cartSlice";
import { useAuthContext } from "../../context/AuthContext";

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

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCartById(user?.id));
    }
  }, [user?.id]);
  return (
    <>
      <div className="bg-color md:w-full pb-4 sticky top-0 left-0 z-50">
        <div className="w-full">
          <div className=" md:flex md:items-center md:px-[2rem]">
            <div className="md:w-[60%]">
              <Marquee speed={40}>
                <div className="flex mt-2">
                  {marquee.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-x-2 font-medium text-white text-[0.8rem] mr-2"
                    >
                      <div className="text-[1.2rem]"> {item.icon}</div>
                      {item.content}
                      <TbPointFilled />
                    </div>
                  ))}
                </div>
              </Marquee>
            </div>
            <div className="md:flex md:items-center md:flex-1 md:mt-2 md:gap-x-4 hidden">
              <SpaceCellphoneS />
              <div className="md:flex md:items-center md:gap-x-2 md:text-white md:text-[0.8rem]">
                <LuStore />
                <p>Cửa hàng gần bạn</p>
              </div>
              <SpaceCellphoneS />
              <div className="md:flex md:items-center md:gap-x-2 md:text-white md:text-[0.8rem]">
                <FiFileText />
                <p>Tra cứu đơn hàng</p>
              </div>
              <SpaceCellphoneS />
              <div className="md:flex md:items-center md:gap-x-2 md:text-white md:text-[0.8rem]">
                <MdOutlinePhoneInTalk />
                <p>1800 2097</p>
              </div>
              <SpaceCellphoneS />
              <div className="md:flex md:items-center md:gap-x-2 md:text-white md:text-[0.8rem]">
                <MdOutlinePhoneIphone />
                <p>Tải ứng dụng</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-x-2 md:gap-x-4 mt-4 px-3 md:px-[8.5rem]">
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
            <Input
              placeholder="Bạn muốn mua gì hôm nay?"
              prefix={<IoMdSearch className="text-[1.5rem]" />}
              className="py-2"
            />
            <div className="hidden md:block">
              <div className="md:flex md:items-center md:gap-x-4">
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
                  <ButtonCellphoneS
                    className="bg-[#e45464]"
                    children={
                      <div className="md:flex md:items-center md:gap-x-2 text-white">
                        <p>{user?.full_name}</p>
                        <FaRegUserCircle className="text-[1.5rem] text-white" />
                      </div>
                    }
                  />
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
            <Badge size="small" count={5} className="md:hidden">
              <GoBell className="text-[1.4rem] text-white" />
            </Badge>
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
