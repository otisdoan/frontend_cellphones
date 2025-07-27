import { Input, Tag, Tooltip, type TableProps } from "antd";
import BreadcrumbAmin from "../../../components/admin/BreadcrumbAmin";
import { IoIosSearch } from "react-icons/io";
import type { BreadcrumbItemType } from "antd/es/breadcrumb/Breadcrumb";
import { Link } from "react-router-dom";
import DisplaStatistic, {
  type ListInforProps,
} from "../../../components/admin/DisplaStatistic";
import {
  AiOutlineDesktop,
  AiOutlineException,
  AiOutlineHistory,
  AiOutlinePieChart,
} from "react-icons/ai";
import ButtonCellphoneS from "../../../components/ButtonCellphoneS";
import { IoAddCircleOutline } from "react-icons/io5";
import TableAdmin from "../../../components/admin/templates/TableAdmin";
import { MdDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import { useEffect, useState } from "react";
import { brandApi } from "../../../utils/api/brand.api";
import type { BrandProps } from "../../../types/api/BrandResponse";

const ListBrand = () => {
  const item: BreadcrumbItemType[] = [
    {
      title: <Link to="/admin">Dashboard</Link>,
    },
    {
      title: "brands",
    },
  ];
  const listInfor: ListInforProps[] = [
    {
      title: "Active Brands",
      numbers: 2534,
      icon: <AiOutlineDesktop />,
    },
    {
      title: "Inactive Brands",
      numbers: 163,
      icon: <AiOutlineException />,
    },
    {
      title: "Most Products",
      numbers: 63,
      icon: <AiOutlineHistory />,
    },
    {
      title: "Top Rated",
      numbers: 82,
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
      title: "Slug",
      dataIndex: "slug",
    },
    {
      title: "Logo",
      dataIndex: "logo_url",
      render: (url: string) =>
        url ? (
          <img
            src={url}
            alt="Logo"
            className="w-10 h-10 object-contain rounded border"
          />
        ) : (
          <Tag color="default">No logo</Tag>
        ),
    },
    {
      title: "Description",
      dataIndex: "description",
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
      render: (date: string) => (
        <span>{new Date(date).toLocaleString("vi-VN")}</span>
      ),
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      render: (date: string) => (
        <span>{new Date(date).toLocaleString("vi-VN")}</span>
      ),
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
  const [dataBrands, setDataBrands] = useState<BrandProps[]>([]);

  const fetchBrands = async () => {
    try {
      const result = await brandApi.getAll();
      setDataBrands(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="md:font-medium md:text-[1.7rem] hidden md:block">
              Brands
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
            <span className="text-[1.2rem] font-medium">Brands</span>
            <div className="flex items-center gap-x-4">
              <div>
                <Input
                  placeholder="Search brands"
                  prefix={<IoIosSearch className="text-[1.2rem]" />}
                  className="text-[0.8rem] w-[15rem] bg-[#f5f5f5] h-[2.5rem]"
                />
              </div>
              <ButtonCellphoneS
                children={
                  <div className="flex items-center gap-x-1">
                    <IoAddCircleOutline className="text-white text-[1.5rem]" />
                    New brand
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
              dataSource={dataBrands}
              scroll={{ x: "max-content" }}
              pagination={{ pageSize: 10, position: ["bottomRight"] }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ListBrand;
