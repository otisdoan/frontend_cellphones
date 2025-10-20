/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, Radio, Select } from "antd";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import axios from "axios";
import { removePrefix } from "../../utils/removePrefix";
import { customSelectAntd } from "../../utils/customSelectAntd";

interface InforReceiveProps {
  form: any;
}

const InforReceive = ({ form }: InforReceiveProps) => {
  const [tab, setTab] = useState<string>("store");
  const { user } = useAuthContext()!;
  const [provinceStore, setProvinceStore] = useState<any[]>([]);
  const [districtStore, setDistrictStore] = useState<any[]>([]);
  const [provinceHome, setProvinceHome] = useState<any[]>([]);
  const [districtHome, setDistrictHome] = useState<any[]>([]);
  const [wardHome, setWardHome] = useState<any[]>([]);

  const handleChangeDistrictHome = async (_: any, option: any) => {
    try {
      const result = await axios.get(
        `https://provinces.open-api.vn/api/v1/d/${option["data-code"]}?depth=2`
      );
      setWardHome(customSelectAntd(result.data.wards));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProvinceStore = async () => {
    try {
      const result = await axios.get(
        "https://provinces.open-api.vn/api/v1/?depth=2"
      );
      setProvinceStore(customSelectAntd(removePrefix(result.data)));
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeProvince = async (_: any, option: any) => {
    try {
      const result = await axios.get(
        `https://provinces.open-api.vn/api/v1/p/${option["data-code"]}?depth=2`
      );
      setDistrictStore(customSelectAntd(result.data.districts));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProvinceHome = async () => {
    try {
      const result = await axios.get(
        "https://provinces.open-api.vn/api/v1/?depth=2"
      );
      setProvinceHome(customSelectAntd(removePrefix(result.data)));
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeProvinceHome = async (_: any, option: any) => {
    try {
      const result = await axios.get(
        `https://provinces.open-api.vn/api/v1/p/${option["data-code"]}?depth=2`
      );
      console.log(result.data);
      setDistrictHome(customSelectAntd(result.data.districts));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProvinceStore();
    fetchProvinceHome();
  }, []);

  useEffect(() => {
    if (user?.full_name || user?.phone) {
      form.setFieldsValue({
        receiverName: user?.full_name,
        receiverPhone: user?.phone,
      });
    }
  }, [user, form]);

  return (
    <>
      <div className="mt-5">
        <h2 className="text-[1.1rem] mb-3">THÔNG TIN NHẬN HÀNG</h2>
        <Form form={form} layout="vertical">
          <div className="border rounded-lg overflow-hidden">
            <div className="flex items-center">
              <div
                className={`w-1/2 flex items-center gap-x-2 p-4 ${
                  tab === "store" ? "bg-white rounded-tr-lg" : "bg-[#f1f1f1]"
                }`}
              >
                <Radio
                  checked={tab === "store"}
                  onClick={() => setTab("store")}
                >
                  <span className="text-[0.77rem] lg:text-[0.9rem] font-medium whitespace-nowrap">
                    Nhận hàng tại cửa hàng
                  </span>
                </Radio>
              </div>
              <div
                className={`w-1/2 flex items-center gap-x-2 p-4 ${
                  tab === "home"
                    ? "bg-white rounded-tl-lg"
                    : "rounded-bl-lg bg-[#f1f1f1]"
                }`}
              >
                <Radio checked={tab === "home"} onClick={() => setTab("home")}>
                  <span className="lg:text-[0.9rem] text-[0.77rem] font-medium">
                    Giao hàng tận nơi
                  </span>
                </Radio>
              </div>
            </div>
            {tab === "store" ? (
              <div className="bg-white p-4">
                <span className="text-[0.7rem] font-medium opacity-50">
                  TỈNH / THÀNH PHỐ
                </span>
                <div className="flex items-center gap-x-2 mt-2">
                  <Form.Item name="storeProvince" className="w-1/2 mb-0">
                    <Select
                      variant="underlined"
                      className="w-full"
                      placeholder="Chọn tỉnh / thành phố"
                      options={provinceStore}
                      showSearch
                      onChange={handleChangeProvince}
                    />
                  </Form.Item>
                  <Form.Item name="storeDistrict" className="w-1/2 mb-0">
                    <Select
                      variant="underlined"
                      className="w-full"
                      placeholder="Chọn quận / huyện"
                      options={districtStore}
                      showSearch
                    />
                  </Form.Item>
                </div>
                <div className="mt-4">
                  <span className="text-[0.7rem] font-medium opacity-50">
                    CỬA HÀNG
                  </span>
                  <Form.Item name="storeAddress" className="mt-2 mb-0">
                    <Select
                      variant="underlined"
                      className="w-full"
                      placeholder="Chọn địa chỉ nhận hàng"
                    >
                      <Select.Option value="1">
                        669 Trần Hưng Đạo, P. Lê Hồng Phong, TP. Quy Nhơn, Bình
                        Định
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </div>
                <Form.Item name="storeNote" className="mt-4 mb-0">
                  <Input
                    placeholder="Ghi chú khác (nếu có)"
                    className="w-full h-[3rem]"
                    variant="underlined"
                  />
                </Form.Item>
              </div>
            ) : (
              <div className="bg-white p-4">
                <div className="flex items-center gap-x-4 mt-5">
                  <Form.Item name="receiverName" className="flex-1 mb-0">
                    <Input placeholder="Tên người nhận" variant="underlined" />
                  </Form.Item>
                  <Form.Item name="receiverPhone" className="flex-1 mb-0">
                    <Input
                      placeholder="Số điện thoại người nhận"
                      variant="underlined"
                    />
                  </Form.Item>
                </div>
                <div className="flex items-center gap-x-2 mt-10 flex-wrap">
                  <Form.Item
                    name="homeProvince"
                    className="lg:w-[calc(33.333%-0.5rem)] w-full mb-5 lg:mb-0"
                  >
                    <Select
                      placeholder="Chọn tỉnh / thành phố"
                      variant="underlined"
                      className="w-full"
                      options={provinceHome}
                      showSearch
                      onChange={handleChangeProvinceHome}
                    />
                  </Form.Item>
                  <Form.Item
                    name="homeDistrict"
                    className="lg:w-[calc(33.333%-0.5rem)] w-[calc(50%-0.5rem)] mb-0"
                  >
                    <Select
                      placeholder="Chọn quận / huyện"
                      variant="underlined"
                      className="w-full"
                      options={districtHome}
                      showSearch
                      onChange={handleChangeDistrictHome}
                    />
                  </Form.Item>
                  <Form.Item
                    name="homeWard"
                    className="lg:w-[calc(33.333%-0.5rem)] w-[calc(50%-0.5rem)] mb-0"
                  >
                    <Select
                      placeholder="Chọn phường / xã"
                      variant="underlined"
                      className="w-full"
                      options={wardHome}
                      showSearch
                    />
                  </Form.Item>
                  <Form.Item name="homeAddress" className="w-full mt-10 mb-0">
                    <Input
                      placeholder="Số nhà, tên đường (Vui lòng chọn quận / huyện trước)"
                      variant="underlined"
                      className="w-full"
                    />
                  </Form.Item>
                </div>

                <div className="mt-10">
                  <Form.Item name="homeNote" className="mb-0">
                    <Input
                      variant="underlined"
                      placeholder="Ghi chú khác (nếu có)"
                    />
                  </Form.Item>
                </div>
              </div>
            )}
          </div>
          <div className="border rounded-lg p-4 mt-4 mb-20 bg-white">
            <div className="flex lg:justify-between lg:items-center flex-col lg:flex-row gap-y-2">
              <span className="text-[0.9rem] font-bold whitespace-nowrap">
                Quý khách có muốn xuất hóa đơn công ty không?
              </span>
              <Form.Item name="needInvoice" className="mb-0">
                <div className="flex items-center gap-x-2">
                  <Radio value="yes">
                    <span className="text-[0.9rem] font-bold">Có</span>
                  </Radio>
                  <Radio value="no">
                    <span className="text-[0.9rem] font-bold">Không</span>
                  </Radio>
                </div>
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
};

export default InforReceive;
