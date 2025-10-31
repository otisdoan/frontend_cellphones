const TermsPage = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Điều khoản sử dụng
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Cập nhật lần cuối: 31/10/2024
        </p>
      </div>

      {/* Terms Content */}
      <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            1. Điều khoản chung
          </h3>
          <div className="text-sm text-gray-700 space-y-2">
            <p>
              Chào mừng bạn đến với CellphoneS. Khi sử dụng dịch vụ của chúng
              tôi, bạn đồng ý tuân thủ các điều khoản và điều kiện sau đây.
            </p>
            <p>
              Chúng tôi có quyền thay đổi, sửa đổi hoặc cập nhật các điều khoản
              này bất kỳ lúc nào mà không cần thông báo trước.
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            2. Tài khoản người dùng
          </h3>
          <div className="text-sm text-gray-700 space-y-2">
            <p>
              Khi đăng ký tài khoản, bạn cam kết cung cấp thông tin chính xác,
              đầy đủ và cập nhật.
            </p>
            <p>
              Bạn có trách nhiệm bảo mật thông tin tài khoản và mật khẩu của
              mình. Mọi hoạt động dưới tài khoản của bạn đều là trách nhiệm của
              bạn.
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Không chia sẻ tài khoản cho người khác</li>
              <li>Sử dụng mật khẩu mạnh và thay đổi định kỳ</li>
              <li>Thông báo ngay nếu phát hiện truy cập trái phép</li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            3. Chính sách bảo hành
          </h3>
          <div className="text-sm text-gray-700 space-y-2">
            <p>
              Sản phẩm được bảo hành theo chính sách của nhà sản xuất và
              CellphoneS:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Bảo hành 12 tháng cho điện thoại, máy tính bảng</li>
              <li>Bảo hành 24 tháng cho laptop, smartwatch</li>
              <li>Đổi mới trong 30 ngày nếu có lỗi từ nhà sản xuất</li>
              <li>1 đổi 1 trong 12 tháng cho lỗi phần cứng</li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            4. Chính sách thanh toán
          </h3>
          <div className="text-sm text-gray-700 space-y-2">
            <p>Chúng tôi chấp nhận nhiều hình thức thanh toán:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Tiền mặt khi nhận hàng (COD)</li>
              <li>Chuyển khoản ngân hàng</li>
              <li>Thẻ tín dụng/ghi nợ (Visa, Mastercard)</li>
              <li>Ví điện tử (Momo, ZaloPay, VNPay)</li>
              <li>Trả góp 0% qua thẻ tín dụng hoặc công ty tài chính</li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            5. Chính sách giao hàng
          </h3>
          <div className="text-sm text-gray-700 space-y-2">
            <p>Thời gian giao hàng dự kiến:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Nội thành TP.HCM, Hà Nội: 2-4 giờ</li>
              <li>Các tỉnh thành khác: 2-3 ngày</li>
              <li>Vùng xa, hải đảo: 3-7 ngày</li>
            </ul>
            <p className="mt-2">
              Phí vận chuyển được tính dựa trên khoảng cách và trọng lượng đơn
              hàng. Miễn phí vận chuyển cho đơn hàng từ 500.000đ.
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            6. Chính sách đổi trả
          </h3>
          <div className="text-sm text-gray-700 space-y-2">
            <p>
              Bạn có thể đổi/trả sản phẩm trong 7 ngày kể từ ngày nhận hàng nếu:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Sản phẩm còn nguyên tem, hộp, phụ kiện đầy đủ</li>
              <li>Chưa qua sử dụng, không có dấu hiệu hư hỏng</li>
              <li>Có hóa đơn mua hàng hợp lệ</li>
            </ul>
            <p className="mt-2">
              <strong>Lưu ý:</strong> Một số sản phẩm không áp dụng đổi trả như:
              sản phẩm khuyến mãi, phụ kiện đã mở seal, sim/thẻ nhớ.
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            7. Bảo mật thông tin
          </h3>
          <div className="text-sm text-gray-700 space-y-2">
            <p>CellphoneS cam kết bảo mật thông tin cá nhân của khách hàng:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Không chia sẻ thông tin cho bên thứ ba không liên quan</li>
              <li>Sử dụng công nghệ mã hóa SSL để bảo vệ dữ liệu</li>
              <li>Chỉ thu thập thông tin cần thiết cho giao dịch</li>
              <li>Tuân thủ Luật An toàn thông tin mạng</li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            8. Liên hệ hỗ trợ
          </h3>
          <div className="text-sm text-gray-700 space-y-2">
            <p>
              Nếu có bất kỳ thắc mắc nào về điều khoản sử dụng, vui lòng liên hệ
              với chúng tôi:
            </p>
            <ul className="space-y-1">
              <li>
                <strong>Hotline:</strong> 1800.2097 (miễn phí)
              </li>
              <li>
                <strong>Email:</strong> hotro@cellphones.com.vn
              </li>
              <li>
                <strong>Địa chỉ:</strong> 123 Nguyễn Huệ, Q.1, TP.HCM
              </li>
              <li>
                <strong>Giờ làm việc:</strong> 8:00 - 22:00 (Thứ 2 - CN)
              </li>
            </ul>
          </div>
        </section>
      </div>

      {/* Agreement */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-900">
          Bằng việc sử dụng dịch vụ của CellphoneS, bạn đã đồng ý với toàn bộ
          các điều khoản và điều kiện nêu trên.
        </p>
      </div>
    </div>
  );
};

export default TermsPage;
