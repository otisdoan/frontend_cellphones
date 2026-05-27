import { Menu, type MenuProps } from "antd";
import { AiOutlineOrderedList, AiOutlineSetting, AiOutlineStar, AiOutlineEnvironment } from "react-icons/ai";
import { HiOutlineUserGroup } from "react-icons/hi";
import {
  MdContentPaste,
  MdOutlineMessage,
  MdOutlineNotificationsActive,
  MdOutlineWarehouse,
  MdProductionQuantityLimits,
} from "react-icons/md";
import { RiCoupon2Line } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { TbDeviceAnalytics } from "react-icons/tb";
import { Link } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];
const MenuLayout = () => {
  const items: MenuItem[] = [
    {
      key: "1",
      icon: <RxDashboard />,
      label: <Link to="/admin">Dashboard</Link>,
    },
    {
      key: "2",
      icon: <TbDeviceAnalytics />,
      label: "Analytics",
    },
    {
      key: "3",
      icon: <HiOutlineUserGroup />,
      label: <Link to="/admin/users">Users</Link>,
    },
    {
      key: "4",
      icon: <MdProductionQuantityLimits />,
      label: "Products",
      children: [
        {
          key: "31",
          label: <Link to="/admin/products">Product List</Link>,
        },
        {
          key: "32",
          label: <Link to="/admin/category">Category Management</Link>,
        },
        {
          key: "33",
          label: <Link to="/admin/brand">Brand Management</Link>,
        },
        {
          key: "34",
          label: <Link to="/admin/product-images">Product Images</Link>,
        },
        {
          key: "35",
          label: <Link to="/admin/product-variant">Product Variants</Link>,
        },
        {
          key: "36",
          label: <Link to="/admin/product-attribute">Product Attributes</Link>,
        },
      ],
    },
    {
      key: "5",
      icon: <AiOutlineOrderedList />,
      label: <Link to="/admin/orders">Orders</Link>,
    },
    {
      key: "6",
      icon: <MdOutlineWarehouse />,
      label: "Warehouse",
      children: [
        {
          key: "61",
          label: <Link to="/admin/warehouses">Kho hàng</Link>,
        },
        {
          key: "62",
          label: <Link to="/admin/inventories">Tồn kho</Link>,
        },
      ],
    },
    {
      key: "7",
      icon: <RiCoupon2Line />,
      label: <Link to="/admin/coupons">Coupon</Link>,
    },
    {
      key: "8",
      icon: <AiOutlineStar />,
      label: <Link to="/admin/product-reviews">Đánh giá</Link>,
    },
    {
      key: "9",
      icon: <AiOutlineEnvironment />,
      label: <Link to="/admin/user-addresses">Địa chỉ</Link>,
    },
    {
      type: "divider",
    },
    {
      key: "10",
      icon: <MdOutlineMessage />,
      label: "Message",
    },
    {
      key: "11",
      icon: <MdOutlineNotificationsActive />,
      label: "Notification",
    },
    {
      key: "12",
      icon: <MdContentPaste />,
      label: "Blog",
    },
    {
      key: "13",
      icon: <AiOutlineSetting />,
      label: "Setting",
    },
  ];
  return (
    <>
      <Menu items={items} mode="inline" />
    </>
  );
};

export default MenuLayout;
