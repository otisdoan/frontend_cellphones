import LinkCellphone from "../../../../LinkCellohone";

const ContentPopoverClock = () => {
  const list: { title: string; content: { name: string }[] }[] = [
    {
      title: "Loại đồng hồ",
      content: [
        { name: "Đồng hồ thông minh" },
        { name: "Vòng đeo tay thông minh" },
        { name: "Đồng hồ định vị trẻ em" },
        { name: "Dây đeo" },
      ],
    },
    {
      title: "Chọn theo thương hiệu",
      content: [
        { name: "Apple Watch" },
        { name: "Samsung" },
        { name: "Xiaomi" },
        { name: "Huawei" },
        { name: "Coros" },
        { name: "Garmin" },
        { name: "Kieslect" },
        { name: "Amazfit" },
        { name: "Black Shark" },
        { name: "Mibro" },
        { name: "Masstel" },
        { name: "imoo" },
        { name: "Kospet" },
        { name: "MyKID" },
      ],
    },
    {
      title: "Sản phẩm nổi bật",
      content: [
        { name: "Apple Watch Series 10" },
        { name: "Apple Watch Ultra 2" },
        { name: "Samsung Galaxy Watch 8" },
        { name: "Samsung Galaxy Watch 8 Classic" },
        { name: "Samsung Galaxy Watch Ultra" },
        { name: "Huawei Watch Fit 4" },
        { name: "Huawei Watch Fit 4 Pro" },
        { name: "Apple Watch SE" },
        { name: "imoo Z1" },
        { name: "Viettel MyKID 4G Lite" },
        { name: "Amazfit Active 2 Square Premium" },
      ],
    },
    {
      title: "Camera",
      content: [
        { name: "Camera an ninh" },
        { name: "Camera hành trình" },
        { name: "Action Camera" },
        { name: "Camera AI" },
        { name: "Gimbal" },
        { name: "Tripod" },
        { name: "Máy ảnh" },
        { name: "Flycam" },
        { name: "Xem tất cả camera" },
      ],
    },
    {
      title: "Camera nổi bật",
      content: [
        { name: "Camera an ninh Imou" },
        { name: "Camera an ninh Ezviz" },
        { name: "Camera an ninh Xiaomi" },
        { name: "Camera an ninh TP-Link" },
        { name: "Camera Tiandy" },
        { name: "Camera DJI" },
        { name: "Camera Insta360" },
        { name: "Máy ảnh Fujifilm" },
        { name: "Máy ảnh Canon" },
        { name: "Máy ảnh Sony" },
        { name: "Gopro Hero 13" },
        { name: "Flycam dji" },
        { name: "DJI Action 5 Pro" },
        { name: "DJI Action 4" },
      ],
    },
  ];

  return (
    <>
      <div className="bg-white rounded-lg p-4 flex gap-x-4 w-[57rem] h-[32rem] ml-[1.5rem] border-[1px] mt-[-2.8rem] absolute top-[-4rem]">
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

export default ContentPopoverClock;
