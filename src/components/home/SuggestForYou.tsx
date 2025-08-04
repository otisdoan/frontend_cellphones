import { useEffect, useState } from "react";
import ProductNoSlice from "../products/ProductNoSlice";
import StarIcon from "../svg/StarIcon";
import { productApi } from "../../utils/api/product.api";
import type { ProductProps } from "../../types/api/ProductResponse";

const SuggestForYou = () => {
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
      <div
        className="bg-cover bg-no-repeat rounded-[1rem] p-4"
        style={{
          backgroundImage: "url('/images/AnnRec1.webp')",
        }}
      >
        <div className="flex items-center gap-x-2">
          <StarIcon />
          <h2 className="text-[1.5rem] text-[#04297a] font-bold">
            GỢI Ý CHO BẠN
          </h2>
        </div>
        <ProductNoSlice list={dataProducts} suggest={true} />
      </div>
    </>
  );
};

export default SuggestForYou;
