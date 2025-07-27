import { Link } from "react-router-dom";
import BreadcrumbAmin from "../../../components/admin/BreadcrumbAmin";
import type { BreadcrumbItemType } from "antd/es/breadcrumb/Breadcrumb";
import { Input, Tag, Tooltip, type TableProps } from "antd";
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
      render: (slug) => (
        <Tooltip title={slug}>
          <span className="line-clamp-1 max-w-[150px]">{slug}</span>
        </Tooltip>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (desc) => (
        <Tooltip title={desc}>
          <span className="line-clamp-1 max-w-[200px]">{desc}</span>
        </Tooltip>
      ),
    },
    {
      title: "Parent Category",
      dataIndex: "parent_id",
      render: (parent_id) =>
        parent_id ? (
          <Tag color="blue">{parent_id}</Tag>
        ) : (
          <Tag color="default">None</Tag>
        ),
    },
    {
      title: "Sort Order",
      dataIndex: "sort_order",
      render: (order) => <Tag color="purple">{order}</Tag>,
    },
    {
      title: "Active",
      dataIndex: "is_active",
      render: (is_active: boolean) => (
        <Tag color={is_active ? "green" : "red"}>
          {is_active ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (date) => <span>{new Date(date).toLocaleString("vi-VN")}</span>,
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      render: (date) => <span>{new Date(date).toLocaleString("vi-VN")}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <div className="flex items-center gap-x-2">
          <Tooltip title="Edit">
            <div className="rounded-full border border-[#0fb981] p-2 cursor-pointer hover:bg-[#e6f9f3] transition">
              <MdOutlineModeEdit className="text-[#0fb981] text-base" />
            </div>
          </Tooltip>
          <Tooltip title="Delete">
            <div className="rounded-full border border-[#d70119] p-2 cursor-pointer hover:bg-[#faeaea] transition">
              <MdDeleteOutline className="text-[#d70119] text-base" />
            </div>
          </Tooltip>
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
                    New category
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
