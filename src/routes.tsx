import { createBrowserRouter } from "react-router-dom";
import NotFoundPage from "./pages/auth/NotFoundPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import HomePage from "./pages/home/HomePage";
import AdminLayout from "./pages/admin/layouts/AdminLayout";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import ListCategory from "./pages/admin/category/ListCategory";
import ListBrand from "./pages/admin/brand/ListBrand";
import ListProduct from "./pages/admin/products/ListProduct";
import CreateBrand from "./pages/admin/brand/CreateBrand";
import CreateCategory from "./pages/admin/category/CreateCategory";
import EditCategory from "./pages/admin/category/EditCategory";
import EditBrand from "./pages/admin/brand/EditBrand";
import CreateProduct from "./pages/admin/products/CreateProduct";
import EditProduct from "./pages/admin/products/EditProduct";
import ListProductImage from "./pages/admin/product-images/ListProductImage";
import CreateProductImage from "./pages/admin/product-images/CreateProductImage";
import EditProductImage from "./pages/admin/product-images/EditProductImage";
import ListProductVariant from "./pages/admin/product-variant/ListProductVariant";
import CreateProductVariant from "./pages/admin/product-variant/CreateProductVariant";
import EditProductVariant from "./pages/admin/product-variant/EditProductVariant";
import ListProductAttribute from "./pages/admin/product-attribute/ListProductAttribute";
import CreateProductAttribute from "./pages/admin/product-attribute/CreateProductAttribute";
import EditProductAttribute from "./pages/admin/product-attribute/EditProductAttribute";
import HomeLayout from "./pages/admin/layouts/HomeLayout";
import ProductDetailPage from "./pages/product/ProductDetailPage";
import CartPage from "./pages/cart/CartPage";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/:slug",
        element: <ProductDetailPage />,
      },
    ],
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "/admin",
        element: <Dashboard />,
      },
      {
        path: "/admin/category",
        element: <ListCategory />,
      },
      {
        path: "/admin/category/create",
        element: <CreateCategory />,
      },
      {
        path: "/admin/category/:id/edit",
        element: <EditCategory />,
      },
      {
        path: "/admin/brand",
        element: <ListBrand />,
      },
      {
        path: "/admin/brand/create",
        element: <CreateBrand />,
      },
      {
        path: "/admin/brand/:id/edit",
        element: <EditBrand />,
      },
      {
        path: "/admin/products",
        element: <ListProduct />,
      },
      {
        path: "/admin/products/create",
        element: <CreateProduct />,
      },
      {
        path: "/admin/products/:id/edit",
        element: <EditProduct />,
      },
      {
        path: "/admin/product-images",
        element: <ListProductImage />,
      },
      {
        path: "/admin/product-images/create",
        element: <CreateProductImage />,
      },
      {
        path: "/admin/product-images/:id/edit",
        element: <EditProductImage />,
      },
      {
        path: "/admin/product-variant",
        element: <ListProductVariant />,
      },
      {
        path: "/admin/product-variant/create",
        element: <CreateProductVariant />,
      },
      {
        path: "/admin/product-variant/:id/edit",
        element: <EditProductVariant />,
      },
      {
        path: "/admin/product-attribute",
        element: <ListProductAttribute />,
      },
      {
        path: "/admin/product-attribute/create",
        element: <CreateProductAttribute />,
      },
      {
        path: "/admin/product-attribute/:id/edit",
        element: <EditProductAttribute />,
      },
    ],
  },
]);
