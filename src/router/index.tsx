import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { LoginPage } from "../pages/auth/login";
import { Register } from "../pages/auth/register";
import { DashboardHome, DashboardParent } from "../pages/dashboard/Dashboard";
import { DashboardProduct } from "../pages/dashboard/Dashboard_Product";
import { LayoutNotFound } from "../pages/layoutNotFound";
import { ProductIdComponent } from "../pages/main/p/main";
import { DashboardCart } from "../pages/dashboard/Dashboard_Card";
import { ProductAll } from "../pages/main/p/search";
import { DashboardCheckout } from "../pages/dashboard/Dashboard_Checkout";
import DashboardNotifications from "../pages/dashboard/Dashboard_Notifications";
import { DashboardProfile } from "../pages/dashboard/DashboardProfile";

export const Router = createBrowserRouter([
  {
    // router page main pag
    path: "/",
    element: <App />,
  },
  //  layout not found all routes  if not registered
  {
    path: "*",
    element: <LayoutNotFound />,
  },
  {
    // router page register
    path: "/auth/register",
    element: <Register />,
  },
  {
    //   router page login
    path: "/auth/login",
    element: <LoginPage />,
  },
  {
    path: "/p",
    element: <ProductAll />,
  },
  {
    path: "/p/:id",
    element: <ProductIdComponent />,
  },
  {
    //   it's main primary page  if in nextjs is layout
    path: "/dashboard",
    element: <DashboardParent />,
    children: [
      {
        //   its make priamry dashboard
        index: true,
        element: <DashboardHome />,
      },
      {
        // its children page dashboard on page dashboard/products
        path: "products",
        element: <DashboardProduct />,
      },
      {
        //  its children page dashboard on page dashboard/cart
        path: "cart",
        element: <DashboardCart />,
      },
      {
        //  its children page dashboard on page dashboard/cart
        path: "checkout",
        element: <DashboardCheckout />,
      },
      {
        path: "notifications",
        element: <DashboardNotifications />,
      },
      {
        path: "profile",
        element: <DashboardProfile />,
      },
    ],
  },
]);
