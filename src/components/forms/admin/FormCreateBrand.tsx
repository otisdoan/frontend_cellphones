import { Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import ButtonCellphoneS from "../../ButtonCellphoneS";
import type { BrandProps } from "../../../types/api/BrandResponse";
import { brandApi } from "../../../utils/api/brand.api";
import UploadImage from "../../admin/UploadImage";

const FormCreateBrand = () => {
  const [imageApi, setImageApi] = useState<string | undefined>("");

  const handleFinish = async (value: BrandProps) => {
    try {
      console.log(value);
      const result = await brandApi.create({ ...value, logo_url: imageApi });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  const handleImageApi = (image_url: string | undefined) => {
    setImageApi(image_url);
  };
  return (
    <>
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
          </div>
          <Form.Item label="Description" name="description">
            <TextArea placeholder="Description" rows={8} />
          </Form.Item>
          <Form.Item label="Logo" name="logo_url">
            <UploadImage setImageApi={handleImageApi} />
          </Form.Item>
          <Form.Item>
            <div className="flex items-center justify-end gap-x-4">
              <ButtonCellphoneS
                children="Cancel"
                className="w-[6rem] bg-white"
                defaultHoverBg="none"
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

export default FormCreateBrand;
