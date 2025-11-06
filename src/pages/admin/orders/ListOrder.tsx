import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Input, Tag, Select, Modal, type TableProps } from "antd";
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
import { MdOutlineRemoveRedEye } from "react-icons/md";

interface OrderItem {
  id: number;
  product_id: number;
  product_name: string;
  variant_name?: string;
  image_url?: string;
  price: number;
  sale_price?: number;
  quantity: number;
  total: number;
}

interface Order {
  id: number;
  order_number: string;
  user_id: number;
  user_name?: string;
  user_email?: string;
  total_amount: number;
  subtotal: number;
  shipping_fee?: number;
  discount_amount?: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  payment_status: "pending" | "paid" | "failed" | "refunded";
  payment_method?: string;
  shipping_address?: string;
  shipping_phone?: string;
  note?: string;
  created_at: string;
  updated_at: string;
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

  const getStatusColor = (status: Order["status"]) => {
    const colorMap: Record<Order["status"], string> = {
      pending: "orange",
      confirmed: "blue",
      shipped: "purple",
      delivered: "green",
      cancelled: "red",
    };
    return colorMap[status] || "default";
  };

  const getStatusText = (status: Order["status"]) => {
    const textMap: Record<Order["status"], string> = {
      pending: "Chờ xác nhận",
      confirmed: "Đã xác nhận",
      shipped: "Đang giao",
      delivered: "Hoàn thành",
      cancelled: "Đã hủy",
    };
    return textMap[status] || status;
  };

  const getPaymentStatusColor = (status: Order["payment_status"]) => {
    const colorMap: Record<Order["payment_status"], string> = {
      pending: "orange",
      paid: "green",
      failed: "red",
      refunded: "purple",
    };
    return colorMap[status] || "default";
  };

  const getPaymentStatusText = (status: Order["payment_status"]) => {
    const textMap: Record<Order["payment_status"], string> = {
      pending: "Chờ thanh toán",
      paid: "Đã thanh toán",
      failed: "Thất bại",
      refunded: "Đã hoàn tiền",
    };
    return textMap[status] || status;
  };

  // Calculate statistics
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const completedOrders = orders.filter((o) => o.status === "delivered").length;
  const cancelledOrders = orders.filter((o) => o.status === "cancelled").length;
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

  const filteredOrders = orders.filter((order) => {
    const matchSearch =
      order.order_number.toLowerCase().includes(searchText.toLowerCase()) ||
      order.user_email?.toLowerCase().includes(searchText.toLowerCase()) ||
      order.user_name?.toLowerCase().includes(searchText.toLowerCase());

    const matchStatus = statusFilter === "all" || order.status === statusFilter;

    return matchSearch && matchStatus;
  });

  const columns: TableProps<Order>["columns"] = [
    {
      title: "Mã đơn hàng",
      dataIndex: "order_number",
      key: "order_number",
      width: 150,
      fixed: "left",
      render: (text: string) => (
        <span className="font-semibold text-blue-600">{text}</span>
      ),
    },
    {
      title: "Khách hàng",
      key: "customer",
      width: 200,
      render: (_, record) => (
        <div>
          <div className="font-medium">{record.user_name || "N/A"}</div>
          <div className="text-xs text-gray-500">
            {record.user_email || "N/A"}
          </div>
        </div>
      ),
    },
    {
      title: "Tổng tiền",
      dataIndex: "total_amount",
      key: "total_amount",
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
        <Tag color={getStatusColor(status)}>{getStatusText(status)}</Tag>
      ),
    },
    {
      title: "Thanh toán",
      dataIndex: "payment_status",
      key: "payment_status",
      width: 150,
      render: (status: Order["payment_status"]) => (
        <Tag color={getPaymentStatusColor(status)}>
          {getPaymentStatusText(status)}
        </Tag>
      ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      key: "created_at",
      width: 180,
      render: (date: string) => {
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
      render: (_, record) => (
        <Select
          value={record.status}
          onChange={(value) => handleUpdateStatus(record.id, value)}
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
      fixed: "right",
      render: (_, record) => (
        <div className="flex gap-x-2">
          <button
            onClick={() => handleViewDetail(record)}
            className="text-blue-600 hover:text-blue-800"
            title="Xem chi tiết"
          >
            <MdOutlineRemoveRedEye size={20} />
          </button>
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
            scroll={{ x: 1400 }}
          />
        </div>

        {/* Detail Modal */}
        <Modal
          title={`Chi tiết đơn hàng: ${selectedOrder?.order_number}`}
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
                    <span className="text-gray-600">Tên:</span>{" "}
                    <span className="font-medium">
                      {selectedOrder.user_name || "N/A"}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Email:</span>{" "}
                    <span className="font-medium">
                      {selectedOrder.user_email || "N/A"}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-600">Địa chỉ giao hàng:</span>{" "}
                    <span className="font-medium">
                      {selectedOrder.shipping_address || "N/A"}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">SĐT:</span>{" "}
                    <span className="font-medium">
                      {selectedOrder.shipping_phone || "N/A"}
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
                        selectedOrder.payment_status
                      )}
                    >
                      {getPaymentStatusText(selectedOrder.payment_status)}
                    </Tag>
                  </div>
                  <div>
                    <span className="text-gray-600">Phương thức:</span>{" "}
                    <span className="font-medium">
                      {selectedOrder.payment_method || "N/A"}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Ngày tạo:</span>{" "}
                    <span className="font-medium">
                      {new Date(selectedOrder.created_at).toLocaleString(
                        "vi-VN"
                      )}
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
                          item.image_url || "/images/product-placeholder.webp"
                        }
                        alt={item.product_name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <div className="font-medium">{item.product_name}</div>
                        {item.variant_name && (
                          <div className="text-sm text-gray-500">
                            {item.variant_name}
                          </div>
                        )}
                        <div className="text-sm">
                          <span className="text-red-600 font-semibold">
                            {Number(
                              item.sale_price || item.price
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
                  {selectedOrder.shipping_fee && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phí vận chuyển:</span>
                      <span>
                        {Number(selectedOrder.shipping_fee).toLocaleString(
                          "vi-VN"
                        )}
                        đ
                      </span>
                    </div>
                  )}
                  {selectedOrder.discount_amount && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Giảm giá:</span>
                      <span className="text-green-600">
                        -
                        {Number(selectedOrder.discount_amount).toLocaleString(
                          "vi-VN"
                        )}
                        đ
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-bold border-t pt-2">
                    <span>Tổng cộng:</span>
                    <span className="text-red-600">
                      {Number(selectedOrder.total_amount).toLocaleString(
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
