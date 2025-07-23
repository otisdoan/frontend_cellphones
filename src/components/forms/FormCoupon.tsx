import { Checkbox, Form, Input } from "antd";
import ButtonCellphoneS from "../ButtonCellphoneS";

const FormCoupon = () => {
  return (
    <>
      <div>
        <Form labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                pattern: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                message: "Email không hợp lệ!",
              },
            ]}
            className=""
          >
            <Input placeholder="Nhập email của bạn" className="h-[2.5rem]" />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              { required: true, message: "Số điện thoại là bắt buộc!" },
              {
                pattern: /^[0-9]{10}$/,
                message: "Số điện thoại không hợp lệ!",
              },
            ]}
            className="md:mt-[-1rem]"
          >
            <Input
              placeholder="Nhập số điện thoại của bạn"
              className="h-[2.5rem]"
            />
          </Form.Item>
          <Form.Item className="md:mt-[-1rem]">
            <Checkbox checked>
              <span className="text-[#d70019] whitespace-nowrap">
                Tôi đồng ý với điều khoản của CellphoneS
              </span>
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <ButtonCellphoneS
              children="ĐĂNG KÝ NGAY"
              className="text-white h-[2rem]"
              htmlType="submit"
            />
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default FormCoupon;
