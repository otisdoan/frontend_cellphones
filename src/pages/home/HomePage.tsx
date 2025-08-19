import CategoryHome from "../../components/home/category/CategoryHome";
import SmartphoneList from "../../components/home/SmartphoneList";
import LaptopList from "../../components/home/LaptopList";
import ScreenList from "../../components/home/ScreenList";
import TabletList from "../../components/home/TabletList";
import SoundList from "../../components/home/SoundList";
import ClockSmartList from "../../components/home/ClockSmartList";
import HouseHoldList from "../../components/home/HouseHoldList";
import TiviList from "../../components/home/TiviList";
import SpecialStudent from "../../components/home/SpecialStudent";
import SpecialPayment from "../../components/home/SpecialPayment";
import SpecialBrand from "../../components/home/SpecialBrand";
import SuggestForYou from "../../components/home/SuggestForYou";
import ProductWatched from "../../components/home/ProductWatched";
import NavbarMobile from "../../components/home/NavbarMobile";
import { useEffect, useState } from "react";
import SmartphoneContent from "../../components/home/category-mobile/SmartphoneContent";
import TabletContent from "../../components/home/category-mobile/TabletContent";
import ProductSale from "../../components/home/ProductSale";
import { useLocation } from "react-router-dom";

const HomePage = () => {
  const [show, setShow] = useState<boolean>(false);
  const [current, setCurrent] = useState<number>(0);
  const handleShow = (open: boolean) => {
    setShow(open);
  };

  const category: { image: string; title: string; color: string }[] = [
    {
      image: "/images/c1.webp",
      title: "Điện thoại",
      color: "bg-[#ffe4e6]",
    },
    {
      image: "/images/c2.webp",
      title: "Tablet",
      color: "bg-[#ffedd5]",
    },
    {
      image: "/images/c3.webp",
      title: "Laptop",
      color: "bg-[#fee2e1]",
    },
    {
      image: "/images/c4.webp",
      title: "Âm thanh",
      color: "bg-[#d1fae5]",
    },
    {
      image: "/images/c5.webp",
      title: "Đồng hồ",
      color: "bg-[#e0e7ff]",
    },
    {
      image: "/images/c6.webp",
      title: "Camera",
      color: "bg-[#e0f2fe]",
    },
    {
      image: "/images/c7.webp",
      title: "Gia dụng",
      color: "bg-[#ffffff]",
    },
    {
      image: "/images/c8.webp",
      title: "Phụ kiện",
      color: "bg-[#e0f2fe]",
    },
    {
      image: "/images/c9.webp",
      title: "PC, Màn hình",
      color: "bg-[#fefefe]",
    },
    {
      image: "/images/c10.webp",
      title: "Tivi",
      color: "bg-[#ede9fe]",
    },
    {
      image: "/images/c11.webp",
      title: "Thu cũ đổi mới",
      color: "bg-[#fae8ff]",
    },
    {
      image: "/images/c12.webp",
      title: "Hàng cũ",
      color: "bg-[#ede9fe]",
    },
    {
      image: "/images/c13.webp",
      title: "Khuyến mãi",
      color: "bg-[#cbfbf1]",
    },
    {
      image: "/images/c14.webp",
      title: "Tin công nghệ",
      color: "bg-[#cbfbf1]",
    },
  ];
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);
  return (
    <>
      <div className="z-30">
        {!show && (
          <div className="px-4 bg-[#ffffff] flex flex-col gap-y-4">
            <CategoryHome />
            <img
              src="/images/special-b2s-dday2-desk.gif"
              className="rounded-lg w-full h-full object-cover hidden md:block"
            />
            <img
              src="/images/special-b2s-dday2-mb.gif"
              className="rounded-lg w-full h-full object-cover md:hidden"
            />
            <ProductSale />
            <SuggestForYou />
            <SmartphoneList />
            <LaptopList />
            <ScreenList />
            <TabletList />
            <SoundList />
            <ClockSmartList />
            <HouseHoldList />
            <TiviList />
            <ProductWatched />
            <SpecialStudent />
            <SpecialPayment />
            <SpecialBrand />
          </div>
        )}
        {show && (
          <div className="bg-white w-full flex">
            <div className="w-[20%] flex flex-col h-[100vh]  overflow-y-auto scrollbar-hide border-r-[1px]">
              {category.map((item, index) => (
                <div
                  key={index}
                  className={`${item.color} flex flex-col items-center border-b-[1px] py-2`}
                  onClick={() => setCurrent(index)}
                >
                  <img src={item.image} className="w-10 h-10" />
                  <span className="text-[0.7rem] font-bold text-center">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
            {current === 0 && (
              <div className="w-[80%]">
                <SmartphoneContent />
              </div>
            )}
            {current === 1 && (
              <div className="w-[80%]">
                <TabletContent />
              </div>
            )}
          </div>
        )}
        <NavbarMobile setOpen={handleShow} />
      </div>
    </>
  );
};

export default HomePage;
