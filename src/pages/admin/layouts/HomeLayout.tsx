import { Outlet } from "react-router-dom";
import FooterHome from "../../../components/home/FooterHome";
import HeaderHome from "../../../components/home/HeaderHome";
import { Popover } from "antd";
import ButtonCellphoneS from "../../../components/ButtonCellphoneS";
import { SlEarphonesAlt } from "react-icons/sl";
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import { useEffect, useState } from "react";

const HomeLayout = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBackTo = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      <div>
        {showBackToTop && (
          <div
            className="top-[36rem] right-[10rem] w-[6.4rem] hidden md:block fixed z-50"
            onClick={handleBackTo}
          >
            <ButtonCellphoneS
              className="bg-black text-white h-[2rem] border-0"
              defaultHoverBg="black"
              children={
                <div className="flex items-center gap-x-1">
                  <span>Lên đầu</span>
                  <MdOutlineKeyboardDoubleArrowUp className="text-[1.2rem]" />
                </div>
              }
            />
          </div>
        )}
        <div className="fixed top-[40rem] right-[10rem] hidden md:block z-30">
          <Popover
            content={
              <div className=" bg-white p-4 rounded-lg">
                <div className="flex items-center gap-x-1 mb-4 cursor-pointer">
                  <img src="/images/icon-cskh-2025.webp" className="w-[2rem]" />
                  <span>Chat với nhân viên</span>
                </div>
                <div className="flex items-center gap-x-1 cursor-pointer">
                  <img src="/images/icon-zalo-2025.webp" className="w-[2rem]" />
                  <span>Liên hệ Zalo</span>
                </div>
              </div>
            }
            trigger="click"
            placement="topRight"
          >
            <ButtonCellphoneS
              className="text-white md:h-[2.5rem]"
              children={
                <div className="md:flex md:items-center md:gap-x-2">
                  <span>Liên hệ</span>
                  <SlEarphonesAlt />
                </div>
              }
            />
          </Popover>
        </div>
        <HeaderHome />
        <div className="px-4 xl:px-32 2xl:px-40 max-w-screen-2xl mx-auto">
          <Outlet />
        </div>
        <FooterHome />
      </div>
    </>
  );
};

export default HomeLayout;
