import AllOrders from "../components/admin/orderManagement/AllOrders";
import AddNewCar from "../components/admin/carManagement/AddNewCar";
import DeleteCar from "../components/admin/carManagement/DeleteCar";
import UserAccounts from "../components/admin/userManagement/UserAccounts";
import UpdateCar from "../components/admin/carManagement/UpdateCar";
import User from "../components/admin/userManagement/User";
import Order from "../components/admin/orderManagement/Order";

export const adminRoutes = [
  {
    path: "all-users",
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
    path: "order-details",
    element: <Order />,
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
