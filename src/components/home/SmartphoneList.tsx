import { useEffect, useState } from "react";
import ProductHome from "../products/ProductHome";
import type { ProductProps } from "../../types/api/ProductResponse";
import { productApi } from "../../utils/api/product.api";
import { sliceArray } from "../../utils/sliceArray";

const SmartphoneList = () => {
  const [dataProducts, setDataProducts] = useState<ProductProps[][]>([]);
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
  const fetchProducts = async (): Promise<void> => {
    try {
      const result = await productApi.getAll();
      setLoading(false);
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
        <ProductHome
          title="ĐIỆN THOẠI NỔI BẬT NHẤT"
          list={dataProducts}
          brand={brand}
          loading={loading}
        />
      </div>
    </>
  );
};

export default SmartphoneList;
