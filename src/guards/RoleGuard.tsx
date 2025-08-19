import type { ReactNode } from "react";
import { useAuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { ConfigProvider, Spin } from "antd";

const RoleGuard = ({
  roles,
  children,
}: {
  roles: string[];
  children: ReactNode;
}) => {
  const { user, loading } = useAuthContext()!;
  console.log(user?.role);
  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-[100vh]">
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#d70019",
            },
          }}
        >
          <Spin size="large" />
        </ConfigProvider>
      </div>
    );
  }
  if (!roles.includes(user?.role ?? "")) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

export default RoleGuard;
