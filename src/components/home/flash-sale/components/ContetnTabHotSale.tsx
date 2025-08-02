import { ConfigProvider, Tabs, type TabsProps } from "antd";
import ContentTabSmartphone from "./ContentTabSmartphone";

const ContetnTabHotSale = () => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <div className="p-1 px-2 bg-[#ffffff] rounded-lg">
          <span className="text-black">Điện thoại, Tablet</span>
        </div>
      ),
      children: <ContentTabSmartphone />,
    },
    {
      key: "2",
      label: (
        <div className="p-1 px-2 bg-[#ffffff] rounded-lg">
          <span className="text-black">Phụ kiện, PC</span>
        </div>
      ),
      children: "",
    },
    {
      key: "3",
      label: (
        <div className="p-1 px-2 bg-[#ffffff] rounded-lg">
          <span className="text-black">Gia dụng, Điện máy</span>
        </div>
      ),
      children: "",
    },
  ];
  return (
    <>
      <div className="absolute top-0 w-[152%] left-[-10rem] mt-[1rem]">
        <div className="flex justify-between">
          <div className="w-[25rem] h-[5rem] mt-[-1.5rem]">
            <img
              src="/images/tagline-hot-sale.webp"
              className="w-full h-full"
            />
          </div>
          <div className="">
            <ConfigProvider
              theme={{
                components: {
                  Tabs: {
                    inkBarColor: "none",
                    itemActiveColor: "black",
                    itemHoverColor: "black",
                    itemSelectedColor: "black",
                  },
                },
                token: {
                  colorBorderSecondary: "none",
                },
              }}
            >
              <Tabs items={items} tabBarGutter={10} />
            </ConfigProvider>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContetnTabHotSale;
