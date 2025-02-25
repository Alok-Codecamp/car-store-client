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
  Settings,
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
  {
    name: "Users Management",
    icon: <AccountCircle />,
  },

  {
    name: "Manage Orders",
    icon: <Settings />,
  },

  {
    name: "my orders",
    icon: <Inventory />,
  },
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
