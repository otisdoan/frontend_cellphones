import { Carousel } from "antd";
import type { ProductProps } from "../../types/api/ProductResponse";
import { FaStar } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";

interface ProductHomeProps {
  title: string;
  brand: { name: string }[];
  list: ProductProps[];
}
const ProductHome = ({ title, brand, list }: ProductHomeProps) => {
  return (
    <>
      <div className="flex flex-col gap-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-[1.5rem] font-bold">{title}</h2>
          <div className="flex items-center gap-x-2">
            {brand?.map((item, index) => (
              <div
                key={index}
                className="p-3 flex justify-center items-center border-[1px] bg-[#f3f4f6] border-[#e5e7eb] rounded-lg"
              >
                <span>{item.name}</span>
              </div>
            ))}
            <div className="p-3 flex justify-center items-center border-[1px] bg-[#f3f4f6] border-[#e5e7eb] rounded-lg">
              <span>Xem tất cả</span>
            </div>
          </div>
        </div>
        <div className="">
          <Carousel arrows={false} dots={false} slidesToShow={5} autoplay>
            {list?.map((item, index) => (
              <div
                key={index}
                className="flex flex-col gap-y-2 w-[20rem] rounded-lg mx-4 p-2 shadow-lg border-[1px cursor-pointer"
              >
                <img
                  src={`https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro-max.png`}
                  className="object-contain"
                />
                <span>{item.name}</span>
                <p className="flex items-center gap-x-1">
                  <span className="text-[#d70019] font-bold">
                    {item.price}đ
                  </span>
                  <span className="line-through font-bold opacity-65 text-[0.8rem]">
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
                    <span className="text-[0.8rem]">
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
        </div>
      </div>
    </>
  );
};

export default ProductHome;
