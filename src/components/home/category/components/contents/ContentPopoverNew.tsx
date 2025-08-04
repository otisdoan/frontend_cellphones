import LinkCellphone from "../../../../LinkCellohone";

const ContentPopoverNew = () => {
  const list: { title: string; content: { name: string; tag?: string }[] }[] = [
    {
      title: "Chọn theo hãng",
      content: [
        { name: "Thu cũ iPhone" },
        { name: "Thu cũ Samsung" },
        { name: "Thu cũ Xiaomi" },
        { name: "Thu cũ Laptop" },
        { name: "Thu cũ Mac" },
        { name: "Thu cũ iPad" },
        { name: "Thu cũ đồng hồ" },
        { name: "Thu cũ Apple Watch" },
      ],
    },
    {
      title: "Sản phẩm trợ giá cao",
      content: [
        { name: "iPhone 16 Pro Max » 3 triệu" },
        { name: "iPhone 15 Pro Max » 3 triệu" },
        { name: "Galaxy S25 Ultra » 4 triệu" },
        { name: "Galaxy Z Fold 6 » 4 triệu" },
        { name: "Galaxy Z Flip 6 » 1.5 triệu" },
        { name: "Macbook » 3 triệu" },
        { name: "Laptop » 4 triệu" },
      ],
    },
    {
      title: "Sản phẩm giá thu cao ⚡",
      content: [
        { name: "iPhone 15 Pro Max" },
        { name: "iPhone 14 Pro Max" },
        { name: "iPhone 13 Pro Max" },
        { name: "Samsung Galaxy Z Fold 5" },
        { name: "Samsung Galaxy Z Flip 5" },
        { name: "Samsung Galaxy S24 Ultra" },
        { name: "Macbook Air M1" },
      ],
    },
  ];

  return (
    <>
      <div className="bg-white rounded-lg p-4 flex justify-between gap-x-4 w-[57rem] h-[32rem] ml-[1.5rem] border-[1px] mt-[-2.8rem] absolute top-[-14rem]">
        {list.map((item, index) => (
          <div className="w-1/5 flex flex-col gap-y-2" key={index}>
            <span className="font-bold">{item.title}</span>
            {item.content.map((content, index) => (
              <div key={index} className="flex items-center gap-x-2">
                <LinkCellphone
                  to="#"
                  children={content.name}
                  className="text-[0.8rem] hover:text-[#d70019] text-black font-light"
                />
                {content.tag && (
                  <span className="text-[0.6rem] px-1 py-0.5 rounded text-white font-bold bg-blue-500">
                    {content.tag}
                  </span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default ContentPopoverNew;
