import { Link, useNavigate } from "react-router-dom";
import BreadcrumbAmin from "../../../components/admin/BreadcrumbAmin";
import type { BreadcrumbItemType } from "antd/es/breadcrumb/Breadcrumb";
import { Input, Popconfirm, Tag, Tooltip, type TableProps } from "antd";
import { IoIosSearch } from "react-icons/io";
import DisplaStatistic, {
  type ListInforProps,
} from "../../../components/admin/DisplaStatistic";
import { AiOutlineGift, AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlinePieChart } from "react-icons/ai";
import ButtonCellphoneS from "../../../components/ButtonCellphoneS";
import { IoAddCircleOutline } from "react-icons/io5";
import TableAdmin from "../../../components/admin/templates/TableAdmin";
import { useEffect, useState } from "react";
import type { CouponProps } from "../../../types/api/CouponResponse";
import { couponApi } from "../../../utils/api/coupon.api";
import { MdOutlineModeEdit, MdDeleteOutline } from "react-icons/md";
import { useMessage } from "../../../hooks/useMessage";

const ListCoupon = () => {
  const navigate = useNavigate();
  const { showSuccess, showError, contextHolder } = useMessage();

  const item: BreadcrumbItemType[] = [
    { title: <Link to="/admin">Dashboard</Link> },
    { title: "Coupons" },
  ];

  const [dataCoupons, setDataCoupons] = useState<CouponProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(false);

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const result = await couponApi.getAll();
      if (Array.isArray(result.data)) {
        setDataCoupons(result.data);
      }
    } catch (error) {
      console.log(error);
      showError("Không thể tải danh sách coupon");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const result = await couponApi.delete(id);
      showSuccess(result.message);
      setReload(!reload);
    } catch (error) {
      console.log(error);
      showError("Không thể xóa coupon");
    }
  };

  useEffect(() => {
    fetchCoupons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  const activeCoupons = dataCoupons.filter((c: CouponProps) => c.isActive).length;
  const inactiveCoupons = dataCoupons.filter((c: CouponProps) => !c.isActive).length;

  const listInfor: ListInforProps[] = [
    { title: "Tổng coupon", numbers: dataCoupons.length, icon: <AiOutlineGift /> },
    { title: "Đang hoạt động", numbers: activeCoupons, icon: <AiOutlineCheckCircle /> },
    { title: "Không hoạt động", numbers: inactiveCoupons, icon: <AiOutlineCloseCircle /> },
    { title: "Đã sử dụng", numbers: dataCoupons.reduce((sum, c: CouponProps) => sum + (c.usedCount || 0), 0), icon: <AiOutlinePieChart /> },
  ];

  const columns: TableProps<CouponProps>["columns"] = [
    { title: "ID", dataIndex: "id", width: 60 },
    {
      title: "Mã coupon",
      dataIndex: "code",
      render: (code: string) => (
        <Tag color="blue" className="font-semibold">{code}</Tag>
      ),
    },
    {
      title: "Tên",
      dataIndex: "name",
      render: (name: string) => (
        <Tooltip title={name}>
          <span className="line-clamp-1 max-w-[150px]">{name}</span>
        </Tooltip>
      ),
    },
    {
      title: "Loại",
      dataIndex: "type",
      render: (type: string) => (
        <Tag color={type === "percentage" ? "purple" : "green"}>
          {type === "percentage" ? "Phần trăm" : "Cố định"}
        </Tag>
      ),
    },
    {
      title: "Giá trị",
      dataIndex: "value",
      render: (value: number, record: CouponProps) =>
        record.type === "percentage"
          ? `${value}%`
          : `${Number(value).toLocaleString("vi-VN")}đ`,
    },
    {
      title: "Đã dùng / Giới hạn",
      key: "usage",
      render: (_: unknown, record: CouponProps) => (
        <span>{record.usedCount || 0} / {record.usageLimit || "∞"}</span>
      ),
    },
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
      title: "Ngày bắt đầu",
      dataIndex: "startDate",
      render: (date: string) =>
        date ? new Date(date).toLocaleDateString("vi-VN") : "N/A",
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "endDate",
      render: (date: string) =>
        date ? new Date(date).toLocaleDateString("vi-VN") : "N/A",
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_: unknown, record: CouponProps) => (
        <div className="flex items-center gap-x-2">
          <Tooltip title="Sửa">
            <div
              className="rounded-full border border-[#0fb981] p-2 cursor-pointer hover:bg-[#e6f9f3] transition"
              onClick={() => navigate(`/admin/coupons/${record.id}/edit`)}
            >
              <MdOutlineModeEdit className="text-[#0fb981] text-base" />
            </div>
          </Tooltip>
          <Popconfirm
            title="Xóa coupon"
            description="Bạn có chắc muốn xóa coupon này?"
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
            <h1 className="md:font-medium md:text-[1.7rem] hidden md:block">
              Quản lý Coupon
            </h1>
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
            <span className="text-[1.2rem] font-medium hidden md:block">
              Danh sách Coupon
            </span>
            <div className="flex items-center gap-x-4 md:w-auto w-full">
              <div>
                <Input
                  placeholder="Tìm coupon..."
                  prefix={<IoIosSearch className="text-[1.2rem]" />}
                  className="text-[0.8rem] md:w-[20rem] w-[15rem] bg-[#f5f5f5] h-[3rem]"
                />
              </div>
              <ButtonCellphoneS
                children={
                  <div className="flex items-center gap-x-1">
                    <IoAddCircleOutline className="text-white text-[1.5rem]" />
                    <span className="hidden md:block">Thêm coupon</span>
                  </div>
                }
                defaultActiveBg="#292929"
                defaultHoverBg="#292929"
                defaultHoverBorderColor="#292929"
                className="text-white h-[2rem] bg-black border-none text-[0.8rem]"
                onClick={() => navigate("/admin/coupons/create")}
              />
            </div>
          </div>
          <div className="mt-4">
            <TableAdmin
              columns={columns}
              dataSource={dataCoupons}
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

export default ListCoupon;
