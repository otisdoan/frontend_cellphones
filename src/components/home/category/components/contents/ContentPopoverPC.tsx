import LinkCellphone from "../../../../LinkCellohone";

const ContentPopoverPC = () => {
  const list: { title: string; content: { name: string }[] }[] = [
    {
      title: "Loại PC",
      content: [
        { name: "Build PC" },
        { name: "Cấu hình sẵn" },
        { name: "All In One" },
        { name: "PC bộ" },
      ],
    },
    {
      title: "Linh kiện máy tính",
      content: [
        { name: "CPU" },
        { name: "Main" },
        { name: "RAM" },
        { name: "Ổ cứng" },
        { name: "Nguồn" },
        { name: "VGA" },
        { name: "Tản nhiệt" },
        { name: "Case" },
        { name: "Xem tất cả" },
      ],
    },
    {
      title: "Chọn màn hình theo hãng",
      content: [
        { name: "ASUS" },
        { name: "Samsung" },
        { name: "DELL" },
        { name: "LG" },
        { name: "MSI" },
        { name: "Acer" },
        { name: "Xiaomi" },
        { name: "ViewSonic" },
        { name: "Philips" },
        { name: "AOC" },
        { name: "Dahua" },
      ],
    },
    {
      title: "Chọn màn hình theo nhu cầu",
      content: [
        { name: "Gaming" },
        { name: "Văn phòng" },
        { name: "Đồ họa" },
        { name: "Lập trình" },
        { name: "Màn hình di động" },
        { name: "Arm màn hình" },
        { name: "Xem tất cả" },
      ],
    },
    {
      title: "Gaming Gear",
      content: [
        { name: "PlayStation" },
        { name: "ROG Ally" },
        { name: "Bàn phím Gaming" },
        { name: "Chuột chơi game" },
        { name: "Tai nghe Gaming" },
        { name: "Tay cầm chơi Game" },
        { name: "Xem tất cả" },
      ],
    },
  ];

  return (
    <>
      <div className="bg-white rounded-lg p-4 flex gap-x-4 w-[57rem] h-[32rem] ml-[1.5rem] border-[1px] mt-[-2.8rem] absolute top-[-10rem]">
        {list.map((item, index) => (
          <div className="w-1/5 flex flex-col gap-y-2" key={index}>
            <span className="font-bold">{item.title}</span>
            {item.content.map((content, index) => (
              <div key={index}>
                <LinkCellphone
                  to="#"
                  children={content.name}
                  className="text-[0.8rem] hover:text-[#d70019] text-black font-light"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default ContentPopoverPC;
