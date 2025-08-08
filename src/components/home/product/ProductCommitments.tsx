import type { ReactNode } from "react";
import { BsTags } from "react-icons/bs";
import { FiSmartphone } from "react-icons/fi";
import { GrShieldSecurity } from "react-icons/gr";
import { HiCpuChip } from "react-icons/hi2";

const ProductCommitments = () => {
  const commit: { icon: ReactNode; content: string }[] = [
    {
      icon: <FiSmartphone />,
      content:
        "Máy mới 100% , chính hãng Apple Việt Nam. CellphoneS hiện là đại lý bán lẻ uỷ quyền iPhone chính hãng VN/A của Apple Việt Nam",
    },
    {
      icon: <GrShieldSecurity />,
      content:
        "1 ĐỔI 1 trong 30 ngày nếu có lỗi phần cứng nhà sản xuất. Bảo hành 12 tháng tại trung tâm bảo hành chính hãng Apple: CareS.vn",
    },
    {
      icon: <HiCpuChip />,
      content: "iPhone sử dụng iOS 18, Cáp Sạc USB‑C (1m), Tài liệu",
    },
    {
      icon: <BsTags />,
      content:
        "Giá sản phẩm đã bao gồm thuế VAT, giúp bạn yên tâm và dễ dàng trong việc tính toán chi phí.",
    },
  ];
  return (
    <>
      <div>
        <h3 className="font-bold my-4">Cam kết sản phẩm</h3>
        <div className="flex gap-4 flex-wrap">
          {commit.map((item, index) => (
            <div
              className="flex-[1_1_calc(50%-1rem)] p-4 bg-[#f7f7f8] rounded-lg flex flex-col gap-y-4 h-[10rem]"
              key={index}
            >
              <div className="flex justify-center items-center bg-[#d70019] p-1 rounded-lg w-7 h-7">
                <div className="text-white">{item.icon}</div>
              </div>
              <span className="text-[0.8rem] opacity-65">{item.content}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductCommitments;
