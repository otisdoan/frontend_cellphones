import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Input, Tag, Select, Modal, Popconfirm, type TableProps } from "antd";
import type { BreadcrumbItemType } from "antd/es/breadcrumb/Breadcrumb";
import BreadcrumbAmin from "../../../components/admin/BreadcrumbAmin";
import DisplaStatistic, {
  type ListInforProps,
} from "../../../components/admin/DisplaStatistic";
import TableAdmin from "../../../components/admin/templates/TableAdmin";
import { orderApi } from "../../../utils/api/order.api";
import { useMessage } from "../../../hooks/useMessage";
import { IoIosSearch } from "react-icons/io";
import {
  AiOutlineShoppingCart,
  AiOutlineClockCircle,
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { MdOutlineRemoveRedEye, MdDeleteOutline } from "react-icons/md";

interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  variantName?: string;
  imageUrl?: string;
  price: number;
  salePrice?: number;
  quantity: number;
  total: number;
}

interface Order {
  id: number;
  orderNumber: string;
  userId: number;
  guestEmail?: string;
  guestPhone?: string;
  totalAmount: number;
  subtotal: number;
  shippingFee?: number;
  discountAmount?: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled" | "PENDING" | "CONFIRMED" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  paymentStatus: "pending" | "paid" | "failed" | "refunded" | "PENDING" | "PAID" | "FAILED" | "REFUNDED";
  paymentMethod?: string;
  shippingAddress?: string;
  shippingPhone?: string;
  note?: string;
  createdAt: string;
  updatedAt: string;
  items?: OrderItem[];
}

const { Option } = Select;

