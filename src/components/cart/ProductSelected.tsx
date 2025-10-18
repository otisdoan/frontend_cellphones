/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/app/hook";
import { getOrderItems } from "../../redux/features/cart/orderSlice";

const ProductSelected = () => {
  const orderItems = useAppSelector((state) => state.order.items);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getOrderItems());
  }, []);

  return (
    <>
      <div className="border rounded-lg p-4 bg-white">
        {orderItems.map((item, index) => (
          <div
            key={index}
            className={`flex gap-x-4 my-4 ${
              index === orderItems.length - 1
                ? ""
                : "border-b-[1px] border-[#f3f3f3] pb-4"
            }`}
          >
            <img src={item.image_url} className="w-24 h-24" />
            <div className="flex flex-col gap-y-2 w-full ">
              <span>{item.variant_name}</span>
              <div className="flex lg:items-center lg:flex-row flex-col gap-y-2 justify-between">
                <div className="flex items-center gap-x-2">
                  <span className="text-[#d70019] font-semibold">
                    {Number(item.sale_price).toLocaleString("vi-VN")}đ
                  </span>
                  <span className="line-through text-[0.8rem] opacity-60">
                    {Number(item.price).toLocaleString("vi-VN")}đ
                  </span>
                </div>
                <span>
                  Số lượng:
                  <span className="text-[#d70019] ml-1">{item.quantity}</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductSelected;
