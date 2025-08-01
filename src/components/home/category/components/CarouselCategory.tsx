import { Carousel, Tabs } from "antd";
import type { CarouselRef } from "antd/es/carousel";
import { useRef } from "react";

const CarouselCategory = () => {
  const carouselRef = useRef<CarouselRef>(null);
  const imageCarousel: { image: string }[] = [
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
    {
      image: "/images/carousel-5.webp",
    },
    {
      image: "/images/carousel-6.webp",
    },
    {
      image: "/images/carousel-7.png",
    },
    {
      image: "/images/carousel-8.png",
    },
    {
      image: "/images/carousel-9.webp",
    },
  ];
  //   useEffect(() => {
  //     carouselRef.current?.goTo((slide: number) => {
  //         console.log(slide)
  //     });
  //   }, []);
  return (
    <>
      <div className="rounded-lg shadow-md md:h-full">
        <div className="w-full">
          <Carousel dots={false} arrows={false} autoplay ref={carouselRef}>
            {imageCarousel.map((item, index) => (
              <div className="w-full" key={index}>
                <img
                  src={item.image}
                  className="w-full object-cover cursor-pointer"
                />
              </div>
            ))}
          </Carousel>
        </div>
        <div className="hidden md:block">
          <Tabs />
        </div>
      </div>
    </>
  );
};

export default CarouselCategory;
