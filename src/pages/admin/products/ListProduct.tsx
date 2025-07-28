import type { BreadcrumbItemType } from "antd/es/breadcrumb/Breadcrumb";
import { Link } from "react-router-dom";
import BreadcrumbAmin from "../../../components/admin/BreadcrumbAmin";
import { Input, Tag, type TableProps } from "antd";
import { IoIosSearch } from "react-icons/io";
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
import { productApi } from "../../../utils/api/product.api";
import { useEffect, useState } from "react";
import type { ProductProps } from "../../../types/api/ProductResponse";

const ListProduct = () => {
  const item: BreadcrumbItemType[] = [
    {
      title: <Link to="/admin">Dashboard</Link>,
    },
    {
      title: "products",
    },
  ];

  const listInfor: ListInforProps[] = [
    {
      title: "Total Products",
      numbers: 245,
      icon: <AiOutlineDesktop />,
    },
    {
      title: " Active Products",
      numbers: 366,
      icon: <AiOutlineException />,
    },
    {
      title: "Out-of-stock",
      numbers: 356,
      icon: <AiOutlineHistory />,
    },
    {
      title: "Top Rated",
      numbers: 45,
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
      title: "Sku",
      dataIndex: "sku",
    },
    {
      title: "Slug",
      dataIndex: "slug",
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (price: string) => (
        <span>{Number(price).toLocaleString("vi-VN")}₫</span>
      ),
    },
    {
      title: "Sale Price",
      dataIndex: "sale_price",
      render: (price: string) => (
        <span className="text-red-500">
          {Number(price).toLocaleString("vi-VN")}₫
        </span>
      ),
    },
    {
      title: "Cost Price",
      dataIndex: "cost_price",
      render: (price: string) => (
        <span className="text-gray-500">
          {Number(price).toLocaleString("vi-VN")}₫
        </span>
      ),
    },
    {
      title: "Category ID",
      dataIndex: "category_id",
    },
    {
      title: "Brand ID",
      dataIndex: "brand_id",
    },
    {
      title: "Weight (kg)",
      dataIndex: "weight",
    },
    {
      title: "Dimensions",
      dataIndex: "dimensions",
    },
    {
      title: "Warranty (months)",
      dataIndex: "warranty_period",
    },
    {
      title: "Featured",
      dataIndex: "is_featured",
      render: (featured: boolean) =>
        featured ? <Tag color="green">Yes</Tag> : <Tag color="default">No</Tag>,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: string) => {
        const color = status === "active" ? "green" : "red";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Rating",
      dataIndex: "rating_average",
      render: (rating: string, { rating_count }) => (
        <span>
          {rating} ⭐ ({rating_count})
        </span>
      ),
    },
    {
      title: "Short Description",
      dataIndex: "short_description",
    },
    {
      title: "Full Description",
      dataIndex: "full_description",
    },
    {
      title: "Meta Title",
      dataIndex: "meta_title",
    },
    {
      title: "Meta Description",
      dataIndex: "meta_description",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (value: string) => new Date(value).toLocaleString("vi-VN"),
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      render: (value: string) => new Date(value).toLocaleString("vi-VN"),
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
  const [dataProducts, setDataProducts] = useState<ProductProps[]>([]);
  const fetchProducts = async () => {
    try {
      const result = await productApi.getAll();
      setDataProducts(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <>
      <div className="p-4">
        <div className="md:flex items-center justify-between hidden">
          <div>
            <h1 className="md:font-medium md:text-[1.7rem] hidden md:block">
              Products
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
            <span className="text-[1.2rem] font-medium hidden md:block">
              Products
            </span>
            <div className="flex items-center gap-x-4 md:w-auto w-full">
              <div>
                <Input
                  placeholder="Search products"
                  prefix={<IoIosSearch className="text-[1.2rem]" />}
                  className="text-[0.8rem] md:w-[20rem] w-[15rem] bg-[#f5f5f5] h-[3rem]"
                />
              </div>
              <ButtonCellphoneS
                children={
                  <div className="flex items-center gap-x-1">
                    <IoAddCircleOutline className="text-white text-[1.5rem]" />
                    <span className="hidden md:block">New products</span>
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
              dataSource={dataProducts}
              scroll={{ x: "max-content" }}
              pagination={{ pageSize: 10, position: ["bottomRight"] }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ListProduct;
