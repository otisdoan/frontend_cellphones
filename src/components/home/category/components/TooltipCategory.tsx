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
      content: "",
    },
    {
      icon: <GiHeadphones />,
      name: "Âm thanh, Mic thu âm",
      content: "",
    },
    {
      icon: <MdOutlineCameraAlt />,
      name: "Đồng hồ, Camera",
      content: "",
    },
    {
      icon: <LuStore />,
      name: "Đồ gia dụng",
      content: "",
    },
    {
      icon: <BsUsbDrive />,
      name: "Phụ kiện",
      content: "",
    },
    {
      icon: <GiPc />,
      name: "PC, Màn hình, Máy in",
      content: "",
    },
    {
      icon: <CgScreen />,
      name: "Tivi",
      content: "",
    },
    {
      icon: <BsPhoneFlip />,
      name: "Thu cũ đổi mới",
      content: "",
    },
    {
      icon: <BsPhoneVibrate />,
      name: "Hàng cũ",
      content: "",
    },
    {
      icon: <MdCrisisAlert />,
      name: "Khuyến mãi",
      content: "",
    },
    {
      icon: <IoNewspaperOutline />,
      name: "Tin công nghệ",
      content: "",
    },
  ];
  return (
    <>
      <div className="p-4 md:flex flex-col gap-y-2 shadow-lg rounded-lg cursor-pointer h-full hidden ">
        {listcCategory.map((item, index) => (
          <Popover
            key={index}
            content={item.content}
            placement="bottomRight"
            arrow={false}
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
