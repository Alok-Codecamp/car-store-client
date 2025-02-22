import ChangePassword from "../components/user/ChangePassword";
import EditProfile from "../components/user/EditProfile";
import MyAccount from "../components/user/MyAccount";

import OrderDetails from "../pages/orders/OrderDetails";

export const userRoutes = [
  {
    path: "profile-settings",
    element: <MyAccount />,
  },
  {
    path: "order-details",
    element: <OrderDetails />,
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
