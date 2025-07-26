import TotalRevenue from "../../../components/admin/charts/TotalRevenue";
import DeliveryTracking from "../../../components/admin/DeliveryTracking";
import Statistics from "../../../components/admin/Statistic";

import TabDashboard from "../../../components/admin/TabDashboard";

const Dashboard = () => {
  return (
    <>
      <div className="p-4 md:flex md:flex-row md:gap-4 flex flex-col gap-y-4">
        <div className="md:w-2/3 w-full">
          <div className="flex items-center justify-between mb-4">
            <h1 className="md:font-medium md:text-[1.7rem] hidden md:block">
              Dashboard
            </h1>
            <TabDashboard />
          </div>
          <Statistics />
          <div className="mt-4 bg-white p-4 rounded-lg overflow-auto">
            <TotalRevenue />
          </div>
        </div>
        <div className="md:w-1/3 bg-white rounded-lg p-4 w-full">
          <DeliveryTracking />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
