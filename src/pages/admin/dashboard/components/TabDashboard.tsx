import { ConfigProvider, Tabs, type TabsProps } from "antd";
import { BsTruck } from "react-icons/bs";
import { PiTrain } from "react-icons/pi";
import { LiaShipSolid } from "react-icons/lia";
import { IoAirplaneOutline } from "react-icons/io5";
import { useState } from "react";

const TabDashboard = () => {
  const [selected, setSelected] = useState<number>(1);
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <div
          className={
            selected === 1
              ? `flex items-center gap-x-1 bg-[#292929] p-2 rounded-lg text-white`
              : `flex items-center gap-x-1 p-1 rounded-lg`
          }
          onClick={() => setSelected(1)}
        >
          <BsTruck className="text-[1.5rem]" />
          <span>Road Freight</span>
        </div>
      ),
      children: "",
    },
    {
      key: "2",
      label: (
        <div
          className={
            selected === 2
              ? `flex items-center gap-x-1 bg-[#292929] p-2 rounded-lg text-white`
              : `flex items-center gap-x-1 p-3 rounded-lg`
          }
          onClick={() => setSelected(2)}
        >
          <PiTrain className="text-[1.5rem]" />
          <span>Road Freight</span>
        </div>
      ),
      children: "",
    },
    {
      key: "3",
      label: (
        <div
          className={
            selected === 3
              ? `flex items-center gap-x-1 bg-[#292929] p-2 rounded-lg text-white`
              : `flex items-center gap-x-1 p-3 rounded-lg`
          }
          onClick={() => setSelected(3)}
        >
          <LiaShipSolid className="text-[1.5rem]" />
          <span>Road Freight</span>
        </div>
      ),
      children: "",
    },
    {
      key: "4",
      label: (
        <div
          className={
            selected === 4
              ? `flex items-center gap-x-1 bg-[#292929] p-2 rounded-lg text-white`
              : `flex items-center gap-x-1 p-3 rounded-lg`
          }
          onClick={() => setSelected(4)}
        >
          <IoAirplaneOutline className="text-[1.5rem]" />
          <span>Road Freight</span>
        </div>
      ),
      children: "",
    },
  ];
  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Tabs: {
              inkBarColor: "none",
              itemHoverColor: "none",
              itemSelectedColor: "white",
              horizontalMargin: "0",
              itemActiveColor: "none",
            },
          },
          token: {
            colorBorderSecondary: "none",
            colorBgContainer: "red",
          },
        }}
      >
        <Tabs
          defaultActiveKey="1"
          items={items}
          className="md:px-1 md:rounded-lg md:bg-white hidden md:block"
        />
      </ConfigProvider>
    </>
  );
};

export default TabDashboard;
