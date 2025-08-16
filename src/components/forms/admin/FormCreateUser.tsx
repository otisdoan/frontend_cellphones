/* eslint-disable react-hooks/exhaustive-deps */
import { Form, Input, Select, DatePicker } from "antd";
import { useEffect, useState } from "react";
import ButtonCellphoneS from "../../ButtonCellphoneS";
import UploadImage from "../../admin/UploadImage";
import { useNavigate } from "react-router-dom";
import { useMessage } from "../../../hooks/useMessage";
import { userApi } from "../../../utils/api/user.api";
import type { UserProps } from "../../../types/api/UserResponse";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";

const FormCreateUser = ({ id }: { id?: number }) => {
  const navigate = useNavigate();
  const [imageApi, setImageApi] = useState<string | undefined>("");
  const { showSuccess, showError, contextHolder } = useMessage();
  const [form] = useForm();
  const [imageUpdate, setImageUpdate] = useState<string>();

  const fetchUserById = async () => {
    try {
      const result = await userApi.getById(id!);
      if (!Array.isArray(result.data)) {
        setImageUpdate(result.data.avatar_url || undefined);
        const userData = {
          ...result.data,
          date_of_birth: result.data.date_of_birth
            ? dayjs(result.data.date_of_birth)
            : null,
        };
        form.setFieldsValue(userData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFinish = async (value: UserProps) => {
    try {
      const userData = {
        ...value,
        date_of_birth: value.date_of_birth
          ? dayjs(value.date_of_birth).format("YYYY-MM-DD")
          : "",
        avatar_url: imageApi || imageUpdate || null,
      };

      if (id) {
        const result = await userApi.updateUser(id, userData);
        showSuccess(result.message);
        setTimeout(() => {
          navigate(-1);
        }, 1500);
      } else {
        const result = await userApi.create(userData);
        showSuccess(result.message);
        setTimeout(() => {
          navigate(-1);
        }, 1500);
      }
    } catch (error) {
      showError(error as string);
    }
  };

  const handleImageApi = (avatar_url: string | undefined) => {
    setImageApi(avatar_url);
  };

  useEffect(() => {
    if (id) {
      fetchUserById();
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
              label="Full Name"
              name="full_name"
              rules={[
                {
                  required: true,
                  message: "Full name is required!",
                },
              ]}
            >
              <Input placeholder="Full Name" className="h-[2.5rem]" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              //   rules={[
              //     {
              //       required: true,
              //       message: "Email is required!",
              //     },
              //     {
              //       type: "email",
              //       message: "Please enter a valid email!",
              //     },
              //   ]}
            >
              <Input placeholder="Email" className="h-[2.5rem]" />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Phone is required!",
                },
              ]}
            >
              <Input placeholder="Phone" className="h-[2.5rem]" />
            </Form.Item>
          </div>
          <div className="flex md:flex-row flex-col md:items-center gap-x-4">
            <Form.Item
              label="Password"
              name="password_hash"
              rules={[
                {
                  required: !id,
                  message: "Password is required!",
                },
                {
                  min: 6,
                  message: "Password must be at least 6 characters!",
                },
              ]}
            >
              <Input.Password placeholder="Password" className="h-[2.5rem]" />
            </Form.Item>
            <Form.Item label="Date of Birth" name="date_of_birth">
              <DatePicker
                placeholder="Select date of birth"
                className="h-[2.5rem] w-full"
                format="YYYY-MM-DD"
              />
            </Form.Item>
            <Form.Item label="Gender" name="gender">
              <Select
                options={[
                  {
                    label: "Male",
                    value: "male",
                  },
                  {
                    label: "Female",
                    value: "female",
                  },
                  {
                    label: "Other",
                    value: "other",
                  },
                ]}
                placeholder="Select gender"
                className="h-[2.5rem]"
                allowClear
              />
            </Form.Item>
          </div>
          <div className="flex md:flex-row flex-col md:items-center gap-x-4">
            <Form.Item
              label="Role"
              name="role"
              rules={[
                {
                  required: true,
                  message: "Role is required!",
                },
              ]}
            >
              <Select
                options={[
                  {
                    label: "Admin",
                    value: "admin",
                  },
                  {
                    label: "User",
                    value: "user",
                  },
                  {
                    label: "Manager",
                    value: "manager",
                  },
                ]}
                placeholder="Select role"
                className="h-[2.5rem]"
              />
            </Form.Item>
            <Form.Item
              label="Status"
              name="status"
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
                    label: "Active",
                    value: "active",
                  },
                  {
                    label: "Inactive",
                    value: "inactive",
                  },
                ]}
                placeholder="Select status"
                className="h-[2.5rem]"
              />
            </Form.Item>
            <Form.Item label="Email Verified" name="email_verified">
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
                placeholder="Email verified?"
                className="h-[2.5rem]"
              />
            </Form.Item>
            <Form.Item label="Phone Verified" name="phone_verified">
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
                placeholder="Phone verified?"
                className="h-[2.5rem]"
              />
            </Form.Item>
          </div>
          <Form.Item label="Avatar" name="avatar_url">
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

export default FormCreateUser;
