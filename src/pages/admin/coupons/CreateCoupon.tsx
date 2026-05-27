import { MdOutlineArrowBack } from "react-icons/md";
import BreadcrumbAmin from "../../../components/admin/BreadcrumbAmin";
import { Link, useNavigate } from "react-router-dom";
import type { BreadcrumbProps } from "antd";
import FormCreateCoupon from "../../../components/forms/admin/FormCreateCoupon";

const CreateCoupon = () => {
  const item: BreadcrumbProps["items"] = [
    { title: <Link to="/admin">Dashboard</Link> },
    { title: <Link to="/admin/coupons">Coupons</Link> },
    { title: "Tạo mới" },
  ];
  const navigate = useNavigate();
  return (
    <>
      <div className="p-4">
        <div className="md:flex items-center justify-between mb-[2rem]">
          <div>
            <div className="flex items-center gap-x-1">
              <MdOutlineArrowBack
                className="md:text-[1.5rem] text-[1.3rem] cursor-pointer"
                onClick={() => navigate(-1)}
              />
              <h1 className="md:font-medium md:text-[1.7rem] text-[1.2rem] md:block">
                Tạo coupon mới
              </h1>
            </div>
            <BreadcrumbAmin items={item} />
          </div>
        </div>
        <div className="bg-white rounded-lg mt-4 p-4">
          <span className="font-medium">Thông tin Coupon</span>
          <FormCreateCoupon />
        </div>
      </div>
    </>
  );
};

export default CreateCoupon;
