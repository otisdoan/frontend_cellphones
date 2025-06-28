import { Checkbox, DatePicker, Divider, Form, Input } from "antd";
import { IoMdCheckmark } from "react-icons/io";
import { IoInformationCircleSharp } from "react-icons/io5";
import LinkCellphone from "../LinkCellohone";
import ButtonCellphoneS from "../ButtonCellphoneS";
import { useNavigate } from "react-router-dom";
import type { RegisterFormType } from "../../types/forms/formType";

const FormRegister = () => {
  const [forms] = Form.useForm();
  const navigate = useNavigate();
  const onSubmit = (data: RegisterFormType) => {
    console.log(data);
  };
  return (
    <>
      <div>
        <h4 className="font-bold mb-4">Thông tin cá nhân</h4>
        <Form<RegisterFormType>
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          onFinish={onSubmit}
          form={forms}
        >
          <Form.Item<RegisterFormType>
            name={"full_name"}
            rules={[
              { required: true, message: "Họ và tên không được để trống!" },
            ]}
            label={"Họ và tên"}
          >
            <Input placeholder="Nhập họ và tên" className="h-[3rem]" />
          </Form.Item>
          <Form.Item<RegisterFormType>
            name={"date_of_birth"}
            rules={[
              {
                required: true,
                message: "Ngày sinh không được để trống!",
              },
            ]}
            label={"Ngày sinh"}
          >
            <DatePicker
              className="h-[3rem] w-full"
              format={{
                format: "YYYY-MM-DD",
              }}
              placeholder="YYYY-MM-DD"
            />
          </Form.Item>
          <Form.Item<RegisterFormType>
            label="Số điện thoại"
            name="phone"
            rules={[
              { required: true, message: "Số điện thoại là bắt buộc!" },
              {
                pattern: /^[0-9]{10,11}$/,
                message: "Số điện thoại không hợp lệ!",
              },
            ]}
          >
            <Input placeholder="Nhập số điện thoại" className="h-[3rem]" />
          </Form.Item>
          <Form.Item<RegisterFormType>
            label={
              <p>
                Email <span className="opacity-40">{`(Không bắt buộc)`}</span>
              </p>
            }
            name="email"
            rules={[
              { required: true, message: "Email là bắt buộc!" },
              {
                pattern: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                message: "Email không hợp lệ!",
              },
            ]}
            help={
              <p className="flex items-center gap-x-1">
                <IoMdCheckmark className="text-[#217541]" />
                <span className="text-[#217541] text-[0.8rem]">
                  Hóa đơn VAT khi mua hàng sẽ được gửi qua email này
                </span>
              </p>
            }
          >
            <Input placeholder="Nhập email" className="h-[3rem]" />
          </Form.Item>
          <h4 className="font-bold mt-[2.2rem] mb-4 text-[1.1rem]">
            Tạo mật khẩu
          </h4>
          <Form.Item<RegisterFormType>
            label="Nhập lại mật khẩu"
            name="password_hash"
            rules={[
              { required: true, message: "Mật khẩu là bắt buộc!" },
              { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
            ]}
            help={
              <p className="flex items-center gap-x-1">
                <IoInformationCircleSharp />
                <span>
                  Mật khẩu tối thiểu 6 ký tự, có ít nhất 1 chữ số và 1 số
                </span>
              </p>
            }
          >
            <Input.Password
              placeholder="Nhập mật khẩu của bạn"
              className="h-[3rem]"
            />
          </Form.Item>
          <Form.Item<RegisterFormType>
            label="Mật khẩu"
            name="confirm_password"
            dependencies={["password_hash"]}
            rules={[
              { required: true, message: "Làm ơn xác nhận mật khẩu!" },
              { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password_hash") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Mật khẩu không trùng khớp!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Nhập lại mật khẩu của bạn"
              className="h-[3rem]"
            />
          </Form.Item>
          <Form.Item>
            <Checkbox>Đăng ký nhận khuyến mãi từ CellphoneS</Checkbox>
          </Form.Item>
          <div>
            <p>
              <span className="mr-2">
                Bằng việc Đăng ký, bạn đã đọc và đồng ý với
              </span>
              <LinkCellphone
                to="#"
                children="Điều khoản sử dụng"
                className="text-blue-500"
              />{" "}
              và{" "}
              <LinkCellphone
                to="#"
                children="Chính sách bảo mật của CellphoneS"
                className="text-blue-500"
              />
            </p>
          </div>
          <Divider variant="dashed" dashed className="border-[0.1rem]" />
          <Form.Item className="sticky bottom-0 bg-white shadow-lg py-5 rounded-sm mb-0">
            <div className="flex items-center gap-x-4 ">
              <ButtonCellphoneS
                children="Quay lại đăng nhập"
                className="bg-white text-black border-black"
                onClick={() => navigate("/login")}
              />
              <ButtonCellphoneS
                children="Hoàn tất đăng ký"
                className="text-white"
                htmlType="submit"
              />
            </div>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default FormRegister;
