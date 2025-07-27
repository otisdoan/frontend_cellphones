import { Breadcrumb, ConfigProvider, type BreadcrumbProps } from "antd";

const BreadcrumbAmin = ({ ...props }: BreadcrumbProps) => {
  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Breadcrumb: {
              itemColor: "#d70119",
              linkColor: "#d70119",
              linkHoverColor: "#d70119",
            },
          },
          token: {
            colorBgTextHover: "#fcdfe1",
          },
        }}
      >
        <Breadcrumb {...props} />
      </ConfigProvider>
    </>
  );
};

export default BreadcrumbAmin;
