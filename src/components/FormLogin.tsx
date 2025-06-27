import { Form, Input } from "antd";
import FormItem from "antd/es/form/FormItem";

interface FieldType {
  phone: string;
  password_login: string;
}
const FormLogin = () => {
  return (
    <>
      <div className="">
        <div className="flex justify-center mb-5 mt-[-0.5rem]">
          <div className="w-[7rem] h-2 bg-[#f5f5f5] rounded-sm"></div>
        </div>
        <h4 className="font-bold text-center text-[1.1rem] mb-[1.5rem]">
          Đăng nhập SMEMBER
        </h4>
        <div>
          <Form labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
            <FormItem<FieldType> label="Số điện thoại" name={"phone"}>
              <Input
                placeholder="Nhập số điện thoại của bạn"
                className="h-[3rem]"
              />
            </FormItem>
            <FormItem<FieldType> label="Mật khẩu" name={"password_login"}>
              <Input.Password
                placeholder="Nhập mật khẩu của bạn"
                className="h-[3rem]"
              />
            </FormItem>
          </Form>
        </div>
      </div>
    </>
  );
};
export default FormLogin;
