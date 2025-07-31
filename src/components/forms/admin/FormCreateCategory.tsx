import { Form, Input, InputNumber, Select, TreeSelect } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import ButtonCellphoneS from "../../ButtonCellphoneS";
import UploadImage from "../../admin/UploadImage";
import { useNavigate } from "react-router-dom";
import { useMessage } from "../../../hooks/useMessage";
import { categoryApi } from "../../../utils/api/category.api";
import type {
  CategoryProps,
  CategoryResponse,
  CategoryTree,
} from "../../../types/api/CategoryResponse";

const FormCreateCategory = () => {
  const navigate = useNavigate();
  const [imageApi, setImageApi] = useState<string | undefined>("");
  const [allCategories, setAllCategories] = useState<
    CategoryResponse<CategoryTree>["data"]
  >([]);
  const { showSuccess, showError, contextHolder } = useMessage();

  const getAllCategories = async () => {
    try {
      const result = await categoryApi.getAllNameCategories();
      setAllCategories(result.data);
    } catch (error) {
      showError(error as string);
    }
  };

  const handleFinish = async (value: CategoryProps) => {
    try {
      const result = await categoryApi.create({
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

  useEffect(() => {
    getAllCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Name is required!",
                },
              ]}
            >
              <Input placeholder="Name" className="h-[2.5rem]" />
            </Form.Item>
            <Form.Item label="Slug" name="slug">
              <Input placeholder="Slug" className="h-[2.5rem]" />
            </Form.Item>
            <Form.Item
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
                    value: false,
                  },
                  {
                    label: "Active",
                    value: true,
                  },
                ]}
                placeholder="Select status"
                className="h-[2.5rem]"
              />
            </Form.Item>
            <Form.Item
              label="Parent category"
              name="parent_id"
              className=" md:w-[15rem] w-full"
            >
              <TreeSelect
                treeData={allCategories}
                showSearch
                allowClear
                placeholder="Select parent category"
                treeDefaultExpandAll
                className="h-[2.5rem]"
              />
            </Form.Item>
            <Form.Item label="Sort order" name="sort_order">
              <InputNumber min={0} defaultValue={0} className="py-1 w-[5rem]" />
            </Form.Item>
          </div>
          <Form.Item label="Description" name="description">
            <TextArea placeholder="Description" rows={8} />
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

export default FormCreateCategory;
