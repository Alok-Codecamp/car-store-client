import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logOut, selectCurrentUser } from "../../redux/features/auth/authSlice";
import {
  adminDashboardSidebarItems,
  navItems,
  userDashboardSidebarItems,
} from "../constants";
import { Logout } from "@mui/icons-material";
import { TMenuDropdown } from "../../types/navListItems";
import { TDecoded } from "../../types/userType";
import dashboarBg from "../../assets/addCarBg.png";
// import { Collapse } from "@mui/material";

const drawerWidth = 240;

const Dashboard = () => {
  // const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  // const [open, setOpen] = React.useState([true, true, true]);
  // const handleClick = (index: number) => {
  //   console.log(open[index]);
  //   const updatedOpen = [...open];
  //   updatedOpen[index] = !updatedOpen[index];
  //   setOpen(updatedOpen);
  // };
  const user = useAppSelector(selectCurrentUser) as TDecoded;

  const { pathname } = useLocation();
  const myRole = pathname.split("/").slice(1, 2);

  const dispatch = useAppDispatch();

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };
  const dashboardItems: TMenuDropdown[] = [];
  switch (user.role) {
    case "admin":
      adminDashboardSidebarItems.forEach((item) => dashboardItems.push(item));
      break;
    case "user":
      userDashboardSidebarItems.forEach((item) => dashboardItems.push(item));
      break;
  }

  console.log(pathname === `/${user.role}/dashboard`);

  const drawer = (
    <Box>
      <Toolbar>
        <Typography
          sx={{
            margin: "auto",
          }}
        >
          <Link to={`/${user.role}/dashboard`}>Dashboard</Link>
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {dashboardItems.map((item, index) => (
          <List key={index}>
            {/* <Collapse in={open[index]} timeout="auto" unmountOnExit> */}
            <List component="div" disablePadding>
              <ListItemButton key={index} sx={{ pl: 4 }}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <Link
                  style={{
                    display: "block",
                  }}
                  to={`${item.name.split(" ").join("-").toLocaleLowerCase()}`}
                >
                  {item.name}
                </Link>
              </ListItemButton>
            </List>
            {/* </Collapse> */}
          </List>
        ))}
      </List>
      <Divider />
      <List>
        {navItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <NavLink to={`/${item.name.toLocaleLowerCase()}`}>
                {item.name}
              </NavLink>
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem sx={{ padding: "0px 0px 0px 3px" }}>
          {user ? (
            <ListItemButton
              onClick={() => dispatch(logOut())}
              sx={{ color: "red" }}
            >
              <Logout />
              <ListItemText sx={{ marginLeft: "30px" }}>Logout</ListItemText>
            </ListItemButton>
          ) : (
            <Link to="/login" style={{ color: "black", cursor: "pointer" }}>
              Login
            </Link>
          )}
        </ListItem>
      </List>
      <Divider />
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "white",
          color: "black",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/home">
            <Typography
              sx={{
                marginLeft: { sm: "auto", xs: "auto", lg: "0px" },
                marginRight: { sm: "auto", xs: "auto", lg: "0px" },
              }}
            >
              Motion Era
            </Typography>
          </Link>
          <Box
            sx={{ display: { xs: "none", sm: "block" }, marginLeft: "auto" }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {navItems.map((item, index) => (
                <NavLink
                  key={index}
                  to={`/${item.name.toLowerCase()}`}
                  style={({ isActive }) => ({
                    marginRight: "10px",
                    marginLeft: "10px",
                    color: "black",
                    fontWeight: "500",
                    textDecoration: isActive ? "underline" : "none",
                    textDecorationColor: isActive ? "#ff3b4b" : "transparent",
                    textDecorationThickness: isActive ? "3px" : "0px",
                  })}
                >
                  {item.name}
                </NavLink>
              ))}
              <Box>
                {user ? (
                  <button
                    onClick={() => dispatch(logOut())}
                    style={{ color: "red", cursor: "pointer" }}
                  >
                    logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    style={{ color: "black", cursor: "pointer" }}
                  >
                    Login
                  </Link>
                )}
              </Box>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          padding: "0px",
        }}
      >
        <Toolbar />
        {pathname === `/${user.role}/dashboard` ? (
          <Box>
            <img src={dashboarBg} width="100%" alt="" />
          </Box>
        ) : user.role === myRole[0] ? (
          <Outlet />
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
};
export default Dashboard;
