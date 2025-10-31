import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";

const AccountSettings = () => {
  const { user } = useAuthContext()!;
  const [activeTab, setActiveTab] = useState<"info" | "address" | "security">(
    "info"
  );

  // Mock form states
  const [formData, setFormData] = useState({
    full_name: user?.full_name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    date_of_birth: "",
    gender: "male" as "male" | "female" | "other",
  });

  const [addresses] = useState([
    {
      id: 1,
      label: "Nhà riêng",
      full_name: "Nguyễn Văn A",
      phone: "0123456789",
      address: "123 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP.HCM",
      is_default: true,
    },
  ]);

  const handleSave = () => {
    // Handle save logic
    alert("Thông tin đã được cập nhật!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Thông tin tài khoản
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Quản lý thông tin cá nhân và bảo mật
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b border-gray-200">
          <div className="flex gap-x-8 px-6">
            <button
              onClick={() => setActiveTab("info")}
              className={`py-4 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "info"
                  ? "border-[#d70019] text-[#d70019]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Thông tin cá nhân
            </button>
            <button
              onClick={() => setActiveTab("address")}
              className={`py-4 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "address"
                  ? "border-[#d70019] text-[#d70019]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Địa chỉ nhận hàng
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={`py-4 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "security"
                  ? "border-[#d70019] text-[#d70019]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Bảo mật
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Personal Info Tab */}
          {activeTab === "info" && (
            <div className="max-w-2xl space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Họ và tên <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.full_name}
                  onChange={(e) =>
                    setFormData({ ...formData, full_name: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d70019] focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d70019] focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số điện thoại <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d70019] focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ngày sinh
                </label>
                <input
                  type="date"
                  value={formData.date_of_birth}
                  onChange={(e) =>
                    setFormData({ ...formData, date_of_birth: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d70019] focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Giới tính
                </label>
                <div className="flex gap-x-6">
                  <label className="flex items-center gap-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={formData.gender === "male"}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          gender: e.target.value as "male",
                        })
                      }
                      className="w-4 h-4 text-[#d70019] focus:ring-[#d70019]"
                    />
                    <span className="text-sm text-gray-700">Nam</span>
                  </label>
                  <label className="flex items-center gap-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={formData.gender === "female"}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          gender: e.target.value as "female",
                        })
                      }
                      className="w-4 h-4 text-[#d70019] focus:ring-[#d70019]"
                    />
                    <span className="text-sm text-gray-700">Nữ</span>
                  </label>
                  <label className="flex items-center gap-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value="other"
                      checked={formData.gender === "other"}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          gender: e.target.value as "other",
                        })
                      }
                      className="w-4 h-4 text-[#d70019] focus:ring-[#d70019]"
                    />
                    <span className="text-sm text-gray-700">Khác</span>
                  </label>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-[#d70019] text-white font-medium rounded-lg hover:bg-[#b8001a] transition-colors"
                >
                  Lưu thay đổi
                </button>
              </div>
            </div>
          )}

          {/* Address Tab */}
          {activeTab === "address" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Địa chỉ đã lưu
                </h3>
                <button className="px-4 py-2 bg-[#d70019] text-white text-sm font-medium rounded-lg hover:bg-[#b8001a] transition-colors">
                  Thêm địa chỉ mới
                </button>
              </div>

              <div className="space-y-3">
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-[#d70019] transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-x-2 mb-2">
                          <span className="font-medium text-gray-900">
                            {address.label}
                          </span>
                          {address.is_default && (
                            <span className="px-2 py-0.5 bg-[#d70019] text-white text-xs rounded">
                              Mặc định
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-900">
                          {address.full_name}
                        </p>
                        <p className="text-sm text-gray-600">{address.phone}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          {address.address}
                        </p>
                      </div>
                      <div className="flex gap-x-2">
                        <button className="text-sm text-[#d70019] hover:underline">
                          Sửa
                        </button>
                        <button className="text-sm text-gray-500 hover:text-gray-700">
                          Xóa
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <div className="max-w-2xl space-y-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Mật khẩu</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Thay đổi mật khẩu để bảo mật tài khoản
                    </p>
                  </div>
                  <button className="px-4 py-2 bg-white text-[#d70019] border border-[#d70019] text-sm font-medium rounded-lg hover:bg-red-50 transition-colors">
                    Đổi mật khẩu
                  </button>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Xác thực 2 bước
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Tăng cường bảo mật với xác thực 2 lớp
                    </p>
                  </div>
                  <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                    Bật
                  </button>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Thiết bị đăng nhập
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Quản lý các thiết bị đã đăng nhập
                    </p>
                  </div>
                  <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
