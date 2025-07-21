import { Divider } from "antd";
import ButtonCellphoneS from "./ButtonCellphoneS";
// import { FcGoogle } from "react-icons/fc";
import { TbPointFilled } from "react-icons/tb";
import GoogleLoginButton from "./GoogleLoginButton";
import { GoogleOAuthProvider } from "@react-oauth/google";

const LoginByAnother = ({ title }: { title: string }) => {
  return (
    <>
      <div>
        <Divider className="">
          <span className="opacity-55 text-[0.9rem]">{title}</span>
        </Divider>
        <div className="flex items-center gap-x-2">
          <GoogleOAuthProvider clientId="566050216696-2d8pe12hamn2igtosqqbsfimos98i8en.apps.googleusercontent.com">
            <GoogleLoginButton />
          </GoogleOAuthProvider>
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
