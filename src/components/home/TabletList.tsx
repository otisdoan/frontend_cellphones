import { useEffect, useState } from "react";
import type { ProductProps } from "../../types/api/ProductResponse";
import { productApi } from "../../utils/api/product.api";
import ProductNoSlice from "../products/ProductNoSlice";

// TODO: Cập nhật categoryId này cho đúng với database của bạn
const TABLET_CATEGORY_ID = 5; // ID của category "Máy tính bảng" trong DB

const TabletList = () => {
  const [dataProducts, setDataProducts] = useState<ProductProps[]>([]);
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
      const result = await productApi.getByCategory(TABLET_CATEGORY_ID);
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
          title="MÁY TÍNH BẢNG"
          list={dataProducts}
          brand={brand}
        />
      </div>
    </>
  );
};

export default TabletList;
