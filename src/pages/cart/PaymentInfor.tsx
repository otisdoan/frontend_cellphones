/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import HeaderCart from "../../components/home/HeaderCart";
import { useAppDispatch, useAppSelector } from "../../redux/app/hook";
import { useAuthContext } from "../../context/AuthContext";
import { GoArrowLeft } from "react-icons/go";
import { useEffect, useState } from "react";
import { fetchCartById } from "../../redux/features/cart/cartSlice";
import TabInfor from "../../components/cart/TabInfor";
import TabPayment from "../../components/cart/TabPayment";
import { getOrderItems } from "../../redux/features/cart/orderSlice";

const PaymentInfor = () => {
  const navigate = useNavigate();
  const { totalCart } = useAppSelector((state) => state.cart);
  const orderItems = useAppSelector((state) => state.order.items);
  const [tab, setTab] = useState<string>("info");

  const { user } = useAuthContext()!;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getOrderItems());
  }, []);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCartById(user.id));
    }
  }, [user?.id, totalCart]);

  return (
    <>
      <div className="">
        <HeaderCart totalCart={totalCart} />
        <div className="flex justify-center w-full">
          <div className="flex flex-col md:w-1/2 w-full px-3 md:px-0">
            <div className="flex p-4 border-b-[1px] ">
              <div className="flex justify-between w-3/5">
                <GoArrowLeft
                  className="text-[1.7rem]"
                  onClick={() => navigate(-1)}
                />
                <span className="font-bold text-[1.1rem]">Thanh toán</span>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-x-4">
              <div
                className={`w-1/2 border-b-[4px] text-center pb-2 cursor-pointer ${
                  tab === "info"
                    ? "border-b-[#d70019] text-[#d70019]"
                    : "border-b-[#929eab] text-[#929eab]"
                }`}
                onClick={() => setTab("info")}
              >
                <span className="font-bold">1. THÔNG TIN</span>
              </div>
              <div
                className={`w-1/2 border-b-[4px] text-center pb-2 cursor-pointer ${
                  tab === "payment"
                    ? "border-b-[#d70019] text-[#d70019]"
                    : "border-b-[#929eab] text-[#929eab]"
                }`}
                onClick={() => setTab("payment")}
              >
                <span className="font-bold">2. THANH TOÁN</span>
              </div>
            </div>

            <div className="mt-4">
              {tab === "info" ? <TabInfor /> : <TabPayment />}
            </div>
          </div>
        </div>

        <div
          className={`sticky bottom-0 border-[1px] bg-white rounded-t-lg p-4 md:w-1/2 w-full md:left-1/2 md:translate-x-[-50%]`}
        >
          <div className="flex justify-between">
            <span className="font-medium text-[1rem]">Tổng tiền tạm tính:</span>
            <span className="text-[#d70019] font-bold">
              {orderItems
                .reduce(
                  (total, item) =>
                    total + Number(item.sale_price) * item.quantity,
                  0
                )
                .toLocaleString("vi-VN")}
              đ
            </span>
          </div>
          <div className="bg-[#d70019] p-2 flex justify-center items-center rounded-md cursor-pointer mt-3">
            <span className="text-white font-medium">Tiếp tục</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentInfor;
