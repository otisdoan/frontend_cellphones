import { TbGiftFilled } from "react-icons/tb";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { Button, Drawer } from "antd";
import { useState } from "react";
import FormLogin from "../../components/FormLogin";
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
  const [open, setOpen] = useState<undefined | boolean>(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="flex flex-col p-2 py-[3rem] gap-y-4">
        <div className="flex items-center gap-x-2">
          <div className="w-1/2 p-2 h-[3rem] bg-[#d70019] flex items-center">
            <img src="/images/cellphones-long-icon.6a80e2a6.svg" />
          </div>
          <div className="w-1/2 p-2 h-[3rem] bg-[#d70019] flex items-center">
            <img src="/images/dtv-long-icon.40a11e1d.svg" />
          </div>
        </div>
        <div className="">
          <p className="flex items-center justify-center">
            Nhập hội khách hàng thành viên
            <span className="text-[#d70019] font-bold text-[1.4rem] ml-2">
              SMEMBER
            </span>
            <br />
          </p>
          <p className="text-center">
            Để không bỏ lỡ các ưu đãi hấp dẫn từ CellphoneS
          </p>
        </div>
        <div className="flex flex-col gap-y-2 bg-[#e2e1e1] p-4 rounded-[2rem] mt-4">
          {promotionPolicy.map((item, index) => (
            <div key={index} className="flex items-center gap-x-2">
              <div className="flex items-center justify-center">
                <TbGiftFilled className="text-[#d70019] text-[1.8rem]" />
              </div>
              {index <= 2 ? (
                <p>
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
          <Link to={"#"}>
            <p className="flex items-center justify-center gap-x-2 text-[#d70019] my-4">
              Xem chi tiết chính sách ưu đãi Smember
              <IoIosArrowForward className="font-bold" />
            </p>
          </Link>
        </div>
        <div className="mt-[-3.7rem]">
          <img src="/images/smember-promotion-ant.a7833c47.png" />
        </div>
        <div className="flex items-center gap-x-4">
          <Button className="w-full border-[#d70019] text-[#d70019] h-[3rem]">
            Đăng ký
          </Button>
          <Button
            className="bg-[#d70019] text-white w-full h-[3rem]"
            onClick={showDrawer}
          >
            Đăng nhập
          </Button>
        </div>
        <Drawer
          placement={"bottom"}
          closable={false}
          onClose={onClose}
          open={open}
        >
          <FormLogin />
        </Drawer>
      </div>
    </>
  );
};
export default LoginPage;
