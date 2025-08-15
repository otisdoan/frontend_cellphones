import { Link, useNavigate } from "react-router-dom";
import BreadcrumbAmin from "../../../components/admin/BreadcrumbAmin";
import type { BreadcrumbItemType } from "antd/es/breadcrumb/Breadcrumb";
import { Input, Popconfirm, Tag, Tooltip, type TableProps } from "antd";
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
import { MdDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import { productVariantApi } from "../../../utils/api/product_variant.api";
import { useEffect, useState } from "react";
import type { ProductVatiantProp } from "../../../types/api/ProductVariantReponse";
import { useMessage } from "../../../hooks/useMessage";

const ListProductVariant = () => {
  const navigate = useNavigate();
  const { showSuccess, contextHolder } = useMessage();

  const item: BreadcrumbItemType[] = [
    {
      title: <Link to="/admin">Dashboard</Link>,
    },
    {
      title: "product-variants",
    },
  ];

  const listInfor: ListInforProps[] = [
    {
      title: "Active",
      numbers: 34,
      icon: <AiOutlineDesktop />,
    },
    {
      title: "Inactive",
      numbers: 23,
      icon: <AiOutlineException />,
    },
    {
      title: "Low Stock",
      numbers: 62,
      icon: <AiOutlineHistory />,
    },
    {
      title: "Out of Stock",
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
      title: "Product Name",
      dataIndex: "name",
      render: (name) => (
        <Tooltip title={name}>
          <span className="max-w-[150px]">{name}</span>
        </Tooltip>
      ),
    },
    {
      title: "Variant Name",
      dataIndex: "variant_name",
      render: (name) => (
        <Tooltip title={name}>
          <span className="max-w-[150px]">{name}</span>
        </Tooltip>
      ),
    },
    {
      title: "Image",
      dataIndex: "image_url",
      render: (url: string) =>
        url ? (
          <img
            src={url}
            alt="Variant"
            className="w-10 h-10 object-contain rounded border"
          />
        ) : (
          <Tag color="default">No image</Tag>
        ),
    },
    {
      title: "SKU",
      dataIndex: "sku",
      render: (sku) => (
        <Tooltip title={sku}>
          <span className="max-w-[100px]">{sku}</span>
        </Tooltip>
      ),
    },
    {
      title: "Capacity",
      dataIndex: "capacity",
      render: (capacity) =>
        capacity ? (
          <Tag color="blue">{capacity}</Tag>
        ) : (
          <Tag color="default">None</Tag>
        ),
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (price: number) => (
        <span className="text-green-600">
          {price?.toLocaleString("vi-VN")}₫
        </span>
      ),
    },
    {
      title: "Sale Price",
      dataIndex: "sale_price",
      render: (price: number) => (
        <span className="text-red-500">{price?.toLocaleString("vi-VN")}₫</span>
      ),
    },
    {
      title: "Stock",
      dataIndex: "stock_quantity",
      render: (stock: number) => (
        <Tag color={stock > 10 ? "green" : stock > 0 ? "orange" : "red"}>
          {stock}
        </Tag>
      ),
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
      render: (_, record) => (
        <div className="flex items-center gap-x-2">
          <Tooltip title="Edit">
            <div
              className="rounded-full border border-[#0fb981] p-2 cursor-pointer hover:bg-[#e6f9f3] transition"
              onClick={() =>
                navigate(`/admin/product-variant/${record.id}/edit`)
              }
            >
              <MdOutlineModeEdit className="text-[#0fb981] text-base" />
            </div>
          </Tooltip>
          <Popconfirm
            title="Delete the record"
            description="Are you sure to delete this product variant?"
            onConfirm={() => handleDelete(record.id)}
            okText="Delete"
            cancelText="Cancel"
            placement="leftTop"
          >
            <div className="rounded-full border border-[#d70119] p-2 cursor-pointer hover:bg-[#faeaea] transition">
              <MdDeleteOutline className="text-[#d70119] text-base" />
            </div>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const [dataVariants, setDataVariants] = useState<ProductVatiantProp[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(false);

  const fetchVariants = async () => {
    try {
      setLoading(true);
      const result = await productVariantApi.getAll();
      if (Array.isArray(result.data)) {
        setDataVariants(result.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const result = await productVariantApi.delete(id);
      showSuccess(result.message);
      setReload(!reload);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVariants();
  }, [reload]);

  return (
    <>
      {contextHolder}
      <div className="p-4">
        <div className="md:flex items-center justify-between hidden">
          <div>
            <h1 className="md:font-medium md:text-[1.7rem] hidden md:block">
              Product Variants
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
              Product Variants
            </span>
            <div className="flex items-center gap-x-4 md:w-auto w-full">
              <div>
                <Input
                  placeholder="Search product variants"
                  prefix={<IoIosSearch className="text-[1.2rem]" />}
                  className="text-[0.8rem] md:w-[20rem] w-[15rem] bg-[#f5f5f5] h-[3rem]"
                />
              </div>
              <ButtonCellphoneS
                children={
                  <div className="flex items-center gap-x-1">
                    <IoAddCircleOutline className="text-white text-[1.5rem]" />
                    <span className="hidden md:block">New variant</span>
                  </div>
                }
                defaultActiveBg="#292929"
                defaultHoverBg="#292929"
                defaultHoverBorderColor="#292929"
                className="text-white h-[2rem] bg-black border-none text-[0.8rem]"
                onClick={() => navigate("/admin/product-variant/create")}
              />
            </div>
          </div>
          <div className="mt-4">
            <TableAdmin
              columns={columns}
              dataSource={dataVariants}
              scroll={{ x: "max-content" }}
              loading={loading}
              pagination={{ pageSize: 10, position: ["bottomRight"] }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ListProductVariant;
