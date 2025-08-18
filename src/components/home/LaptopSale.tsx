import { useEffect, useState } from "react";
import ProductNoSlice from "../products/ProductNoSlice";
import { productApi } from "../../utils/api/product.api";
import type { ProductProps } from "../../types/api/ProductResponse";

const LaptopSale = () => {
  const [dataProducts, setDataProducts] = useState<ProductProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProducts = async () => {
    try {
      const result = await productApi.getAll();
      setLoading(false);
      if (Array.isArray(result.data)) {
        setDataProducts(result.data);
      }
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
        <ProductNoSlice list={dataProducts} suggest={true} loading={loading} />
      </div>
    </>
  );
};

export default LaptopSale;
