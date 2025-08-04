import LinkCellphone from "../../../../LinkCellohone";

const ContentPopoverDevice = () => {
  const list: { title: string; content: { name: string }[] }[] = [
    {
      title: "Phụ kiện di động",
      content: [
        { name: "Phụ kiện Apple" },
        { name: "Dán màn hình" },
        { name: "Ốp lưng - Bao da" },
        { name: "Thẻ nhớ" },
        { name: "Apple Care+" },
        { name: "Samsung Care+" },
        { name: "Sim 4G" },
        { name: "Cáp, sạc" },
        { name: "Pin dự phòng" },
        { name: "Tram sạc dự phòng" },
        { name: "Phụ kiện điện thoại" },
      ],
    },
    {
      title: "Phụ kiện Laptop",
      content: [
        { name: "Chuột, bàn phím" },
        { name: "Balo Laptop | Túi chống sốc" },
        { name: "Phần mềm" },
        { name: "Webcam" },
        { name: "Giá đỡ" },
        { name: "Thảm, lót chuột" },
        { name: "Sạc laptop" },
        { name: "Camera phòng họp" },
      ],
    },
    {
      title: "Gaming Gear",
      content: [
        { name: "PlayStation" },
        { name: "ROG Ally" },
        { name: "MSI Claw" },
        { name: "Bàn phím Gaming" },
        { name: "Chuột chơi game" },
        { name: "Tai nghe Gaming" },
        { name: "Tay cầm chơi game" },
        { name: "Xem tất cả Gaming Gear" },
      ],
    },
    {
      title: "Phụ kiện khác",
      content: [
        { name: "Dây đeo đồng hồ" },
        { name: "Dây đeo Airtag" },
        { name: "Phụ kiện tiện ích" },
        { name: "Phụ kiện ô tô" },
        { name: "Bút cảm ứng" },
        { name: "Thiết bị định vị" },
        { name: "Thiết bị lưu trữ" },
        { name: "Thẻ nhớ" },
        { name: "USB" },
        { name: "Ổ cứng di động" },
      ],
    },
  ];

  return (
    <>
      <div className="bg-white rounded-lg p-4 flex gap-x-4 w-[57rem] h-[32rem] ml-[1.5rem] border-[1px] mt-[-2.8rem] absolute top-[-8rem]">
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

export default ContentPopoverDevice;
