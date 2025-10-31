import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Benefit {
  id: number;
  title: string;
  description: string;
  discount: string;
  image: string;
  category: string;
  validUntil: string;
  terms: string[];
}

const BenefitsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"all" | "available" | "used">(
    "all"
  );

  // Mock benefits data
  const benefits: Benefit[] = [
    {
      id: 1,
      title: "Giảm 500.000đ cho đơn hàng từ 10 triệu",
      description: "Áp dụng cho tất cả sản phẩm Apple chính hãng",
      discount: "500.000đ",
      image: "/images/apple-chinh-hang-home.webp",
      category: "Smember",
      validUntil: "2024-12-31",
      terms: [
        "Áp dụng cho đơn hàng từ 10 triệu trở lên",
        "Không áp dụng đồng thời với chương trình khác",
        "Mỗi tài khoản sử dụng tối đa 1 lần/tháng",
      ],
    },
    {
      id: 2,
      title: "Miễn phí vận chuyển toàn quốc",
      description: "Giao hàng nhanh trong 24h tại TP.HCM và Hà Nội",
      discount: "Free Ship",
      image: "/images/GoRec.webp",
      category: "Smember",
      validUntil: "2024-12-31",
      terms: [
        "Áp dụng cho tất cả đơn hàng",
        "Giao hàng trong 24h tại TP.HCM, Hà Nội",
        "Giao hàng trong 2-3 ngày tại các tỉnh thành khác",
      ],
    },
    {
      id: 3,
      title: "Ưu đãi độc quyền cho S-Student",
      description: "Giảm thêm 10% cho laptop, tablet học tập",
      discount: "10%",
      image: "/images/iPad-dday2-hssv.webp",
      category: "S-Student",
      validUntil: "2024-12-31",
      terms: [
        "Áp dụng cho sinh viên có thẻ HSSV hợp lệ",
        "Giảm 10% cho laptop, tablet, iPad",
        "Tặng kèm balo, chuột không dây",
      ],
    },
    {
      id: 4,
      title: "Tặng thêm 6 tháng bảo hành",
      description: "Gia hạn bảo hành cho sản phẩm điện thoại, laptop",
      discount: "6 tháng",
      image: "/images/Logo_CareS_1.webp",
      category: "Smember",
      validUntil: "2024-12-31",
      terms: [
        "Áp dụng cho sản phẩm mua tại CellphoneS",
        "Thời gian bảo hành tăng từ 12 tháng lên 18 tháng",
        "Bảo hành tại tất cả cửa hàng toàn quốc",
      ],
    },
  ];

  const filteredBenefits = benefits.filter(() => {
    if (activeTab === "all") return true;
    if (activeTab === "available") return true; // Mock: all available
    if (activeTab === "used") return false; // Mock: none used
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-lg shadow-sm p-6 text-white">
        <h2 className="text-2xl font-bold">Hàng thành viên và ưu đãi</h2>
        <p className="text-sm mt-2 text-red-50">
          Tận hưởng những đặc quyền dành riêng cho thành viên Smember
        </p>
        <div className="flex items-center gap-x-6 mt-4">
          <div className="text-center">
            <p className="text-3xl font-bold">{benefits.length}</p>
            <p className="text-sm text-red-50">Ưu đãi khả dụng</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">0</p>
            <p className="text-sm text-red-50">Đã sử dụng</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b border-gray-200">
          <div className="flex gap-x-8 px-6">
            <button
              onClick={() => setActiveTab("all")}
              className={`py-4 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "all"
                  ? "border-[#d70019] text-[#d70019]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setActiveTab("available")}
              className={`py-4 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "available"
                  ? "border-[#d70019] text-[#d70019]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Khả dụng
            </button>
            <button
              onClick={() => setActiveTab("used")}
              className={`py-4 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "used"
                  ? "border-[#d70019] text-[#d70019]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Đã sử dụng
            </button>
          </div>
        </div>

        {/* Benefits List */}
        <div className="p-6">
          {filteredBenefits.length === 0 ? (
            <div className="text-center py-12">
              <img
                src="/images/chibi2.webp"
                alt="Empty"
                className="w-24 h-28 mx-auto opacity-50"
              />
              <p className="text-gray-500 mt-4">Chưa có ưu đãi nào</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredBenefits.map((benefit) => (
                <div
                  key={benefit.id}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative">
                    <img
                      src={benefit.image}
                      alt={benefit.title}
                      className="w-full h-40 object-cover"
                    />
                    <span className="absolute top-3 right-3 px-3 py-1 bg-[#d70019] text-white text-xs font-semibold rounded-full">
                      {benefit.discount}
                    </span>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-x-2 mb-2">
                      <span className="px-2 py-1 bg-red-100 text-[#d70019] text-xs font-medium rounded">
                        {benefit.category}
                      </span>
                      <span className="text-xs text-gray-500">
                        HSD:{" "}
                        {new Date(benefit.validUntil).toLocaleDateString(
                          "vi-VN"
                        )}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {benefit.description}
                    </p>
                    <div className="bg-gray-50 rounded p-3 mb-4">
                      <p className="text-xs font-medium text-gray-700 mb-2">
                        Điều kiện:
                      </p>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {benefit.terms.slice(0, 2).map((term, idx) => (
                          <li key={idx} className="flex items-start gap-x-2">
                            <span className="text-[#d70019] mt-0.5">•</span>
                            <span className="line-clamp-1">{term}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button
                      onClick={() => navigate("/products")}
                      className="w-full px-4 py-2 bg-[#d70019] text-white text-sm font-medium rounded-lg hover:bg-[#b8001a] transition-colors"
                    >
                      Sử dụng ngay
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Chưa phải là thành viên S-Student?
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Đăng ký ngay để nhận thêm nhiều ưu đãi độc quyền
            </p>
          </div>
          <button
            onClick={() => navigate("/profile/student")}
            className="px-6 py-2 bg-[#d70019] text-white font-medium rounded-lg hover:bg-[#b8001a] transition-colors whitespace-nowrap"
          >
            Đăng ký ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default BenefitsPage;
