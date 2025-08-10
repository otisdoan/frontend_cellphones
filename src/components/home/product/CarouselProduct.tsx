/* eslint-disable react-hooks/exhaustive-deps */
import { Carousel } from "antd";
import type { CarouselRef } from "antd/es/carousel";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import {
  MdKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { useLocation } from "react-router-dom";
import { productVariantApi } from "../../../utils/api/product_variant.api";

const CarouselProduct = ({
  array_image,
}: {
  array_image: string[] | null | undefined;
}) => {
  const location = useLocation();
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const carouselRef = useRef<CarouselRef>(null);
  const carouselBottomRef = useRef<CarouselRef>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [mainImage, setMainImage] = useState<string[]>(array_image ?? []);

  const handlePrev = () => {
    carouselRef.current?.prev();
  };

  const handleNext = () => {
    carouselRef.current?.next();
  };

  const handleChange = (index: number) => {
    setCurrentIndex(index);
  };

  const getVariant = async () => {
    try {
      const queryParams = new URLSearchParams(location.search);
      const id_variant = queryParams.get("id_variant");
      const result = await productVariantApi.getVariantById(Number(id_variant));
      if (!Array.isArray(result.data)) {
        setMainImage([result.data.image_url, ...(array_image ?? [])]);
        carouselRef.current?.goTo(0);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getVariant();
  }, [location.search]);

  return (
    <>
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Carousel
          dots={false}
          arrows={false}
          ref={carouselRef}
          afterChange={handleChange}
        >
          {mainImage?.map((item, index) => (
            <div
              key={index}
              className="border-[1px] w-full h-[20rem] rounded-xl cursor-pointer"
            >
              <img src={item} className="object-contain w-full h-full" />
            </div>
          ))}
        </Carousel>
        <div
          className={`absolute top-1/2 p-2 left-[-2rem] transform -translate-y-1/2 w-[4rem] h-[4rem] bg-[#b3b3b3] bg-opacity-50 hover:bg-opacity-75 rounded-full flex items-center justify-end cursor-pointer transition-all duration-300 z-10 ${
            isHovered ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={handlePrev}
        >
          <IoIosArrowBack className="text-white text-[2rem]" />
        </div>

        <div
          className={`absolute p-2 top-1/2 right-[-2rem] transform -translate-y-1/2 w-[4rem] h-[4rem] bg-[#b3b3b3] bg-opacity-50 hover:bg-opacity-75 rounded-full flex items-center justify-start cursor-pointer transition-all duration-300 z-10 ${
            isHovered ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={handleNext}
        >
          <IoIosArrowForward className="text-white text-[2rem]" />
        </div>
      </div>
      <div className="relative mt-4">
        <Carousel
          slidesToShow={8}
          ref={carouselBottomRef}
          dots={false}
          arrows={false}
        >
          {array_image?.map((item, index) => (
            <div
              key={index}
              className="w-full cursor-pointer h-full px-1 border-none"
              onClick={() => carouselRef.current?.goTo(index)}
            >
              <img
                src={item}
                className={`object-contain w-full h-full border-[1px] rounded-lg ${
                  currentIndex === index && `border-[#d70019]`
                }`}
              />
            </div>
          ))}
        </Carousel>
        <div
          className="bg-white flex items-center justify-center p-1 rounded-full shadow-lg border-[1px] w-7 h-7 absolute top-[1.2rem] cursor-pointer"
          onClick={() => carouselBottomRef.current?.prev()}
        >
          <MdKeyboardArrowLeft className="text-[1.1rem]" />
        </div>
        <div
          className="bg-white flex items-center justify-center p-1 rounded-full shadow-lg border-[1px] w-7 h-7 absolute top-[1.2rem] right-0 cursor-pointer"
          onClick={() => carouselBottomRef.current?.next()}
        >
          <MdOutlineKeyboardArrowRight className="text-[1.1rem]" />
        </div>
      </div>
    </>
  );
};

export default CarouselProduct;
