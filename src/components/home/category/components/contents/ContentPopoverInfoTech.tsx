import LinkCellphone from "../../../../LinkCellohone";

const ContentPopoverInfoTech = () => {
  const list: { title: string; content: { name: string; tag?: string }[] }[] = [
    {
      title: "Chuyên mục",
      content: [
        { name: "Tin công nghệ" },
        { name: "Khám phá" },
        { name: "S-Games" },
        { name: "Tư vấn" },
        { name: "Trên tay" },
        { name: "Thị trường" },
        { name: "Thủ thuật - Hỏi đáp" },
      ],
    },
  ];

  return (
    <>
      <div className="bg-white rounded-lg p-4 flex gap-x-4 w-[57rem] h-[32rem] ml-[1.5rem] border-[1px] mt-[-2.8rem] absolute top-[-20rem]">
        {list.map((item, index) => (
          <div className="w-full flex flex-col gap-y-3" key={index}>
            <span className="font-bold text-sm">{item.title}</span>
            {item.content.map((content, contentIndex) => (
              <div key={contentIndex} className="flex items-center gap-x-2">
                <LinkCellphone
                  to="#"
                  children={content.name}
                  className="text-[0.8rem] hover:text-[#d70019] text-black font-light leading-relaxed"
                />
                {content.tag && (
                  <span
                    className={`text-[0.6rem] px-1.5 py-0.5 rounded text-white font-bold ${
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

export default ContentPopoverInfoTech;
