import { HiArrowTrendingUp } from "react-icons/hi2";
import { HiArrowTrendingDown } from "react-icons/hi2";
import { Statistic, type StatisticProps } from "antd";
import CountUp from "react-countup";
import TotalOrder from "./charts/TotalOrder";

const Statistics = () => {
  const formatter: StatisticProps["formatter"] = (value) => (
    <CountUp end={value as number} separator="," />
  );
  return (
    <>
      <div className="md:flex md:flex-row md:gap-x-2 md:items-start flex flex-col gap-y-4">
        <div className="md:w-1/2 flex items-center flex-wrap gap-2 w-full">
          <div className="md:w-[49%] w-full bg-white rounded-md p-3 flex flex-col gap-y-3">
            <span className="font-medium opacity-70">Total Orders</span>
            <span className="text-[2rem] font-bold">
              <Statistic value={112893} formatter={formatter} />
            </span>
            <div className="flex items-center gap-x-1 whitespace-nowrap justify-between">
              <span className="text-[0.8rem] opacity-35">vs Last Week</span>
              <div className="bg-[#d9f8e6] text-[0.5rem] text-[#1b884e] p-1 rounded-lg flex items-center gap-x-1">
                <span>+2.34%</span>
                <HiArrowTrendingUp className="text-[1rem]" />
              </div>
            </div>
          </div>
          <div className="md:w-[49%] w-full bg-white rounded-md p-3 flex flex-col gap-y-3">
            <span className="font-medium opacity-70">Total Revenue </span>
            <span className="text-[2rem] font-bold">
              <Statistic value={48245} formatter={formatter} />
            </span>
            <div className="flex items-center gap-x-1 whitespace-nowrap justify-between">
              <span className="text-[0.8rem] opacity-35">vs Last Week</span>
              <div className="bg-[#fde0de] text-[0.5rem] text-red-500 p-1 rounded-lg flex items-center gap-x-1">
                <span>-6.34%</span>
                <HiArrowTrendingDown className="text-[1rem]" />
              </div>
            </div>
          </div>
          <div className="md:w-[49%] w-full bg-white rounded-md p-3 flex flex-col gap-y-3">
            <span className="font-medium opacity-70">Conversion Rate</span>
            <span className="text-[2rem] font-bold">
              <Statistic value={7245} formatter={formatter} />
            </span>
            <div className="flex items-center gap-x-1 whitespace-nowrap justify-between">
              <span className="text-[0.8rem] opacity-35">vs Last Week</span>
              <div className="bg-[#fde0de] text-[0.5rem] text-red-500 p-1 rounded-lg flex items-center gap-x-1">
                <span>-1.34%</span>
                <HiArrowTrendingDown className="text-[1rem]" />
              </div>
            </div>
          </div>
          <div className="md:w-[49%] w-full bg-white rounded-md p-3 flex flex-col gap-y-3">
            <span className="font-medium opacity-70">Average Order Value</span>
            <span className="text-[2rem] font-bold">
              <Statistic value={588533} formatter={formatter} className="" />
            </span>
            <div className="flex md:items-center gap-x-1 whitespace-nowrap justify-between">
              <span className="text-[0.8rem] opacity-35">vs Last Week</span>
              <div className="bg-[#d9f8e6] text-[0.5rem] text-[#1b884e] p-1 rounded-lg flex items-center gap-x-1">
                <span>+2.34%</span>
                <HiArrowTrendingUp className="text-[1rem]" />
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 w-full bg-white p-4 rounded-lg h-[17rem]">
          <TotalOrder />
        </div>
      </div>
    </>
  );
};

export default Statistics;
