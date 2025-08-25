import { Carousel } from "antd";
import type { CarouselRef } from "antd/es/carousel";
import { useRef, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const CarouselCategory = () => {
  const carouselRef = useRef<CarouselRef>(null);
  const carouselBottomRef = useRef<CarouselRef>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isEnter, setIsEnter] = useState<boolean>(false);

  const imageCarousel: { image: string }[] = [
    {
      image: "/images/carousel-8.png",
    },
    {
      image: "/images/carousel-7.png",
    },
    {
      image: "/images/carousel-6.webp",
    },
    {
      image: "/images/carousel-5.webp",
    },
    {
      image: "/images/carousel-1.webp",
    },
    {
      image: "/images/carousel-2.webp",
    },
    {
      image: "/images/carousel-3.webp",
    },
    {
      image: "/images/carousel-4.webp",
    },
  ];

  const carouselBottom: { title: string; content: string }[] = [
    {
      title: "GALAXY Z7 SERIES",
      content: "Mở bán quà khủng",
    },
    {
      title: "IPHONE 16 PRO MAX ",
      content: "Mua ngay",
    },
    {
      title: "OPPO RENO14",
      content: "Mua ngay",
    },
    {
      title: "XIAOMI",
      content: "Nhập mã săn deal",
    },
    {
      title: "TECNO POVA 7",
      content: "Giá chỉ 3.99 triệu",
    },
    {
      title: "MUA ĐIỆN THOẠI",
      content: "Tặng combo voucher",
    },
    {
      title: "HUAWEI MATEPAD",
      content: "Giá chỉ 6.36 triệu",
    },
    {
      title: "AMAZFIT ACTIVE 2",
      content: "Mua ngay",
    },
  ];

  const handlePrev = () => {
    carouselRef.current?.prev();
    carouselBottomRef.current?.prev();
  };

  const handleNext = () => {
    carouselRef.current?.next();
    carouselBottomRef.current?.next();
  };

  const handleMainCarouselChange = (currentSlide: number) => {
    if (!isEnter) {
      carouselBottomRef.current?.goTo(currentSlide);
    }
  };

  const handleBottomItemClick = (index: number) => {
    carouselRef.current?.goTo(index);
  };

  const handleChangeSlide = (currnet: number) => {
    setHoveredIndex(currnet + 1);
  };

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    setIsEnter(true);
  };

  const handleMouseLeave = () => {
    setIsEnter(false);
    setHoveredIndex(null);
  };
  return (
    <>
      <div className="rounded-lg shadow-md md:h-full flex flex-col">
        <div
          className="w-full h-[75%] overflow-hidden relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Carousel
            dots={false}
            arrows={false}
            autoplay
            ref={carouselRef}
            draggable={true}
            afterChange={handleMainCarouselChange}
          >
            {imageCarousel.map((item, index) => (
              <img
                key={index}
                src={item.image}
                className="w-full object-contain cursor-pointer"
              />
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

        <div className="hidden md:block h-[20%]">
          <Carousel
            arrows={false}
            dots={false}
            slidesToShow={5}
            draggable={true}
            ref={carouselBottomRef}
            autoplay={false}
            beforeChange={handleChangeSlide}
          >
            {carouselBottom.map((item, index) => (
              <div
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                key={index + 1}
                className={`bg-white p-2 w-[10rem] h-full pt-[1.5rem] pb-[2rem] !flex !flex-col items-center text-center cursor-pointer transition-colors duration-200 ${
                  hoveredIndex === index &&
                  `border-b-[#d70019] hover:bg-[#f3f5f6] border-b-[0.2rem] rounded-sm`
                }`}
                onClick={() => handleBottomItemClick(index)}
              >
                <span className="whitespace-nowrap text-[0.8rem] font-light">
                  {item.title}
                </span>
                <span className="text-[0.8rem] whitespace-nowrap font-light">
                  {item.content}
                </span>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default CarouselCategory;
