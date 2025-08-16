import { MdOutlineArrowBack } from "react-icons/md";
import BreadcrumbAmin from "../../../components/admin/BreadcrumbAmin";
import type { BreadcrumbItemType } from "antd/es/breadcrumb/Breadcrumb";
import { Link, useNavigate, useParams } from "react-router-dom";
import FormCreateUser from "../../../components/forms/admin/FormCreateUser";

const EditUser = () => {
  const item: BreadcrumbItemType[] = [
    {
      title: <Link to="/admin">Dashboard</Link>,
    },
    {
      title: <Link to="/admin/users">users</Link>,
    },
    {
      title: "edit",
    },
  ];
  const navigate = useNavigate();
  const { id } = useParams();

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
                Edit user
              </h1>
            </div>
            <BreadcrumbAmin items={item} />
          </div>
        </div>
        <div className="bg-white rounded-lg mt-4 p-4">
          <span className="font-medium">Edit User Form</span>
          {id && <FormCreateUser id={Number(id)} />}
        </div>
      </div>
    </>
  );
};

export default EditUser;
