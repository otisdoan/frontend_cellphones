import { Link } from "react-router-dom";
import BreadcrumbAmin from "../../../components/admin/BreadcrumbAmin";
import type { BreadcrumbItemType } from "antd/es/breadcrumb/Breadcrumb";
import { Input, Popconfirm, Tag, Tooltip, Rate, type TableProps } from "antd";
import { IoIosSearch } from "react-icons/io";
import DisplaStatistic, {
  type ListInforProps,
} from "../../../components/admin/DisplaStatistic";
import { AiOutlineStar, AiOutlineCheckCircle, AiOutlineClockCircle, AiOutlineCloseCircle } from "react-icons/ai";
import TableAdmin from "../../../components/admin/templates/TableAdmin";
import { useEffect, useState } from "react";
import type { ProductReviewProps } from "../../../types/api/ProductReviewResponse";
import { productReviewApi } from "../../../utils/api/product_review.api";
import { MdDeleteOutline } from "react-icons/md";
import { useMessage } from "../../../hooks/useMessage";

const ListProductReview = () => {
  const { showSuccess, showError, contextHolder } = useMessage();

  const item: BreadcrumbItemType[] = [
    { title: <Link to="/admin">Dashboard</Link> },
    { title: "Đánh giá sản phẩm" },
  ];

  const [dataReviews, setDataReviews] = useState<ProductReviewProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(false);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const result = await productReviewApi.getAll();
      if (Array.isArray(result.data)) {
        setDataReviews(result.data);
      }
    } catch (error) {
      console.log(error);
      showError("Không thể tải danh sách đánh giá");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const result = await productReviewApi.delete(id);
      showSuccess(result.message);
      setReload(!reload);
    } catch (error) {
      console.log(error);
      showError("Không thể xóa đánh giá");
    }
  };

  const handleUpdateStatus = async (id: number, status: ProductReviewProps["status"]) => {
    try {
      const result = await productReviewApi.update(id, { status });
      showSuccess(result.message);
      setReload(!reload);
    } catch (error) {
      console.log(error);
      showError("Không thể cập nhật trạng thái");
    }
  };

  useEffect(() => {
    fetchReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  const approvedReviews = dataReviews.filter((r) => r.status === "APPROVED").length;
  const pendingReviews = dataReviews.filter((r) => r.status === "PENDING").length;
  const rejectedReviews = dataReviews.filter((r) => r.status === "REJECTED").length;

  const listInfor: ListInforProps[] = [
    { title: "Tổng đánh giá", numbers: dataReviews.length, icon: <AiOutlineStar /> },
    { title: "Đã duyệt", numbers: approvedReviews, icon: <AiOutlineCheckCircle /> },
    { title: "Chờ duyệt", numbers: pendingReviews, icon: <AiOutlineClockCircle /> },
    { title: "Từ chối", numbers: rejectedReviews, icon: <AiOutlineCloseCircle /> },
  ];

  const getStatusColor = (status: string) => {
    const map: Record<string, string> = { APPROVED: "green", PENDING: "orange", REJECTED: "red" };
    return map[status] || "default";
  };

  const getStatusText = (status: string) => {
    const map: Record<string, string> = { APPROVED: "Đã duyệt", PENDING: "Chờ duyệt", REJECTED: "Từ chối" };
    return map[status] || status;
  };

  const columns: TableProps<ProductReviewProps>["columns"] = [
    { title: "ID", dataIndex: "id", width: 60 },
    { title: "Product ID", dataIndex: "productId", width: 100 },
    { title: "User ID", dataIndex: "userId", width: 80 },
    {
      title: "Đánh giá",
      dataIndex: "rating",
      width: 160,
      render: (rating: number) => <Rate disabled defaultValue={rating} className="text-sm" />,
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      render: (title: string) => (
        <Tooltip title={title}>
          <span className="line-clamp-1 max-w-[150px]">{title || "N/A"}</span>
        </Tooltip>
      ),
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      render: (content: string) => (
        <Tooltip title={content}>
          <span className="line-clamp-1 max-w-[200px]">{content || "N/A"}</span>
        </Tooltip>
      ),
    },
    {
      title: "Mua hàng xác thực",
      dataIndex: "isVerifiedPurchase",
      width: 130,
      render: (verified: boolean) => (
        <Tag color={verified ? "green" : "default"}>{verified ? "Có" : "Không"}</Tag>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      width: 120,
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>{getStatusText(status)}</Tag>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      width: 200,
      render: (_: unknown, record: ProductReviewProps) => (
        <div className="flex items-center gap-x-2">
          {record.status === "PENDING" && (
            <>
              <Tooltip title="Duyệt">
                <div
                  className="rounded-full border border-[#0fb981] p-2 cursor-pointer hover:bg-[#e6f9f3] transition"
                  onClick={() => handleUpdateStatus(record.id, "APPROVED")}
                >
                  <AiOutlineCheckCircle className="text-[#0fb981] text-base" />
                </div>
              </Tooltip>
              <Tooltip title="Từ chối">
                <div
                  className="rounded-full border border-orange-500 p-2 cursor-pointer hover:bg-orange-50 transition"
                  onClick={() => handleUpdateStatus(record.id, "REJECTED")}
                >
                  <AiOutlineCloseCircle className="text-orange-500 text-base" />
                </div>
              </Tooltip>
            </>
          )}
          <Popconfirm
            title="Xóa đánh giá"
            description="Bạn có chắc muốn xóa đánh giá này?"
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
            <h1 className="md:font-medium md:text-[1.7rem] hidden md:block">Đánh giá sản phẩm</h1>
            <BreadcrumbAmin items={item} />
          </div>
          <div>
            <Input placeholder="Tìm kiếm..." prefix={<IoIosSearch className="text-[1.2rem]" />} className="text-[0.8rem] w-[15rem] h-[2.5rem]" />
          </div>
        </div>
        <DisplaStatistic type="category" listInfor={listInfor} />
        <div className="bg-white rounded-lg p-4 mt-4">
          <div className="flex items-center justify-between">
            <span className="text-[1.2rem] font-medium hidden md:block">Danh sách đánh giá</span>
            <Input placeholder="Tìm đánh giá..." prefix={<IoIosSearch className="text-[1.2rem]" />} className="text-[0.8rem] md:w-[20rem] w-[15rem] bg-[#f5f5f5] h-[3rem]" />
          </div>
          <div className="mt-4">
            <TableAdmin
              columns={columns}
              dataSource={dataReviews}
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

export default ListProductReview;
