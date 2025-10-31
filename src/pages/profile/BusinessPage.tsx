const BusinessPage = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-600 rounded-lg shadow-sm p-6 text-white">
        <h2 className="text-2xl font-bold">Ưu đãi S-Business</h2>
        <p className="text-sm mt-2">
          Giải pháp mua sắm cho doanh nghiệp với ưu đãi đặc quyền
        </p>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">
            Giá ưu đãi doanh nghiệp
          </h3>
          <p className="text-sm text-gray-600">
            Giảm giá đặc biệt cho đơn hàng số lượng lớn
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <svg
              className="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">
            Chính sách thanh toán linh hoạt
          </h3>
          <p className="text-sm text-gray-600">
            Thanh toán công nợ, chuyển khoản, trả góp 0%
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <svg
              className="w-6 h-6 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">
            Hỗ trợ chuyên biệt
          </h3>
          <p className="text-sm text-gray-600">
            Tư vấn viên riêng, giao hàng nhanh, bảo hành ưu tiên
          </p>
        </div>
      </div>

      {/* Registration Form */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Đăng ký tài khoản doanh nghiệp
        </h3>

        <div className="max-w-2xl space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tên công ty <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Nhập tên công ty"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d70019] focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mã số thuế <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Nhập mã số thuế"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d70019] focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Người đại diện <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Nhập họ tên người đại diện"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d70019] focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Số điện thoại <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              placeholder="Nhập số điện thoại"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d70019] focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="Nhập email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d70019] focus:border-transparent outline-none"
            />
          </div>

          <button className="px-6 py-2 bg-[#d70019] text-white font-medium rounded-lg hover:bg-[#b8001a] transition-colors">
            Đăng ký ngay
          </button>
        </div>
      </div>

      {/* Contact */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-2">Cần tư vấn thêm?</h3>
        <p className="text-sm text-blue-800 mb-3">
          Liên hệ hotline doanh nghiệp để được hỗ trợ nhanh chóng
        </p>
        <a
          href="tel:1800.2097"
          className="inline-flex items-center gap-x-2 text-sm font-medium text-blue-900 hover:underline"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          1800.2097
        </a>
      </div>
    </div>
  );
};

export default BusinessPage;
