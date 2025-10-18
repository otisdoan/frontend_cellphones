import { Checkbox, Input } from "antd";
import { useAuthContext } from "../../context/AuthContext";

const InforCustomer = () => {
  const { user } = useAuthContext()!;

  return (
    <>
      <div className="mt-9">
        <h2 className="text-[1.1rem] mb-3">THÔNG TIN KHÁCH HÀNG</h2>
        <div className="border rounded-lg p-4 bg-white">
          <div className="flex justify-between">
            <div className="flex items-center gap-x-3">
              <span className="uppercase text-[1.1rem]">{user?.full_name}</span>
              <div className="border border-[#4dccad] rounded-md px-1">
                <span className="font-bold text-[#4dccad] text-[0.8rem]">
                  S-MEM
                </span>
              </div>
            </div>
            <span className="text-[0.9rem]">{user?.phone}</span>
          </div>
          <div className="flex flex-col gap-y-2">
            <div className="flex flex-col gap-y-1 mt-4">
              <span className="text-[0.7rem] opacity-50 ">EMAIL</span>
              <Input
                placeholder="Email"
                variant="underlined"
                value={user?.email}
              />
            </div>
            <span className="text-[0.7rem] opacity-50 italic mt-8 mb-5">{`(*) Hóa đơn VAT sẽ được gửi qua email này`}</span>
            <Checkbox>
              <span className="whitespace-nowrap">
                Nhận email thông báo và ưu đãi từ CellphoneS
              </span>
            </Checkbox>
          </div>
        </div>
      </div>
    </>
  );
};

export default InforCustomer;
