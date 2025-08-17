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
  title: string;
  brand: { name: string }[];
  list: ProductProps[][];
  loading?: boolean;
}
const ProductHome = ({
  title,
  brand,
  list,
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
          slidesToShow: 5,
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
          <h2 className="md:text-[1.5rem] text-[1rem] font-medium">{title}</h2>
          <span className="cursor-pointer md:hidden">Xem tất cả</span>
          <div className="md:flex items-center gap-x-2 hidden">
            {brand?.map((item, index) => (
              <div
                key={index}
                className="p-2 flex justify-center items-center border-[1px] bg-[#f3f4f6] border-[#e5e7eb] rounded-lg text-[0.8rem] cursor-pointer"
              >
                <span>{item.name}</span>
              </div>
            ))}
            <div className="p-2 md:flex justify-center items-center border-[1px] bg-[#f3f4f6] border-[#e5e7eb] rounded-lg text-[0.8rem] cursor-pointer hidden">
              <span>Xem tất cả</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-x-2 md:hidden overflow-x-auto scrollbar-hide">
          {brand?.map((item, index) => (
            <div
              key={index}
              className="p-2 flex justify-center items-center border-[1px] bg-[#f3f4f6] border-[#e5e7eb] rounded-lg text-[0.8rem] cursor-pointer"
            >
              <span>{item.name}</span>
            </div>
          ))}
          <div className="p-2 md:flex justify-center items-center border-[1px] bg-[#f3f4f6] border-[#e5e7eb] rounded-lg text-[0.8rem] cursor-pointer hidden">
            <span>Xem tất cả</span>
          </div>
        </div>
        <div className="relative">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Array.from({ length: 10 }).map((_, index) => (
                <SkeletonProduct key={index} />
              ))}
            </div>
          ) : (
            <>
              <Carousel {...setting}>
                {list.map((items, index) => (
                  <div key={index} className="">
                    <div className="flex flex-col w-full my-4 px-1 relative">
                      {items.map((item, index) => (
                        <div
                          key={index}
                          className="flex flex-col gap-y-3 w-full rounded-lg p-3 shadow-lg cursor-pointer"
                          onClick={() => navigate(`/${item.slug}`)}
                        >
                          <img
                            src={`https://cdn2.cellphones.com.vn/x/media/catalog/product/i/p/iphone-16-1_1.png?_gl=1*jhgdtn*_gcl_aw*R0NMLjE3NTE5NjM3NzMuQ2p3S0NBandnN1BEQmhCeEVpd0FmMUNWdTVwN2dwNmJUU0JZVmw5U2pyU2g0Zm5yaktoN04xOGNId0VBcEswbW9BR0VuRUQwZThEbEpCb0M4QnNRQXZEX0J3RQ..*_gcl_au*MTA5MzM1MTM1NC4xNzUwMTczODY3*_ga*MjA2MDUzNjEwOS4xNzUwMTczODY4*_ga_QLK8WFHNK9*czE3NTQ1NDkwNTAkbzEwMSRnMSR0MTc1NDU0OTM0MiRqNTYkbDAkaDEyMDQ0ODE5NzA.`}
                            className="object-contain hover:scale-105 duration-500"
                          />
                          <div className="font-bold h-[2rem]">
                            <span>{item.name}</span>
                          </div>
                          <p className="flex items-center gap-x-1 whitespace-normal">
                            <span className="text-[#d70019] font-bold text-[0.8rem]">
                              {item.price}đ
                            </span>
                            <span className="line-through font-bold opacity-65 md:text-[0.3rem]">
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
                                Không phí chuyển đổi khi trả góp 0% qua thẻ tín
                                dụng kỳ hạn 3-6 tháng
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
                      ))}
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
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductHome;
