import { useState } from "react";

interface WarrantyResult {
  serial: string;
  product: string;
  status: "active" | "expired" | "not_found";
  startDate?: string;
  endDate?: string;
  months?: number;
}

const WarrantyCheck = () => {
  const [serial, setSerial] = useState("");
  const [result, setResult] = useState<WarrantyResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!serial.trim()) return;

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      // Mock result
      setResult({
        serial: serial,
        product: "iPhone 15 Pro Max 256GB",
        status: "active",
        startDate: "2024-01-15",
        endDate: "2025-01-15",
        months: 12,
      });
      setLoading(false);
    }, 1000);
  };

  const getStatusBadge = (status: WarrantyResult["status"]) => {
    const badges = {
      active: { text: "Còn bảo hành", color: "bg-green-100 text-green-800" },
      expired: { text: "Hết bảo hành", color: "bg-red-100 text-red-800" },
      not_found: { text: "Không tìm thấy", color: "bg-gray-100 text-gray-800" },
    };
    return badges[status];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Tra cứu bảo hành
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Nhập số Serial/IMEI để kiểm tra thông tin bảo hành sản phẩm
        </p>
      </div>

      {/* Search Form */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="max-w-2xl">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Số Serial/IMEI <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-x-3">
            <input
              type="text"
              value={serial}
              onChange={(e) => setSerial(e.target.value)}
              placeholder="Nhập số Serial hoặc IMEI"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d70019] focus:border-transparent outline-none"
              onKeyDown={(e) => e.key === "Enter" && handleCheck()}
            />
            <button
              onClick={handleCheck}
              disabled={loading || !serial.trim()}
              className="px-6 py-2 bg-[#d70019] text-white font-medium rounded-lg hover:bg-[#b8001a] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {loading ? "Đang kiểm tra..." : "Tra cứu"}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Số Serial/IMEI thường có 15 ký tự, bạn có thể tìm ở mặt sau máy hoặc
            trong hộp sản phẩm
          </p>
        </div>
      </div>

      {/* Result */}
      {result && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Kết quả tra cứu
          </h3>

          <div className="border border-gray-200 rounded-lg p-4 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-500">Số Serial/IMEI</p>
                <p className="text-base font-semibold text-gray-900 mt-1">
                  {result.serial}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  getStatusBadge(result.status).color
                }`}
              >
                {getStatusBadge(result.status).text}
              </span>
            </div>

            <div className="border-t border-gray-100 pt-4">
              <p className="text-sm text-gray-500">Sản phẩm</p>
              <p className="text-base font-medium text-gray-900 mt-1">
                {result.product}
              </p>
            </div>

            {result.status === "active" && (
              <>
                <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-4">
                  <div>
                    <p className="text-sm text-gray-500">Ngày kích hoạt</p>
                    <p className="text-base font-medium text-gray-900 mt-1">
                      {new Date(result.startDate!).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Ngày hết hạn</p>
                    <p className="text-base font-medium text-gray-900 mt-1">
                      {new Date(result.endDate!).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <p className="text-sm text-gray-500">Thời gian bảo hành</p>
                  <p className="text-base font-medium text-[#d70019] mt-1">
                    {result.months} tháng
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                  <div className="flex gap-x-3">
                    <svg
                      className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-blue-900">
                        Lưu ý quan trọng
                      </p>
                      <ul className="text-sm text-blue-800 mt-2 space-y-1 list-disc list-inside">
                        <li>
                          Bảo hành không áp dụng cho sản phẩm bị rơi vỡ, vào
                          nước
                        </li>
                        <li>Vui lòng mang theo hóa đơn khi đến bảo hành</li>
                        <li>Liên hệ hotline 1800.2097 để được hỗ trợ</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </>
            )}

            {result.status === "expired" && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
                <p className="text-sm text-red-800">
                  Sản phẩm của bạn đã hết thời gian bảo hành. Vui lòng liên hệ
                  trung tâm bảo hành để được tư vấn dịch vụ sửa chữa.
                </p>
              </div>
            )}

            {result.status === "not_found" && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                <p className="text-sm text-yellow-800">
                  Không tìm thấy thông tin bảo hành. Vui lòng kiểm tra lại số
                  Serial/IMEI hoặc liên hệ hotline 1800.2097.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Hướng dẫn tra cứu
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">
              Tìm số Serial trên iPhone/iPad
            </h4>
            <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
              <li>Vào Cài đặt → Cài đặt chung → Thông tin</li>
              <li>Cuộn xuống tìm mục "Số Seri"</li>
              <li>Nhấn giữ để sao chép số Serial</li>
            </ol>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">
              Tìm IMEI trên Android
            </h4>
            <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
              <li>Vào Cài đặt → Giới thiệu về máy</li>
              <li>Tìm mục "IMEI" hoặc "Số seri"</li>
              <li>Hoặc gọi *#06# để hiển thị IMEI</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarrantyCheck;
