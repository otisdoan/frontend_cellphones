import { useEffect, useState } from "react";
import { menuSmartphoneApi } from "../../../../../utils/api/menu_smartphone.api";
import type { MenuSmartphoneType } from "../../../../../types/api/MenuSmartphoneResponse";
import LinkCellphone from "../../../../LinkCellohone";

const ContentTooltipSamrtphone = () => {
  const [list, setList] = useState<MenuSmartphoneType[]>([]);
  const getMenuSmartphone = async () => {
    try {
      const result = await menuSmartphoneApi.get();
      console.log(result);
      setList(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMenuSmartphone();
  }, []);
  return (
    <>
      <div className="bg-white rounded-lg p-4 flex gap-x-4 w-[57rem] h-[32rem] ml-[13rem] border-[1px] mt-[-2.8rem]">
        {list.map((item, index) => (
          <div className="w-1/5 flex flex-col gap-y-2" key={index}>
            <span className="font-bold">{item.title}</span>
            {item.content.map((content, index) => (
              <div key={index}>
                <LinkCellphone
                  to="#"
                  children={content.name}
                  className="text-[0.8rem] hover:text-[#d70019] text-black font-light"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default ContentTooltipSamrtphone;
