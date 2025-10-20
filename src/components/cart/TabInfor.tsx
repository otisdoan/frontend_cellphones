/* eslint-disable @typescript-eslint/no-explicit-any */
import InforCustomer from "./InforCustomer";
import InforReceive from "./InforReceive";
import ProductSelected from "./ProductSelected";

interface TabInforProps {
  receiveForm: any;
}

const TabInfor = ({ receiveForm }: TabInforProps) => {
  return (
    <>
      <div>
        <ProductSelected />
        <InforCustomer />
        <InforReceive form={receiveForm} />
      </div>
    </>
  );
};

export default TabInfor;
