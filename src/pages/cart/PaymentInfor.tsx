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
import {
  getOrderItems,
  setOrderAddress,
} from "../../redux/features/cart/orderSlice";
import { Form, message } from "antd";
import { paymentApi } from "../../utils/api/payment.api";
import { orderApi } from "../../utils/api/order.api";
import type { OrderProps } from "../../types/api/OrderResponse";

interface CreateOrderPayload {
  order_number: string;
  user_id: string;
  guest_email: string;
  guest_phone: string;
  status: string;
  payment_status: string;
  payment_method: string;
  subtotal: string;
  discount_amount: string;
  shipping_fee: string;
  tax_amount: string;
  total_amount: string;
  currency: string;
  notes: string;
  items: Array<{
    product_id: number;
    variant_id: number | null;
    product_name: string;
    variant_name: string | null;
    sku: string;
    price: number;
    sale_price: number;
    quantity: number;
    image_url: string | null;
  }>;
}

const PaymentInfor = () => {
  const navigate = useNavigate();
  const { totalCart } = useAppSelector((state) => state.cart);
  const orderItems = useAppSelector((state) => state.order.items);
  const orderAddress = useAppSelector((state) => state.order.address);

  const [tab, setTab] = useState<string>("info");
  const [receiveForm] = Form.useForm();
  const [isProcessing, setIsProcessing] = useState(false);

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

  const handleContinue = () => {
    const values = receiveForm.getFieldsValue();
    dispatch(setOrderAddress(values));
    setTab("payment");
  };

  const handlePayment = async () => {
    try {
      setIsProcessing(true);

      if (!user?.id) {
        message.error("Vui lòng đăng nhập để tiếp tục");
        setIsProcessing(false);
        return;
      }

      // Calculate totals
      const subtotal = orderItems.reduce(
        (total, item) => total + Number(item.sale_price) * item.quantity,
        0
      );

      console.log("🛒 Order Items:", orderItems);
      console.log("💰 Subtotal:", subtotal);

      // Validate orderItems trước khi gửi
      const hasInvalidItems = orderItems.some((item) => !item.product_id);
      if (hasInvalidItems) {
        console.error("❌ Invalid items detected:", orderItems);
        message.error("Có sản phẩm không hợp lệ. Vui lòng thử lại.");
        setIsProcessing(false);
        return;
      }

      // Check if we need to add product names
      const needsProductName = orderItems.some((item) => !item.product_name);
      if (needsProductName) {
        console.warn("⚠️ Some items missing product_name, will use fallback");
      }

      // 1. CREATE ORDER FIRST (status: pending, payment_status: pending)
      const orderData: CreateOrderPayload = {
        order_number: `ORD${Date.now()}`,
        user_id: String(user.id),
        guest_email: orderAddress?.email || user.email || "",
        guest_phone: orderAddress?.phone || user.phone || "",
        status: "pending",
        payment_status: "pending",
        payment_method: "bank_transfer",
        subtotal: subtotal.toString(),
        discount_amount: "0",
        shipping_fee: "0",
        tax_amount: "0",
        total_amount: subtotal.toString(),
        currency: "VND",
        notes: orderAddress?.notes || "",
        items: orderItems.map((item) => {
          console.log("📋 Processing item:", item);
          return {
            product_id: Number(item.product_id),
            variant_id: item.variant_id ? Number(item.variant_id) : null,
            product_name: item.product_name || `Product ${item.product_id}`,
            variant_name: item.variant_name || null,
            sku: item.sku || `SKU${item.product_id}`,
            price: Number(item.price),
            sale_price: Number(item.sale_price),
            quantity: Number(item.quantity),
            image_url: item.image_url || null,
          };
        }),
      };

      console.log("📦 Order Data to send:", JSON.stringify(orderData, null, 2));

      const createdOrder = await orderApi.create(
        orderData as unknown as OrderProps
      );

      if (!createdOrder?.data) {
        message.error("Tạo đơn hàng thất bại");
        setIsProcessing(false);
        return;
      }

      const orderResponse = createdOrder.data;
      const orderId = Array.isArray(orderResponse)
        ? orderResponse[0]?.id
        : (orderResponse as OrderProps).id;

      if (!orderId) {
        message.error("Không thể lấy mã đơn hàng");
        setIsProcessing(false);
        return;
      }

      // 2. CALL PAYOS - orderCode phải là timestamp unique, không dùng orderId
      const paymentOrderCode = Date.now();
      const result = await paymentApi.checkout({
        orderCode: paymentOrderCode,
        amount: subtotal,
        description: `Thanh toán đơn hàng`,
        returnUrl: `${window.location.origin}/order/success/${orderId}?paymentCode=${paymentOrderCode}`,
        cancelUrl: `${window.location.origin}/order/failed/${orderId}?paymentCode=${paymentOrderCode}`,
      });

      if (result?.checkoutUrl) {
        // 3. REDIRECT to PayOS
        window.location.href = result.checkoutUrl;
      } else {
        message.error("Không thể tạo link thanh toán");
      }
    } catch (error) {
      console.error("Payment error:", error);
      message.error("Có lỗi xảy ra khi xử lý thanh toán");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <div className="bg-[#f5f6f8]">
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
              {tab === "info" ? (
                <TabInfor receiveForm={receiveForm} />
              ) : (
                <TabPayment />
              )}
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
          {tab === "info" ? (
            <div
              className="bg-[#d70019] p-2 flex justify-center items-center rounded-md cursor-pointer mt-3"
              onClick={handleContinue}
            >
              <span className="text-white font-medium">Tiếp tục</span>
            </div>
          ) : (
            <div
              className={`p-2 flex justify-center items-center rounded-md cursor-pointer mt-3 ${
                isProcessing
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#d70019] hover:bg-[#b8001a]"
              }`}
              onClick={isProcessing ? undefined : handlePayment}
            >
              <span className="text-white font-medium">
                {isProcessing ? "Đang xử lý..." : "Thanh toán"}
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PaymentInfor;
