import LinkCellphone from "../../../../LinkCellohone";

const ContentPopoverHouse = () => {
  const list: { title: string; content: { name: string }[] }[] = [
    {
      title: "Gia dụng nhà bếp",
      content: [
        { name: "Nồi chiên không dầu" },
        { name: "Máy rửa bát" },
        { name: "Lò vi sóng" },
        { name: "Nồi cơm điện" },
        { name: "Máy xay sinh tố" },
        { name: "Máy ép trái cây" },
        { name: "Máy làm sữa hạt" },
        { name: "Bếp điện" },
        { name: "Ấm siêu tốc" },
        { name: "Nồi áp suất" },
        { name: "Nồi lẩu điện" },
      ],
    },
    {
      title: "Sức khỏe - Làm đẹp",
      content: [
        { name: "Máy do huyết áp" },
        { name: "Máy sấy tóc" },
        { name: "Máy massage" },
        { name: "Máy cạo râu" },
        { name: "Cân sức khỏe" },
        { name: "Bàn chải điện" },
        { name: "Máy tăm nước" },
        { name: "Tông đơ cắt tóc" },
        { name: "Máy cạo râu" },
        { name: "Máy tạo kiểu tóc" },
      ],
    },
    {
      title: "Thiết bị gia đình",
      content: [
        { name: "Robot hút bụi" },
        { name: "Máy lọc không khí" },
        { name: "Quạt" },
        { name: "Máy hút bụi cầm tay" },
        { name: "Máy rửa chén" },
        { name: "TV Box" },
        { name: "Máy chiếu" },
        { name: "Đèn thông minh" },
        { name: "Bàn ủi" },
        { name: "Chăm sóc thú cưng" },
        { name: "Máy hút ẩm" },
      ],
    },
    {
      title: "Sản phẩm nổi bật ⚡",
      content: [
        { name: "Robot hút bụi Dreame X50 Ultra" },
        { name: "Máy chơi game Sony PS5 Slim" },
        { name: "Máy chiếu Beecube X2 Max Gen 5" },
        { name: "Robot hút bụi Roborock Q Revo EDGE 5V1" },
        { name: "Robot hút bụi Ecovacs T30 Pro Omni" },
        { name: "Robot hút bụi Xiaomi X20+" },
        { name: "Máy lọc không khí Xiaomi" },
        { name: "Robot hút bụi Ecovacs" },
        { name: "Robot hút bụi Roborock" },
      ],
    },
    {
      title: "Thương hiệu gia dụng",
      content: [
        { name: "Philips" },
        { name: "Panasonic" },
        { name: "Sunhouse" },
        { name: "Sharp" },
        { name: "Gaabor" },
        { name: "Bear" },
        { name: "AQUA" },
        { name: "Toshiba" },
        { name: "Midea" },
        { name: "Dreame" },
        { name: "Xiaomi" },
        { name: "Cuckoo" },
      ],
    },
  ];

  return (
    <>
      <div className="bg-white rounded-lg p-4 flex gap-x-4 w-[57rem] h-[32rem] ml-[1.5rem] border-[1px] mt-[-2.8rem] absolute top-[-6rem]">
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

export default ContentPopoverHouse;
