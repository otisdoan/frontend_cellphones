import { Link } from "react-router-dom";
import BreadcrumbAmin from "../../../components/admin/BreadcrumbAmin";
import type { BreadcrumbItemType } from "antd/es/breadcrumb/Breadcrumb";
import { Input, type TableProps } from "antd";
import { IoIosSearch } from "react-icons/io";
import DisplaStatistic, {
  type ListInforProps,
} from "../../../components/admin/DisplaStatistic";
import { AiOutlineDesktop } from "react-icons/ai";
import { AiOutlineException } from "react-icons/ai";
import { AiOutlineHistory } from "react-icons/ai";
import { AiOutlinePieChart } from "react-icons/ai";
import ButtonCellphoneS from "../../../components/ButtonCellphoneS";
import { IoAddCircleOutline } from "react-icons/io5";
import TableAdmin from "../../../components/admin/templates/TableAdmin";
import { useEffect, useState } from "react";
import type { CategoryProps } from "../../../types/api/CategoryResponse";
import { categoryApi } from "../../../utils/api/category.api";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";

const ListCategory = () => {
  const item: BreadcrumbItemType[] = [
    {
      title: <Link to="/admin">Dashboard</Link>,
    },
    {
      title: "categories",
    },
  ];

  const listInfor: ListInforProps[] = [
    {
      title: "Active Brands",
      numbers: 25,
      icon: <AiOutlineDesktop />,
    },
    {
      title: "Inactive Brands",
      numbers: 16,
      icon: <AiOutlineException />,
    },
    {
      title: "Most Products",
      numbers: 6,
      icon: <AiOutlineHistory />,
    },
    {
      title: "Top Rated",
      numbers: 8,
      icon: <AiOutlinePieChart />,
    },
  ];

  const columns: TableProps["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Image",
      dataIndex: "image_url",
    },
    {
      title: "Slug",
      dataIndex: "slug",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Parent category",
      dataIndex: "parent_id",
    },
    {
      title: "Sort order",
      dataIndex: "sort_order",
    },
    {
      title: "Active",
      dataIndex: "is_active",
      render: (_, { is_active }) =>
        is_active === false ? (
          <span className="text-[#d70119]">{is_active.toString()}</span>
        ) : (
          <span className="text-green-500">{is_active.toString()}</span>
        ),
    },
    {
      title: "Date create",
      dataIndex: "createdAt",
    },
    {
      title: "Date update",
      dataIndex: "updatedAt",
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <div className="flex items-center gap-x-3">
          <div className="rounded-full flex items-center justify-center border-[1px] border-[#0fb981] p-1 cursor-pointer">
            <MdOutlineModeEdit className="text-[#0fb981] text-[0.9rem]" />
          </div>
          <div className="rounded-full flex items-center justify-center border-[1px] border-[#d70119] p-1 cursor-pointer">
            <MdDeleteOutline className="text-[#d70119] text-[0.9rem]" />
          </div>
        </div>
      ),
    },
  ];

  const [dataCategories, setDataCategories] = useState<CategoryProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const result = await categoryApi.getAll();
      setDataCategories(result.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="md:font-medium md:text-[1.7rem] hidden md:block">
              Categories
            </h1>
            <BreadcrumbAmin items={item} />
          </div>
          <div>
            <Input
              placeholder="Search anything"
              prefix={<IoIosSearch className="text-[1.2rem]" />}
              className="text-[0.8rem] w-[15rem] h-[2.5rem]"
            />
          </div>
        </div>
        <DisplaStatistic type="category" listInfor={listInfor} />
        <div className="bg-white rounded-lg p-4 mt-4">
          <div className="flex items-center justify-between">
            <span className="text-[1.2rem] font-medium">Categories</span>
            <div className="flex items-center gap-x-4">
              <div>
                <Input
                  placeholder="Search categories"
                  prefix={<IoIosSearch className="text-[1.2rem]" />}
                  className="text-[0.8rem] w-[15rem] bg-[#f5f5f5] h-[2.5rem]"
                />
              </div>
              <ButtonCellphoneS
                children={
                  <div className="flex items-center gap-x-1">
                    <IoAddCircleOutline className="text-white text-[1.5rem]" />
                    New Category
                  </div>
                }
                defaultActiveBg="#292929"
                defaultHoverBg="#292929"
                defaultHoverBorderColor="#292929"
                className="text-white h-[2rem] bg-black border-none text-[0.8rem]"
              />
            </div>
          </div>
          <div className="mt-4">
            <TableAdmin
              columns={columns}
              dataSource={dataCategories}
              scroll={{ x: "max-content" }}
              loading={loading}
              pagination={{ pageSize: 10, position: ["bottomCenter"] }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ListCategory;
