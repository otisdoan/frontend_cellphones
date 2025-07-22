import { useGoogleLogin } from "@react-oauth/google";
import { authApi } from "../utils/api/auth.api";
import { useNavigate } from "react-router-dom";
import ButtonCellphoneS from "./ButtonCellphoneS";
import { FcGoogle } from "react-icons/fc";

const GoogleLoginButton = () => {
  const navigate = useNavigate();
  // const handleSuccess = async (credentialResponse: CredentialResponse) => {
  //   const credential = credentialResponse.credential;
  //   console.log(credential);
  //   try {
  //     const result = await authApi.loginByGoogle(credential);
  //     localStorage.setItem("access_token", result.data.access_token);
  //     navigate("/");
  //     console.log(result);
  //   } catch (error) {
  //     console.log("Login failed", error);
  //   }
  // };
  const login = useGoogleLogin({
    onSuccess: async (credential) => {
      const token = credential.access_token;
      console.log(token);
      try {
        const result = await authApi.loginByGoogle(token);
        console.log(result);
        localStorage.setItem("access_token", result.data.access_token);
        navigate("/");
        console.log(result);
      } catch (error) {
        console.log("Login failed", error);
      }
    },
  });
  return (
    <>
      <ButtonCellphoneS
        onClick={() => login()}
        children={
          <div className="flex items-center gap-x-1">
            <FcGoogle className="text-[1.3rem]" />
            Google
          </div>
        }
        className="bg-white border-gray-400 text-black md:w-[12rem]"
      />
    </>
  );
};

export default GoogleLoginButton;
