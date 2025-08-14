/* eslint-disable react-hooks/exhaustive-deps */
import { GoArrowLeft } from "react-icons/go";
import HeaderCart from "../../components/home/HeaderCart";
import { Radio } from "antd";
import { useEffect, useState } from "react";
import { cartItemApi } from "../../utils/api/cart_item.api";
import type { ProductVatiantProp } from "../../types/api/ProductVariantReponse";
import { productVariantApi } from "../../utils/api/product_variant.api";
import { FiTrash2 } from "react-icons/fi";
import { HiGift } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cartItem, setCartItem] = useState<ProductVatiantProp[]>();
  const [ids] = useState<number[]>([]);
  const navigate = useNavigate();

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

  const fetchCartById = async () => {
    try {
      const result = await cartItemApi.getById(24);
      if (Array.isArray(result.data)) {
        result.data.forEach((item) => {
          ids.push(Number(item.variant_id));
        });
      }
      const variant = await productVariantApi.getVariantByIds(ids);
      if (Array.isArray(variant.data)) {
        setCartItem(variant.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCartById();
  }, []);

  return (
    <>
      <div>
        <HeaderCart />
        <div className="flex justify-center w-full">
          <div className="flex flex-col w-1/2">
            <div className="flex p-4 border-b-[1px]">
              <div className="flex justify-between w-3/5">
                <GoArrowLeft
                  className="text-[1.7rem]"
                  onClick={() => navigate("/")}
                />
                <span className="font-bold text-[1.1rem]">
                  Giỏ hàng của bạn
                </span>
              </div>
            </div>
            <div className="bg-[#d70019] rounded-lg p-3 w-[6rem] my-4">
              <span className="text-white text-[0.9rem] font-bold">
                Giỏ hàng
              </span>
            </div>
            <Radio>Chọn tất cả</Radio>
            <div className="flex flex-col gap-y-5">
              {cartItem?.map((item, index) => (
                <div className="border-[1px] p-2 rounded-lg" key={index}>
                  <div className="flex justify-between">
                    <div className="flex items-start justify-between gap-x-2">
                      <Radio></Radio>
                      <img
                        src={item.image_url}
                        className="w-[6rem] h-[6rem] mr-[2rem]"
                      />
                      <div className="flex flex-col gap-y-2">
                        <span className="">{item.variant_name}</span>
                        <p className="flex gap-x-2 items-center">
                          <span className="text-[#d70019]">{item.price}</span>
                          <span className="line-through text-[0.8rem] opacity-60">
                            {item.sale_price}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-y-2">
                      <FiTrash2 className="w-5 h-5" />
                      <div className="flex items-center gap-x-2">
                        <div className="w-5 h-5 bg-[#f3f3f3] rounded-md flex justify-center items-center p-4 cursor-pointer">
                          -
                        </div>
                        <span>1</span>
                        <div className="w-5 h-5 bg-[#f3f3f3] rounded-md flex justify-center items-center p-4 cursor-pointer">
                          +
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-[#f7f7f8] rounded-xl mt-4">
                    <div className="flex items-center gap-x-2 mb-2">
                      <HiGift className="text-[#d70019] text-[1.5rem]" />
                      <span className="font-medium text-[1rem]">
                        Khuyến mãi hấp dẫn
                      </span>
                    </div>
                    {promotion.map((item, index) => (
                      <div
                        className="flex items-center gap-x-2 mb-4"
                        key={index}
                      >
                        <div className=" w-3 h-3 rounded-full bg-check"></div>
                        <span className="text-[0.9rem] opacity-70">
                          {item.content}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="sticky bottom-0 border-[1px] bg-white rounded-t-lg p-4">
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <span className="font-medium text-[1rem]">Tạm tính: </span>
                  <span className="text-[0.8rem]">Tiết kiệm</span>
                </div>
                <div className="bg-[#d70019] px-[3rem] flex justify-center items-center rounded-lg">
                  <span className="font-medium text-white">Mua ngay</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