const ListOrder = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { showSuccess, showError, contextHolder } = useMessage();

  const breadcrumbItems: BreadcrumbItemType[] = [
    {
      title: <Link to="/admin">Dashboard</Link>,
    },
    {
      title: "Quản lý đơn hàng",
    },
  ];

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await orderApi.getAll();

      if (response?.data) {
        const allOrders = Array.isArray(response.data)
          ? response.data
          : [response.data];
        setOrders(allOrders as unknown as Order[]);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      showError("Không thể tải danh sách đơn hàng");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (
    orderId: number,
    newStatus: Order["status"]
  ) => {
    try {
      await orderApi.update(orderId, { status: newStatus });
      showSuccess("Cập nhật trạng thái thành công");
      fetchOrders();
    } catch (error) {
      console.error("Error updating status:", error);
      showError("Không thể cập nhật trạng thái");
    }
  };

  const handleViewDetail = (order: Order) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };

  const handleDelete = async (orderId: number) => {
    try {
      await orderApi.delete(orderId);
      showSuccess("Xóa đơn hàng thành công");
      fetchOrders();
    } catch (error) {
      console.error("Error deleting order:", error);
      showError("Không thể xóa đơn hàng");
    }
  };

  const getStatusColor = (status: string) => {
    const colorMap: Record<string, string> = {
      pending: "orange",
      confirmed: "blue",
      shipped: "purple",
      delivered: "green",
      cancelled: "red",
    };
    return colorMap[status?.toLowerCase()] || "default";
  };

  const getStatusText = (status: string) => {
    const textMap: Record<string, string> = {
      pending: "Chờ xác nhận",
      confirmed: "Đã xác nhận",
      shipped: "Đang giao",
      delivered: "Hoàn thành",
      cancelled: "Đã hủy",
    };
    return textMap[status?.toLowerCase()] || status;
  };

  const getPaymentStatusColor = (status: string) => {
    const colorMap: Record<string, string> = {
      pending: "orange",
      paid: "green",
      failed: "red",
      refunded: "purple",
    };
    return colorMap[status?.toLowerCase()] || "default";
  };

  const getPaymentStatusText = (status: string) => {
    const textMap: Record<string, string> = {
      pending: "Chờ thanh toán",
      paid: "Đã thanh toán",
      failed: "Thất bại",
      refunded: "Đã hoàn tiền",
    };
    return textMap[status?.toLowerCase()] || status;
  };

  // Calculate statistics
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status?.toLowerCase() === "pending" || o.status === "PENDING").length;
  const completedOrders = orders.filter((o) => o.status?.toLowerCase() === "delivered" || o.status === "DELIVERED").length;
  const cancelledOrders = orders.filter((o) => o.status?.toLowerCase() === "cancelled" || o.status === "CANCELLED").length;
  //   const totalRevenue = orders
  //     .filter((o) => o.payment_status === "paid")
  //     .reduce((sum, o) => sum + Number(o.total_amount), 0);

  const statisticItems: ListInforProps[] = [
    {
      title: "Tổng đơn hàng",
      numbers: totalOrders,
      icon: <AiOutlineShoppingCart />,
    },
    {
      title: "Chờ xử lý",
      numbers: pendingOrders,
      icon: <AiOutlineClockCircle />,
    },
    {
      title: "Hoàn thành",
      numbers: completedOrders,
      icon: <AiOutlineCheckCircle />,
    },
    {
      title: "Đã hủy",
      numbers: cancelledOrders,
      icon: <AiOutlineCloseCircle />,
    },
  ];

  const filteredOrders = orders.filter((order: Order) => {
    const matchSearch =
      (order.orderNumber || "").toLowerCase().includes(searchText.toLowerCase()) ||
      (order.guestEmail || "").toLowerCase().includes(searchText.toLowerCase()) ||
      (order.guestPhone || "").toLowerCase().includes(searchText.toLowerCase());

    const matchStatus = statusFilter === "all" || order.status?.toLowerCase() === statusFilter.toLowerCase();

    return matchSearch && matchStatus;
  });

  const columns: TableProps<Order>["columns"] = [
    {
      title: "Mã đơn hàng",
      dataIndex: "orderNumber",
      key: "orderNumber",
      width: 150,
      render: (text: string) => (
        <span className="font-semibold text-blue-600">{text}</span>
      ),
    },
    {
      title: "Khách hàng",
      key: "customer",
      width: 200,
      render: (_, record: Order) => (
        <div>
          <div className="font-medium">{record.guestEmail || `User ID: ${record.userId}`}</div>
          <div className="text-xs text-gray-500">
            {record.guestPhone || "N/A"}
          </div>
        </div>
      ),
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalAmount",
      key: "totalAmount",
      width: 150,
      render: (amount: number) => (
        <span className="font-semibold text-red-600">
          {Number(amount).toLocaleString("vi-VN")}đ
        </span>
      ),
    },
    {
      title: "Trạng thái đơn",
      dataIndex: "status",
      key: "status",
      width: 150,
      render: (status: Order["status"]) => (
        <Tag color={getStatusColor(status?.toLowerCase() as Order["status"])}>{getStatusText(status?.toLowerCase() as Order["status"])}</Tag>
      ),
    },
    {
      title: "Thanh toán",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      width: 150,
      render: (status: Order["paymentStatus"]) => (
        <Tag color={getPaymentStatusColor(status?.toLowerCase() as Order["paymentStatus"])}>
          {getPaymentStatusText(status?.toLowerCase() as Order["paymentStatus"])}
        </Tag>
      ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 180,
      render: (date: string) => {
        if (!date) return "N/A";
        const d = new Date(date);
        return d.toLocaleDateString("vi-VN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        });
      },
    },
    {
      title: "Cập nhật trạng thái",
      key: "action_status",
      width: 200,
      render: (_, record: Order) => (
        <Select
          value={record.status?.toLowerCase()}
          onChange={(value) => handleUpdateStatus(record.id, value.toUpperCase() as Order["status"])}
          style={{ width: "100%" }}
          size="small"
        >
          <Option value="pending">Chờ xác nhận</Option>
          <Option value="confirmed">Đã xác nhận</Option>
          <Option value="shipped">Đang giao</Option>
          <Option value="delivered">Hoàn thành</Option>
          <Option value="cancelled">Đã hủy</Option>
        </Select>
      ),
    },
    {
      title: "Thao tác",
      key: "actions",
      width: 100,
      render: (_, record) => (
        <div className="flex gap-x-2">
          <button
            onClick={() => handleViewDetail(record)}
            className="text-blue-600 hover:text-blue-800"
            title="Xem chi tiết"
          >
            <MdOutlineRemoveRedEye size={20} />
          </button>
          <Popconfirm
            title="Xóa đơn hàng"
            description="Bạn có chắc muốn xóa đơn hàng này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
            placement="leftTop"
          >
            <button
              className="text-red-600 hover:text-red-800"
              title="Xóa"
            >
              <MdDeleteOutline size={20} />
            </button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      <div className="p-6">
        <BreadcrumbAmin items={breadcrumbItems} />

        <div className="mt-6">
          <DisplaStatistic type="orders" listInfor={statisticItems} />
        </div>

        <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Danh sách đơn hàng
            </h2>

            <div className="flex flex-col md:flex-row gap-3">
              <Select
                value={statusFilter}
                onChange={setStatusFilter}
                style={{ width: 200 }}
                placeholder="Lọc theo trạng thái"
              >
                <Option value="all">Tất cả</Option>
                <Option value="pending">Chờ xác nhận</Option>
                <Option value="confirmed">Đã xác nhận</Option>
                <Option value="shipped">Đang giao</Option>
                <Option value="delivered">Hoàn thành</Option>
                <Option value="cancelled">Đã hủy</Option>
              </Select>

              <Input
                placeholder="Tìm theo mã đơn, tên, email..."
                prefix={<IoIosSearch />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ width: 300 }}
              />
            </div>
          </div>

          <TableAdmin
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            columns={columns as any}
            dataSource={filteredOrders}
            loading={loading}
            rowKey="id"
            scroll={{ x: "max-content" }}
            pagination={{ pageSize: 10, position: ["bottomRight"] }}
          />
        </div>

        {/* Detail Modal */}
        <Modal
          title={`Chi tiết đơn hàng: ${selectedOrder?.orderNumber}`}
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
          width={800}
        >
          {selectedOrder && (
            <div className="space-y-4">
              {/* Customer Info */}
              <div className="border-b pb-4">
                <h3 className="font-semibold mb-2">Thông tin khách hàng</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-600">Email:</span>{" "}
                    <span className="font-medium">
                      {selectedOrder.guestEmail || "N/A"}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">SĐT:</span>{" "}
                    <span className="font-medium">
                      {selectedOrder.guestPhone || "N/A"}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-600">Địa chỉ giao hàng:</span>{" "}
                    <span className="font-medium">
                      {selectedOrder.shippingAddress || "N/A"}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">SĐT Giao Hàng:</span>{" "}
                    <span className="font-medium">
                      {selectedOrder.shippingPhone || "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Info */}
              <div className="border-b pb-4">
                <h3 className="font-semibold mb-2">Thông tin đơn hàng</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-600">Trạng thái:</span>{" "}
                    <Tag color={getStatusColor(selectedOrder.status)}>
                      {getStatusText(selectedOrder.status)}
                    </Tag>
                  </div>
                  <div>
                    <span className="text-gray-600">Thanh toán:</span>{" "}
                    <Tag
                      color={getPaymentStatusColor(
                        selectedOrder.paymentStatus
                      )}
                    >
                      {getPaymentStatusText(selectedOrder.paymentStatus)}
                    </Tag>
                  </div>
                  <div>
                    <span className="text-gray-600">Phương thức:</span>{" "}
                    <span className="font-medium">
                      {selectedOrder.paymentMethod || "N/A"}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Ngày tạo:</span>{" "}
                    <span className="font-medium">
                      {selectedOrder.createdAt ? new Date(selectedOrder.createdAt).toLocaleString(
                        "vi-VN"
                      ) : "N/A"}
                    </span>
                  </div>
                </div>
                {selectedOrder.note && (
                  <div className="mt-2 text-sm">
                    <span className="text-gray-600">Ghi chú:</span>{" "}
                    <span className="font-medium">{selectedOrder.note}</span>
                  </div>
                )}
              </div>

              {/* Order Items */}
              <div>
                <h3 className="font-semibold mb-2">Sản phẩm</h3>
                <div className="space-y-2">
                  {selectedOrder.items?.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3 p-3 bg-gray-50 rounded"
                    >
                      <img
                        src={
                          item.imageUrl || "/images/product-placeholder.webp"
                        }
                        alt={item.productName}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <div className="font-medium">{item.productName}</div>
                        {item.variantName && (
                          <div className="text-sm text-gray-500">
                            {item.variantName}
                          </div>
                        )}
                        <div className="text-sm">
                          <span className="text-red-600 font-semibold">
                            {Number(
                              item.salePrice || item.price
                            ).toLocaleString("vi-VN")}
                            đ
                          </span>
                          <span className="text-gray-500 ml-2">
                            x{item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="border-t pt-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tạm tính:</span>
                    <span>
                      {Number(selectedOrder.subtotal).toLocaleString("vi-VN")}đ
                    </span>
                  </div>
                  {selectedOrder.shippingFee && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phí vận chuyển:</span>
                      <span>
                        {Number(selectedOrder.shippingFee).toLocaleString(
                          "vi-VN"
                        )}
                        đ
                      </span>
                    </div>
                  )}
                  {selectedOrder.discountAmount && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Giảm giá:</span>
                      <span className="text-green-600">
                        -
                        {Number(selectedOrder.discountAmount).toLocaleString(
                          "vi-VN"
                        )}
                        đ
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-bold border-t pt-2">
                    <span>Tổng cộng:</span>
                    <span className="text-red-600">
                      {Number(selectedOrder.totalAmount).toLocaleString(
                        "vi-VN"
                      )}
                      đ
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </>
  );
};

export default ListOrder;
