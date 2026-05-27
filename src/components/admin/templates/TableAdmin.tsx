import { ConfigProvider, Table, type TableProps } from "antd";
import type { AnyObject } from "antd/es/_util/type";

const TableAdmin = <RecordType extends AnyObject = AnyObject>({ className, ...props }: TableProps<RecordType>) => {
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
        <Table className={`admin-table ${className || ""}`} {...props} />
      </ConfigProvider>
    </>
  );
};

export default TableAdmin;
