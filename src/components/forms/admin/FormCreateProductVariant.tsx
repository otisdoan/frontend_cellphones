import { Form, Input, InputNumber, Select } from "antd";
import { useEffect, useState } from "react";
import ButtonCellphoneS from "../../ButtonCellphoneS";
import { useNavigate } from "react-router-dom";
import { useMessage } from "../../../hooks/useMessage";
import type { ProductVatiantProp } from "../../../types/api/ProductVariantReponse";
import { productVariantApi } from "../../../utils/api/product_variant.api";
import { productApi } from "../../../utils/api/product.api";
import type {
  ProductResponse,
  ProductSelect,
} from "../../../types/api/ProductResponse";
import { useForm } from "antd/es/form/Form";
import UploadImage from "../../admin/UploadImage";

const FormCreateProductVariant = ({ id }: { id?: number }) => {
  const navigate = useNavigate();
  const { showSuccess, showError, contextHolder } = useMessage();
  const [form] = useForm();
  const [imageApi, setImageApi] = useState<string | undefined>("");
  const [imageUpdate, setImageUpdate] = useState<string>();
  const [allProducts, setAllProducts] = useState<
    ProductResponse<ProductSelect>["data"]
  >([]);

  const fetchProductVariantById = async () => {
    if (!id) return;
    try {
      const result = await productVariantApi.getById(id);
      if (!Array.isArray(result.data)) {
        setImageUpdate(result.data.image_url);
        form.setFieldsValue(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFinish = async (value: ProductVatiantProp) => {
    try {
      if (id) {
        const result = await productVariantApi.update(id, {
          ...value,
          image_url: (imageApi || imageUpdate) as string,
        });
        showSuccess(result.message);
        setTimeout(() => {
          navigate(-1);
        }, 1500);
      } else {
        const result = await productVariantApi.create({
          ...value,
          image_url: imageApi as string,
        });
        showSuccess(result.message);
        setTimeout(() => {
          navigate(-1);
        }, 1500);
      }
    } catch (error) {
      showError(error as string);
    }
  };

  const getAllProducts = async () => {
    try {
      const result = await productApi.getAllName();
      setAllProducts(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    fetchProductVariantById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      {contextHolder}
      <div className="bg-[#f5f5f5] rounded-lg p-4 mt-4 mb-[2rem]">
        <Form
          form={form}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          onFinish={handleFinish}
        >
          <div className="flex md:flex-row flex-col md:items-center gap-x-4">
            <Form.Item
              label="Product"
              name="product_id"
              rules={[{ required: true, message: "Product is required!" }]}
            >
              <Select
                showSearch
                placeholder="Select product"
                options={Array.isArray(allProducts) ? allProducts : []}
                className="h-[2.5rem]"
              />
            </Form.Item>

            <Form.Item
              label="Variant Name"
              name="variant_name"
              rules={[{ required: true, message: "Variant name is required!" }]}
            >
              <Input placeholder="Variant name" className="h-[2.5rem]" />
            </Form.Item>

            <Form.Item
              label="SKU"
              name="sku"
              rules={[{ required: true, message: "SKU is required!" }]}
            >
              <Input placeholder="SKU" className="h-[2.5rem]" />
            </Form.Item>

            <Form.Item
              label="Status"
              name="is_active"
              rules={[{ required: true, message: "Status is required!" }]}
            >
              <Select
                placeholder="Select status"
                options={[
                  { label: "Active", value: true },
                  { label: "Inactive", value: false },
                ]}
                className="h-[2.5rem]"
              />
            </Form.Item>

            <Form.Item label="Capacity" name="capacity">
              <Input placeholder="Capacity" className="h-[2.5rem]" />
            </Form.Item>
          </div>

          <div className="flex md:flex-row flex-col md:items-center gap-x-4">
            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: "Price is required!" }]}
            >
              <InputNumber
                addonAfter="VND"
                min={0}
                placeholder="Price"
                className="w-full"
                size="large"
              />
            </Form.Item>

            <Form.Item label="Sale Price" name="sale_price">
              <InputNumber
                addonAfter="VND"
                min={0}
                placeholder="Sale price"
                className="w-full"
                size="large"
              />
            </Form.Item>

            <Form.Item
              label="Stock Quantity"
              name="stock_quantity"
              rules={[
                { required: true, message: "Stock quantity is required!" },
              ]}
            >
              <InputNumber
                min={0}
                placeholder="Stock quantity"
                className="w-full"
                size="large"
              />
            </Form.Item>
          </div>

          <Form.Item label="Image" name="image_url">
            <UploadImage setImageApi={setImageApi} url={imageUpdate} />
          </Form.Item>

          <Form.Item>
            <div className="flex items-center justify-end gap-x-4 mt-[2rem]">
              <ButtonCellphoneS
                children="Cancel"
                className="w-[6rem] bg-white"
                defaultHoverBg="none"
                onClick={() => navigate(-1)}
              />
              <ButtonCellphoneS
                htmlType="submit"
                children={id ? "Update" : "Create"}
                className="w-[6rem] text-white"
              />
            </div>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default FormCreateProductVariant;
