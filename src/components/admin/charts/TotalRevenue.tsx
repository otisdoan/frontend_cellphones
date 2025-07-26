import React from "react";
import { Column } from "@ant-design/plots";
import { createRoot } from "react-dom/client";
import { Select } from "antd";

const TotalRevenue: React.FC = () => {
  const config = {
    data: {
      type: "fetch" as const,
      value:
        "https://gw.alipayobjects.com/os/bmw-prod/be63e0a2-d2be-4c45-97fd-c00f752a66d4.json",
    },
    style: {
      fill: "#d70019",
    },
    xField: "城市",
    yField: "销售额",
    scrollbar: {
      x: {
        ratio: 0.05,
      },
    },
  };

  return (
    <>
      <div>
        <div className="flex items-center justify-between mb-5">
          <h3 className="">Total Revenue</h3>
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
        <Column {...config} />
      </div>
    </>
  );
};

const container = document.getElementById("container");
if (container) {
  const root = createRoot(container);
  root.render(<TotalRevenue />);
}

export default TotalRevenue;
