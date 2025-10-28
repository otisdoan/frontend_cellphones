/* eslint-disable react-hooks/exhaustive-deps */
import { Checkbox, Input } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/app/hook";
import OptionPayment from "./OptionPayment";
import { useAuthContext } from "../../context/AuthContext";
import { useEffect } from "react";
import { getOrderAddress } from "../../redux/features/cart/orderSlice";

const TabPayment = () => {
  const { cartItem } = useAppSelector((state) => state.cart);
  const { address } = useAppSelector((state) => state.order);
  const { user } = useAuthContext()!;
  const dispatch = useAppDispatch();
  console.log(address);

  useEffect(() => {
    dispatch(getOrderAddress());
  }, []);
  return (
    <>
      <div className="border rounded-lg p-4 bg-white">
        <div className="flex items-center justify-between gap-x-4">
          <Input variant="underlined" placeholder="Nhập mã giảm giá" />
          <div className="flex items-center justify-center rounded-md p-2 bg-[#f4f5f6]">
            <span className="whitespace-nowrap text-sm text-[#878b8d]">
              Áp dụng
            </span>
          </div>
        </div>
        <div className="space-y-2 mt-4">
          <div className="flex items-center justify-between">
            <span className="text-[0.9rem] text-[#878b8d]">
              Số lượng sản phẩm
            </span>
            <span className="">10</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[0.9rem] text-[#878b8d]">Tổng tiền hàng</span>
            <span>100.000.000đ</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[0.9rem] text-[#878b8d]">Phí vận chuyển</span>
            <span>Miễn phí</span>
          </div>
        </div>
        <div className="border-t-[1px] border-[#f3f3f3] my-4"></div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[0.9rem] text-[#878b8d]">
              Giảm giá trực tiếp
            </span>
            <span className="text-[#d70019]">- 3.000.000đ</span>
          </div>
          <div className="flex items-center justify-between ">
            <div className="flex items-center gap-x-2">
              <span className="text-[0.9rem] text-[#878b8d]">
                Chiết khấu Smember
              </span>
              <div className="px-1 border border-[#4dccad] rounded-sm flex items-center justify-center">
                <span className="font-bold text-[#4dccad] text-[0.8rem]">
                  S-MEM
                </span>
              </div>
            </div>
            <span className="text-[#d70019]">- 130.000đ</span>
          </div>
          <div className="border-t-[1px] border-[#f3f3f3] my-4"></div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-y-1">
              <span className="font-bold">Tổng tiền</span>
              <span className="text-[0.8rem] text-[#878b8d]">
                Đã gồm VAT và được làm tròn
              </span>
            </div>
            <span className="font-bold">
              {cartItem
                .reduce((total, item) => {
                  return total + item.sale_price * item.quantity;
                }, 0)
                .toLocaleString("vi-VN")}
              đ
            </span>
          </div>
        </div>
      </div>
      <OptionPayment />
      <div className="mt-5">
        <h2 className="text-[1.1rem] mb-3">THÔNG TIN NHẬN HÀNG</h2>
        <div className="border rounded-lg p-4 bg-white space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-[0.9rem] text-[#878b8d]">Khách hàng</span>
            <div className="flex items-center gap-x-2">
              <div className="px-1 border border-[#4dccad] rounded-sm flex items-center justify-center">
                <span className="font-bold text-[#4dccad] text-[0.8rem]">
                  S-MEM
                </span>
              </div>
              <span className="font-medium uppercase">{user?.full_name}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[0.9rem] text-[#878b8d]">Số điện thoại</span>
            <span className="font-medium uppercase">{user?.phone}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[0.9rem] text-[#878b8d]">Email</span>
            <span className="font-medium">{user?.email}</span>
          </div>
          <div className="flex items-center justify-between gap-x-5">
            <span className="text-[0.9rem] text-[#878b8d] whitespace-nowrap">
              Nhận hàng tại
            </span>
            <span className="font-medium">
              {Object.values({
                ...address,
                needInvoice: "",
                storeAddress: "",
                receiverPhone: "",
                receiverName: "",
              })
                .filter((value) => value !== "")
                .join(", ")}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[0.9rem] text-[#878b8d]">Người nhận</span>
            <span className="font-bold uppercase">{`${user?.full_name} - ${user?.phone}`}</span>
          </div>
        </div>
      </div>
      <div className="my-8">
        <Checkbox>
          <p className="text-[0.9rem]">
            Bằng việc Đặt hàng, bạn đồng ý với{" "}
            <span className="text-blue-500">Điều khoản sử dụng</span> của
            CellphoneS
          </p>
        </Checkbox>
        <p className="text-[0.9rem] text-[#878b8d] mt-2">
          Với các giao dịch từ 10 triệu trở lên, CellphoneS xin phép kiểm tra
          thẻ cứng và CCCD của đúng chủ thẻ trước khi tiến hành giao hàng nhằm
          hạn chế các trường hợp gian lận.
        </p>
      </div>
    </>
  );
};

export default TabPayment;
