import { Form, Input } from "antd";
import FormItem from "antd/es/form/FormItem";
import ButtonCellphoneS from "../ButtonCellphoneS";
import LinkCellphone from "../LinkCellohone";
import LoginByAnother from "../LoginByAnother";
import type { LoginFormType } from "../../types/forms/formType";
import { authApi } from "../../utils/api/auth.api";
import { useNavigate } from "react-router-dom";
import { useMessage } from "../../hooks/useMessage";

const FormLogin = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { contextHolder, showSuccess } = useMessage();
  const onFinish = async (values: LoginFormType) => {
    try {
      const result = await authApi.login(values);
      if (result.data && result.status === "success") {
        localStorage.setItem("access_token", result.data.access_token);
        showSuccess(result.message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <>
      {contextHolder}
      <div className="">
        <div className="flex justify-center mb-5 mt-[-0.5rem]">
          <div className="w-[7rem] h-2 bg-[#f5f5f5] rounded-sm"></div>
        </div>
        <h4 className="font-bold text-center text-[1.1rem] mb-[1.5rem]">
          Đăng nhập SMEMBER
        </h4>
        <div>
          <Form<LoginFormType>
            form={form}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <FormItem<LoginFormType>
              label="Số điện thoại"
              name="phone"
              rules={[
                { required: true, message: "Số điện thoại là bắt buộc!" },
                {
                  pattern: /^[0-9]{10}$/,
                  message: "Số điện thoại không hợp lệ!",
                },
              ]}
            >
              <Input
                placeholder="Nhập số điện thoại của bạn"
                className="h-[3rem]"
              />
            </FormItem>

            <FormItem<LoginFormType>
              label="Mật khẩu"
              name="password_login"
              rules={[
                { required: true, message: "Mật khẩu là bắt buộc!" },
                { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
              ]}
            >
              <Input.Password
                placeholder="Nhập mật khẩu của bạn"
                className="h-[3rem]"
              />
            </FormItem>

            <div className="p-2 bg-[#eaf3fe] border-[#3c82f6] border-[0.09rem] rounded-[0.5rem] mb-4">
              <p className="text-[0.74rem]">
                Trải nghiệm đăng nhập liền mạch giữa CellphoneS và Điện
                <br />
                Thoại Vui, ưu tiên dùng tài khoản CellphoneS (nếu có)
              </p>
            </div>

            <FormItem>
              <ButtonCellphoneS
                children="Đăng nhập"
                className="text-white w-full"
                htmlType="submit"
              />
            </FormItem>

            <LinkCellphone
              to="#"
              children="Quên mật khẩu?"
              className="text-[#3c82f6] flex justify-center"
            />

            <LoginByAnother title="Hoặc đăng nhập bằng" />

            <div className="mt-[4rem]">
              <p className="text-center mb-[2rem]">
                <span className="opacity-45">Bạn chưa có tài khoản? </span>{" "}
                <LinkCellphone to="/register" children="Đăng ký ngay" />
              </p>
              <p className="flex flex-col items-center">
                <span className="opacity-45">Mua sắm, sửa chữa tại</span>
                <span className="flex items-center gap-x-2">
                  <LinkCellphone to="#" children="cellphones.com.vn" />{" "}
                  <span className="opacity-45">và</span>
                  <LinkCellphone to="#" children="dienthoaivui.com.vn" />
                </span>
              </p>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default FormLogin;
