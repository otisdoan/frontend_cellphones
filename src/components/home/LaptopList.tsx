import { useEffect, useState } from "react";
import ProductHome from "../products/ProductHome";
import { productApi } from "../../utils/api/product.api";
import { sliceArray } from "../../utils/sliceArray";
import type { ProductProps } from "../../types/api/ProductResponse";

// TODO: Cập nhật categoryId này cho đúng với database của bạn
const LAPTOP_CATEGORY_ID = 2; // ID của category "Laptop" trong DB

const LaptopList = () => {
  const [dataProducts, setDataProducts] = useState<ProductProps[][]>([]);
  const brand: { name: string }[] = [
    {
      name: "Apple",
    },
    {
      name: "Samsung",
    },
    {
      name: "Xiaomi",
    },
    {
      name: "OPPO",
    },
  ];
  const fetchProducts = async () => {
    try {
      const result = await productApi.getByCategory(LAPTOP_CATEGORY_ID);
      if (Array.isArray(result.data)) {
        setDataProducts(sliceArray(result.data, 2));
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
        <ProductHome title="LAPTOP" list={dataProducts} brand={brand} />
      </div>
    </>
  );
};
export default LaptopList;
