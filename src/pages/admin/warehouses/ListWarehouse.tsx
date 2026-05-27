import { Link, useNavigate } from "react-router-dom";
import BreadcrumbAmin from "../../../components/admin/BreadcrumbAmin";
import type { BreadcrumbItemType } from "antd/es/breadcrumb/Breadcrumb";
import { Input, Popconfirm, Tag, Tooltip, type TableProps } from "antd";
import { IoIosSearch } from "react-icons/io";
import DisplaStatistic, {
  type ListInforProps,
} from "../../../components/admin/DisplaStatistic";
import { AiOutlineHome, AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlinePieChart } from "react-icons/ai";
import ButtonCellphoneS from "../../../components/ButtonCellphoneS";
import { IoAddCircleOutline } from "react-icons/io5";
import TableAdmin from "../../../components/admin/templates/TableAdmin";
import { useEffect, useState } from "react";
import type { WarehouseProps } from "../../../types/api/WarehouseResponse";
import { warehouseApi } from "../../../utils/api/warehouse.api";
import { MdOutlineModeEdit, MdDeleteOutline } from "react-icons/md";
import { useMessage } from "../../../hooks/useMessage";

const ListWarehouse = () => {
  const navigate = useNavigate();
  const { showSuccess, showError, contextHolder } = useMessage();

  const item: BreadcrumbItemType[] = [
    { title: <Link to="/admin">Dashboard</Link> },
    { title: "Kho hàng" },
  ];

  const [dataWarehouses, setDataWarehouses] = useState<WarehouseProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(false);

  const fetchWarehouses = async () => {
    try {
      setLoading(true);
      const result = await warehouseApi.getAll();
      if (Array.isArray(result.data)) {
        setDataWarehouses(result.data);
      }
    } catch (error) {
      console.log(error);
      showError("Không thể tải danh sách kho hàng");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const result = await warehouseApi.delete(id);
      showSuccess(result.message);
      setReload(!reload);
    } catch (error) {
      console.log(error);
      showError("Không thể xóa kho hàng");
    }
  };

  useEffect(() => {
    fetchWarehouses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  const activeWarehouses = dataWarehouses.filter((w: WarehouseProps) => w.isActive).length;
  const inactiveWarehouses = dataWarehouses.filter((w: WarehouseProps) => !w.isActive).length;

  const listInfor: ListInforProps[] = [
    { title: "Tổng kho", numbers: dataWarehouses.length, icon: <AiOutlineHome /> },
    { title: "Đang hoạt động", numbers: activeWarehouses, icon: <AiOutlineCheckCircle /> },
    { title: "Ngừng hoạt động", numbers: inactiveWarehouses, icon: <AiOutlineCloseCircle /> },
    { title: "Quản lý", numbers: new Set(dataWarehouses.map((w: WarehouseProps) => w.managerName)).size, icon: <AiOutlinePieChart /> },
  ];

  const columns: TableProps<WarehouseProps>["columns"] = [
    { title: "ID", dataIndex: "id", width: 60 },
    {
      title: "Mã kho",
      dataIndex: "code",
      render: (code: string) => <Tag color="blue">{code}</Tag>,
    },
    {
      title: "Tên kho",
      dataIndex: "name",
      render: (name: string) => (
        <Tooltip title={name}>
          <span className="line-clamp-1 max-w-[150px] font-medium">{name}</span>
        </Tooltip>
      ),
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      render: (address: string) => (
        <Tooltip title={address}>
          <span className="line-clamp-1 max-w-[200px]">{address}</span>
        </Tooltip>
      ),
    },
    { title: "SĐT", dataIndex: "phone" },
    { title: "Người quản lý", dataIndex: "managerName" },
    {
      title: "Trạng thái",
      dataIndex: "isActive",
      render: (isActive: boolean) => (
        <Tag color={isActive ? "green" : "red"}>
          {isActive ? "Hoạt động" : "Tắt"}
        </Tag>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_: unknown, record: WarehouseProps) => (
        <div className="flex items-center gap-x-2">
          <Tooltip title="Sửa">
            <div
              className="rounded-full border border-[#0fb981] p-2 cursor-pointer hover:bg-[#e6f9f3] transition"
              onClick={() => navigate(`/admin/warehouses/${record.id}/edit`)}
            >
              <MdOutlineModeEdit className="text-[#0fb981] text-base" />
            </div>
          </Tooltip>
          <Popconfirm
            title="Xóa kho hàng"
            description="Bạn có chắc muốn xóa kho hàng này?"
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
            <h1 className="md:font-medium md:text-[1.7rem] hidden md:block">Kho hàng</h1>
            <BreadcrumbAmin items={item} />
          </div>
          <div>
            <Input
              placeholder="Tìm kiếm..."
              prefix={<IoIosSearch className="text-[1.2rem]" />}
              className="text-[0.8rem] w-[15rem] h-[2.5rem]"
            />
          </div>
        </div>
        <DisplaStatistic type="category" listInfor={listInfor} />
        <div className="bg-white rounded-lg p-4 mt-4">
          <div className="flex items-center justify-between">
            <span className="text-[1.2rem] font-medium hidden md:block">Danh sách kho hàng</span>
            <div className="flex items-center gap-x-4 md:w-auto w-full">
              <Input
                placeholder="Tìm kho hàng..."
                prefix={<IoIosSearch className="text-[1.2rem]" />}
                className="text-[0.8rem] md:w-[20rem] w-[15rem] bg-[#f5f5f5] h-[3rem]"
              />
              <ButtonCellphoneS
                children={
                  <div className="flex items-center gap-x-1">
                    <IoAddCircleOutline className="text-white text-[1.5rem]" />
                    <span className="hidden md:block">Thêm kho</span>
                  </div>
                }
                defaultActiveBg="#292929"
                defaultHoverBg="#292929"
                defaultHoverBorderColor="#292929"
                className="text-white h-[2rem] bg-black border-none text-[0.8rem]"
                onClick={() => navigate("/admin/warehouses/create")}
              />
            </div>
          </div>
          <div className="mt-4">
            <TableAdmin
              columns={columns}
              dataSource={dataWarehouses}
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

export default ListWarehouse;
