import { useEffect, useState } from "react";
import { categoryApi } from "../../../utils/api/category.api";
import type {
  CategoryResponse,
  CategoryTabletMobile,
} from "../../../types/api/CategoryResponse";

const TabletContent = () => {
  const [category, setCategory] = useState<
    CategoryResponse<CategoryTabletMobile>["data"]
  >([]);

  const categorySmartphone = async () => {
    try {
      const result = await categoryApi.getCategoryTabletMobile();
      setCategory(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    categorySmartphone();
  }, []);

  return (
    <>
      <div className="p-2">
        <div className="flex justify-between items-center">
          <h3 className="text-[1.2rem] font-bold">Tablet</h3>
          <span className="font-light text-[0.9rem]">Xem tất cả</span>
        </div>
        <div className="flex flex-col gap-y-4">
          {category.map((item, index) => {
            if (index === 0) {
              return (
                <div key={index}>
                  <h4 className="font-bold my-2">{item.title}</h4>
                  <div className="w-full overflow-x-auto scroll-smooth scrollbar-hide">
                    <div className="flex items-center justify-center flex-wrap gap-4 w-[30rem]">
                      {item.brand.map((brand, index) => (
                        <div
                          key={index}
                          className="flex-[1_1_calc(20%-1rem)] p-4 border-[1px] rounded-lg  max-h-[2rem] flex items-center justify-center overflow-hidden"
                        >
                          {brand.logo_url === "" ? (
                            <span className="text-[0.8rem]">{brand.name}</span>
                          ) : (
                            <img
                              className="object-contain"
                              src={brand.logo_url}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }
            if (index === 1) {
              return (
                <div key={index}>
                  <h4 className="font-bold my-2">{item.title}</h4>
                  <div className="w-full overflow-x-auto scroll-smooth scrollbar-hide">
                    <div className="flex items-center flex-wrap gap-4 w-[35rem]">
                      {item.products.map((product, index) => (
                        <div
                          key={index}
                          className="max-w-flex-[1_1_calc(25%-1rem)] p-2 border-[1px] rounded-lg h-[2.5rem] flex items-center justify-center overflow-hidden"
                        >
                          <span className="whitespace-nowrap text-[0.8rem]">
                            {product.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </>
  );
};

export default TabletContent;
