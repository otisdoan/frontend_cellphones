import { Carousel } from "antd";
import type { ProductProps } from "../../types/api/ProductResponse";
import { FaStar } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import {
  MdKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { useRef } from "react";
import type { CarouselRef } from "antd/es/carousel";
import { useNavigate } from "react-router-dom";
import SkeletonProduct from "../skeleton/SkeletonProduct";

interface ProductHomeProps {
  title?: string;
  brand?: { name: string }[];
  list: ProductProps[];
  suggest?: boolean;
  loading?: boolean;
}
const ProductNoSlice = ({
  title,
  brand,
  list,
  suggest = false,
  loading = false,
}: ProductHomeProps) => {
  const carouselRef = useRef<CarouselRef>(null);
  const navigate = useNavigate();

  const handlePrev = () => {
    carouselRef.current?.prev();
  };

  const handleNext = () => {
    carouselRef.current?.next();
  };

  const setting = {
    dots: false,
    arrows: false,
    ref: carouselRef,
    draggable: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="flex flex-col gap-y-4">
        <div className="flex justify-between items-center">
          <h2 className="md:text-[1.5rem] font-medium text-[1rem]">{title}</h2>
          <span className={suggest === true ? `hidden` : `md:hidden`}>
            Xem tất cả
          </span>
          <div className="md:flex items-center gap-x-2 hidden">
            {brand?.map((item, index) => (
              <div
                key={index}
                className="p-2 flex justify-center items-center border-[1px] bg-[#f3f4f6] border-[#e5e7eb] rounded-lg text-[0.8rem] cursor-pointer"
              >
                <span>{item.name}</span>
              </div>
            ))}
            <div className={brand ? `block` : `hidden`}>
              <div className="p-2 flex justify-center items-center border-[1px] bg-[#f3f4f6] border-[#e5e7eb] rounded-lg text-[0.8rem] cursor-pointer">
                <span>Xem tất cả</span>
              </div>
            </div>
          </div>
        </div>
        <div className="relative">
          {loading ? (
            <>
              <div className="hidden md:grid md:grid-cols-5 gap-x-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <SkeletonProduct key={index} />
                ))}
              </div>
              <div className="grid grid-cols-2 md:hidden gap-x-4">
                {Array.from({ length: 2 }).map((_, index) => (
                  <SkeletonProduct key={index} />
                ))}
              </div>
            </>
          ) : (
            <Carousel {...setting}>
              {list.map((item, index) => (
                <div key={index} className="px-1 my-4 relative">
                  <div
                    className="bg-white flex flex-col gap-y-4 rounded-lg p-3 shadow-lg cursor-pointer"
                    onClick={() => navigate(`/${item.slug}`)}
                  >
                    <img
                      src={`${item.product_image ? item.product_image[0] : ""}`}
                      className="object-contain hover:scale-105 duration-500"
                    />
                    <div className="h-[2rem] font-bold">
                      <span className="text-[0.7rem] md:text-[0.9rem]">
                        {item.name}
                      </span>
                    </div>
                    <p className="flex items-center gap-x-1">
                      <span className="text-[#d70019] font-bold md:text-[1rem] text-[0.8rem]">
                        {Number(item.price).toLocaleString("vi-VN")}đ
                      </span>
                      <span className="line-through font-bold opacity-65 md:text-[0.7rem] text-[0.5rem]">
                        {Number(item.cost_price).toLocaleString("vi-VN")}đ
                      </span>
                    </p>
                    <div className="flex flex-col gap-y-1">
                      <div className="bg-[#dae8fe] flex items-center p-1 rounded-md">
                        <span className="text-[#20488b] md:text-[0.7rem] text-[0.5rem]">
                          Smember giảm đến 450.000đ
                        </span>
                      </div>
                      <div
                        className={`bg-[#EFE9FE] flex items-center p-1 rounded-md ${
                          suggest && `hidden`
                        }`}
                      >
                        <span className="text-[#421d95] md:text-[0.7rem] text-[0.5rem]">
                          S-Student giảm thêm 300.000đ
                        </span>
                      </div>
                      <div
                        className={`bg-[#F2F2F3] rounded-md p-1 ${
                          suggest && `hidden`
                        }`}
                      >
                        <span className="md:text-[0.7rem] text-[0.5rem] line-clamp-2">
                          Không phí chuyển đổi khi trả góp 0% qua thẻ tín dụng
                          kỳ hạn 3-6 tháng
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex items-center gap-x-1">
                        <FaStar className="text-[#ffd531]" />
                        <span>{item.rating_average}</span>
                      </div>
                      <div className="flex items-center gap-x-1">
                        <FaRegHeart className="text-[#3c82f6]" />
                        <span className="text-[#3c82f6]">Yêu thích</span>
                      </div>
                    </div>
                    <div
                      className="object-contain absolute top-[-0.5rem] px-2"
                      style={{
                        backgroundImage:
                          "url('/images/discount-badge-ui-2025.webp')",
                      }}
                    >
                      <p className="text-white flex items-center gap-x-1">
                        <span className="text-[0.7rem]">Giảm</span>
                        <span className="text-[0.8rem]">14%</span>
                      </p>
                    </div>
                    <div
                      className="object-cover absolute right-0 top-0 px-1"
                      style={{
                        backgroundImage:
                          "url('/images/zero-ins-badge-ui-2025.webp')",
                      }}
                    >
                      <p className="text-[#3c82f6] flex items-center gap-x-1">
                        <span className="text-[0.7rem]">Trả góp</span>
                        <span className="text-[0.8rem]">0%</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          )}
          <div
            className="bg-white flex items-center justify-center p-1 rounded-full shadow-lg border-[1px] w-10 h-10 absolute top-[47.5%] cursor-pointer"
            onClick={handlePrev}
          >
            <MdKeyboardArrowLeft className="text-[1.1rem]" />
          </div>
          <div
            className="bg-white flex items-center justify-center p-1 rounded-full shadow-lg border-[1px] w-10 h-10 absolute top-[47.5%] right-0 cursor-pointer"
            onClick={handleNext}
          >
            <MdOutlineKeyboardArrowRight className="text-[1.1rem]" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductNoSlice;
