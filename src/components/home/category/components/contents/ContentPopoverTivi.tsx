import LinkCellphone from "../../../../LinkCellohone";

const ContentPopoverTivi = () => {
  const list: { title: string; content: { name: string; tag?: string }[] }[] = [
    {
      title: "Chọn theo hãng",
      content: [
        { name: "Samsung" },
        { name: "LG" },
        { name: "Xiaomi" },
        { name: "Coocaa" },
        { name: "Sony" },
        { name: "Toshiba" },
        { name: "TCL" },
        { name: "Hisense" },
        { name: "Aqua", tag: "MỚI" },
      ],
    },
    {
      title: "Chọn theo mức giá",
      content: [
        { name: "Dưới 5 triệu" },
        { name: "Từ 5 - 9 triệu" },
        { name: "Từ 9 - 12 triệu" },
        { name: "Từ 12 - 15 triệu" },
        { name: "Trên 15 triệu" },
      ],
    },
    {
      title: "Chọn theo độ phân giải",
      content: [
        { name: "Tivi 4K" },
        { name: "Tivi 8K" },
        { name: "Tivi Full HD" },
        { name: "Tivi OLED" },
        { name: "Tivi QLED" },
        { name: "Android Tivi" },
      ],
    },
    {
      title: "Chọn theo kích thước",
      content: [
        { name: "Tivi 32 inch" },
        { name: "Tivi 43 inch" },
        { name: "Tivi 50 inch" },
        { name: "Tivi 55 inch" },
        { name: "Tivi 65 inch" },
        { name: "Tivi 70 inch" },
        { name: "Tivi 85 inch" },
      ],
    },
    {
      title: "Sản phẩm nổi bật ⚡",
      content: [
        { name: "Tivi Samsung UHD 4K 55 inch" },
        { name: "Tivi NanoCell LG 4K 55 inch" },
        { name: "Tivi LG 4K 55 ich Evo Oled Pose" },
        { name: "Tivi Samsung QLED 4K 65 inch" },
        { name: "Tivi Samsung UHD 4K 65 inch 2024" },
        { name: "Tivi LG 43LM5750PTC FHD 43 inch" },
        { name: "Tivi Xiaomi A 4K 2025 55 inch" },
        { name: "Tivi Coocaa khung tranh QLED 4K 55 inch" },
      ],
    },
  ];

  return (
    <>
      <div className="bg-white rounded-lg p-4 flex gap-x-4 w-[57rem] h-[32rem] ml-[1.5rem] border-[1px] mt-[-2.8rem] absolute top-[-12rem]">
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

export default ContentPopoverTivi;
