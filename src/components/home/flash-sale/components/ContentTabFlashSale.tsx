import { ConfigProvider, Tabs, type TabsProps } from "antd";
import ContentTabFlashSale2 from "./ContentTabFlashSale2";
import ContentTabFlashSale1 from "./ContentTabFlashSale1";

const ContentTabFlashSale = () => {
  const items: TabsProps["items"] = [
    {
      key: "11",
      label: (
        <span className="text-white text-[1.2rem] font-bold">
          9h - 11h 2/8/2025
        </span>
      ),
      children: <ContentTabFlashSale2 />,
    },
    {
      key: "21",
      label: (
        <span className="text-white text-[1.2rem] font-bold">
          9h - 11h 3/8/2025
        </span>
      ),
      children: <ContentTabFlashSale1 />,
    },
  ];
  return (
    <>
      <div className="absolute left-[6.6rem]">
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
          <Tabs items={items} tabBarGutter={300} className="absolute z-10" />
        </ConfigProvider>
        <div className="bg-[#ffc403] w-[20rem] h-[0.5rem] rounded-xl absolute top-[3rem] z-30 left-[-6rem]"></div>
        <div className="bg-[#ffc403] w-[20rem] h-[0.5rem] rounded-xl absolute top-[3rem] z-30 right-[-43rem]"></div>
        <div className="bg-linear w-[20rem] h-[3rem] absolute top-[0.5rem] left-[-6rem] z-0"></div>
        <div className="bg-linear w-[20rem] h-[3rem] absolute top-[0.5rem] right-[-43rem] z-0"></div>
      </div>
    </>
  );
};
export default ContentTabFlashSale;
