import { Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import ButtonCellphoneS from "../../ButtonCellphoneS";
import type { BrandProps } from "../../../types/api/BrandResponse";
import { brandApi } from "../../../utils/api/brand.api";
import UploadImage from "../../admin/UploadImage";
import { useNavigate } from "react-router-dom";
import { useMessage } from "../../../hooks/useMessage";
import { useForm } from "antd/es/form/Form";

const FormCreateBrand = ({ id }: { id?: number }) => {
  const navigate = useNavigate();
  const [imageApi, setImageApi] = useState<string | undefined>("");
  const { showSuccess, showError, contextHolder } = useMessage();
  const [form] = useForm();
  const [imageUpdate, setImageUpdate] = useState<string>();

  const fetchBrandById = async () => {
    if (!id) return;
    try {
      const result = await brandApi.getById(id);
      if (!Array.isArray(result.data)) {
        setImageUpdate(result.data.logo_url);
        form.setFieldsValue(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFinish = async (value: BrandProps) => {
    try {
      if (id) {
        const result = await brandApi.update(id, {
          ...value,
          logo_url: imageApi || imageUpdate,
        });
        showSuccess(result.message);
        setTimeout(() => {
          navigate(-1);
        }, 1500);
      } else {
        const result = await brandApi.create({ ...value, logo_url: imageApi });
        showSuccess(result.message);
        setTimeout(() => {
          navigate(-1);
        }, 1500);
      }
    } catch (error) {
      showError(error as string);
    }
  };

  const handleImageApi = (image_url: string | undefined) => {
    setImageApi(image_url);
  };

  useEffect(() => {
    fetchBrandById();
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
            <UploadImage setImageApi={handleImageApi} url={imageUpdate} />
          </Form.Item>
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

export default FormCreateBrand;
