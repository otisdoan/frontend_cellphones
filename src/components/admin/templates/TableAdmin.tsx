import { ConfigProvider, Table, type TableProps } from "antd";

type TableAdminProps = TableProps;

const TableAdmin = ({ ...props }: TableAdminProps) => {
  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#fcdfe1",
              rowHoverBg: "#fcf2f1",
            },
          },
          token: {
            colorPrimary: "d70019",
          },
        }}
      >
        <Table {...props} />
      </ConfigProvider>
    </>
  );
};

export default TableAdmin;
