import { Divider } from "antd";
import ButtonCellphoneS from "./ButtonCellphoneS";
import { FcGoogle } from "react-icons/fc";
import { TbPointFilled } from "react-icons/tb";

const LoginByAnother = ({ title }: { title: string }) => {
  return (
    <>
      <div>
        <Divider className="">
          <span className="opacity-55 text-[0.9rem]">{title}</span>
        </Divider>
        <div className="flex items-center gap-x-2">
          <ButtonCellphoneS
            children={
              <div className="flex items-center gap-x-1">
                <FcGoogle className="text-[1.3rem]" />
                Google
              </div>
            }
            className="bg-white border-gray-400 text-black"
          />
          <TbPointFilled className="text-[3rem] opacity-20" />
          <ButtonCellphoneS
            children={
              <div className="flex items-center gap-x-1">
                <img src="/images/logo-zalo.120d889f.svg" />
                Zalo
              </div>
            }
            className="bg-white border-gray-400 text-black"
          />
        </div>
      </div>
    </>
  );
};

export default LoginByAnother;
