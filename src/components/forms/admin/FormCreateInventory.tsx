import { Form, InputNumber } from "antd";
import { useEffect } from "react";
import ButtonCellphoneS from "../../ButtonCellphoneS";
import type { InventoryProps } from "../../../types/api/InventoryResponse";
import { inventoryApi } from "../../../utils/api/inventory.api";
import { useNavigate } from "react-router-dom";
import { useMessage } from "../../../hooks/useMessage";
import { useForm } from "antd/es/form/Form";

const FormCreateInventory = ({ id }: { id?: number }) => {
  const navigate = useNavigate();
  const { showSuccess, showError, contextHolder } = useMessage();
  const [form] = useForm();

  const fetchInventoryById = async () => {
    if (!id) return;
    try {
      const result = await inventoryApi.getById(id);
      if (!Array.isArray(result.data)) {
        form.setFieldsValue(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFinish = async (value: InventoryProps) => {
    try {
      if (id) {
        const result = await inventoryApi.update(id, value);
        showSuccess(result.message);
        setTimeout(() => navigate(-1), 1500);
      } else {
        const result = await inventoryApi.create(value);
        showSuccess(result.message);
        setTimeout(() => navigate(-1), 1500);
      }
    } catch (error) {
      showError(error as string);
    }
  };

  useEffect(() => {
    fetchInventoryById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      {contextHolder}
      <div className="bg-[#f5f5f5] rounded-lg p-4 mt-4 mb-[2rem]">
        <Form labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} onFinish={handleFinish} form={form}>
          <div className="flex md:flex-row flex-col md:items-center gap-x-4">
            <Form.Item label="Warehouse ID" name="warehouse_id" rules={[{ required: true, message: "Warehouse ID là bắt buộc!" }]}>
              <InputNumber placeholder="ID kho hàng" className="h-[2.5rem] w-full" min={1} />
            </Form.Item>
            <Form.Item label="Product ID" name="product_id" rules={[{ required: true, message: "Product ID là bắt buộc!" }]}>
              <InputNumber placeholder="ID sản phẩm" className="h-[2.5rem] w-full" min={1} />
            </Form.Item>
            <Form.Item label="Variant ID" name="variant_id">
              <InputNumber placeholder="ID biến thể" className="h-[2.5rem] w-full" min={1} />
            </Form.Item>
          </div>
          <div className="flex md:flex-row flex-col md:items-center gap-x-4">
            <Form.Item label="Số lượng" name="quantity" rules={[{ required: true, message: "Số lượng là bắt buộc!" }]}>
              <InputNumber placeholder="Số lượng tồn kho" className="h-[2.5rem] w-full" min={0} />
            </Form.Item>
            <Form.Item label="Số lượng đặt trước" name="reserved_quantity">
              <InputNumber placeholder="Số lượng đã đặt" className="h-[2.5rem] w-full" min={0} />
            </Form.Item>
            <Form.Item label="Cảnh báo tồn kho tối thiểu" name="min_stock_alert">
              <InputNumber placeholder="Ngưỡng cảnh báo" className="h-[2.5rem] w-full" min={0} />
            </Form.Item>
          </div>
          <Form.Item>
            <div className="flex items-center justify-end gap-x-4">
              <ButtonCellphoneS children="Hủy" className="w-[6rem] bg-white" defaultHoverBg="none" onClick={() => navigate(-1)} />
              {!id && <ButtonCellphoneS htmlType="submit" children="Tạo mới" className="w-[6rem] text-white" />}
              {id && <ButtonCellphoneS htmlType="submit" children="Lưu" className="w-[6rem] text-white" />}
            </div>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default FormCreateInventory;
