import type React from "react";
// import { Navigate, useLocation } from "react-router-dom";

const AuthGuard = ({ children }: { children: React.JSX.Element }) => {
  // const accessToken = localStorage.getItem("access_token");
  // const location = useLocation();
  // if (!accessToken || accessToken === "undefined" || accessToken === "null") {
  //   return <Navigate to={"/login"} state={{ from: location }} replace />;
  // }

  return children;
};

export default AuthGuard;
