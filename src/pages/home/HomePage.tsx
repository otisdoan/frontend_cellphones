import FooterHome from "../../components/home/FooterHome";
import HeaderHome from "../../components/home/HeaderHome";
import ButtonCellphoneS from "../../components/ButtonCellphoneS";
import { SlEarphonesAlt } from "react-icons/sl";
import { Popover } from "antd";

const HomePage = () => {
  return (
    <>
      <div>
        <div className="fixed top-[40rem] right-[10rem]">
          <Popover
            content={
              <div className="">
                <div className="flex items-center gap-x-1 mb-4 cursor-pointer">
                  <img
                    src="/public/images/icon-cskh-2025.webp"
                    className="w-[2rem]"
                  />
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
