import AllOrders from "../components/admin/orderManagement/AllOrders";
import AddNewCar from "../components/admin/carManagement/AddNewCar";
import DeleteCar from "../components/admin/carManagement/DeleteCar";
import UserAccounts from "../components/admin/userManagement/UserAccounts";
import UpdateCar from "../components/admin/carManagement/UpdateCar";
import User from "../components/admin/userManagement/User";
import MyOrders from "../pages/orders/MyOrders";

export const adminRoutes = [
  {
    path: "users-management",
    element: <UserAccounts />,
  },
  {
    path: "user",
    element: <User />,
  },
  {
    path: "all-orders",
    element: <AllOrders />,
  },
  {
    path: "my-orders",
    element: <MyOrders />,
  },
  {
    path: "add-car",
    element: <AddNewCar />,
  },
  {
    path: "update-car",
    element: <UpdateCar />,
  },
  {
    path: "delete-car",
    element: <DeleteCar />,
  },
];
