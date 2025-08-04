import LinkCellphone from "../../../../LinkCellohone";

const ContentPopoverSale = () => {
  const list: { title: string; content: { name: string; tag?: string }[] }[] = [
    {
      title: "Khuyến mãi",
      content: [
        { name: "Hotsale cuối tuần" },
        { name: "Ưu đãi thanh toán" },
        { name: "Khách hàng doanh nghiệp B2B" },
        { name: "Mua kèm gia dụng giảm 500K", tag: "MỚI" },
      ],
    },
    {
      title: "Thu cũ đổi mới giá hời",
      content: [
        { name: "iPhone 16 Series trợ giá đến 3 triệu" },
        { name: "S25 Series trợ giá 1 triệu" },
        { name: "Xiaomi 15 trợ giá đến 3 triệu" },
        { name: "Laptop trợ giá đến 4 triệu" },
      ],
    },
    {
      title: "Ưu đãi thành viên",
      content: [{ name: "Chính sách Smember 2025", tag: "MỚI" }],
    },
    {
      title: "Ưu đãi sinh viên",
      content: [
        { name: "Chào năm học mới - Ưu đãi khủng" },
        { name: "Nhập hội S-Student" },
        { name: "Đăng ký S-Student", tag: "HOT" },
        { name: "Laptop giảm đến 500K" },
        { name: "Điện thoại giảm đến 6%" },
        { name: "Loa - tai nghe giảm thêm 5%" },
        { name: "Hàng cũ giảm thêm 10%", tag: "HOT" },
      ],
    },
  ];

  return (
    <>
      <div className="bg-white rounded-lg p-4 flex gap-x-4 w-[60rem] h-[30rem] ml-[1.5rem] border-[1px] mt-[-2.8rem] absolute top-[-18rem]">
        {list.map((item, index) => (
          <div className="flex-1 flex flex-col gap-y-3" key={index}>
            <span className="font-bold text-sm">{item.title}</span>
            {item.content.map((content, contentIndex) => (
              <div key={contentIndex} className="flex items-start gap-x-2">
                <LinkCellphone
                  to="#"
                  children={content.name}
                  className="text-[0.8rem] hover:text-[#d70019] text-black font-light leading-relaxed"
                />
                {content.tag && (
                  <span
                    className={`text-[0.6rem] px-1.5 py-0.5 rounded text-white font-bold flex-shrink-0 ${
                      content.tag === "HOT" ? "bg-red-500" : "bg-blue-500"
                    }`}
                  >
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

export default ContentPopoverSale;
