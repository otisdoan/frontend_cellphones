import LinkCellphone from "../../../../LinkCellohone";

const ContentPopoverOld = () => {
  const list: { title: string; content: { name: string; tag?: string }[] }[] = [
    {
      title: "Chọn loại sản phẩm cũ",
      content: [
        { name: "Điện thoại cũ" },
        { name: "Máy tính bảng cũ" },
        { name: "Mac cũ" },
        { name: "Laptop cũ" },
        { name: "Tai nghe cũ" },
        { name: "Loa cũ" },
        { name: "Đồng hồ thông minh cũ" },
        { name: "Đồ gia dụng cũ" },
        { name: "Màn hình cũ" },
        { name: "Phụ kiện cũ" },
        { name: "Tivi Cũ" },
      ],
    },
    {
      title: "Chọn dòng iPhone cũ",
      content: [
        { name: "iPhone 16 series cũ" },
        { name: "iPhone 15 series cũ" },
        { name: "iPhone 14 series cũ" },
        { name: "iPhone 13 series cũ" },
        { name: "iPhone 12 series cũ" },
        { name: "iPhone 11 series cũ" },
        { name: "Xem tất cả iPhone cũ" },
      ],
    },
    {
      title: "Điện thoại Android cũ",
      content: [
        { name: "Samsung cũ" },
        { name: "Xiaomi cũ" },
        { name: "OPPO cũ" },
        { name: "Nokia cũ" },
        { name: "realme cũ" },
        { name: "vivo cũ" },
        { name: "ASUS cũ" },
        { name: "TCL cũ" },
        { name: "Infinix cũ" },
      ],
    },
    {
      title: "Chọn hãng laptop cũ",
      content: [
        { name: "Laptop Dell cũ" },
        { name: "Laptop ASUS cũ" },
        { name: "Laptop Acer cũ" },
        { name: "Laptop HP cũ" },
        { name: "Laptop Surface cũ" },
      ],
    },
    {
      title: "Sản phẩm nổi bật ⚡",
      content: [
        { name: "iPhone 16 Pro Max - Cũ đẹp" },
        { name: "iPhone 15 Pro Max cũ đẹp" },
        { name: "iPhone 14 Pro Max cũ đẹp" },
        { name: "iPhone 13 Pro Max cũ đẹp" },
        { name: "Apple Watch Se 44mm 4G cũ đẹp" },
        { name: "S23 Ultra cũ đẹp" },
        { name: "S22 Ultra cũ đẹp" },
        { name: "S24 Ultra cũ" },
      ],
    },
  ];

  return (
    <>
      <div className="bg-white rounded-lg p-4 flex gap-x-4 w-[57rem] h-[32rem] ml-[1.5rem] border-[1px] mt-[-2.8rem] absolute top-[-16rem]">
        {list.map((item, index) => (
          <div className="flex-1 flex flex-col gap-y-2" key={index}>
            <span className="font-bold text-sm">{item.title}</span>
            {item.content.map((content, contentIndex) => (
              <div key={contentIndex} className="flex items-center gap-x-2">
                <LinkCellphone
                  to="#"
                  children={content.name}
                  className="text-[0.8rem] hover:text-[#d70019] text-black font-light leading-relaxed"
                />
                {content.tag && (
                  <span className="text-[0.6rem] px-1 py-0.5 rounded text-white font-bold bg-orange-500">
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

export default ContentPopoverOld;
