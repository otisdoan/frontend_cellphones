const ReferralPage = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-sm p-6 text-white">
        <h2 className="text-2xl font-bold">Giới thiệu bạn bè</h2>
        <p className="text-sm mt-2">Giới thiệu bạn bè và nhận ưu đãi hấp dẫn</p>
      </div>

      {/* Referral Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <p className="text-3xl font-bold text-[#d70019]">0</p>
          <p className="text-sm text-gray-600 mt-2">Bạn bè đã giới thiệu</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <p className="text-3xl font-bold text-green-600">0đ</p>
          <p className="text-sm text-gray-600 mt-2">Tổng tiền thưởng</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <p className="text-3xl font-bold text-blue-600">0</p>
          <p className="text-sm text-gray-600 mt-2">Điểm tích lũy</p>
        </div>
      </div>

      {/* Referral Link */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Link giới thiệu của bạn
        </h3>
        <div className="flex gap-x-3">
          <input
            type="text"
            value="https://cellphones.com.vn/ref/ABC123"
            readOnly
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
          />
          <button
            onClick={() => {
              navigator.clipboard.writeText(
                "https://cellphones.com.vn/ref/ABC123"
              );
              alert("Đã sao chép link!");
            }}
            className="px-6 py-2 bg-[#d70019] text-white font-medium rounded-lg hover:bg-[#b8001a] transition-colors whitespace-nowrap"
          >
            Sao chép
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Chia sẻ link này cho bạn bè để cả hai đều nhận ưu đãi
        </p>
      </div>

      {/* How it works */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Cách thức hoạt động
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl font-bold text-blue-600">1</span>
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Chia sẻ link</h4>
            <p className="text-sm text-gray-600">
              Gửi link giới thiệu cho bạn bè qua mạng xã hội
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl font-bold text-green-600">2</span>
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Bạn bè mua hàng</h4>
            <p className="text-sm text-gray-600">
              Bạn bè đăng ký và mua hàng qua link của bạn
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl font-bold text-purple-600">3</span>
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Nhận thưởng</h4>
            <p className="text-sm text-gray-600">
              Cả hai đều nhận voucher và điểm thưởng
            </p>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Ưu đãi khi giới thiệu
        </h3>
        <ul className="space-y-2">
          <li className="flex items-start gap-x-2">
            <svg
              className="w-5 h-5 text-[#d70019] flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm text-gray-700">
              <strong>100.000đ</strong> cho mỗi đơn hàng bạn bè mua thành công
            </span>
          </li>
          <li className="flex items-start gap-x-2">
            <svg
              className="w-5 h-5 text-[#d70019] flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm text-gray-700">
              Bạn bè được giảm <strong>5%</strong> cho đơn hàng đầu tiên
            </span>
          </li>
          <li className="flex items-start gap-x-2">
            <svg
              className="w-5 h-5 text-[#d70019] flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm text-gray-700">
              Tích lũy điểm để đổi quà và nhận thêm ưu đãi
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ReferralPage;
