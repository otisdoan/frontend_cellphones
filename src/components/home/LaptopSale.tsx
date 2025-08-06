import { useEffect, useState } from "react";
import ProductNoSlice from "../products/ProductNoSlice";
import { productApi } from "../../utils/api/product.api";
import type { ProductProps } from "../../types/api/ProductResponse";

const LaptopSale = () => {
  const [dataProducts, setDataProducts] = useState<ProductProps[]>([]);

  const fetchProducts = async () => {
    try {
      const result = await productApi.getAll();
      setDataProducts(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <>
      <div>
        <ProductNoSlice list={dataProducts} suggest={true} />
      </div>
    </>
  );
};

export default LaptopSale;
