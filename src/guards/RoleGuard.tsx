import type { ReactNode } from "react";
import { useAuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const RoleGuard = ({
  roles,
  children,
}: {
  roles: string[];
  children: ReactNode;
}) => {
  const { user } = useAuthContext()!;

  console.log(user?.role);
  if (!roles.includes(user?.role ?? "")) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default RoleGuard;
