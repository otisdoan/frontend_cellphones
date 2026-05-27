import { MdOutlineArrowBack } from "react-icons/md";
import BreadcrumbAmin from "../../../components/admin/BreadcrumbAmin";
import type { BreadcrumbItemType } from "antd/es/breadcrumb/Breadcrumb";
import { Link, useNavigate, useParams } from "react-router-dom";
import FormCreateInventory from "../../../components/forms/admin/FormCreateInventory";

const EditInventory = () => {
  const item: BreadcrumbItemType[] = [
    { title: <Link to="/admin">Dashboard</Link> },
    { title: <Link to="/admin/inventories">Tồn kho</Link> },
    { title: "Chỉnh sửa" },
  ];
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="p-4">
      <div className="md:flex items-center justify-between mb-[2rem]">
        <div>
          <div className="flex items-center gap-x-1">
            <MdOutlineArrowBack className="md:text-[1.5rem] text-[1.3rem] cursor-pointer" onClick={() => navigate(-1)} />
            <h1 className="md:font-medium md:text-[1.7rem] text-[1.2rem] md:block">Chỉnh sửa tồn kho</h1>
          </div>
          <BreadcrumbAmin items={item} />
        </div>
      </div>
      <div className="bg-white rounded-lg mt-4 p-4">
        <span className="font-medium">Chỉnh sửa tồn kho</span>
        {id && <FormCreateInventory id={Number(id)} />}
      </div>
    </div>
  );
};

export default EditInventory;
