/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation } from "react-router-dom";
import { productApi } from "../../utils/api/product.api";
import { useEffect, useState } from "react";
import type { ProductProps } from "../../types/api/ProductResponse";
import { FaRegHeart, FaStar } from "react-icons/fa6";
import { LuCirclePlus, LuMessageSquareText } from "react-icons/lu";
import { HiOutlineChip } from "react-icons/hi";
import { Divider } from "antd";
import CarouselProduct from "../../components/products/CarouselProduct";
import ProductCommitments from "../../components/products/ProductCommitments";
import OptionProduct from "../../components/products/OptionProduct";
import GiftProduct from "../../components/products/GiftProduct";
import AtrributeProduct from "../../components/products/AtrributeProduct";
import FavoriteProduct from "../../components/products/FavoriteProduct";

const ProductDetailPage = () => {
  const location = useLocation();
  const [product, setProduct] = useState<ProductProps | null>(null);

  const getProductDetail = async () => {
    try {
      const result = await productApi.getProductBySlug(location.pathname);
      if (!Array.isArray(result.data)) {
        setProduct(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductDetail();
  }, []);

  return (
    <>
      <div className="flex gap-x-8 ">
        <div className="w-1/2 flex flex-col gap-y-3 mt-4 sticky top-[2rem]">
          <h2 className="text-[1.3rem] font-semibold">{product?.name}</h2>
          <div className="flex items-center gap-x-1">
            <FaStar className="text-[#ffd531]" />
            <span className="font-medium">{product?.rating_average}</span>
            <span className="opacity-65">{`(${product?.rating_count} đánh giá)`}</span>
          </div>
          <div className="flex items-center gap-x-3">
            <div className="flex items-center gap-x-1 text-[#3c82f6] ">
              <FaRegHeart className="text-[1.5rem]" />
              <span className="text-[0.9rem]">Yêu thích</span>
            </div>
            <Divider type="vertical" className="h-3" />
            <div className="flex items-center gap-x-1 text-[#3c82f6] ">
              <LuMessageSquareText className="text-[1.5rem]" />
              <span className="text-[0.9rem]">Hỏi đáp</span>
            </div>
            <Divider type="vertical" className="h-3" />
            <div className="flex items-center gap-x-1 text-[#3c82f6] ">
              <HiOutlineChip className="text-[1.5rem]" />
              <span className="text-[0.9rem]">Thông số</span>
            </div>
            <Divider type="vertical" className="h-3" />
            <div className="flex items-center gap-x-1 text-[#3c82f6] ">
              <LuCirclePlus className="text-[1.5rem]" />
              <span className="text-[0.9rem]">So sánh</span>
            </div>
          </div>
          <div>
            <CarouselProduct array_image={product?.product_image} />
          </div>
          <ProductCommitments />
          {product?.id && <AtrributeProduct id_product={product?.id} />}
        </div>
        <div className="w-1/2 mt-4">
          <div className="rounded-lg p-4 border-[1px] border-[#71a4fb] bg-[#f1f6ff] w-[21rem] mb-4">
            <div className="p-1 bg-[#fae6e8] text-[#d70019] rounded-md w-[13rem] mb-3">
              <span>Giá giành riêng cho SMEM</span>
            </div>
            <div className="flex gap-x-4 items-center">
              <span className="text-[1.5rem] font-medium ">
                {product?.price}đ
              </span>
              <span className="text-[1rem] opacity-60 line-through">
                {product?.sale_price}đ
              </span>
            </div>
          </div>
          {product?.id && <OptionProduct idProduct={product?.id} />}
          <GiftProduct />
        </div>
      </div>
      <div className="mt-4">
        <FavoriteProduct />
      </div>
    </>
  );
};

export default ProductDetailPage;
