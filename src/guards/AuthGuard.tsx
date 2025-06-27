import type React from "react";
import { Navigate, useLocation } from "react-router-dom";

const AuthGuard = ({ children }: { children: React.JSX.Element }) => {
  const accessToken = localStorage.getItem("access-token");
  const location = useLocation();
  if (!accessToken) {
    return <Navigate to={"/not-found"} state={{ from: location }} replace />;
  }

  return children;
};

export default AuthGuard;
