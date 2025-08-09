/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { productAttributeApi } from "../../../utils/api/product_attribute.api";
import type { ProductAttributeProps } from "../../../types/api/ProductAttributeResponse";
import { MdKeyboardArrowRight } from "react-icons/md";

const AtrributeProduct = ({
  id_product,
}: {
  id_product: number | undefined;
}) => {
  const [attribute, setAttribute] = useState<ProductAttributeProps[]>([]);

  const getAttribute = async () => {
    try {
      const result = await productAttributeApi.getByProductId(id_product);
      setAttribute(result.data);
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAttribute();
  }, []);

  return (
    <>
      <div>
        <div className="flex justify-between mb-4">
          <h3 className="font-bold text-[1.1rem] mt-4">Thông số kỹ thuật</h3>
          <div className="flex items-center cursor-pointer">
            <span className="text-[0.8rem] text-[#4488f6]">Xem tất cả</span>
            <MdKeyboardArrowRight className="text-[#4488f6]" />
          </div>
        </div>
        <div className="flex flex-col border-[1px] p-4 rounded-2xl">
          {attribute.map((item, index) => (
            <div key={index} className="flex items-center">
              <div className="flex items-center justify-startr py-3 min-w-[10rem] border-[1px]">
                <span className="text-[0.9rem] font-light">
                  {item.attribute_name}
                </span>
              </div>
              <div className="flex items-center justify-start p-3 border-[1px] w-full">
                <span className="text-[0.9rem] font-light">
                  {item.attribute_value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AtrributeProduct;
