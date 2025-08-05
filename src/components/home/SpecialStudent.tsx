const SpecialStudent = () => {
  return (
    <>
      <div>
        <h2 className="text-[1.5rem] font-medium">ƯU ĐÃI SINH VIÊN</h2>
        <div className="flex items-center md:gap-x-4 flex-wrap md:flex-nowrap gap-4">
          <div className="md:w-1/4 flex-[1_1_calc(50%-1rem)]">
            <img
              src="/images/Laptop-dday2-hssv.webp"
              className="object-contain rounded-lg cursor-pointer"
            />
          </div>
          <div className="md:w-1/4 flex-[1_1_calc(50%-1rem)]">
            <img
              src="/images/Mac-dday2-hssv.webp"
              className="object-contain rounded-lg cursor-pointer"
            />
          </div>
          <div className="md:w-1/4 flex-[1_1_calc(50%-1rem)]">
            <img
              src="/images/samsung-home-update.webp"
              className="object-contain rounded-lg cursor-pointer"
            />
          </div>
          <div className="md:w-1/4 flex-[1_1_calc(50%-1rem)]">
            <img
              src="/images/iPad-dday2-hssv.webp"
              className="object-contain rounded-lg cursor-pointer"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SpecialStudent;
