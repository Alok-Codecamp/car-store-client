import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import About from "../pages/about/About";
import Contact from "../pages/contact/Contact";
import Cars from "../pages/cars/Cars";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import Dashboard from "../components/layout/Dashboard";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import { adminRoutes } from "./adminRoutes";
import { userRoutes } from "./userRoutes";
import CarDetails from "../pages/cars/CarDetails";
import PlaceOrder from "../pages/orders/PlaceOrder";
import ResetPassword from "../pages/auth/ResetPassword";
import ForgetPassword from "../pages/auth/ForgetPassword";
import OrderDetails from "../pages/orders/OrderDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/cars",
    element: <Cars />,
  },
  {
    path: "/cars/:id",
    element: <CarDetails />,
  },
  {
    path: "/place-order/:carId",
    element: (
      <ProtectedRoute>
        <PlaceOrder />
      </ProtectedRoute>
    ),
  },
  {
    path: "order-details",
    element: (
      <ProtectedRoute>
        <OrderDetails />
      </ProtectedRoute>
    ),
  },

  {
    path: "admin/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: adminRoutes,
  },
  {
    path: "user/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: userRoutes,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forget-password",
    element: <ForgetPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
]);

export default router;
