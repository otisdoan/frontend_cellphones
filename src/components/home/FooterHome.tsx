import FormCoupon from "../forms/FormCoupon";
import LinkCellphone from "../LinkCellohone";
import SvgLogo from "../svg/SvgLogo";

interface MethodPayProps {
  image: string;
}

interface InforProps {
  content: string;
}

const FooterHome = () => {
  const methodPay: MethodPayProps[] = [
    {
      image: "/images/alepay-logo.webp",
    },
    {
      image: "/images/apple-pay-og.webp",
    },
    {
      image: "/images/fundiin.webp",
    },
    {
      image: "/images/kredivo-logo.webp",
    },
    {
      image: "/images/momo_1.webp",
    },
    {
      image: "/images/mpos-logo.webp",
    },
    {
      image: "/images/onepay-logo.webp",
    },
    {
      image: "/images/vnpay-logo.webp",
    },
    {
      image: "/images/zalopay-logo.webp",
    },
  ];
  const infor: InforProps[] = [
    {
      content: "Mua hàng và thanh toán Online",
    },
    {
      content: "Mua hàng trả góp Online",
    },
    {
      content: "Mua hàng trả góp bằng thẻ tín dụng",
    },
    {
      content: "Chính sách giao hàng",
    },
    {
      content: "Chính sách đổi trả",
    },
    {
      content: "Tra điểm Smember",
    },
    {
      content: "Tra thông tin bảo hành",
    },
    {
      content: "Tra cứu hóa đơn điện tử",
    },
    {
      content: "Thông tin hóa đơn mua hàng",
    },
    {
      content: "Trung tâm bảo hành chính hãng",
    },
    {
      content: "Quy định về việc sao lưu dữ liệu",
    },
    {
      content: "Chính sách khui hộp sản phẩm Apple",
    },
    {
      content: "VAT Refund",
    },
  ];
  const service: InforProps[] = [
    {
      content: "Khách hàng doanh nghiệp (B2B)",
    },
    {
      content: "Ưu đãi thanh toán",
    },
    {
      content: "Quy chế hoạt động",
    },
    {
      content: "Chính sách bảo mật thông tin cá nhân",
    },
    {
      content: "Chính sách Bảo hành",
    },
    {
      content: "Liên kết hợp tác kinh doanh",
    },
    {
      content: "Tuyển dụng",
    },
    {
      content: "Dịch vụ bảo hành mở rộng",
    },
  ];
  const social: MethodPayProps[] = [
    {
      image: "/images/cellphones-youtube.webp",
    },
    {
      image: "/images/cellphones-facebook.webp",
    },
    {
      image: "/images/cellphones-instagram.webp",
    },
    {
      image: "/images/cellphones-tiktok.webp",
    },
    {
      image: "/images/cellphones-zalo.webp",
    },
  ];
  return (
    <>
      <div className="md:flex md:gap-x-4 bg-[#f7f7f8] md:px-[8rem] md:py-4 hidden mt-4">
        <div className="md:w-1/4 md:flex md:flex-col md:gap-y-5">
          <div>
            <h3 className="font-medium md:mb-2">Tổng đài hỗ trợ miễn phí</h3>
            <p className="md:text-[0.8rem] font-light">
              Mua hàng - bảo hành <span className="font-bold">1800.2097</span>{" "}
              (7h30-22h00)
            </p>
            <p className="md:text-[0.8rem] font-light">
              Khiếu nại <span className="font-bold">1800.2063</span>{" "}
              (8h00-21h30)
            </p>
          </div>
          <div>
            <h3 className="font-medium md:mb-4">Phương thức thanh toán</h3>
            <div className="md:flex md:items-center md:flex-wrap md:gap-2">
              {methodPay.map((item, index) => (
                <img key={index} src={item.image} className="" />
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-medium">ĐĂNG KÝ NHẬN TIN KHUYẾN MÃI</h3>
            <div className="md:bg-[#f2f2f3] md:rounded-md md:flex md:flex-col md:gap-y-1 md:text-[0.8rem]">
              <p className="text-[#d70019] md:font-bold">
                Nhận ngày voucher 10%
              </p>
              <p className="opacity-70">
                Voucher sẽ được gửi sau 24h, chỉ áp dụng cho khách hàng mới
              </p>
            </div>
            <div className="md:mt-4">
              <FormCoupon />
            </div>
          </div>
        </div>
        <div className="md:w-1/4">
          <h3 className="font-medium">Thông tin và chính sách</h3>
          <div className="md:flex md:flex-col md:gap-y-2 md:mt-2">
            {infor.map((item, index) => (
              <LinkCellphone
                to="#"
                children={item.content}
                className="text-black text-[0.8rem] font-normal opacity-65"
                key={index}
              />
            ))}
          </div>
        </div>
        <div className="md:w-1/4">
          <h3 className="font-medium">Dịch vụ và thông tin khác</h3>
          <div className="md:flex md:flex-col md:gap-y-2 md:mt-2">
            {service.map((item, index) => (
              <LinkCellphone
                to="#"
                children={item.content}
                className="text-black text-[0.8rem] font-normal opacity-65"
                key={index}
              />
            ))}
          </div>
          <div className="mt-4">
            <div className="md:flex md:items-center md:gap-x-1">
              <div className="md:bg-[#d70019]">
                <SvgLogo width="20" height="20" />
              </div>
              <span className="whitespace-nowrap text-[0.8rem] font-normal opacity-65">
                Smember: Tích điểm & sử dụng ưu đãi
              </span>
            </div>
          </div>
          <div className="md:flex md:gap-x-2 md:mt-2">
            <div className="md:w-1/2">
              <img src="/images/QR_appGeneral.webp" />
            </div>
            <div className="md:w-1/2 md:flex md:flex-col md:justify-between">
              <div className="md:h-[3.5rem]">
                <img src="/images/downloadANDROID.webp" className="md:h-full" />
              </div>
              <div className="md:h-[3.5rem]">
                <img src="/images/downloadiOS.webp" className="md:h-full" />
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-1/4">
          <h3 className="font-medium">Kết nối với CellphoneS</h3>
          <div className="md:flex md:items-center md:gap-x-2 md:mt-2">
            {social.map((item, index) => (
              <img key={index} src={item.image} />
            ))}
          </div>
          <h3 className="font-medium mt-4">Website thành viên</h3>
          <p className="opacity-65 text-[0.8rem] md:mt-4">
            Hệ thống bảo hành và chăm sóc Điện thoại - Máy tính
          </p>
          <img src="/images/dienthoaivui.webp" />
          <p className="opacity-65 text-[0.8rem] md:mt-4">
            Trung tâm bảo hàng ủy quyền Apple
          </p>
          <img src="/images/Logo_CareS_1.webp" />
          <p className="opacity-65 text-[0.8rem] md:mt-4">
            Kênh thông tin giải trí công nghệ cho giới trẻ
          </p>
          <img src="/images/schanel.webp" />
          <p className="opacity-65 text-[0.8rem] md:mt-4">
            Trang thông tin công nghệ mới nhất
          </p>
          <img src="/images/sforum.webp" />
        </div>
      </div>
      <div className="bg-[#f2f2f3] md:flex md:flex-col md:px-[8.5rem] md:py-4 hidden">
        <div className="md:flex md:gap-x-4">
          <div className="md:w-1/4">
            <div className="flex items-center gap-x-2">
              <span className="text-[0.8rem] cursor-pointer">
                Điện thoại iPhone 15
              </span>
              <div className="h-[1rem] w-[0.05rem] bg-black"></div>
              <span className="text-[0.8rem] cursor-pointer">
                Điện thoại iP 16
              </span>
            </div>
            <span className="text-[0.8rem] cursor-pointer">
              iPhone 16 Pro Max
            </span>
          </div>
          <div className="md:w-1/4">
            <div className="flex items-center gap-x-2">
              <span className="text-[0.8rem] cursor-pointer">Điện thoại</span>
              <div className="h-[1rem] w-[0.05rem] bg-black"></div>
              <span className="text-[0.8rem] cursor-pointer">
                Điện thoại iPhone
              </span>
              <div className="h-[1rem] w-[0.05rem] bg-black"></div>
              <span className="text-[0.8rem] cursor-pointer">Xiaomi</span>
            </div>
            <div className="flex items-center gap-x-2 whitespace-nowrap">
              <span className="text-[0.8rem] cursor-pointer">
                Điện thoại Samsung Galaxy
              </span>
              <div className="h-[1rem] w-[0.05rem] bg-black"></div>
              <span className="text-[0.8rem] cursor-pointer">
                Điện thoại OPPO
              </span>
            </div>
          </div>
          <div className="md:w-1/4">
            <div className="flex items-center gap-x-2 text-[0.7rem] whitespace-nowrap">
              <span className="text-[0.8rem] cursor-pointer">Laptop Acer</span>
              <div className="h-[1rem] w-[0.05rem] bg-black"></div>
              <span className="text-[0.8rem] cursor-pointer">Laptop Dell</span>
              <div className="h-[1rem] w-[0.05rem] bg-black"></div>
              <span className="text-[0.8rem] cursor-pointer">Laptop HP</span>
            </div>
            <div className="flex items-center gap-x-2 whitespace-nowrap">
              <span className="text-[0.8rem] cursor-pointer">Tivi</span>
              <div className="h-[1rem] w-[0.05rem] bg-black"></div>
              <span className="text-[0.8rem] cursor-pointer">Tivi Samsung</span>
              <div className="h-[1rem] w-[0.05rem] bg-black"></div>
              <span className="text-[0.8rem] cursor-pointer">Tivi Sony</span>
              <div className="h-[1rem] w-[0.05rem] bg-black"></div>
              <span className="text-[0.8rem] cursor-pointer">Tivi LG</span>
            </div>
          </div>
          <div className="md:w-1/4">
            <div className="flex items-center gap-x-2 whitespace-nowrap">
              <span className="text-[0.8rem] cursor-pointer">Đồ gia dụng</span>
              <div className="h-[1rem] w-[0.05rem] bg-black"></div>
              <span className="text-[0.8rem] cursor-pointer">
                Máy hút bụi gia đình
              </span>
              <div className="h-[1rem] w-[0.05rem] bg-black"></div>
              <span className="text-[0.8rem] cursor-pointer">Build PC</span>
            </div>
            <div className="flex items-center gap-x-2 whitespace-nowrap">
              <span className="text-[0.8rem] cursor-pointer">
                Lắp đặt camera
              </span>
              <div className="h-[1rem] w-[0.05rem] bg-black"></div>
              <span className="text-[0.8rem] cursor-pointer">
                Back to school là gì
              </span>
            </div>
          </div>
        </div>
        <p className="opacity-45 text-[0.8rem] text-center mt-3">
          Công ty TNHH Thương Mại và Dịch Vụ Kỹ Thuật DIỆU PHÚC - GPĐKKD:
          0316172372 cấp tại Sở KH & ĐT TP. HCM. Địa chỉ văn phòng: 350-352 Võ
          Văn Kiệt, Phường Cô Giang, Quận 1, Thành phố Hồ Chí Minh, Việt Nam.
          Điện thoại: 028.7108.9666.
        </p>
        <div className="flex justify-center items-center gap-x-1 mt-3 mb-4">
          <img src="/images/logoSaleNoti.webp" />
          <img src="/images/dmca_copyright_protected150c.png" />
        </div>
      </div>
    </>
  );
};

export default FooterHome;
