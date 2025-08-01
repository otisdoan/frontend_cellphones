import CarouselCategory from "./components/CarouselCategory";
import PictureCategory from "./components/PictureCategory";
import TooltipCategory from "./components/TooltipCategory";

const CategoryHome = () => {
  return (
    <>
      <div className="flex gap-x-4 mt-4 md:h-[25rem]">
        <div className="w-[20%] hidden md:block">
          <TooltipCategory />
        </div>
        <div className="md:w-[60%] w-full">
          <CarouselCategory />
        </div>
        <div className="md:w-[20%] md:block hidden">
          <PictureCategory />
        </div>
      </div>
    </>
  );
};

export default CategoryHome;
