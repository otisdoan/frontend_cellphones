import { Carousel } from "antd";
import type { CarouselRef } from "antd/es/carousel";
import { useRef, useState } from "react";
import { HiGift } from "react-icons/hi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { LiaCartPlusSolid } from "react-icons/lia";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useAppDispatch } from "../../redux/app/hook";
import { useLocation } from "react-router-dom";
import { addCartItem } from "../../redux/features/cart/cartSlice";
import { useAuthContext } from "../../context/AuthContext";
import { useMessage } from "../../hooks/useMessage";

const GiftProduct = ({ product_id }: { product_id: number }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const carouselRef = useRef<CarouselRef>(null);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const search = new URLSearchParams(location.search);
  const { user } = useAuthContext()!;
  const { showSuccess, contextHolder } = useMessage();
  const handlePrev = () => {
    carouselRef.current?.prev();
  };

  const handleNext = () => {
    carouselRef.current?.next();
  };

  const promotion: { content: string }[] = [
    {
      content:
        "Trả góp 0% lãi suất, tối đa 12 tháng, trả trước từ 10% qua CTTC hoặc 0đ qua thẻ tín dụng",
    },
    {
      content: "Đặc quyền trợ giá lên đến 3 triệu khi thu cũ lên đời iPhone",
    },
    {
      content:
        "Tặng Sim/Esim Viettel 5G có 8GB data/ngày kèm TV360 4K - miễn phí 1 tháng sử dụng (Chỉ áp dụng tại cửa hàng)",
    },
  ];

  const payment: { icon: string; content: string; image?: string }[] = [
    {
      icon: "/images/download.svg",
      content: "Xem chính sách ưu đãi dành cho thành viên Smember",
    },
    {
      icon: "/images/download.svg",
      image:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:46:16/q:90/plain/https://cellphones.com.vn/media/wysiwyg/DUMT_ZV0.png",
      content: "Giảm đến 5.000.000đ khi thanh toán qua Kredivo",
    },
    {
      icon: "/images/download.svg",
      image:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:90/plain/https://cellphones.com.vn/media/wysiwyg/Icon/hsbc_icon.png",
      content: "Hoàn tiền đến 2 triệu khi mở thẻ tín dụng HSBC",
    },
    {
      icon: "/images/download.svg",
      image:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:90:23/q:90/plain/https://cellphones.com.vn/media/wysiwyg/Icon/image_1648.png",
      content: "Giảm đến 1 triệu khi thanh toán qua thẻ tin dụng Vietbank",
    },
    {
      icon: "/images/download.svg",
      image:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:90/plain/https://cellphones.com.vn/media/wysiwyg/Icon/logo-techcom-update.png",
      content: "Giảm ngay 800K khi trả góp qua thẻ tín dụng TECHCOMBANK",
    },
    {
      icon: "/images/download.svg",
      image:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:90/plain/https://cellphones.com.vn/media/wysiwyg/Icon/vibb_bank.png",
      content: "Mở thẻ VIB nhận E-Voucher đến 600K",
    },
    {
      icon: "/images/download.svg",
      image:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:90/plain/https://cellphones.com.vn/media/wysiwyg/Icon/logo-ocb.png",
      content: "Giảm 500K khi thanh toán qua thẻ OCB",
    },
    {
      icon: "/images/download.svg",
      image:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:90/plain/https://cellphones.com.vn/media/wysiwyg/Icon/logo-sacombank.png",
      content: "Giảm đến 500.000đ khi trả góp bằng thẻ VISA SACOMBANK qua MPOS",
    },
    {
      icon: "/images/download.svg",
      image:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:90/plain/https://cellphones.com.vn/media/wysiwyg/Icon/logo-home-credit-new.png",
      content: " Giảm 400.000đ khi thanh toán bằng thẻ tín dụng Home Credit",
    },
    {
      icon: "/images/download.svg",
      content:
        "Liên hệ B2B để được tư vấn giá tốt nhất cho khách hàng doanh nghiệp khi mua số lượng nhiều",
    },
  ];

  const handleAddCart = () => {
    dispatch(
      addCartItem({
        user_id: user?.id,
        quantity: 1,
        variant_id: Number(search.get("id_variant")),
        product_id: Number(product_id),
      })
    );
    showSuccess("Thêm vào giỏ hành thành công");
  };
  return (
    <>
      {contextHolder}
      <div className="mt-4">
        <div className="border-[1px] p-4 border-[#e4e4e7] bg-[#f7f7f8] rounded-xl">
          <div className="flex items-center gap-x-2 mb-2">
            <HiGift className="text-[#d70019] text-[2rem]" />
            <span className="font-bold text-[1.1rem]">
              Quà tặng đặc quyền SMEM
            </span>
          </div>
          <div className="flex items-center gap-x-2">
            <div className=" w-6 min-w-6 h-6 p-1 rounded-full bg-[#508ff6] flex items-center justify-center">
              <span className="text-white text-[0.8rem]">1</span>
            </div>
            <span className="text-[0.9rem]">
              Giảm thêm 5% (tối đa 300.000đ) khi thu cũ lên đời (áp dụng tùy sản
              phẩm)
            </span>
          </div>
        </div>
        <div
          className="relative overflow-hidden  mt-4"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Carousel dots={false} arrows={false} ref={carouselRef}>
            <div className="rounded-lg overflow-hidden">
              <img
                src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:120/q:90/plain/https://dashboard.cellphones.com.vn/storage/b2s-pdp-dday2.gif"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:120/q:90/plain/https://dashboard.cellphones.com.vn/storage/ProductBanner_Voucher-300K_Apple_3.png" />
            </div>

            <div>
              <img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:120/q:90/plain/https://dashboard.cellphones.com.vn/storage/iPhone-product-banner-v1.png" />
            </div>
          </Carousel>
          <div
            className={`absolute top-1/2 p-2 left-[-2rem] transform -translate-y-1/2 w-[3.5rem] h-[3.5rem] bg-[#b3b3b3] bg-opacity-50 hover:bg-opacity-75 rounded-full flex items-center justify-end cursor-pointer transition-all duration-300 z-10 ${
              isHovered ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
            onClick={handlePrev}
          >
            <IoIosArrowBack className="text-white text-[1.2rem]" />
          </div>

          <div
            className={`absolute p-2 top-1/2 right-[-2rem] transform -translate-y-1/2 w-[3.5rem] h-[3.5rem] bg-[#b3b3b3] bg-opacity-50 hover:bg-opacity-75 rounded-full flex items-center justify-start cursor-pointer transition-all duration-300 z-10 ${
              isHovered ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
            onClick={handleNext}
          >
            <IoIosArrowForward className="text-white text-[1.2rem]" />
          </div>
        </div>
        <div className="p-4 border-[1px] border-[#5f9bfa] rounded-xl mt-4">
          <div className="flex items-center gap-x-2 mb-2">
            <HiGift className="text-[#d70019] text-[2rem]" />
            <span className="font-bold text-[1.1rem]">Khuyến mãi hấp dẫn</span>
          </div>
          {promotion.map((item, index) => (
            <div className="flex items-center gap-x-2 mb-4" key={index}>
              <div className=" w-5 h-5 p-1 rounded-full bg-[#508ff6] flex items-center justify-center min-w-5">
                <span className="text-white text-[0.6rem]">{index + 1}</span>
              </div>
              <span className="text-[0.9rem] opacity-70">{item.content}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-x-3 mt-4">
          <div className="flex items-center justify-center font-bold text-[1rem] border-[1px] border-[#3c82f6] text-[#3c82f6] w-[1/4] px-3 py-4 rounded-lg cursor-pointer hover:bg-[#eff5ff]">
            Trả góp 0%
          </div>
          <div className="flex flex-col items-center px-3 py-2 rounded-lg bg-[#db172c] text-white w-2/4 cursor-pointer hover:bg-[#a60e1f]">
            <span className="font-bold">MUA NGAY</span>
            <span className="text-[0.8rem]">
              Giao nhanh từ 2 giờ hoặc nhận tại cửa hàng
            </span>
          </div>
          <div className="rounded-lg border-[1px] cursor-pointer border-[#db172c] px-2 py-4 hover:bg-[#fae6e8]">
            <div
              className="flex items-center gap-x-1 text-[#db172c]"
              onClick={handleAddCart}
            >
              <LiaCartPlusSolid className="text-[1.5rem]" />
              <span className="text-[0.8rem]">Thêm vào giỏ hàng</span>
            </div>
          </div>
        </div>
        <div className="p-4 border-[1px] rounded-xl border-[#3c82f6] mt-4 bg-[#f1f6ff]">
          <div className="flex items-center gap-x-2 mb-3">
            <HiGift className="text-[#d70019] text-[2rem]" />
            <span className="font-bold text-[1.2rem]">Ưu đãi thanh toán</span>
          </div>
          <div>
            {payment.map((item, index) => (
              <div className="flex items-center gap-x-1 mb-4" key={index}>
                <img src={item.icon} className="mix-w-5 w-7 h-7" />
                <div className="flex items-center cursor-pointer">
                  <img src={item.image} />
                  <span className="text-[0.9rem] ml-2 hover:">
                    {item.content}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between bg-sale p-2 rounded-lg mt-4">
          <div className="flex items-center gap-x-3">
            <img
              src="https://cdn2.cellphones.com.vn/x/media/wysiwyg/fire-icon-2025.gif"
              className="w-7 h-9 mb-3"
            />
            <span className="font-bold text-[1.1rem]">Mua kèm giá sốc</span>
          </div>
          <div className="flex items-center cursor-pointer">
            <span className="text-[0.8rem] text-[#4488f6]">Xem tất cả</span>
            <MdKeyboardArrowRight className="text-[#4488f6]" />
          </div>
        </div>
      </div>
    </>
  );
};

export default GiftProduct;
