/* eslint-disable react-hooks/exhaustive-deps */
import { GoArrowLeft } from "react-icons/go";
import HeaderCart from "../../components/home/HeaderCart";
import { Radio } from "antd";
import { FiTrash2 } from "react-icons/fi";
import { HiGift } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/app/hook";
import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import {
  fetchCartById,
  updateCartItemQuantity,
  updateCheckedCartItem,
} from "../../redux/features/cart/cartSlice";
import type { ProductVatiantProp } from "../../types/api/ProductVariantReponse";

const CartPage = () => {
  const navigate = useNavigate();
  const { totalCart, cartItem } = useAppSelector((state) => state.cart);

  const { user } = useAuthContext()!;
  const dispatch = useAppDispatch();

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

  const handleIncreaseQuantity = (item: ProductVatiantProp) => {
    console.log(item);
    dispatch(
      updateCartItemQuantity({
        id: item.id.toString(),
        quantity: item.quantity + 1,
      })
    );
  };
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCartById(user.id));
    }
  }, [user?.id, totalCart]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

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
                  onClick={() => navigate("/")}
                />
                <span className="font-bold text-[1.1rem]">
                  Giỏ hàng của bạn
                </span>
              </div>
            </div>
            {totalCart < 1 && (
              <div className="flex flex-col items-center">
                <img
                  src="https://cdn2.cellphones.com.vn/x,webp/media/cart/Cart-empty-v2.png"
                  className="mt-[5rem] mb-4"
                />
                <p className="text-center">
                  Giỏ hàng của bạn đang trống.
                  <br />
                  Hãy chọn thêm sản phẩm để mua sắm nhé
                </p>
              </div>
            )}
            {totalCart > 0 && (
              <div>
                <div className="bg-[#d70019] rounded-lg p-3 w-[6rem] my-4">
                  <span className="text-white text-[0.9rem] font-bold">
                    Giỏ hàng
                  </span>
                </div>
                <Radio
                  checked={cartItem.every((item) => item.checked)}
                  onClick={() => dispatch(updateCheckedCartItem("all"))}
                >
                  Chọn tất cả
                </Radio>
                <div className="flex flex-col gap-y-5">
                  {cartItem?.map((item, index) => (
                    <div className="border-[1px] p-2 rounded-lg" key={index}>
                      <div className="flex justify-between">
                        <div className="flex items-start justify-between gap-x-2">
                          <Radio
                            checked={item.checked}
                            onClick={() => {
                              dispatch(updateCheckedCartItem(item.id));
                            }}
                          ></Radio>
                          <img
                            src={item.image_url}
                            className="w-[6rem] h-[6rem] md:mr-[2rem] mr-1"
                          />
                          <div className="flex flex-col gap-y-2">
                            <span className="">{item.variant_name}</span>
                            <p className="flex md:flex-row flex-col gap-x-2 md:items-center">
                              <span className="text-[#d70019]">
                                {Number(item.price).toLocaleString("vi-VN")}đ
                              </span>
                              <span className="line-through text-[0.8rem] opacity-60">
                                {Number(item.sale_price).toLocaleString(
                                  "vi-VN"
                                )}
                                đ
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
                            <span>{item.quantity}</span>
                            <div
                              className="w-5 h-5 bg-[#f3f3f3] rounded-md flex justify-center items-center p-4 cursor-pointer"
                              onClick={() => handleIncreaseQuantity(item)}
                            >
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
                            <div className=" w-3 h-3 min-w-3 rounded-full bg-check"></div>
                            <span className="text-[0.9rem] opacity-70">
                              {item.content}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        {totalCart >= 1 ? (
          <div
            className={
              totalCart < 2
                ? `fixed bottom-0 border-[1px] bg-white rounded-t-lg p-4 md:w-1/2 w-full md:left-1/2 md:translate-x-[-50%]`
                : `sticky bottom-0 border-[1px] bg-white rounded-t-lg p-4 md:w-1/2 w-full md:left-1/2 md:translate-x-[-50%]`
            }
          >
            <div className="flex justify-between">
              <div className="flex flex-col">
                <span className="font-medium text-[1rem]">
                  Tạm tính:
                  <span className="text-[#d70019] ml-1 font-bold">
                    {cartItem
                      .reduce((total, item) => {
                        if (item.checked) {
                          return total + item.price * item.quantity;
                        }
                        return total;
                      }, 0)
                      .toLocaleString("vi-VN")}
                    đ
                  </span>
                </span>
                <span className="text-[0.8rem]">Tiết kiệm</span>
              </div>
              <div className="bg-[#d70019] px-[3rem] flex justify-center items-center rounded-lg">
                <span className="font-medium text-white">Mua ngay</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="fixed bottom-0 md:translate-x-1/2 border-[1px] bg-white rounded-t-lg p-4 md:w-1/2 w-full px-3">
            <div
              className=" flex justify-between items-center bg-[#d70019] py-2 rounded-md relative h-[2.5rem] cursor-pointer"
              onClick={() => navigate("/")}
            >
              <span className="text-white absolute left-1/2 translate-x-[-50%]">
                Quay lại trang chủ
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
