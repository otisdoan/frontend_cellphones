import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "./pages/auth/LoginPage";

export const routes = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
]);
