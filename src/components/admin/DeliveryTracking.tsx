import { Divider, Timeline } from "antd";
import { SmileOutlined } from "@ant-design/icons";

const DeliveryTracking = () => {
  return (
    <div>
      <span className="font-medium opacity-70">Delivery Tracking</span>
      <div className="overflow-auto rounded-lg my-4">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3658.0184572332905!2d109.22037617476627!3d13.78027249663434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x316f6d28e99af3c7%3A0x619cd5c4a441ea8c!2sCellphoneS!5e1!3m2!1svi!2s!4v1753416544379!5m2!1svi!2s"
          width="400"
          height="300"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <Divider />
      <div className="flex flex-col gap-y-4">
        <span className="font-medium opacity-70 mb-4">Shipment History</span>
        <Timeline
          items={[
            {
              color: "green",
              children: "Create a services site 2015-09-01",
            },
            {
              color: "green",
              children: "Create a services site 2015-09-01",
            },
            {
              color: "red",
              children: (
                <>
                  <p>Solve initial network problems 1</p>
                  <p>Solve initial network problems 2</p>
                  <p>Solve initial network problems 3 2015-09-01</p>
                </>
              ),
            },
            {
              children: (
                <>
                  <p>Technical testing 1</p>
                  <p>Technical testing 2</p>
                  <p>Technical testing 3 2015-09-01</p>
                </>
              ),
            },
            {
              color: "gray",
              children: (
                <>
                  <p>Technical testing 1</p>
                  <p>Technical testing 2</p>
                  <p>Technical testing 3 2015-09-01</p>
                </>
              ),
            },
            {
              color: "gray",
              children: (
                <>
                  <p>Technical testing 1</p>
                  <p>Technical testing 2</p>
                  <p>Technical testing 3 2015-09-01</p>
                </>
              ),
            },
            {
              color: "#00CCFF",
              dot: <SmileOutlined />,
              children: <p>Custom color testing</p>,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default DeliveryTracking;
