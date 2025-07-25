import { Avatar, ConfigProvider, Layout, Menu, type MenuProps } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import SvgLogoDesktop from "../../../components/svg/SvgLogoDesktop";
import { useState } from "react";
import { RxDashboard } from "react-icons/rx";
import { TbDeviceAnalytics } from "react-icons/tb";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdOutlineMessage } from "react-icons/md";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { AiOutlineSetting } from "react-icons/ai";
import { IoCaretBackCircle } from "react-icons/io5";
import SvgLogo from "../../../components/svg/SvgLogo";
import { Link, Outlet } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];
const AdminLayout = () => {
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
      children: [
        { key: "21", label: "Option 1" },
        { key: "22", label: "Option 2" },
        {
          key: "23",
          label: "Submenu",
          children: [
            { key: "231", label: "Option 1" },
            { key: "232", label: "Option 2" },
            { key: "233", label: "Option 3" },
          ],
        },
        {
          key: "24",
          label: "Submenu 2",
          children: [
            { key: "241", label: "Option 1" },
            { key: "242", label: "Option 2" },
            { key: "243", label: "Option 3" },
          ],
        },
      ],
    },
    {
      type: "divider",
    },
    {
      key: "3",
      icon: <MdOutlineMessage />,
      label: "Message",
    },
    {
      key: "4",
      icon: <MdOutlineNotificationsActive />,
      label: "Notification",
    },
    {
      key: "5",
      icon: <AiOutlineSetting />,
      label: "Setting",
    },
  ];
  const [collapsed, setCollapsed] = useState<boolean>(false);
  return (
    <>
      <div>
        <Layout>
          <ConfigProvider
            theme={{
              components: {
                Menu: {
                  itemHoverBg: "#fcdfe1",
                  itemSelectedColor: "#d70019",
                  itemSelectedBg: "#fcdfe1",
                  subMenuItemSelectedColor: "#d70019",
                  itemHoverColor: "#d70019",
                },
              },
            }}
          >
            <Sider collapsed={collapsed} className="bg-white">
              {!collapsed ? (
                <div className="bg-[#d70019] md:h-[4rem] md:flex md:items-center md:justify-center md:mb-2">
                  <SvgLogoDesktop />
                </div>
              ) : (
                <div className="bg-[#d70019] md:h-[4rem] md:flex md:items-center md:justify-center md:mb-2 w-[5rem]">
                  <SvgLogo width="40" height="40" />
                </div>
              )}
              {!collapsed ? (
                <div className="md:flex md:items-center md:gap-x-2 cursor-pointer px-4 py-2 bg-[#f0f0f0] rounded-sm mb-4">
                  <Avatar src={"/images/doanhieu.jpg"} size={"large"} />
                  <div className="flex flex-col mr-4">
                    <span className="font-medium">Otis Doan</span>
                    <span className="text-[0.7rem] opacity-80">Admin</span>
                  </div>
                  <IoMdArrowDropdown className="text-[1.2rem]" />
                </div>
              ) : (
                <div className="md:flex md:items-center md:gap-x-2 cursor-pointer px-4 py-2 bg-[#f0f0f0] rounded-sm mb-4">
                  <Avatar src={"/images/doanhieu.jpg"} size={"large"} />
                </div>
              )}
              <Menu items={items} mode="inline" defaultSelectedKeys={["1"]} />
              <div
                className="flex justify-center cursor-pointer mt-5"
                onClick={() => setCollapsed(!collapsed)}
              >
                <IoCaretBackCircle className="text-[2rem] text-[#d70019] " />
              </div>
            </Sider>
          </ConfigProvider>
          <Layout>
            <Content>
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </div>
    </>
  );
};

export default AdminLayout;
