/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { productVariantApi } from "../../../utils/api/product_variant.api";

const OptionProduct = ({ idProduct }: { idProduct: number | undefined }) => {
  const getVariant = async () => {
    try {
      const result = await productVariantApi.getById(idProduct);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getVariant();
  }, []);
  return (
    <>
      <div>
        <h3 className="font-bold">Phiên bản</h3>
      </div>
    </>
  );
};

export default OptionProduct;
