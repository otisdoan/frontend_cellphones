/* eslint-disable react-hooks/exhaustive-deps */
import { GoArrowLeft } from "react-icons/go";
import HeaderCart from "../../components/home/HeaderCart";
import { Radio } from "antd";
import { useEffect, useState } from "react";
import { cartItemApi } from "../../utils/api/cart_item.api";
import type { ProductVatiantProp } from "../../types/api/ProductVariantReponse";
import { productVariantApi } from "../../utils/api/product_variant.api";

const CartPage = () => {
  const [cartItem, setCartItem] = useState<ProductVatiantProp[]>();
  const [ids] = useState<number[]>([]);

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
                <GoArrowLeft className="text-[1.7rem]" />
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
            {cartItem?.map((item, index) => (
              <div className="border-[1px] p-2 rounded-lg" key={index}>
                <div className="flex justify-between">
                  <div className="flex gap-x-2">
                    <Radio></Radio>
                    <img src={item.image_url} className="w-10 h-10" />
                    <div className="">
                      <span>{item.variant_name}</span>
                      <p className="flex gap-x-2">
                        <span className="">{item.price}</span>
                        <span className="line-through">{item.sale_price}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
