import { ConfigProvider, Divider, Tabs, type TabsProps } from "antd";
import ContentTabFlashSale from "./components/ContentTabFlashSale";
import ContetnTabHotSale from "./components/ContetnTabHotSale";

const FlashSale = () => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <div className="">
          <span className="text-[1.5rem] font-bold text-white">
            FLASHSALE GIÁ SỐC
          </span>
        </div>
      ),
      children: <ContentTabFlashSale />,
    },
    {
      key: "2",
      label: (
        <div className="">
          <span className="text-[1.5rem] font-bold text-white">HOT SALE</span>
        </div>
      ),
      children: <ContetnTabHotSale />,
    },
  ];
  return (
    <>
      <div className="relative w-full h-[40rem] hidden md:block">
        <img
          src="/images/front-title-flashsale-block.webp"
          className=" absolute top-0 z-10 h-[5rem] w-full"
        />
        <img
          src="/images/back-title-flashsale-block.webp"
          className="absolute top-0 z-0 mt-[0.05rem] w-full"
        />
        <div className="bg-color w-full h-[30rem] rounded-[1.7rem] border-[0.5rem] border-[#e45464] absolute z-5 top-7"></div>
        <Divider
          type="vertical"
          className="absolute top-5 left-1/2 z-30 h-[2rem] bg-white"
        />
        <div className="bg-[#ffc403] w-[25rem] h-[0.5rem] rounded-xl absolute top-[4rem] z-30 left-[7rem]"></div>
        <div className="bg-[#ffc403] w-[25rem] h-[0.5rem] rounded-xl absolute top-[4rem] z-30 right-[7rem]"></div>
        <div className="absolute top-2 z-30 left-[11rem]">
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
            <Tabs items={items} tabBarGutter={380} />
          </ConfigProvider>
        </div>
      </div>
    </>
  );
};

export default FlashSale;
