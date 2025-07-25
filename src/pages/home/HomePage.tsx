import FooterHome from "../../components/home/FooterHome";
import HeaderHome from "../../components/home/HeaderHome";
import ButtonCellphoneS from "../../components/ButtonCellphoneS";
import { SlEarphonesAlt } from "react-icons/sl";
import { BackTop, Popover } from "antd";
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";

const HomePage = () => {
  return (
    <>
      <div>
        <BackTop
          className="top-[37rem] right-[10rem] w-[6.4rem] hidden md:block"
          children={
            <ButtonCellphoneS
              className="bg-black text-white h-[2.5rem] border-0"
              children={
                <div className="flex items-center gap-x-1">
                  <span>Lên đầu</span>
                  <MdOutlineKeyboardDoubleArrowUp className="text-[1.2rem]" />
                </div>
              }
            />
          }
        />
        <div className="fixed top-[40rem] right-[10rem] hidden md:block">
          <Popover
            content={
              <div className="">
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
        <FooterHome />
      </div>
    </>
  );
};

export default HomePage;
