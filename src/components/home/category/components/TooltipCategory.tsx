import type { ReactNode } from "react";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { IoIosLaptop } from "react-icons/io";
import { GiHeadphones } from "react-icons/gi";
import { MdOutlineCameraAlt } from "react-icons/md";
import { LuStore } from "react-icons/lu";
import { BsUsbDrive } from "react-icons/bs";
import { GiPc } from "react-icons/gi";
import { CgScreen } from "react-icons/cg";
import { BsPhoneFlip } from "react-icons/bs";
import { BsPhoneVibrate } from "react-icons/bs";
import { MdCrisisAlert } from "react-icons/md";
import { IoNewspaperOutline } from "react-icons/io5";
import type { TooltipPropsWithTitle } from "antd/es/tooltip";
import { MdArrowForwardIos } from "react-icons/md";
import ContentTooltipSamrtphone from "./contents/ContentTooltipSamrtphone";
import { Popover } from "antd";
import ContentPopoverLaptop from "./contents/ContentPopoverLaptop";
import ContentPopoverSound from "./contents/ContentPopoverSound";
import ContentPopoverClock from "./contents/ContentPopoverClock";
import ContentPopoverHouse from "./contents/ContentPopoverHouse";
import ContentPopoverDevice from "./contents/ContentPopoverDevice";
import ContentPopoverPC from "./contents/ContentPopoverPC";
import ContentPopoverTivi from "./contents/ContentPopoverTivi";
import ContentPopoverNew from "./contents/ContentPopoverNew";
import ContentPopoverOld from "./contents/ContentPopoverOld";
import ContentPopoverSale from "./contents/ContentPopoverSale";
import ContentPopoverInfoTech from "./contents/ContentPopoverInfoTech";

const TooltipCategory = () => {
  const listcCategory: {
    icon: ReactNode;
    name: string;
    content: TooltipPropsWithTitle["title"];
  }[] = [
    {
      icon: <IoPhonePortraitOutline />,
      name: "Điện thoại, Tablet",
      content: <ContentTooltipSamrtphone />,
    },
    {
      icon: <IoIosLaptop />,
      name: "Laptop",
      content: <ContentPopoverLaptop />,
    },
    {
      icon: <GiHeadphones />,
      name: "Âm thanh, Mic thu âm",
      content: <ContentPopoverSound />,
    },
    {
      icon: <MdOutlineCameraAlt />,
      name: "Đồng hồ, Camera",
      content: <ContentPopoverClock />,
    },
    {
      icon: <LuStore />,
      name: "Đồ gia dụng",
      content: <ContentPopoverHouse />,
    },
    {
      icon: <BsUsbDrive />,
      name: "Phụ kiện",
      content: <ContentPopoverDevice />,
    },
    {
      icon: <GiPc />,
      name: "PC, Màn hình, Máy in",
      content: <ContentPopoverPC />,
    },
    {
      icon: <CgScreen />,
      name: "Tivi",
      content: <ContentPopoverTivi />,
    },
    {
      icon: <BsPhoneFlip />,
      name: "Thu cũ đổi mới",
      content: <ContentPopoverNew />,
    },
    {
      icon: <BsPhoneVibrate />,
      name: "Hàng cũ",
      content: <ContentPopoverOld />,
    },
    {
      icon: <MdCrisisAlert />,
      name: "Khuyến mãi",
      content: <ContentPopoverSale />,
    },
    {
      icon: <IoNewspaperOutline />,
      name: "Tin công nghệ",
      content: <ContentPopoverInfoTech />,
    },
  ];
  return (
    <>
      <div className="p-4 md:flex flex-col gap-y-2 shadow-lg rounded-lg cursor-pointer h-full hidden">
        {listcCategory.map((item, index) => (
          <Popover
            key={index}
            content={item.content}
            placement="rightTop"
            arrow={false}
            trigger="hover"
            className=""
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-x-2">
                <div className="text-[1.5rem]">{item.icon}</div>
                <span className="hover:text-[#d70019] text-[0.8rem] font-medium">
                  {item.name}
                </span>
              </div>
              <MdArrowForwardIos />
            </div>
          </Popover>
        ))}
      </div>
    </>
  );
};

export default TooltipCategory;
