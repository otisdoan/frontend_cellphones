import { Input, Radio, Select } from "antd";
import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";

const InforReceive = () => {
  const [tab, setTab] = useState<string>("store");
  const { user } = useAuthContext()!;

  return (
    <>
      <div className="mt-5">
        <h2 className="text-[1.1rem] mb-3">THÔNG TIN NHẬN HÀNG</h2>
        <div className="border rounded-lg overflow-hidden">
          <div className="flex items-center">
            <div
              className={`w-1/2 flex items-center gap-x-2 p-4 ${
                tab === "store" ? "bg-white rounded-tr-lg" : "bg-[#f1f1f1]"
              }`}
            >
              <Radio checked={tab === "store"} onClick={() => setTab("store")}>
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
                <Select
                  variant="underlined"
                  className="w-1/2"
                  placeholder="Chọn tỉnh / thành phố"
                >
                  <Select.Option value="1">Hà Nội</Select.Option>
                  <Select.Option value="2">Hồ Chí Minh</Select.Option>
                  <Select.Option value="3">Đà Nẵng</Select.Option>
                </Select>
                <Select
                  variant="underlined"
                  className="w-1/2"
                  placeholder="Chọn quận / huyện"
                >
                  <Select.Option value="1">Hà Nội</Select.Option>
                  <Select.Option value="2">Hồ Chí Minh</Select.Option>
                  <Select.Option value="3">Đà Nẵng</Select.Option>
                </Select>
              </div>
              <div className="mt-4">
                <span className="text-[0.7rem] font-medium opacity-50">
                  CỬA HÀNG
                </span>
                <Select
                  variant="underlined"
                  className="w-full mt-2"
                  placeholder="Chọn địa chỉ nhận hàng"
                >
                  <Select.Option value="1">Hà Nội</Select.Option>
                  <Select.Option value="2">Hồ Chí Minh</Select.Option>
                  <Select.Option value="3">Đà Nẵng</Select.Option>
                </Select>
              </div>
              <Input
                placeholder="Ghi chú khác (nếu có)"
                className="w-full mt-4 h-[3rem]"
                variant="underlined"
              />
            </div>
          ) : (
            <div className="bg-white p-4">
              <div className="flex items-center gap-x-4 mt-5">
                <Input
                  placeholder="Tên người nhận"
                  variant="underlined"
                  value={user?.full_name}
                />
                <Input
                  placeholder="Số điện thoại người nhận"
                  variant="underlined"
                  value={user?.phone}
                />
              </div>
              <div className="flex items-center gap-x-2 mt-10 flex-wrap">
                <Select
                  placeholder="Chọn tỉnh / thành phố"
                  variant="underlined"
                  className="lg:w-[calc(33.333%-0.5rem)] w-full mb-5 lg:mb-0"
                />
                <Select
                  placeholder="Chọn quận / huyện"
                  variant="underlined"
                  className="lg:w-[calc(33.333%-0.5rem)] w-[calc(50%-0.5rem)]"
                />
                <Select
                  placeholder="Chọn phường / xã"
                  variant="underlined"
                  className="lg:w-[calc(33.333%-0.5rem)] w-[calc(50%-0.5rem)]"
                />
                <Select
                  placeholder="Số nhà, tên đường (Vui lòng chọn quận / huyện trước)"
                  variant="underlined"
                  className="w-full mt-5"
                />
              </div>

              <div className="mt-10">
                <Input
                  variant="underlined"
                  placeholder="Ghi chú khác (nếu có)"
                />
              </div>
            </div>
          )}
        </div>
        <div className="border rounded-lg p-4 mt-4 mb-20 bg-white">
          <div className="flex lg:justify-between lg:items-center flex-col lg:flex-row gap-y-2">
            <span className="text-[0.9rem] font-bold whitespace-nowrap">
              Quý khách có muốn xuất hóa đơn công ty không?
            </span>
            <div className="flex items-center gap-x-2">
              <Radio>
                <span className="text-[0.9rem] font-bold">Có</span>
              </Radio>
              <Radio>
                <span className="text-[0.9rem] font-bold">Không</span>
              </Radio>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InforReceive;
