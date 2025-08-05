import { useEffect, useState } from "react";
import ProductHome from "../products/ProductHome";
import type { ProductProps } from "../../types/api/ProductResponse";
import { productApi } from "../../utils/api/product.api";
import { sliceArray } from "../../utils/sliceArray";

const SmartphoneList = () => {
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
    {
      name: "NOKIA",
    },
    {
      name: "VIVO",
    },
    {
      name: "realme",
    },
    {
      name: "TECHO",
    },
  ];
  const fetchProducts = async () => {
    try {
      const result = await productApi.getAll();
      setDataProducts(sliceArray(result.data, 2));
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
        <ProductHome
          title="ĐIỆN THOẠI NỔI BẬT NHẤT"
          list={dataProducts}
          brand={brand}
        />
      </div>
    </>
  );
};

export default SmartphoneList;
