import type { GoogleLoginProps } from "@react-oauth/google";
import { Button, ConfigProvider, type ButtonProps } from "antd";
import clsx from "clsx";

interface ConfigProviderProps {
  defaultHoverBg: string;
  defaultHoverBorderColor: string;
  defaultHoverColor: string;
  defaultActiveBorderColor: string;
  defaultActiveBg: string;
  defaultActiveColor: string;
}

type ButtonCellphoneSProps = ButtonProps &
  Partial<GoogleLoginProps> &
  Partial<ConfigProviderProps>;

const ButtonCellphoneS = ({
  defaultHoverBg,
  defaultHoverBorderColor,
  defaultHoverColor,
  defaultActiveBorderColor,
  defaultActiveBg,
  defaultActiveColor,
  children,
  className,
  ...props
}: ButtonCellphoneSProps) => {
  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Button: {
              defaultHoverBg: defaultHoverBg ?? "#da152b",
              defaultHoverBorderColor: defaultHoverBorderColor ?? "none",
              defaultHoverColor: defaultHoverColor ?? "none",
              defaultActiveBorderColor: defaultActiveBorderColor ?? "none",
              defaultActiveBg: defaultActiveBg ?? "#da152b",
              defaultActiveColor: defaultActiveColor ?? "none",
            },
          },
        }}
      >
        <Button
          {...props}
          className={clsx(
            "border-[#d70019] text-[#d70019] h-[3rem] bg-[#d70019]",
            className
          )}
        >
          {children}
        </Button>
      </ConfigProvider>
    </>
  );
};
export default ButtonCellphoneS;
