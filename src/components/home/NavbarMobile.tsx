import { useState, type ReactNode } from "react";
import { HiOutlineClipboardList } from "react-icons/hi";
import { LuBell } from "react-icons/lu";
import { RiAccountCircleLine } from "react-icons/ri";
import { TbSmartHome } from "react-icons/tb";
import { VscHome } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const NavbarMobile = ({
  setOpen,
  setOpenLogin,
}: {
  setOpen: (open: boolean) => void;
  setOpenLogin?: (open: boolean) => void;
}) => {
  const { login } = useAuthContext()!;
  const navbar: { icon: ReactNode; title: string; path: string }[] = [
    {
      icon: <TbSmartHome />,
      title: "Trang chủ",
      path: "/",
    },
    {
      icon: <HiOutlineClipboardList />,
      title: "Danh mục",
      path: "/",
    },
    {
      icon: <VscHome />,
      title: "Cửa hàng",
      path: "/admin",
    },
    {
      icon: <LuBell />,
      title: "Thông báo",
      path: "/",
    },
    {
      icon: <RiAccountCircleLine />,
      title: "Tài khoản",
      path: "/profile",
    },
  ];
  const navigate = useNavigate();
  const [current, setCurrent] = useState<number>(0);

  const handleShow = (path: string, index: number) => {
    setCurrent(index);
    setOpen(false);

    // Danh mục - mở modal
    if (index === 1) {
      setOpen(true);
      return;
    }

    // Tài khoản - check login
    if (index === 4) {
      if (login) {
        navigate(path);
      } else {
        setOpenLogin?.(true);
      }
      return;
    }

    // Các mục khác
    navigate(path);
  };
  return (
    <>
      <div className="md:hidden flex gap-x-4 bg-white sticky bottom-0 z-50 border-t-[1px] p-2 justify-center">
        {navbar.map((item, index) => (
          <div
            key={index}
            className={
              current === index
                ? "text-[#d80118] flex flex-col items-center cursor-pointer"
                : "flex flex-col items-center cursor-pointer"
            }
            onClick={() => handleShow(item.path, index)}
          >
            <div className="text-[1.5rem]">{item.icon}</div>
            <span className="text-[0.8rem] whitespace-nowrap">
              {item.title}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default NavbarMobile;
