import { Form, InputNumber, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import ButtonCellphoneS from "../../ButtonCellphoneS";
import UploadImage from "../../admin/UploadImage";
import { useNavigate } from "react-router-dom";
import { useMessage } from "../../../hooks/useMessage";
import type { ProductImagesProp } from "../../../types/api/ProductImageResponse";
import { productApi } from "../../../utils/api/product.api";
import type {
  ProductResponse,
  ProductSelect,
} from "../../../types/api/ProductResponse";
import { productImgaesApi } from "../../../utils/api/product_images.api";

const FormCreateProductImage = () => {
  const navigate = useNavigate();
  const [imageApi, setImageApi] = useState<string | undefined>("");
  const { showSuccess, showError, contextHolder } = useMessage();
  const [allNameProduct, setAllNameProduct] = useState<
    ProductResponse<ProductSelect>["data"]
  >([]);
  const handleFinish = async (value: ProductImagesProp) => {
    try {
      const result = await productImgaesApi.create({
        ...value,
        image_url: imageApi,
      });
      showSuccess(result.message);
      setTimeout(() => {
        navigate(-1);
      }, 1500);
    } catch (error) {
      showError(error as string);
    }
  };
  const handleImageApi = (image_url: string | undefined) => {
    setImageApi(image_url);
  };

  const getAllNameProduct = async () => {
    try {
      const result = await productApi.getAllName();
      setAllNameProduct(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllNameProduct();
  }, []);
  return (
    <>
      {contextHolder}
      <div className="bg-[#f5f5f5] rounded-lg p-4 mt-4 mb-[2rem]">
        <Form
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          onFinish={handleFinish}
        >
          <div className="flex md:flex-row flex-col md:items-center gap-x-4">
            <Form.Item
              label="Product"
              name="product_id"
              className="md:w-[20rem] w-full"
            >
              <Select
                showSearch
                options={allNameProduct}
                placeholder="Select product"
                className="h-[2.5rem]"
              />
            </Form.Item>
            <Form.Item label="Primary" name="is_primary">
              <Select
                options={[
                  {
                    label: "Yes",
                    value: true,
                  },
                  {
                    label: "No",
                    value: false,
                  },
                ]}
                placeholder="Select primary"
                className="h-[2.5rem]"
              />
            </Form.Item>
            <Form.Item label="Sort order" name="sort_order">
              <InputNumber min={0} defaultValue={0} className="py-1 w-[5rem]" />
            </Form.Item>
          </div>
          <Form.Item label="Alt text" name="alt_text">
            <TextArea placeholder="Alt text" rows={4} />
          </Form.Item>
          <Form.Item label="Image" name="image_url">
            <UploadImage setImageApi={handleImageApi} />
          </Form.Item>
          <Form.Item>
            <div className="flex items-center justify-end gap-x-4">
              <ButtonCellphoneS
                children="Cancel"
                className="w-[6rem] bg-white"
                defaultHoverBg="none"
                onClick={() => navigate(-1)}
              />
              <ButtonCellphoneS
                htmlType="submit"
                children="Create"
                className="w-[6rem] text-white"
              />
            </div>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default FormCreateProductImage;
