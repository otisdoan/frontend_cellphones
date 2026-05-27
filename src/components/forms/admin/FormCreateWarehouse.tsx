import { Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect } from "react";
import ButtonCellphoneS from "../../ButtonCellphoneS";
import type { WarehouseProps } from "../../../types/api/WarehouseResponse";
import { warehouseApi } from "../../../utils/api/warehouse.api";
import { useNavigate } from "react-router-dom";
import { useMessage } from "../../../hooks/useMessage";
import { useForm } from "antd/es/form/Form";

const FormCreateWarehouse = ({ id }: { id?: number }) => {
  const navigate = useNavigate();
  const { showSuccess, showError, contextHolder } = useMessage();
  const [form] = useForm();

  const fetchWarehouseById = async () => {
    if (!id) return;
    try {
      const result = await warehouseApi.getById(id);
      if (!Array.isArray(result.data)) {
        form.setFieldsValue(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFinish = async (value: WarehouseProps) => {
    try {
      if (id) {
        const result = await warehouseApi.update(id, value);
        showSuccess(result.message);
        setTimeout(() => navigate(-1), 1500);
      } else {
        const result = await warehouseApi.create(value);
        showSuccess(result.message);
        setTimeout(() => navigate(-1), 1500);
      }
    } catch (error) {
      showError(error as string);
    }
  };

  useEffect(() => {
    fetchWarehouseById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      {contextHolder}
      <div className="bg-[#f5f5f5] rounded-lg p-4 mt-4 mb-[2rem]">
        <Form labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} onFinish={handleFinish} form={form}>
          <div className="flex md:flex-row flex-col md:items-center gap-x-4">
            <Form.Item label="Tên kho" name="name" rules={[{ required: true, message: "Tên kho là bắt buộc!" }]}>
              <Input placeholder="Tên kho hàng" className="h-[2.5rem]" />
            </Form.Item>
            <Form.Item label="Mã kho" name="code" rules={[{ required: true, message: "Mã kho là bắt buộc!" }]}>
              <Input placeholder="VD: WH001" className="h-[2.5rem]" />
            </Form.Item>
            <Form.Item label="Trạng thái" name="is_active" rules={[{ required: true, message: "Trạng thái là bắt buộc!" }]}>
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
            <Form.Item label="Số điện thoại" name="phone">
              <Input placeholder="Số điện thoại" className="h-[2.5rem]" />
            </Form.Item>
            <Form.Item label="Người quản lý" name="manager_name">
              <Input placeholder="Tên người quản lý" className="h-[2.5rem]" />
            </Form.Item>
          </div>
          <Form.Item label="Địa chỉ" name="address">
            <TextArea placeholder="Địa chỉ kho hàng" rows={3} />
          </Form.Item>
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

export default FormCreateWarehouse;
