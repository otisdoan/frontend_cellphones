import FooterHome from "../../components/home/FooterHome";
import HeaderHome from "../../components/home/HeaderHome";
import ButtonCellphoneS from "../../components/ButtonCellphoneS";
import { SlEarphonesAlt } from "react-icons/sl";
import { Popover } from "antd";
// import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import CategoryHome from "../../components/home/category/CategoryHome";
import FlashSale from "../../components/home/flash-sale/FlashSale";
import SmartphoneList from "../../components/home/SmartphoneList";
import LaptopList from "../../components/home/LaptopList";
import ScreenList from "../../components/home/ScreenList";
import TabletList from "../../components/home/TabletList";
import SoundList from "../../components/home/SoundList";
import ClockSmartList from "../../components/home/ClockSmartList";
import HouseHoldList from "../../components/home/HouseHoldList";
import TiviList from "../../components/home/TiviList";

const HomePage = () => {
  return (
    <>
      <div className="z-30">
        {/* <BackTop
          className="top-[36rem] right-[10rem] w-[6.4rem] hidden md:block"
          children={
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
          }
        /> */}
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
        <div className="md:px-[10rem] px-4 bg-[#ffffff] flex flex-col gap-y-4">
          <CategoryHome />
          <img
            src="/images/special-b2s-dday2-desk.gif"
            className="rounded-lg w-full h-full object-cover hidden md:block"
          />
          <img
            src="/images/special-b2s-dday2-mb.gif"
            className="rounded-lg w-full h-full object-cover md:hidden"
          />
          <FlashSale />
          <SmartphoneList />
          <LaptopList />
          <ScreenList />
          <TabletList />
          <SoundList />
          <ClockSmartList />
          <HouseHoldList />
          <TiviList />
        </div>
        <FooterHome />
      </div>
    </>
  );
};

export default HomePage;
