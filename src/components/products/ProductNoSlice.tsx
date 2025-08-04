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

interface ProductHomeProps {
  title?: string;
  brand?: { name: string }[];
  list: ProductProps[];
}
const ProductNoSlice = ({ title, brand, list }: ProductHomeProps) => {
  const carouselRef = useRef<CarouselRef>(null);

  const handlePrev = () => {
    carouselRef.current?.prev();
  };

  const handleNext = () => {
    carouselRef.current?.next();
  };
  return (
    <>
      <div className="flex flex-col gap-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-[1.5rem] font-medium">{title}</h2>
          <div className="flex items-center gap-x-2">
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
          <Carousel
            arrows={false}
            dots={false}
            slidesToShow={5}
            autoplay
            ref={carouselRef}
            draggable
          >
            {list.map((item, index) => (
              <div
                key={index}
                className="bg-white flex flex-col gap-y-4 w-[12rem] rounded-lg mx-4 p-3 shadow-lg cursor-pointer overflow-hidden my-4"
              >
                <img
                  src={`https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro-max.png`}
                  className="object-contain hover:scale-105 duration-500"
                />
                <div className="h-[3rem] font-bold">
                  <span>{item.name}</span>
                </div>
                <p className="flex items-center gap-x-2 mt-[-0.5rem]">
                  <span className="text-[#d70019] font-bold text-[1rem]">
                    {item.price}đ
                  </span>
                  <span className="line-through font-bold opacity-65 text-[0.7rem]">
                    {item.cost_price}
                  </span>
                </p>
                <div className="flex flex-col gap-y-1">
                  <div className="bg-[#dae8fe] flex items-center p-1 rounded-md">
                    <span className="text-[#20488b] text-[0.7rem]">
                      Smember giảm đến 450.000đ
                    </span>
                  </div>
                  <div className="bg-[#EFE9FE] flex items-center p-1 rounded-md">
                    <span className="text-[#421d95] text-[0.7rem]">
                      S-Student giảm thêm 300.000đ
                    </span>
                  </div>
                  <div className="bg-[#F2F2F3] rounded-md p-1">
                    <span className="text-[0.7rem]">
                      Không phí chuyển đổi khi trả góp 0% qua thẻ tín dụng kỳ
                      hạn 3-6 tháng
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
              </div>
            ))}
          </Carousel>
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
