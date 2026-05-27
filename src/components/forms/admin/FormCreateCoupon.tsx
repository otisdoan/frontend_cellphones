import { Form, Input, Select, InputNumber, DatePicker } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect } from "react";
import ButtonCellphoneS from "../../ButtonCellphoneS";
import type { CouponProps } from "../../../types/api/CouponResponse";
import { couponApi } from "../../../utils/api/coupon.api";
import { useNavigate } from "react-router-dom";
import { useMessage } from "../../../hooks/useMessage";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";

const FormCreateCoupon = ({ id }: { id?: number }) => {
  const navigate = useNavigate();
  const { showSuccess, showError, contextHolder } = useMessage();
  const [form] = useForm();

  const fetchCouponById = async () => {
    if (!id) return;
    try {
      const result = await couponApi.getById(id);
      if (!Array.isArray(result.data)) {
        const data = result.data;
        form.setFieldsValue({
          ...data,
          startDate: data.startDate ? dayjs(data.startDate) : undefined,
          endDate: data.endDate ? dayjs(data.endDate) : undefined,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFinish = async (value: any) => {
    try {
      const payload: Partial<CouponProps> = {
        ...value,
        startDate: value.startDate ? value.startDate.toISOString() : undefined,
        endDate: value.endDate ? value.endDate.toISOString() : undefined,
      };
      if (id) {
        const result = await couponApi.update(id, payload);
        showSuccess(result.message);
        setTimeout(() => navigate(-1), 1500);
      } else {
        const result = await couponApi.create(payload);
        showSuccess(result.message);
        setTimeout(() => navigate(-1), 1500);
      }
    } catch (error) {
      showError(error as string);
    }
  };

  useEffect(() => {
    fetchCouponById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      {contextHolder}
      <div className="bg-[#f5f5f5] rounded-lg p-4 mt-4 mb-[2rem]">
        <Form
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          onFinish={handleFinish}
          form={form}
        >
          <div className="flex md:flex-row flex-col md:items-center gap-x-4">
            <Form.Item
              label="Mã coupon"
              name="code"
              rules={[{ required: true, message: "Mã coupon là bắt buộc!" }]}
            >
              <Input placeholder="VD: SALE50" className="h-[2.5rem]" />
            </Form.Item>
            <Form.Item
              label="Tên coupon"
              name="name"
              rules={[{ required: true, message: "Tên là bắt buộc!" }]}
            >
              <Input placeholder="Tên coupon" className="h-[2.5rem]" />
            </Form.Item>
            <Form.Item
              label="Trạng thái"
              name="is_active"
              rules={[{ required: true, message: "Trạng thái là bắt buộc!" }]}
            >
              <Select
                options={[
                  { label: "Hoạt động", value: true },
                  { label: "Tắt", value: false },
                ]}
                placeholder="Chọn trạng thái"
                className="h-[2.5rem]"
              />
            </Form.Item>
          </div>
          <div className="flex md:flex-row flex-col md:items-center gap-x-4">
            <Form.Item
              label="Loại giảm giá"
              name="type"
              rules={[{ required: true, message: "Loại là bắt buộc!" }]}
            >
              <Select
                options={[
                  { label: "Phần trăm (%)", value: "percentage" },
                  { label: "Số tiền cố định", value: "fixed" },
                ]}
                placeholder="Chọn loại"
                className="h-[2.5rem]"
              />
            </Form.Item>
            <Form.Item
              label="Giá trị"
              name="value"
              rules={[{ required: true, message: "Giá trị là bắt buộc!" }]}
            >
              <InputNumber
                placeholder="Giá trị giảm"
                className="h-[2.5rem] w-full"
                min={0}
              />
            </Form.Item>
            <Form.Item label="Đơn hàng tối thiểu" name="min_order_amount">
              <InputNumber
                placeholder="Số tiền tối thiểu"
                className="h-[2.5rem] w-full"
                min={0}
              />
            </Form.Item>
          </div>
          <div className="flex md:flex-row flex-col md:items-center gap-x-4">
            <Form.Item label="Giảm tối đa" name="max_discount_amount">
              <InputNumber
                placeholder="Số tiền giảm tối đa"
                className="h-[2.5rem] w-full"
                min={0}
              />
            </Form.Item>
            <Form.Item label="Giới hạn sử dụng" name="usage_limit">
              <InputNumber
                placeholder="Tổng lượt dùng"
                className="h-[2.5rem] w-full"
                min={0}
              />
            </Form.Item>
            <Form.Item label="Giới hạn / người" name="user_usage_limit">
              <InputNumber
                placeholder="Lượt dùng / người"
                className="h-[2.5rem] w-full"
                min={0}
              />
            </Form.Item>
          </div>
          <div className="flex md:flex-row flex-col md:items-center gap-x-4">
            <Form.Item label="Ngày bắt đầu" name="start_date">
              <DatePicker
                showTime
                className="h-[2.5rem] w-full"
                placeholder="Chọn ngày bắt đầu"
              />
            </Form.Item>
            <Form.Item label="Ngày kết thúc" name="end_date">
              <DatePicker
                showTime
                className="h-[2.5rem] w-full"
                placeholder="Chọn ngày kết thúc"
              />
            </Form.Item>
          </div>
          <Form.Item label="Mô tả" name="description">
            <TextArea placeholder="Mô tả coupon" rows={4} />
          </Form.Item>
          <Form.Item>
            <div className="flex items-center justify-end gap-x-4">
              <ButtonCellphoneS
                children="Hủy"
                className="w-[6rem] bg-white"
                defaultHoverBg="none"
                onClick={() => navigate(-1)}
              />
              {!id && (
                <ButtonCellphoneS
                  htmlType="submit"
                  children="Tạo mới"
                  className="w-[6rem] text-white"
                />
              )}
              {id && (
                <ButtonCellphoneS
                  htmlType="submit"
                  children="Lưu"
                  className="w-[6rem] text-white"
                />
              )}
            </div>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default FormCreateCoupon;
