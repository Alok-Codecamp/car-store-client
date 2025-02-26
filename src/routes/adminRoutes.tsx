import AllOrders from "../components/admin/orderManagement/AllOrders";
import AddNewCar from "../components/admin/carManagement/AddNewCar";
import DeleteCar from "../components/admin/carManagement/DeleteCar";
import UserAccounts from "../components/admin/userManagement/UserAccounts";
import UpdateCar from "../components/admin/carManagement/UpdateCar";
import MyOrders from "../pages/orders/MyOrders";
import MyAccount from "../components/user/MyAccount";
import EditProfile from "../components/user/EditProfile";
import ChangePassword from "../components/user/ChangePassword";

export const adminRoutes = [
  {
    path: "profile-settings",
    element: <MyAccount />,
  },
  {
    path: "profile-settings/edit-profile",
    element: <EditProfile />,
  },
  {
    path: "profile-settings/change-password",
    element: <ChangePassword />,
  },
  {
    path: "users-management",
    element: <UserAccounts />,
  },

  {
    path: "manage-orders",
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
