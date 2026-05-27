import { Link, useNavigate } from "react-router-dom";
import BreadcrumbAmin from "../../../components/admin/BreadcrumbAmin";
import type { BreadcrumbItemType } from "antd/es/breadcrumb/Breadcrumb";
import { Input, Popconfirm, Tag, Tooltip, type TableProps } from "antd";
import { IoIosSearch } from "react-icons/io";
import DisplaStatistic, {
  type ListInforProps,
} from "../../../components/admin/DisplaStatistic";
import { AiOutlineDatabase, AiOutlineWarning, AiOutlineCheckCircle, AiOutlinePieChart } from "react-icons/ai";
import ButtonCellphoneS from "../../../components/ButtonCellphoneS";
import { IoAddCircleOutline } from "react-icons/io5";
import TableAdmin from "../../../components/admin/templates/TableAdmin";
import { useEffect, useState } from "react";
import type { InventoryProps } from "../../../types/api/InventoryResponse";
import { inventoryApi } from "../../../utils/api/inventory.api";
import { MdOutlineModeEdit, MdDeleteOutline } from "react-icons/md";
import { useMessage } from "../../../hooks/useMessage";

const ListInventory = () => {
  const navigate = useNavigate();
  const { showSuccess, showError, contextHolder } = useMessage();

  const item: BreadcrumbItemType[] = [
    { title: <Link to="/admin">Dashboard</Link> },
    { title: "Tồn kho" },
  ];

  const [dataInventories, setDataInventories] = useState<InventoryProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(false);

  const fetchInventories = async () => {
    try {
      setLoading(true);
      const result = await inventoryApi.getAll();
      if (Array.isArray(result.data)) {
        setDataInventories(result.data);
      }
    } catch (error) {
      console.log(error);
      showError("Không thể tải danh sách tồn kho");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const result = await inventoryApi.delete(id);
      showSuccess(result.message);
      setReload(!reload);
    } catch (error) {
      console.log(error);
      showError("Không thể xóa bản ghi tồn kho");
    }
  };

  useEffect(() => {
    fetchInventories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  const lowStockItems = dataInventories.filter(
    (i: InventoryProps) => i.minStockAlert && i.quantity <= i.minStockAlert
  ).length;
  const totalQuantity = dataInventories.reduce((sum, i) => sum + (i.quantity || 0), 0);

  const listInfor: ListInforProps[] = [
    { title: "Tổng bản ghi", numbers: dataInventories.length, icon: <AiOutlineDatabase /> },
    { title: "Tổng số lượng", numbers: totalQuantity, icon: <AiOutlinePieChart /> },
    { title: "Hết hàng", numbers: lowStockItems, icon: <AiOutlineWarning /> },
    { title: "Còn hàng", numbers: dataInventories.length - lowStockItems, icon: <AiOutlineCheckCircle /> },
  ];

  const columns: TableProps<InventoryProps>["columns"] = [
    { title: "ID", dataIndex: "id", width: 60 },
    { title: "Warehouse ID", dataIndex: "warehouseId", width: 120 },
    { title: "Product ID", dataIndex: "productId", width: 100 },
    { title: "Variant ID", dataIndex: "variantId", width: 100 },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      render: (qty: number, record: InventoryProps) => (
        <Tag color={record.minStockAlert && qty <= record.minStockAlert ? "red" : "green"}>
          {qty}
        </Tag>
      ),
    },
    { title: "Đã đặt trước", dataIndex: "reservedQuantity" },
    {
      title: "Cảnh báo tối thiểu",
      dataIndex: "minStockAlert",
      render: (val: number) => val || "N/A",
    },
    {
      title: "Cập nhật lần cuối",
      dataIndex: "lastUpdated",
      render: (date: string) => date ? new Date(date).toLocaleString("vi-VN") : "N/A",
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_: unknown, record: InventoryProps) => (
        <div className="flex items-center gap-x-2">
          <Tooltip title="Sửa">
            <div
              className="rounded-full border border-[#0fb981] p-2 cursor-pointer hover:bg-[#e6f9f3] transition"
              onClick={() => navigate(`/admin/inventories/${record.id}/edit`)}
            >
              <MdOutlineModeEdit className="text-[#0fb981] text-base" />
            </div>
          </Tooltip>
          <Popconfirm
            title="Xóa bản ghi"
            description="Bạn có chắc muốn xóa bản ghi tồn kho này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
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

  return (
    <>
      {contextHolder}
      <div className="p-4">
        <div className="md:flex items-center justify-between hidden">
          <div>
            <h1 className="md:font-medium md:text-[1.7rem] hidden md:block">Quản lý tồn kho</h1>
            <BreadcrumbAmin items={item} />
          </div>
          <div>
            <Input placeholder="Tìm kiếm..." prefix={<IoIosSearch className="text-[1.2rem]" />} className="text-[0.8rem] w-[15rem] h-[2.5rem]" />
          </div>
        </div>
        <DisplaStatistic type="category" listInfor={listInfor} />
        <div className="bg-white rounded-lg p-4 mt-4">
          <div className="flex items-center justify-between">
            <span className="text-[1.2rem] font-medium hidden md:block">Danh sách tồn kho</span>
            <div className="flex items-center gap-x-4 md:w-auto w-full">
              <Input placeholder="Tìm..." prefix={<IoIosSearch className="text-[1.2rem]" />} className="text-[0.8rem] md:w-[20rem] w-[15rem] bg-[#f5f5f5] h-[3rem]" />
              <ButtonCellphoneS
                children={<div className="flex items-center gap-x-1"><IoAddCircleOutline className="text-white text-[1.5rem]" /><span className="hidden md:block">Thêm mới</span></div>}
                defaultActiveBg="#292929" defaultHoverBg="#292929" defaultHoverBorderColor="#292929"
                className="text-white h-[2rem] bg-black border-none text-[0.8rem]"
                onClick={() => navigate("/admin/inventories/create")}
              />
            </div>
          </div>
          <div className="mt-4">
            <TableAdmin
              columns={columns}
              dataSource={dataInventories}
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

export default ListInventory;
