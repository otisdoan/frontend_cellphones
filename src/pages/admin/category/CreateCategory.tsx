import { MdOutlineArrowBack } from "react-icons/md";
import BreadcrumbAmin from "../../../components/admin/BreadcrumbAmin";
import type { BreadcrumbItemType } from "antd/es/breadcrumb/Breadcrumb";
import { Link, useNavigate } from "react-router-dom";
import FormCreateCategory from "../../../components/forms/admin/FormCreateCategory";

const CreateCategory = () => {
  const item: BreadcrumbItemType[] = [
    {
      title: <Link to="/admin">Dashboard</Link>,
    },
    {
      title: <Link to="/admin/category">brand</Link>,
    },
    {
      title: "create",
    },
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
                Create new category
              </h1>
            </div>
            <BreadcrumbAmin items={item} />
          </div>
        </div>
        <div className="bg-white rounded-lg mt-4 p-4">
          <span className="font-medium">Create Category Form</span>
          <FormCreateCategory />
        </div>
      </div>
    </>
  );
};

export default CreateCategory;
