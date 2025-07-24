import TotalRevenue from "./components/charts/TotalRevenue";
import Statistic from "./components/Statistic";
import TabDashboard from "./components/TabDashboard";

const Dashboard = () => {
  return (
    <>
      <div className="p-4 flex gap-4">
        <div className="w-2/3">
          <div className="flex items-center justify-between mb-4">
            <h1 className="font-medium text-[1.7rem]">Dashboard</h1>
            <TabDashboard />
          </div>
          <Statistic />
          <div className="mt-4 bg-white p-4 rounded-lg overflow-auto">
            <TotalRevenue />
          </div>
        </div>
        <div className="w-1/3 bg-white rounded-lg p-4"></div>
      </div>
    </>
  );
};

export default Dashboard;
