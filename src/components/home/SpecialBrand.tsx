const SpecialBrand = () => {
  return (
    <>
      <div>
        <h2 className="text-[1.5rem] font-medium">CHUYÊN TRANG THƯƠNG HIỆU</h2>
        <div className="flex items-center gap-x-4">
          <div className="w-1/4">
            <img
              src="/images/apple-chinh-hang-home.webp"
              className="object-contain rounded-lg cursor-pointer"
            />
          </div>
          <div className="w-1/4">
            <img
              src="/images/SIS asus.webp"
              className="object-contain rounded-lg cursor-pointer"
            />
          </div>
          <div className="w-1/4">
            <img
              src="/images/gian-hang-samsung-home.webp"
              className="object-contain rounded-lg cursor-pointer"
            />
          </div>
          <div className="w-1/4">
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
