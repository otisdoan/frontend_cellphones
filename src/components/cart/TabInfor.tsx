import InforCustomer from "./InforCustomer";
import InforReceive from "./InforReceive";
import ProductSelected from "./ProductSelected";

const TabInfor = () => {
  return (
    <>
      <div>
        <ProductSelected />
        <InforCustomer />
        <InforReceive />
      </div>
    </>
  );
};

export default TabInfor;
