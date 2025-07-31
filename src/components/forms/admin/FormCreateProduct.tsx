/* eslint-disable react-hooks/exhaustive-deps */
import { Divider, Form, Input, InputNumber, Select, TreeSelect } from "antd";
import TextArea from "antd/es/input/TextArea";
import ButtonCellphoneS from "../../ButtonCellphoneS";
import { useNavigate } from "react-router-dom";
import { useMessage } from "../../../hooks/useMessage";
import type { ProductProps } from "../../../types/api/ProductResponse";
import { productApi } from "../../../utils/api/product.api";
import { useEffect, useState } from "react";
import { categoryApi } from "../../../utils/api/category.api";
import type {
  CategoryResponse,
  CategoryTree,
} from "../../../types/api/CategoryResponse";
import { brandApi } from "../../../utils/api/brand.api";
import type {
  BrandResponse,
  BrandSelect,
} from "../../../types/api/BrandResponse";

const FormCreateProduct = () => {
  const navigate = useNavigate();
  const [allCategories, setAllCategories] = useState<
    CategoryResponse<CategoryTree>["data"]
  >([]);
  const [allBrand, setAllBrand] = useState<BrandResponse<BrandSelect>["data"]>(
    []
  );
  const { showSuccess, showError, contextHolder } = useMessage();

  const handleFinish = async (value: ProductProps) => {
    try {
      const result = await productApi.create(value);
      console.log(result);
      showSuccess("Create product successfully!");
      setTimeout(() => {
        navigate(-1);
      }, 1500);
    } catch (error) {
      showError(error as string);
    }
  };

  const getAllCategories = async () => {
    try {
      const result = await categoryApi.getAllNameCategories();
      setAllCategories(result.data);
    } catch (error) {
      showError(error as string);
    }
  };

  const getAllNameBrand = async () => {
    try {
      const result = await brandApi.getAllNameBrand();
      setAllBrand(result.data);
    } catch (error) {
      showError(error as string);
    }
  };

  useEffect(() => {
    getAllNameBrand();
  }, []);

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      {contextHolder}
      <div className="bg-[#f5f5f5] rounded-lg p-4 mt-4 mb-[2rem]">
        <Form<ProductProps>
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          onFinish={handleFinish}
        >
          <div className="flex bg-[#f5f5f5] gap-x-4 flex-col md:flex-row">
            <div className=" w-full md:w-1/2 rounded-lg">
              <div className="flex flex-wrap gap-4">
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[{ required: true, message: "Name is required!" }]}
                  className="md:flex-[1_1_calc(33.333%-1rem)] w-full"
                >
                  <Input placeholder="Name" className="h-[2.5rem]" />
                </Form.Item>

                <Form.Item
                  label="Slug"
                  name="slug"
                  className="md:flex-[1_1_calc(33.333%-1rem)] w-full"
                >
                  <Input placeholder="Slug" className="h-[2.5rem]" />
                </Form.Item>

                <Form.Item
                  label="Sku"
                  name="sku"
                  className="md:flex-[1_1_calc(33.333%-1rem)] w-full"
                >
                  <Input placeholder="Sku" className="h-[2.5rem]" />
                </Form.Item>
                <Form.Item
                  label="Price"
                  name="price"
                  className="md:flex-[1_1_calc(33.333%-1rem)] w-full"
                >
                  <InputNumber
                    addonAfter="VND"
                    min={0}
                    defaultValue={0}
                    className=""
                    size="large"
                  />
                </Form.Item>
                <Form.Item<ProductProps>
                  label="Sale price"
                  name="sale_price"
                  className="md:flex-[1_1_calc(33.333%-1rem)] w-full"
                >
                  <InputNumber
                    addonAfter="VND"
                    min={0}
                    defaultValue={0}
                    className=""
                    size="large"
                  />
                </Form.Item>
                <Form.Item
                  label="Cost price"
                  name="cost_price"
                  className="md:flex-[1_1_calc(33.333%-1rem)] w-full"
                >
                  <InputNumber
                    addonAfter="VND"
                    min={0}
                    defaultValue={0}
                    className=""
                    size="large"
                  />
                </Form.Item>
                <Form.Item
                  label="Rating average"
                  name="rating_average"
                  className=""
                >
                  <InputNumber min={0} defaultValue={0} className="py-1" />
                </Form.Item>
                <Form.Item
                  label="Rating count"
                  name="rating_count"
                  className=""
                >
                  <InputNumber min={0} defaultValue={0} className="py-1" />
                </Form.Item>
                <Form.Item
                  label="Short description"
                  name="short_description"
                  className="w-full"
                >
                  <TextArea placeholder="Short description" rows={4} />
                </Form.Item>
                <Form.Item
                  label="Full description"
                  name="full_description"
                  className="w-full"
                >
                  <TextArea placeholder="Full description" rows={8} />
                </Form.Item>
              </div>
            </div>
            <Divider type="vertical" className="h-[50rem] hidden md:block" />
            <div className="w-full md:w-1/2 rounded-lg p-x-4">
              <div className="flex flex-wrap gap-4">
                <Form.Item
                  label="Category"
                  name="category_id"
                  className="md:flex-[1_1_calc(33.333%-1rem)] w-full"
                >
                  <TreeSelect
                    treeData={allCategories}
                    showSearch
                    allowClear
                    placeholder="Select category"
                    treeDefaultExpandAll
                    className="h-[2.5rem]"
                  />
                </Form.Item>

                <Form.Item
                  label="Brand"
                  name="brand_id"
                  className="md:flex-[1_1_calc(33.333%-1rem)] w-full"
                >
                  <Select
                    showSearch
                    placeholder="Select brand"
                    options={allBrand}
                    className="h-[2.5rem]"
                  />
                </Form.Item>

                <Form.Item
                  label="Warranty"
                  name="warranty_period"
                  className="md:flex-[1_1_calc(33.333%-1rem)] w-full"
                >
                  <InputNumber min={0} defaultValue={12} className="py-1" />
                </Form.Item>
                <Form.Item
                  label="Dimensions"
                  name="dimensions"
                  className="md:flex-[1_1_calc(33.333%-1rem)] w-full"
                >
                  <Input
                    placeholder="Select dimensions"
                    className="h-[2.5rem]"
                  />
                </Form.Item>
                <Form.Item
                  className="md:flex-[1_1_calc(33.333%-1rem)] w-full"
                  label="Status"
                  name="is_active"
                  rules={[
                    {
                      required: true,
                      message: "Status is required!",
                    },
                  ]}
                >
                  <Select
                    options={[
                      {
                        label: "Inactive",
                        value: "inactive",
                      },
                      {
                        label: "Active",
                        value: "active",
                      },
                      {
                        label: "Out of stock",
                        value: "out_of_stock",
                      },
                    ]}
                    placeholder="Select status"
                    className="h-[2.5rem]"
                  />
                </Form.Item>
                <Form.Item
                  label="Weight"
                  name="weight"
                  className="md:flex-[1_1_calc(33.333%-1rem)] w-full"
                >
                  <InputNumber min={0} defaultValue={0} className="py-1" />
                </Form.Item>
                <Form.Item
                  className=""
                  label="Featured"
                  name="is_featured"
                  rules={[
                    {
                      required: true,
                      message: "Status is required!",
                    },
                  ]}
                >
                  <Select
                    options={[
                      {
                        label: "No",
                        value: false,
                      },
                      {
                        label: "Yes",
                        value: true,
                      },
                    ]}
                    placeholder="Select feature"
                    className="h-[2.5rem]"
                  />
                </Form.Item>
                <Form.Item
                  label="Meta title"
                  name="meta_title"
                  className="w-full"
                >
                  <TextArea placeholder="Meta title" rows={4} />
                </Form.Item>
                <Form.Item
                  label="Meta description"
                  name="meta_description"
                  className="w-full"
                >
                  <TextArea placeholder="Meta description" rows={4} />
                </Form.Item>
              </div>
            </div>
          </div>
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

export default FormCreateProduct;
