import CarouselCategory from "./components/CarouselCategory";
import PictureCategory from "./components/PictureCategory";
import TooltipCategory from "./components/TooltipCategory";

const CategoryHome = () => {
  return (
    <>
      <div className="flex gap-x-4 mt-4 h-[25rem]">
        <div className="w-[20%]">
          <TooltipCategory />
        </div>
        <div className="w-[60%]">
          <CarouselCategory />
        </div>
        <div className="w-[20%]">
          <PictureCategory />
        </div>
      </div>
    </>
  );
};

export default CategoryHome;
