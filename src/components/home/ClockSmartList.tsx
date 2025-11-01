import { useEffect, useState } from "react";
import type { ProductProps } from "../../types/api/ProductResponse";
import { productApi } from "../../utils/api/product.api";
import ProductNoSlice from "../products/ProductNoSlice";

// TODO: Cập nhật categoryId này cho đúng với database của bạn
const SMARTWATCH_CATEGORY_ID = 13; // ID của category "Đồng hồ thông minh" trong DB

const ClockSmartList = () => {
  const [dataProducts, setDataProducts] = useState<ProductProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
      const result = await productApi.getByCategory(SMARTWATCH_CATEGORY_ID);
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
        <ProductNoSlice
          title="ĐỒNG HỒ THÔNG MINH"
          list={dataProducts}
          brand={brand}
          loading={loading}
        />
      </div>
    </>
  );
};

export default ClockSmartList;
