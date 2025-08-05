const SpecialPayment = () => {
  return (
    <>
      <div>
        <h2 className="text-[1.5rem] font-medium">ƯU ĐÃI THANH TOÁN</h2>
        <div className="flex items-center md:gap-x-4 flex-wrap md:flex-nowrap gap-4">
          <div className="md:w-1/4 flex-[1_1_calc(50%-1rem)]">
            <img
              src="/images/ocb-h.webp"
              className="object-contain rounded-lg cursor-pointer"
            />
          </div>
          <div className="md:w-1/4 flex-[1_1_calc(50%-1rem)]">
            <img
              src="/images/scbho.webp"
              className="object-contain rounded-lg cursor-pointer"
            />
          </div>
          <div className="md:w-1/4 flex-[1_1_calc(50%-1rem)]">
            <img
              src="/images/hsbcneeeeew.webp"
              className="object-contain rounded-lg cursor-pointer"
            />
          </div>
          <div className="md:w-1/4 flex-[1_1_calc(50%-1rem)]">
            <img
              src="/images/HOMECREDIT.webp"
              className="object-contain rounded-lg cursor-pointer"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SpecialPayment;
