import { Avatar, ConfigProvider, Drawer, Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import SvgLogoDesktop from "../../../components/svg/SvgLogoDesktop";
import { useState } from "react";
import { IoCaretBackCircle } from "react-icons/io5";
import SvgLogo from "../../../components/svg/SvgLogo";
import { Outlet, useNavigate } from "react-router-dom";
import MenuLayout from "../../../components/admin/MenuLayout";
import { IoMdArrowDropdown } from "react-icons/io";
import { BsList } from "react-icons/bs";
const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <>
      <div>
        <div className="hidden md:block">
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
                  <div
                    className="bg-[#d70019] md:h-[4rem] md:flex md:items-center md:justify-center md:mb-2 cursor-pointer"
                    onClick={() => navigate("/admin")}
                  >
                    <SvgLogoDesktop />
                  </div>
                ) : (
                  <div
                    className="bg-[#d70019] md:h-[4rem] md:flex md:items-center md:justify-center md:mb-2 w-[5rem] cursor-pointer"
                    onClick={() => navigate("/admin")}
                  >
                    <SvgLogo width="40" height="40" />
                  </div>
                )}
                {/* {!collapsed ? (
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
                )} */}
                <MenuLayout />
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
              <Footer style={{ textAlign: "center" }}>
                Cellphones ©{new Date().getFullYear()} Created by OtisDoan
              </Footer>
            </Layout>
          </Layout>
        </div>

        <div className="md:hidden">
          <Layout>
            <Header className="bg-white px-4">
              <div className="flex items-center justify-between ">
                <div className="bg-[#d70019] ">
                  <SvgLogo width="40" height="40" />
                </div>
                <h1 className="font-medium text-[1.2rem]">Dashboard</h1>
                <BsList
                  className="text-[1.2rem]"
                  onClick={() => setOpen(true)}
                />
              </div>
              <Drawer
                title="Menu"
                closable={{ "aria-label": "Close Button" }}
                onClose={() => setOpen(false)}
                open={open}
              >
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
                  <MenuLayout />
                  <div className="bg-[#f0f0f0] flex items-center p-4 justify-between rounded-lg mt-4">
                    <div className="flex items-center gap-x-2">
                      <Avatar src={"/images/doanhieu.jpg"} size={"large"} />
                      <div className="flex flex-col mr-4">
                        <span className="font-medium">Otis Doan</span>
                        <span className="text-[0.7rem] opacity-80">Admin</span>
                      </div>
                    </div>
                    <IoMdArrowDropdown className="text-[1.2rem]" />
                  </div>
                </ConfigProvider>
              </Drawer>
            </Header>
            <Content>
              <Outlet />
            </Content>
            <Footer style={{ textAlign: "center" }}>
              Cellphones ©{new Date().getFullYear()} Created by OtisDoan
            </Footer>
          </Layout>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
