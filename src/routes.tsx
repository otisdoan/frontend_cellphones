import { createBrowserRouter } from "react-router-dom";
import NotFoundPage from "./pages/auth/NotFoundPage";
import LoginPage from "./pages/auth/LoginPage";

export const routes = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/not-found",
    element: <NotFoundPage />,
  },
]);
