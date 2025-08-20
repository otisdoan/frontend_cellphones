import { useNavigate } from "react-router-dom";
import SvgLogo from "../svg/SvgLogo";
import SvgLogoDesktop from "../svg/SvgLogoDesktop";
import ButtonCellphoneS from "../ButtonCellphoneS";
import { GrMapLocation } from "react-icons/gr";
import { IoIosArrowDown, IoMdSearch } from "react-icons/io";
import ModalCellphoneS from "../../hooks/useModalCellphoneS";
import { useState, type ReactNode } from "react";
import { Badge, Input } from "antd";
import { LuPhone } from "react-icons/lu";
import { FiMapPin, FiShoppingCart, FiTruck } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";

const HeaderCart = ({ totalCart }: { totalCart: number }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openLogin, setOpenLogin] = useState<boolean>(false);

  const list: { icon: ReactNode; title: ReactNode }[] = [
    {
      icon: <LuPhone />,
      title: (
        <p className="text-[0.8rem]">
          <span className="whitespace-nowrap">Gọi mua hàng</span>
          <br />
          <span className="font-bold text-[0.8rem]">1800.2097</span>
        </p>
      ),
    },
    {
      icon: <FiMapPin />,
      title: (
        <p className="text-[0.8rem]">
          <span className="whitespace-nowrap">Cửa hàng</span>
          <br />
          <span className="">gần bạn</span>
        </p>
      ),
    },
    {
      icon: <FiTruck />,
      title: (
        <p className="text-[0.8rem]">
          <span className="whitespace-nowrap">Tra cứu</span>
          <br />
          <span className="whitespace-nowrap">đơn hàng</span>
        </p>
      ),
    },
  ];
  return (
    <>
      <div className="bg-[#d70019] md:px-[8.5rem] px-3 flex items-center gap-x-4 py-1">
        <div className="md:hidden cursor-pointer" onClick={() => navigate("/")}>
          <SvgLogo width="38" height="40" />
        </div>
        <div
          className="hidden md:block cursor-pointer"
          onClick={() => navigate("/")}
        >
          <SvgLogoDesktop />
        </div>
        <ButtonCellphoneS
          className="bg-[#e45464] text-white rounded-[10px] hidden md:block w-[10rem]"
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
          placeholder="Bạn cần tìm gì?"
          prefix={<IoMdSearch className="text-[1.5rem]" />}
          className="py-2 w-[20rem]"
        />
        <ModalCellphoneS
          children={"Le Doan Hieu"}
          open={isOpen}
          onCancel={() => setIsOpen(false)}
        />
        <div className="md:flex gap-x-4 hidden">
          {list.map((item, index) => (
            <div
              className="flex items-center gap-x-4 text-white hover:bg-[#e2484c] p-1 rounded-lg cursor-pointer duration-300"
              key={index}
            >
              <div className="text-[1.7rem]">{item.icon}</div>
              <span className="text-[0.8rem]">{item.title}</span>
            </div>
          ))}
        </div>
        <div className="md:flex  md:items-center md:gap-x-4">
          <div className="md:flex md:items-center md:gap-x-4 md:text-white cursor-pointer hover:bg-[#d02637] p-3 rounded-lg hidden">
            <Badge size="small" count={totalCart}>
              <FiShoppingCart className="text-white text-[1.5rem]" />
            </Badge>
            <p className="md:text-[0.8rem]">
              Giỏ <br />
              hàng
            </p>
          </div>
          <ButtonCellphoneS
            className="bg-[#e45464] py-2"
            children={
              <div className="md:flex flex-col items-center text-white">
                <FaRegUserCircle className="text-[1.5rem] text-white" />
                <p>Hieu</p>
              </div>
            }
            onClick={() => setOpenLogin(true)}
          />
          <ModalCellphoneS
            children={
              <div className="bg-white rounded-lg p-4 flex flex-col items-center w-[20rem]">
                <span className="text-[#d70019] font-medium text-[2rem] text-center">
                  Smember
                </span>
                <img src="/images/chibi2.webp" className="object-contain" />
                <p className="font-bold opacity-80">
                  Vui lòng đăng nhập tài khoản Smember để xem ưu đãi và thanh
                  toán dễ dàng hơn.
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
      </div>
    </>
  );
};

export default HeaderCart;
