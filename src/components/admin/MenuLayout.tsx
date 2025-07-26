import { Menu, type MenuProps } from "antd";
import { AiOutlineOrderedList, AiOutlineSetting } from "react-icons/ai";
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
      icon: <MdProductionQuantityLimits />,
      label: "Products",
      children: [
        {
          key: "31",
          label: "Product List",
        },
        {
          key: "32",
          label: "Category Management",
        },
        {
          key: "33",
          label: "Brand Management",
        },
        {
          key: "34",
          label: "Variants & Attributes",
        },
      ],
    },
    {
      key: "4",
      icon: <AiOutlineOrderedList />,
      label: <Link to="/admin/orders">Orders</Link>,
    },
    {
      key: "5",
      icon: <HiOutlineUserGroup />,
      label: <Link to="/admin/products">Users</Link>,
    },
    {
      key: "6",
      icon: <MdOutlineWarehouse />,
      label: <Link to="/admin/products">Warehouse</Link>,
    },
    {
      key: "7",
      icon: <RiCoupon2Line />,
      label: <Link to="/admin/products">Promotion & Coupon</Link>,
    },
    {
      key: "8",
      icon: <MdContentPaste />,
      label: <Link to="/admin/products">Blog</Link>,
    },
    {
      type: "divider",
    },
    {
      key: "9",
      icon: <MdOutlineMessage />,
      label: "Message",
    },
    {
      key: "10",
      icon: <MdOutlineNotificationsActive />,
      label: "Notification",
    },
    {
      key: "11",
      icon: <AiOutlineSetting />,
      label: "Setting",
    },
  ];
  return (
    <>
      <Menu items={items} mode="inline" defaultSelectedKeys={["1"]} />
    </>
  );
};

export default MenuLayout;
