import LaptopSale from "./LaptopSale";

const ProductSale = () => {
  return (
    <>
      <div className="relative h-[40rem]">
        <div className="absolute top-0 left-1/2 translate-x-[-50%] z-20 h-[4rem]">
          <img
            src="/images/sale-head.webp"
            className="object-contain h-full w-full"
          />
          <span className="absolute top-1/3 left-1/2 translate-x-[-50%] font-bold text-white whitespace-nowrap text-[1.2rem]">
            LAPTOP GIẢM ĐẬM - CHẬM LÀ TIẾC
          </span>
        </div>
        <div className="h-[3.5rem] w-full absolute z-10 top-5">
          <img
            src="/public/images/sale-head-2.webp"
            className=" object-cover w-full h-full"
          />
        </div>
        <div className="h-[34rem] w-full absolute top-[4.9rem] p-7">
          <div className="absolute top-0 left-0 right-0 bottom-0 h-[34rem] z-0">
            <img
              src="images/bg-block-fs-8-1-desk.webp"
              className="w-full h-full"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-x-4 absolute top-6">
              <div className="flex items-center justify-center rounded-[2rem] cursor-pointer border-4 border-white p-1 px-6">
                <span className="text-white font-bold">9h - 11h 07/08</span>
              </div>
              <div className="flex items-center justify-center rounded-[2rem] cursor-pointer border-4 border-white p-1 px-6">
                <span className="text-white font-bold">9h - 11h 08/08</span>
              </div>
            </div>
            <div className="w-full mt-7">
              <LaptopSale />
            </div>
            <span className="text-white font-bold text-[1rem] text-center absolute z-10 bottom-4 left-1/2 translate-x-[-50%] whitespace-nowrap mb-4">
              Chỉ áp dụng thanh toán online thành công — Mỗi SĐT chỉ được mua 1
              sản phẩm cùng loại
            </span>
          </div>
        </div>
        <div className="absolute top-[4rem] right-0 z-20 w-[4rem] h-[4rem]">
          <img src="images/fs-gift-box-8-1.webp" />
        </div>
        <div className="absolute top-[5rem] left-0 z-20 w-[2.5rem] h-[2.5rem]">
          <img src="/images/fs-gift-box-8-1-2.webp" />
        </div>
      </div>
    </>
  );
};

export default ProductSale;
