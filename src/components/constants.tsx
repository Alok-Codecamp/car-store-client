import {
  CarRental,
  ContactMail,
  Home,
  Info,
  AccountCircle,
  Add,
  Delete,
  Inventory,
  Update,
} from "@mui/icons-material";
import {} from "@mui/icons-material";
import { TNavListItems } from "../types/navListItems";

export const navItems: TNavListItems[] = [
  {
    name: "Home",
    icon: <Home />,
  },
  {
    name: "Cars",
    icon: <CarRental />,
  },
  {
    name: "About",
    icon: <Info />,
  },
  {
    name: "Contact",
    icon: <ContactMail />,
  },
];

export const adminDashboardSidebarItems = [
  // {
  //   name: "User Management",
  //   icon: <ManageAccounts />,
  // },
  {
    name: "All Users",
    icon: <AccountCircle />,
  },

  // {
  //   name: "Order Management",
  //   icon: <Inventory />,
  // },
  {
    name: "All Orders",
    icon: <Inventory />,
  },
  // {
  //   name: "Order Progress",
  //   icon: <AccessTime />,
  // },
  {
    name: "my orders",
    icon: <Inventory />,
  },
  {
    name: "Create Order",
    icon: <Add />,
  },
  {
    name: "Update Order",
    icon: <Update />,
  },
  {
    name: "Delete Order",
    icon: <Delete />,
  },

  // {
  //   name: "Car Management",
  //   icon: <DirectionsCar />,
  // },
  {
    name: "Add Car",
    icon: <Add />,
  },
  {
    name: "Update Car",
    icon: <Update />,
  },
  {
    name: "Delete Car",
    icon: <Delete />,
  },
];

export const userDashboardSidebarItems = [
  {
    name: "Profile settings",
    icon: <AccountCircle />,
  },
  {
    name: "my orders",
    icon: <Inventory />,
  },
];
