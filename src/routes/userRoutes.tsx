import ChangePassword from "../components/user/ChangePassword";
import EditProfile from "../components/user/EditProfile";
import MyAccount from "../components/user/MyAccount";
import MyOrders from "../components/user/MyOrders";

export const userRoutes = [
  {
    path: "profile-settings",
    element: <MyAccount />,
  },
  {
    path: "my-orders",
    element: <MyOrders />,
  },
  {
    path: "profile-settings/edit-profile",
    element: <EditProfile />,
  },
  {
    path: "profile-settings/change-password",
    element: <ChangePassword />,
  },
];
