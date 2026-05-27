import { Link } from "react-router-dom";
import BreadcrumbAmin from "../../../components/admin/BreadcrumbAmin";
import type { BreadcrumbItemType } from "antd/es/breadcrumb/Breadcrumb";
import { Input, Popconfirm, Tag, Tooltip, type TableProps } from "antd";
import { IoIosSearch } from "react-icons/io";
import DisplaStatistic, {
  type ListInforProps,
} from "../../../components/admin/DisplaStatistic";
import { AiOutlineEnvironment, AiOutlineCheckCircle, AiOutlineUser, AiOutlinePieChart } from "react-icons/ai";
import TableAdmin from "../../../components/admin/templates/TableAdmin";
import { useEffect, useState } from "react";
import type { UserAddressProps } from "../../../types/api/UserAddressResponse";
import { userAddressApi } from "../../../utils/api/user_address.api";
import { MdDeleteOutline } from "react-icons/md";
import { useMessage } from "../../../hooks/useMessage";

const ListUserAddress = () => {
  const { showSuccess, showError, contextHolder } = useMessage();

  const item: BreadcrumbItemType[] = [
    { title: <Link to="/admin">Dashboard</Link> },
    { title: "Địa chỉ người dùng" },
  ];

  const [dataAddresses, setDataAddresses] = useState<UserAddressProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(false);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const result = await userAddressApi.getAll();
      if (Array.isArray(result.data)) {
        setDataAddresses(result.data);
      }
    } catch (error) {
      console.log(error);
      showError("Không thể tải danh sách địa chỉ");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const result = await userAddressApi.delete(id);
      showSuccess(result.message);
      setReload(!reload);
    } catch (error) {
      console.log(error);
      showError("Không thể xóa địa chỉ");
    }
  };

  useEffect(() => {
    fetchAddresses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  const defaultAddresses = dataAddresses.filter((a: UserAddressProps) => a.isDefault).length;
  const uniqueUsers = new Set(dataAddresses.map((a: UserAddressProps) => a.userId)).size;

  const listInfor: ListInforProps[] = [
    { title: "Tổng địa chỉ", numbers: dataAddresses.length, icon: <AiOutlineEnvironment /> },
    { title: "Địa chỉ mặc định", numbers: defaultAddresses, icon: <AiOutlineCheckCircle /> },
    { title: "Người dùng", numbers: uniqueUsers, icon: <AiOutlineUser /> },
    { title: "Tỉnh/TP", numbers: new Set(dataAddresses.map((a) => a.province)).size, icon: <AiOutlinePieChart /> },
  ];

  const columns: TableProps<UserAddressProps>["columns"] = [
    { title: "ID", dataIndex: "id", width: 60 },
    { title: "User ID", dataIndex: "userId", width: 80 },
    { title: "Người nhận", dataIndex: "recipientName" },
    { title: "SĐT", dataIndex: "recipientPhone" },
    { title: "Tỉnh/TP", dataIndex: "province" },
    { title: "Quận/Huyện", dataIndex: "district" },
    { title: "Phường/Xã", dataIndex: "ward" },
    {
      title: "Địa chỉ chi tiết",
      dataIndex: "addressDetail",
      render: (address: string) => (
        <Tooltip title={address}>
          <span className="line-clamp-1 max-w-[200px]">{address || "N/A"}</span>
        </Tooltip>
      ),
    },
    {
      title: "Mặc định",
      dataIndex: "isDefault",
      render: (isDefault: boolean) => (
        <Tag color={isDefault ? "green" : "default"}>{isDefault ? "Có" : "Không"}</Tag>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_: unknown, record: UserAddressProps) => (
        <div className="flex items-center gap-x-2">
          <Popconfirm
            title="Xóa địa chỉ"
            description="Bạn có chắc muốn xóa địa chỉ này?"
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
            <h1 className="md:font-medium md:text-[1.7rem] hidden md:block">Địa chỉ người dùng</h1>
            <BreadcrumbAmin items={item} />
          </div>
          <div>
            <Input placeholder="Tìm kiếm..." prefix={<IoIosSearch className="text-[1.2rem]" />} className="text-[0.8rem] w-[15rem] h-[2.5rem]" />
          </div>
        </div>
        <DisplaStatistic type="category" listInfor={listInfor} />
        <div className="bg-white rounded-lg p-4 mt-4">
          <div className="flex items-center justify-between">
            <span className="text-[1.2rem] font-medium hidden md:block">Danh sách địa chỉ</span>
            <Input placeholder="Tìm địa chỉ..." prefix={<IoIosSearch className="text-[1.2rem]" />} className="text-[0.8rem] md:w-[20rem] w-[15rem] bg-[#f5f5f5] h-[3rem]" />
          </div>
          <div className="mt-4">
            <TableAdmin
              columns={columns}
              dataSource={dataAddresses}
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

export default ListUserAddress;
