import { Modal } from "antd";
import { useState } from "react";
import { IoIosArrowForward, IoIosClose } from "react-icons/io";

interface MethodPayProps {
  image: string;
  name: string;
}

const OptionPayment = () => {
  const [open, setOpen] = useState(false);
  const [methodPaySelected, setMethodPaySelected] = useState<number>();

  const methodPay: MethodPayProps[] = [
    {
      image: "/images/paywhenrecieve.webp",
      name: "Thanh toán khi nhận hàng",
    },
    {
      image: "/images/QRCode.webp",
      name: "Chuyển khoản ngân hàng qua mã QR",
    },
    {
      image: "/images/vnpay.webp",
      name: "VNPAY",
    },
    {
      image: "/images/momo_vi.webp",
      name: "MOMO",
    },
    {
      image: "/images/onepay.webp",
      name: "Qua thẻ Visa/Master/JCB/Napas",
    },
    {
      image: "/images/kredivo.webp",
      name: "Kredivo",
    },
    {
      image: "/images/logo-zalo-pay-test.webp",
      name: "Zalopay",
    },
    {
      image: "/images/shopeepay.webp",
      name: "ShopeePay",
    },
    {
      image: "/images/fundiin.webp",
      name: "Fundiin",
    },
  ];

  const handleSelectMethodPay = (index: number) => {
    setMethodPaySelected(index);
    setOpen(false);
  };
  return (
    <>
      <div className="mt-5">
        <h2 className="text-[1.1rem] mb-3">THÔNG TIN THANH TOÁN</h2>
        <div
          className="border rounded-lg p-4 bg-white cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <div
            className={` ${
              methodPaySelected ? "hidden" : "flex items-center justify-between"
            }`}
          >
            <div className="flex items-center gap-x-2">
              <img src="/images/payment.png" alt="" className="w-10 h-10" />
              <div className="flex flex-col gap-y-1">
                <span className="text-[#d70019]">
                  Chọn phương thức thanh toán
                </span>
                <span className="text-[0.8rem] text-[#878b8d]">
                  Giảm thêm tới 1.000.000đ
                </span>
              </div>
            </div>
            <IoIosArrowForward className="text-[1.5rem] text-[#d70019]" />
          </div>
          <div className="space-y-4">
            {methodPay.map((item, index) => (
              <div
                key={index}
                className={`${
                  methodPaySelected === index
                    ? "border rounded-lg p-2 flex items-center gap-x-2 hover:bg-[#ffdcda] cursor-pointer "
                    : "hidden"
                }`}
              >
                <div className="w-14 h-14 flex items-center justify-center">
                  <img src={item.image} alt="" className=" object-cover" />
                </div>
                <span className="text-[0.8rem] font-bold">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
        <Modal
          open={open}
          onCancel={() => setOpen(false)}
          footer={null}
          title={
            <div className="flex items-center justify-between">
              <h2 className="font-bold">Chọn phương thức thanh toán</h2>
              <IoIosClose
                className="text-[2rem] cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
          }
          closable={false}
        >
          <div className="">
            <div className="h-[24rem] overflow-y-auto mt-10">
              <h3 className="text-[1.1rem] mb-4">KHẢ DỤNG</h3>
              <div className="space-y-4">
                {methodPay.map((item, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-2 flex items-center gap-x-2 hover:bg-[#ffdcda] cursor-pointer"
                    onClick={() => handleSelectMethodPay(index)}
                  >
                    <div className="w-14 h-14 flex items-center justify-center">
                      <img src={item.image} alt="" className=" object-cover" />
                    </div>
                    <span className="text-[0.8rem] font-bold">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <div className="flex items-center justify-center bg-[#d70019] text-white p-2 rounded-lg">
                <span>Xác nhận</span>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default OptionPayment;
