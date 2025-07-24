import { Gauge } from "@ant-design/plots";
import { Select } from "antd";
import { createRoot } from "react-dom/client";

const TotalOrder = () => {
  const config = {
    autoFit: true,
    data: {
      target: 120,
      total: 400,
      name: "score",
    },
    scale: {
      color: {
        range: ["#d70019", "#FAAD14", "green"],
      },
    },
  };
  return (
    <>
      <div className="">
        <div className="flex items-center justify-between">
          <h3 className="">Total Order</h3>
          <Select
            defaultValue="lucy"
            style={{ width: 120 }}
            options={[
              { value: "jack", label: "Month 1" },
              { value: "lucy", label: "Month 2" },
              { value: "Yiminghe", label: "Month 3" },
            ]}
          />
        </div>
        <Gauge
          {...config}
          width={300}
          height={300}
          className="flex justify-center"
        />
      </div>
    </>
  );
};
const container = document.getElementById("container");
if (container) {
  const root = createRoot(container);
  root.render(<TotalOrder />);
}
export default TotalOrder;
