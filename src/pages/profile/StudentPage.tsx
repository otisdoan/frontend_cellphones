const StudentPage = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-sm p-6 text-white">
        <h2 className="text-2xl font-bold">Ưu đãi S-Student/Teacher</h2>
        <p className="text-sm mt-2">
          Giảm giá đặc biệt dành cho học sinh, sinh viên và giáo viên
        </p>
      </div>

      {/* Registration Form */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Đăng ký chương trình S-Student
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start gap-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
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
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Giảm đến 15%</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Cho laptop, tablet, iPad học tập
                </p>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start gap-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
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
                    d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Quà tặng miễn phí</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Balo, chuột không dây, phụ kiện
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex gap-x-3">
            <svg
              className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5"
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
              <p className="text-sm font-medium text-yellow-900">
                Điều kiện đăng ký
              </p>
              <ul className="text-sm text-yellow-800 mt-2 space-y-1 list-disc list-inside">
                <li>Có thẻ sinh viên/học sinh còn hiệu lực</li>
                <li>Thẻ giáo viên/giảng viên đang công tác</li>
                <li>Đăng ký chỉ cần 1 lần và có giá trị 1 năm</li>
              </ul>
            </div>
          </div>
        </div>

        <button className="w-full md:w-auto px-6 py-3 bg-[#d70019] text-white font-medium rounded-lg hover:bg-[#b8001a] transition-colors">
          Đăng ký ngay
        </button>
      </div>

      {/* Benefits Details */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Ưu đãi dành cho bạn
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <img
            src="/images/iPad-dday2-hssv.webp"
            alt="iPad"
            className="w-full rounded-lg"
          />
          <img
            src="/images/Laptop-dday2-hssv.webp"
            alt="Laptop"
            className="w-full rounded-lg"
          />
          <img
            src="/images/Mac-dday2-hssv.webp"
            alt="Mac"
            className="w-full rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default StudentPage;
