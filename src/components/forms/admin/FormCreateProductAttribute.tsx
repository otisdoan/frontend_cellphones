/* eslint-disable react-hooks/exhaustive-deps */
import { Form, Input, InputNumber } from "antd";
import { useEffect } from "react";
import ButtonCellphoneS from "../../ButtonCellphoneS";
import { useNavigate } from "react-router-dom";
import { useMessage } from "../../../hooks/useMessage";
import { productAttributeApi } from "../../../utils/api/product_attribute.api";
import type { ProductAttributeProps } from "../../../types/api/ProductAttributeResponse";
import { useForm } from "antd/es/form/Form";

const FormCreateProductAttribute = ({ id }: { id?: number }) => {
  const navigate = useNavigate();
  const { showSuccess, showError, contextHolder } = useMessage();
  const [form] = useForm();

  const fetchProductAttributeById = async () => {
    try {
      const result = await productAttributeApi.getById(id!);
      form.setFieldsValue(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFinish = async (value: ProductAttributeProps) => {
    try {
      if (id) {
        const result = await productAttributeApi.updateProductAttribute(
          id,
          value
        );
        showSuccess(result.message);
        setTimeout(() => {
          navigate(-1);
        }, 1500);
      } else {
        const result = await productAttributeApi.create(value);
        showSuccess(result.message);
        setTimeout(() => {
          navigate(-1);
        }, 1500);
      }
    } catch (error) {
      showError(error as string);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProductAttributeById();
    }
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
              label="Product ID"
              name="product_id"
              rules={[
                {
                  required: true,
                  message: "Product ID is required!",
                },
              ]}
            >
              <Input placeholder="Product ID" className="h-[2.5rem]" />
            </Form.Item>
            <Form.Item
              label="Attribute Name"
              name="attribute_name"
              rules={[
                {
                  required: true,
                  message: "Attribute Name is required!",
                },
              ]}
            >
              <Input placeholder="Attribute Name" className="h-[2.5rem]" />
            </Form.Item>
            <Form.Item
              label="Attribute Value"
              name="attribute_value"
              rules={[
                {
                  required: true,
                  message: "Attribute Value is required!",
                },
              ]}
            >
              <Input placeholder="Attribute Value" className="h-[2.5rem]" />
            </Form.Item>
          </div>
          <div className="flex md:flex-row flex-col md:items-center gap-x-4">
            <Form.Item
              label="Attribute Group"
              name="attribute_group"
              rules={[
                {
                  required: true,
                  message: "Attribute Group is required!",
                },
              ]}
            >
              <Input placeholder="Attribute Group" className="h-[2.5rem]" />
            </Form.Item>
            <Form.Item label="Sort order" name="sort_order">
              <InputNumber min={0} defaultValue={0} className="py-1 w-[5rem]" />
            </Form.Item>
          </div>
          <Form.Item>
            <div className="flex items-center justify-end gap-x-4">
              <ButtonCellphoneS
                children="Cancel"
                className="w-[6rem] bg-white"
                defaultHoverBg="none"
                onClick={() => navigate(-1)}
              />
              {!id && (
                <ButtonCellphoneS
                  htmlType="submit"
                  children="Create"
                  className="w-[6rem] text-white"
                />
              )}
              {id && (
                <ButtonCellphoneS
                  htmlType="submit"
                  children="Save"
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

export default FormCreateProductAttribute;
