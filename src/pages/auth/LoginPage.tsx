import { TbGiftFilled } from "react-icons/tb";
import { IoIosArrowForward } from "react-icons/io";
import { Drawer } from "antd";
import { useState } from "react";
import ButtonCellphoneS from "../../components/ButtonCellphoneS";
import LinkCellphone from "../../components/LinkCellohone";
import { useNavigate } from "react-router-dom";
import FormLogin from "../../components/forms/FormLogin";
interface Promotion {
  bold: string;
  normal: string;
}
const LoginPage = () => {
  const promotionPolicy: Promotion[] = [
    {
      bold: "Chiết khấu đến 5%",
      normal: " khi mua các sản phẩm mua tại CellphoneS",
    },
    {
      bold: "Miễn phí giao hàng",
      normal: " cho thành viên SMEM, SVIP và cho đơn hàng từ 300.000đ",
    },
    {
      bold: "Tặng voucher sinh nhật đến 500.000đ",
      normal: "  cho khách hàng thành viên",
    },
    {
      bold: " đến 1 triệu",
      normal: "Trợ giá thu cũ lên đời",
    },
    {
      bold: " đến 300.000đ",
      normal: "Thăng hạng nhận voucher",
    },
    {
      bold: " ưu đãi thêm đến 10%",
      normal: "Đặc quyền S-Student/S-Teacher",
    },
  ];
  const navigate = useNavigate();
  const [open, setOpen] = useState<undefined | boolean>(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="flex flex-col p-2 py-[3rem] gap-y-4 md:flex-row md:py-0">
        <div className="md:w-[55%] md:bg-[#f7f7f8] md:px-[5rem] md:pt-[3rem]">
          <div className="flex items-center gap-x-2 md:justify-center md:mb-4">
            <div className="w-1/2 p-2 h-[3rem] bg-[#d70019] flex items-center md:w-1/4">
              <img src="/images/cellphones-long-icon.6a80e2a6.svg" />
            </div>
            <div className="w-1/2 p-2 h-[3rem] bg-[#d70019] flex items-center md:w-1/4">
              <img src="/images/dtv-long-icon.40a11e1d.svg" />
            </div>
          </div>
          <div className="">
            <p className="flex items-center justify-center md:text-[1.5rem]">
              Nhập hội khách hàng thành viên
              <span className="text-[#d70019] font-bold text-[1.4rem] ml-2 md:text-[2rem]">
                SMEMBER
              </span>
              <br />
            </p>
            <p className="text-center md:text-[1.5rem]">
              Để không bỏ lỡ các ưu đãi hấp dẫn từ CellphoneS
            </p>
          </div>
          <div className="flex flex-col gap-y-2 bg-[#e2e1e1] p-4 rounded-[2rem] mt-4 text-[0.8rem]">
            {promotionPolicy.map((item, index) => (
              <div key={index} className="flex items-center gap-x-2">
                <div className="flex items-center justify-center">
                  <TbGiftFilled className="text-[#d70019] text-[1.8rem]" />
                </div>
                {index <= 2 ? (
                  <p className="">
                    <span className="font-bold">{item.bold}</span>
                    {item.normal}
                  </p>
                ) : (
                  <p>
                    {item.normal}
                    <span className="font-bold">{item.bold}</span>
                  </p>
                )}
              </div>
            ))}
            <LinkCellphone to={"#"}>
              <p className="flex items-center justify-center gap-x-2 text-[#d70019] my-4">
                Xem chi tiết chính sách ưu đãi Smember
                <IoIosArrowForward className="font-bold" />
              </p>
            </LinkCellphone>
          </div>
          <div className="mt-[-3.7rem]">
            <img src="/images/smember-promotion-ant.a7833c47.png" />
          </div>
        </div>
        <div className="flex items-center gap-x-4 md:hidden">
          <ButtonCellphoneS
            className="bg-white"
            children="Đăng ký"
            onClick={() => navigate("/register")}
          />
          <ButtonCellphoneS
            onClick={showDrawer}
            className="text-white"
            children="Đăng nhập"
          />
        </div>
        <Drawer
          placement={"bottom"}
          closable={false}
          onClose={onClose}
          open={open}
          height={780}
          className="rounded-[1.1rem]"
        >
          <FormLogin />
        </Drawer>
        <div className="md:flex-1 md:w-full md:px-[5rem] md:pt-[3rem] hidden md:block">
          <FormLogin />
        </div>
      </div>
    </>
  );
};
export default LoginPage;
