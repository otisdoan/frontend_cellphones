/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { productVariantApi } from "../../utils/api/product_variant.api";
import type {
  ProductVariantCapacity,
  ProductVatiantProp,
} from "../../types/api/ProductVariantReponse";
import { MdDone } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
// import { useAppDispatch, useAppSelector } from "../../redux/app/hook";
// import { addToCart } from "../../redux/features/product/cartSlice";

const OptionProduct = ({ idProduct }: { idProduct: number | undefined }) => {
  const location = useLocation();
  const navigate = useNavigate();
  // const cart = useAppSelector((state) => state.cart);
  // const dispatch = useAppDispatch();
  const [capacity, setCapacity] = useState<ProductVariantCapacity[]>([]);
  const [variant, setVariant] = useState<ProductVatiantProp[]>([]);
  const [current, setCurrent] = useState<number>(0);
  const [currentVariant, setCurrentVariant] = useState<number>(0);

  const getVariant = async () => {
    try {
      const result = await productVariantApi.getCapacity(idProduct);
      if (Array.isArray(result.data)) {
        handleCapacity(result.data[0].capacity, 0);
        setCapacity(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCapacity = async (capacity: string, index: number) => {
    try {
      setCurrent(index);
      const result = await productVariantApi.getVariantByCapacity(capacity);
      if (Array.isArray(result.data)) {
        setVariant(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleVariant = (index: number, id_variant: number) => {
    // dispatch(addToCart(cart.));
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("id_variant", id_variant.toString());
    setCurrentVariant(index);

    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    });
  };

  useEffect(() => {
    getVariant();
  }, []);

  return (
    <>
      <div>
        <h3 className="font-bold mb-3">Phiên bản</h3>
        <div className="flex items-center gap-x-4">
          {capacity.map((item, index) => (
            <div
              className={`px-6 py-4 border-[1px] flex items-center justify-center rounded-lg cursor-pointer relative overflow-hidden ${
                current === index && `border-[2px] border-[#d70019]`
              }`}
              key={index}
              onClick={() => handleCapacity(item.capacity, index)}
            >
              <span className="font-medium">{item.capacity}</span>
              {current === index && (
                <div className="flex items-center justify-center bg-[#d70019] absolute top-[-0.2rem] right-[-0.2rem] rounded-md w-5 h-5 p-1 ">
                  <MdDone className="text-white" />
                </div>
              )}
            </div>
          ))}
        </div>
        <h3 className="font-bold mb-3 mt-5">Màu sắc</h3>
        <div className="grid grid-cols-3 gap-4">
          {variant.map((item, index) => (
            <div
              className={`border-[1px] rounded-lg p-2 flex items-center gap-x-2 cursor-pointer relative overflow-hidden ${
                currentVariant === index && `border-[2px] border-[#d70019]`
              }`}
              key={index}
              onClick={() => handleVariant(index, item.id)}
            >
              <div className="w-[2.5rem] h-[2.5rem]">
                <img
                  src={item.image_url}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold whitespace-nowrap">
                  {item.variant_name}
                </span>
                <span className="font-light text-[0.8rem]">{item.price}đ</span>
              </div>
              {currentVariant === index && (
                <div className="flex items-center justify-center bg-[#d70019] absolute top-[-0.2rem] right-[-0.2rem] rounded-md w-5 h-5 p-1 ">
                  <MdDone className="text-white" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default OptionProduct;
