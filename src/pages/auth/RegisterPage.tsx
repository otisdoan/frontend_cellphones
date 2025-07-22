import FormRegister from "../../components/forms/FormRegister";
import LoginByAnother from "../../components/LoginByAnother";

const RegisterPage = () => {
  return (
    <>
      <div className="p-2 flex flex-col gap-y-4 md:px-[20rem]">
        <h4 className="font-semibold mt-4 text-center md:text-[#d70019] md:text-[2.3rem]">
          Đăng ký trở thành SMEMBER
        </h4>
        <div className="flex justify-center">
          <img
            src="/images/register-ant.b75b959d.png"
            className="w-[8rem] md:w-[12rem]"
          />
        </div>
        <LoginByAnother title="Đăng ký bằng tài khoản mạng xã hội" />
        <span className="opacity-45 text-center">Hoặc điền thông tin sau</span>
        <FormRegister />
      </div>
    </>
  );
};

export default RegisterPage;
