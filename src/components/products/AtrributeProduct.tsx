/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { productAttributeApi } from "../../utils/api/product_attribute.api";
import type { ProductAttributeProps } from "../../types/api/ProductAttributeResponse";
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
      if (Array.isArray(result.data)) {
        setAttribute(result.data);
      }
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
        <div className="rounded-xl overflow-hidden">
          <table className="border-[1px]">
            <tbody>
              {attribute.map((item, index) => (
                <tr className="border-[1px]" key={index}>
                  <td className="border-[1px] text-[0.9rem] font-light bg-[#f2f2f2] px-4 py-2 min-w-[13rem]">
                    {item.attribute_name}
                  </td>
                  <td className="text-[0.9rem] font-light px-4">
                    {item.attribute_value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AtrributeProduct;
