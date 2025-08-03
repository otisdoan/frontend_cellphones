const SpecialStudent = () => {
  return (
    <>
      <div>
        <h2 className="text-[1.5rem] font-medium">ƯU ĐÃI SINH VIÊN</h2>
        <div className="flex items-center gap-x-4">
          <div className="w-1/4">
            <img
              src="/images/Laptop-dday2-hssv.webp"
              className="object-contain rounded-lg cursor-pointer"
            />
          </div>
          <div className="w-1/4">
            <img
              src="/images/Mac-dday2-hssv.webp"
              className="object-contain rounded-lg cursor-pointer"
            />
          </div>
          <div className="w-1/4">
            <img
              src="/images/samsung-home-update.webp"
              className="object-contain rounded-lg cursor-pointer"
            />
          </div>
          <div className="w-1/4">
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
