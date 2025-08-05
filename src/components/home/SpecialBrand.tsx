const SpecialBrand = () => {
  return (
    <>
      <div>
        <h2 className="text-[1.5rem] font-medium">CHUYÊN TRANG THƯƠNG HIỆU</h2>
        <div className="flex items-center md:gap-x-4 flex-wrap md:flex-nowrap gap-4">
          <div className="md:w-1/4 flex-[1_1_calc(50%-1rem)]">
            <img
              src="/images/apple-chinh-hang-home.webp"
              className="object-contain rounded-lg cursor-pointer"
            />
          </div>
          <div className="md:w-1/4 flex-[1_1_calc(50%-1rem)]">
            <img
              src="/images/SIS asus.webp"
              className="object-contain rounded-lg cursor-pointer"
            />
          </div>
          <div className="md:w-1/4 flex-[1_1_calc(50%-1rem)]">
            <img
              src="/images/gian-hang-samsung-home.webp"
              className="object-contain rounded-lg cursor-pointer"
            />
          </div>
          <div className="md:w-1/4 flex-[1_1_calc(50%-1rem)]">
            <img
              src="/images/xiaomi.webp"
              className="object-contain rounded-lg cursor-pointer"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SpecialBrand;
