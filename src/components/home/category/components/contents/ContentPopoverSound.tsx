import LinkCellphone from "../../../../LinkCellohone";

const ContentPopoverSound = () => {
  const list: { title: string; content: { name: string }[] }[] = [
    {
      title: "Chọn loại tai nghe",
      content: [
        { name: "Bluetooth" },
        { name: "Chụp tai" },
        { name: "Nhét tai" },
        { name: "Có dây" },
        { name: "Thể thao" },
        { name: "Gaming" },
        { name: "Xem tất cả tai nghe" },
      ],
    },
    // {
    //   title: "Mic",
    //   content: [
    //     { name: "Mic cài áo" },
    //     { name: "Mic phòng thu, podcast" },
    //     { name: "Mic livestream" },
    //     { name: "Micro không dây" },
    //   ],
    // },
    {
      title: "Hãng tai nghe",
      content: [
        { name: "Apple" },
        { name: "Sony" },
        { name: "JBL" },
        { name: "Samsung" },
        { name: "Marshall" },
        { name: "Soundpeats" },
        { name: "Bose" },
        { name: "Edifier" },
        { name: "Xiaomi" },
        { name: "Huawei" },
        { name: "Sennheiser" },
        { name: "Havit" },
        { name: "Beats" },
        { name: "Tronsmart" },
      ],
    },
    {
      title: "Chọn theo giá",
      content: [
        { name: "Tai nghe dưới 200K" },
        { name: "Tai nghe dưới 500K" },
        { name: "Tai nghe dưới 1 triệu" },
        { name: "Tai nghe dưới 2 triệu" },
        { name: "Tai nghe dưới 5 triệu" },
      ],
    },
    // {
    //   title: "Chọn loại loa",
    //   content: [
    //     { name: "Loa Bluetooth" },
    //     { name: "Loa Karaoke" },
    //     { name: "Loa kéo" },
    //     { name: "Loa Soundbar" },
    //     { name: "Loa vi tính" },
    //     { name: "Xem tất cả loa" },
    //   ],
    // },
    {
      title: "Hãng loa",
      content: [
        { name: "JBL" },
        { name: "Marshall" },
        { name: "Harman Kardon" },
        { name: "Acnos" },
        { name: "Samsung" },
        { name: "Sony" },
        { name: "Arirang" },
        { name: "LG" },
        { name: "Alpha Works" },
        { name: "Edifier" },
        { name: "Bose" },
        { name: "Nanomax" },
        { name: "Tronsmart" },
      ],
    },
    {
      title: "Sản phẩm nổi bật",
      content: [
        { name: "AirPods 4" },
        { name: "AirPods Pro 2" },
        { name: "Galaxy Buds 3 pro" },
        { name: "JBL Tour Pro 3" },
        { name: "Sony WH-1000XM6" },
        { name: "OPPO Enco Air3i – Chỉ có tại CPS" },
        { name: "Redmi Buds 6 Pro" },
        { name: "Onyx Studio 9" },
        { name: "Marshall Willen II" },
        { name: "JBL Partybox Encore 2" },
      ],
    },
  ];
  return (
    <>
      <div className="bg-white rounded-lg p-4 flex gap-x-4 w-[57rem] h-[32rem] ml-[1.5rem] border-[1px] mt-[-2.8rem] absolute top-[-2.2rem]">
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

export default ContentPopoverSound;
