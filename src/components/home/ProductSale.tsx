import LaptopSale from "./LaptopSale";

const ProductSale = () => {
  return (
    <>
      <div className="relative h-[40rem]">
        <div className="absolute top-0 left-1/2 translate-x-[-50%] z-20 md:h-[4rem]">
          <img
            src="/images/sale-head.webp"
            className="object-contain h-full md:w-full max-w-[17rem] md:max-w-[30rem]"
          />
          <span className="absolute top-1/3 left-1/2 translate-x-[-50%] font-bold text-white whitespace-nowrap md:text-[1.2rem] text-[0.8rem]">
            LAPTOP GIẢM ĐẬM - CHẬM LÀ TIẾC
          </span>
        </div>
        <div className="h-[3.5rem] w-full absolute z-10 md:top-5 top-1">
          <img
            src="images/sale-head-2.webp"
            className=" md:object-cover object-contain w-full h-full"
          />
        </div>
        <div className="h-[34rem] w-full absolute md:top-[4.9rem] top-[3rem] md:p-7 p-1">
          <div className="absolute top-0 left-0 right-0 bottom-0 h-[34rem] z-0 hidden md:block">
            <img
              src="images/bg-block-fs-8-1-desk.webp"
              className="w-full h-full"
            />
          </div>
          <div className="absolute top-0 left-0 right-0 bottom-0 h-[34rem] z-0 md:hidden">
            <img
              src="images/bg-block-fs-8-1-mobile.webp"
              className="w-full h-full"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-x-4 absolute top-6 left-1/2 translate-x-[-50%] md:left-9 md:translate-x-0">
              <div className="flex items-center justify-center rounded-[2rem] cursor-pointer border-4 border-white p-1 px-6">
                <span className="text-white font-bold text-[0.8rem] whitespace-nowrap">
                  9h - 11h 07/08
                </span>
              </div>
              <div className="flex items-center justify-center rounded-[2rem] cursor-pointer border-4 border-white p-1 px-6">
                <span className="text-white font-bold text-[0.8rem] whitespace-nowrap">
                  9h - 11h 08/08
                </span>
              </div>
            </div>
            <div className="w-full mt-[3rem] md:mt-7">
              <LaptopSale />
            </div>
            <span className="text-white text-center font-bold md:text-[1rem] text-[0.8rem] absolute z-10 md:bottom-4 bottom-1 md:left-1/2 md:translate-x-[-50%] md:whitespace-nowrap mb-4 p-4 md:p-0">
              Chỉ áp dụng thanh toán online thành công — Mỗi SĐT chỉ được mua 1
              sản phẩm cùng loại
            </span>
          </div>
        </div>
        <div className="absolute md:top-[4rem] top-[2rem] right-0 z-20 w-[4rem] h-[4rem]">
          <img src="images/fs-gift-box-8-1.webp" />
        </div>
        <div className="absolute md:top-[5rem] top-[5rem] left-[-1rem] z-20 w-[2.5rem] h-[2.5rem]">
          <img src="/images/fs-gift-box-8-1-2.webp" />
        </div>
      </div>
    </>
  );
};

export default ProductSale;
