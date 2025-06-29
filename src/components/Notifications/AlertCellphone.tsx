import { Alert, type AlertProps } from "antd";

const AlertCellphone = ({ ...props }: AlertProps) => {
  return (
    <>
      <Alert {...props} />
    </>
  );
};

export default AlertCellphone;
