import type { GoogleLoginProps } from "@react-oauth/google";
import { Button, type ButtonProps } from "antd";
import clsx from "clsx";

type ButtonCellphoneSProps = ButtonProps & Partial<GoogleLoginProps>;
const ButtonCellphoneS = ({
  children,
  className,
  ...props
}: ButtonCellphoneSProps) => {
  return (
    <>
      <Button
        {...props}
        className={clsx(
          "w-full border-[#d70019] text-[#d70019] h-[3rem] bg-[#d70019]",
          className
        )}
      >
        {children}
      </Button>
    </>
  );
};
export default ButtonCellphoneS;
