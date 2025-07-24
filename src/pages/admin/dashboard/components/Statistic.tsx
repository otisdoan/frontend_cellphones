import { HiArrowTrendingUp } from "react-icons/hi2";
import { HiArrowTrendingDown } from "react-icons/hi2";
import TotalOrder from "./charts/TotalOrder";

const Statistic = () => {
  return (
    <>
      <div className="flex gap-x-2 items-start">
        <div className="w-1/2 flex items-center flex-wrap gap-2">
          <div className="w-[49%] bg-white rounded-md p-3 flex flex-col gap-y-2">
            <span className="font-medium opacity-70">Total Orders</span>
            <span className="text-[2rem] font-bold">7,391</span>
            <div className="flex items-center gap-x-1 whitespace-nowrap">
              <span className="text-[0.8rem] opacity-35">vs Last Week</span>
              <div className="bg-[#d9f8e6] text-[0.5rem] text-[#1b884e] p-1 rounded-lg flex items-center gap-x-1">
                <span>+2.34%</span>
                <HiArrowTrendingUp className="text-[1rem]" />
              </div>
            </div>
          </div>
          <div className="w-[49%] bg-white rounded-md p-3 flex flex-col gap-y-2">
            <span className="font-medium opacity-70">Total Revenue </span>
            <span className="text-[2rem] font-bold">5,698</span>
            <div className="flex items-center gap-x-1 whitespace-nowrap">
              <span className="text-[0.8rem] opacity-35">vs Last Week</span>
              <div className="bg-[#fde0de] text-[0.5rem] text-red-500 p-1 rounded-lg flex items-center gap-x-1">
                <span>-6.34%</span>
                <HiArrowTrendingDown className="text-[1rem]" />
              </div>
            </div>
          </div>
          <div className="w-[49%] bg-white rounded-md p-3 flex flex-col gap-y-2">
            <span className="font-medium opacity-70">Conversion Rate</span>
            <span className="text-[2rem] font-bold">1,472</span>
            <div className="flex items-center gap-x-1 whitespace-nowrap">
              <span className="text-[0.8rem] opacity-35">vs Last Week</span>
              <div className="bg-[#fde0de] text-[0.5rem] text-red-500 p-1 rounded-lg flex items-center gap-x-1">
                <span>-1.34%</span>
                <HiArrowTrendingDown className="text-[1rem]" />
              </div>
            </div>
          </div>
          <div className="w-[49%] bg-white rounded-md p-3 flex flex-col gap-y-2">
            <span className="font-medium opacity-70">Average Order Value</span>
            <span className="text-[2rem] font-bold">10,834</span>
            <div className="flex items-center gap-x-1 whitespace-nowrap">
              <span className="text-[0.8rem] opacity-35">vs Last Week</span>
              <div className="bg-[#d9f8e6] text-[0.5rem] text-[#1b884e] p-1 rounded-lg flex items-center gap-x-1">
                <span>+2.34%</span>
                <HiArrowTrendingUp className="text-[1rem]" />
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 bg-white p-4 rounded-lg h-[17rem]">
          <TotalOrder />
        </div>
      </div>
    </>
  );
};

export default Statistic;
