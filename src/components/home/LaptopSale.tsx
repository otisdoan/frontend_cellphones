import { useEffect, useState } from "react";
import ProductNoSlice from "../products/ProductNoSlice";
import { productApi } from "../../utils/api/product.api";
import type { ProductProps } from "../../types/api/ProductResponse";

// TODO: Cập nhật categoryId này cho đúng với database của bạn
const LAPTOP_CATEGORY_ID = 9; // ID của category "Laptop" trong DB

const LaptopSale = () => {
  const [dataProducts, setDataProducts] = useState<ProductProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProducts = async () => {
    try {
      const result = await productApi.getByCategory(LAPTOP_CATEGORY_ID);
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
