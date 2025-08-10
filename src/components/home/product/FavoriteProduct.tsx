import { useEffect, useState } from "react";
import type { ProductProps } from "../../../types/api/ProductResponse";
import { productApi } from "../../../utils/api/product.api";
import ProductNoSlice from "../../products/ProductNoSlice";

const FavoriteProduct = () => {
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
        <ProductNoSlice title="Có thể bạn thích" list={dataProducts} />
      </div>
    </>
  );
};

export default FavoriteProduct;
