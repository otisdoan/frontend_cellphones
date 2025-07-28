import { Statistic, type StatisticProps } from "antd";
import type { JSX } from "react";
import CountUp from "react-countup";

export interface ListInforProps {
  title: string;
  numbers: number;
  icon: JSX.Element;
}
interface DisplaStatisticProps {
  type: "category" | "brand" | "products";
  listInfor: ListInforProps[];
}

const DisplaStatistic = ({ type, listInfor }: DisplaStatisticProps) => {
  const formatter: StatisticProps["formatter"] = (value) => (
    <CountUp end={value as number} separator="," />
  );
  return (
    <>
      {type === "category" && (
        <div className="flex items-center gap-4 mt-4 flex-wrap md:flex-nowrap ">
          {listInfor.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-white rounded-lg md:w-1/4 w-[calc(50%-0.5rem)]"
            >
              <div className="bg-[#f04a4a] w-[3rem] h-[3rem] flex items-center justify-center text-white rounded-md text-[1.5rem]">
                {item.icon}
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[0.7rem] font-light">{item.title}</span>
                <Statistic
                  value={item.numbers}
                  formatter={formatter}
                  valueStyle={{ fontSize: "2.5rem" }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default DisplaStatistic;
