import { Tabs, Button, Dropdown } from "antd";
import { useEffect, useState, useCallback, type ReactNode } from "react";
import {
  notificationApi,
  type NotificationProps,
} from "../../utils/api/notification.api";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FiShoppingCart, FiShoppingBag } from "react-icons/fi";

interface NotificationDropdownProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

const NotificationDropdown = ({
  open,
  onClose,
  children,
}: NotificationDropdownProps) => {
  const { user } = useAuthContext()!;
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);

  const fetchNotifications = useCallback(async () => {
    if (!user?.id) return;
    try {
      const type = activeTab === "order" ? "order" : undefined;
      const response = await notificationApi.getAll(user.id, type);
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  }, [user?.id, activeTab]);

  useEffect(() => {
    if (open && user?.id) {
      fetchNotifications();
    }
  }, [open, user?.id, fetchNotifications]);

  const handleNotificationClick = async (notification: NotificationProps) => {
    onClose();
    setTimeout(async () => {
      if (!notification.is_read) {
        await notificationApi.markAsRead(notification.id);
      }
      if (notification.order_number) {
        navigate(`/profile/orders/${notification.order_number}`);
      }
    }, 100);
  };

  const markAllRead = async () => {
    if (!user?.id) return;
    try {
      await notificationApi.markAllAsRead(user.id);
      await fetchNotifications();
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  const getIcon = (iconType?: string) => {
    switch (iconType) {
      case "cart":
        return <FiShoppingCart className="text-[1.5rem] text-[#d70019]" />;
      case "bag":
        return <FiShoppingBag className="text-[1.5rem] text-[#d70019]" />;
      default:
        return <FiShoppingCart className="text-[1.5rem] text-[#d70019]" />;
    }
  };

  const getTimeAgo = (date: string) => {
    const now = new Date();
    const past = new Date(date);
    const diffMs = now.getTime() - past.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Vừa xong";
    if (diffMins < 60) return `${diffMins} phút trước`;
    if (diffHours < 24) return `${diffHours} giờ trước`;
    if (diffDays < 7) return `${diffDays} ngày trước`;
    return past.toLocaleDateString("vi-VN");
  };

  const handleSmemberClick = () => {
    onClose();
    setTimeout(() => {
      navigate("/profile");
    }, 100);
  };

  const renderSmemberSection = () => (
    <div
      className="flex items-center gap-x-3 px-4 py-4 bg-white border-b-2 border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
      onMouseDown={(e) => {
        e.stopPropagation();
        handleSmemberClick();
      }}
    >
      <div className="w-12 h-12 bg-[#d70019] rounded-full flex items-center justify-center flex-shrink-0">
        <svg
          className="w-7 h-7 text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
        </svg>
      </div>
      <div className="flex-1">
        <p className="text-base font-semibold text-[#d70019]">
          Truy cập Smember
        </p>
      </div>
      <svg
        className="w-6 h-6 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </div>
  );

  const renderNotificationItem = (notification: NotificationProps) => (
    <div
      key={notification.id}
      className={`flex gap-x-3 px-4 py-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
        !notification.is_read ? "bg-blue-50" : "bg-white"
      }`}
      onMouseDown={(e) => {
        e.stopPropagation();
        handleNotificationClick(notification);
      }}
    >
      <div className="flex items-start justify-center pt-1">
        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
          {getIcon(notification.icon_type)}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-x-2">
          <p className="text-sm font-medium text-gray-900 line-clamp-2">
            {notification.title}
          </p>
          {notification.metadata &&
            typeof notification.metadata === "object" &&
            "status" in notification.metadata && (
              <span className="text-xs px-2 py-0.5 bg-red-100 text-[#d70019] rounded whitespace-nowrap">
                {notification.metadata.status === "confirmed"
                  ? "Đã hủy"
                  : "Đã xác nhận"}
              </span>
            )}
        </div>
        {notification.message && (
          <p className="text-xs text-gray-600 mt-1 line-clamp-2">
            {notification.message}
          </p>
        )}
        {notification.metadata &&
          typeof notification.metadata === "object" &&
          "amount" in notification.metadata && (
            <p className="text-sm font-medium text-gray-900 mt-1">
              Tổng thanh toán:{" "}
              <span className="text-[#d70019]">
                {Number(notification.metadata.amount).toLocaleString("vi-VN")}đ
              </span>
            </p>
          )}
        {notification.order_number && (
          <p className="text-xs text-gray-500 mt-1">
            Đơn hàng:{" "}
            <span className="font-medium">{notification.order_number}</span>
          </p>
        )}
        <p className="text-xs text-gray-400 mt-1">
          {getTimeAgo(notification.created_at)}
        </p>
      </div>
    </div>
  );

  const tabItems = [
    {
      key: "all",
      label: "Tất cả",
      children: (
        <div className="max-h-[350px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p className="text-sm">Không có thông báo</p>
            </div>
          ) : (
            notifications.map(renderNotificationItem)
          )}
        </div>
      ),
    },
    {
      key: "order",
      label: "Đơn hàng",
      children: (
        <div className="max-h-[350px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p className="text-sm">Không có đơn hàng</p>
            </div>
          ) : (
            notifications.map(renderNotificationItem)
          )}
        </div>
      ),
    },
  ];

  const dropdownContent = (
    <div className="bg-white rounded-lg shadow-lg w-[420px] max-h-[600px] overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <h3 className="text-base font-semibold text-gray-900">Thông báo</h3>
        <div className="flex items-center gap-x-3">
          <Button
            type="link"
            size="small"
            onMouseDown={(e) => {
              e.stopPropagation();
              markAllRead();
            }}
            className="text-[#d70019] hover:text-[#d70019] p-0 h-auto"
          >
            Đánh dấu đã đọc tất cả
          </Button>
          <button
            type="button"
            onMouseDown={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Smember Section */}
      {renderSmemberSection()}

      {/* Tabs */}
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={tabItems}
        className="notification-tabs"
        tabBarStyle={{
          margin: 0,
          paddingLeft: "16px",
          paddingRight: "16px",
        }}
      />

      {/* Footer Button */}
      <div className="px-4 py-3 border-t border-gray-200">
        <Button
          type="primary"
          block
          className="bg-[#d70019] hover:bg-[#b8001a] border-none h-10 font-medium"
          onMouseDown={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          Đóng
        </Button>
      </div>
    </div>
  );

  return (
    <Dropdown
      open={open}
      onOpenChange={(visible) => !visible && onClose()}
      dropdownRender={() => dropdownContent}
      trigger={["click"]}
      placement="bottomRight"
    >
      {children}
    </Dropdown>
  );
};

export default NotificationDropdown;
