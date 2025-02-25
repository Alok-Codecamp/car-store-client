import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import logo from "../../assets/logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logOut, selectCurrentUser } from "../../redux/features/auth/authSlice";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { navItems } from "../constants";
import { Dashboard, Login, Logout } from "@mui/icons-material";
interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}
type TUser = {
  email: string;
  role: string;
  iat: number;
  exp: number;
};
const drawerWidth = 240;

const NavBar = (props: Props) => {
  const { window } = props;
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const dispatch = useAppDispatch();

  const user = useAppSelector(selectCurrentUser) as TUser;

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const handleLogOut = () => {
    dispatch(logOut());
    navigate("/login");
  };
  // for mobile menu
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Divider />
      <List>
        {navItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <NavLink to={`/${item.name.toLocaleLowerCase()}`}>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                {item.name}
              </ListItemButton>
            </NavLink>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <NavLink to={user ? `/${user?.role}/dashboard` : "/login"}>
            <ListItemButton>
              <ListItemIcon>
                <Dashboard />
              </ListItemIcon>
              Dashboard
            </ListItemButton>
          </NavLink>
        </ListItem>
        <ListItem sx={{ marginLeft: "-16px" }}>
          {user ? (
            <ListItemButton onClick={handleLogOut} sx={{ color: "red" }}>
              <Logout />
              <ListItemText sx={{ marginLeft: "30px" }}>Logout</ListItemText>
            </ListItemButton>
          ) : (
            <NavLink to="/login">
              <ListItemButton>
                <ListItemIcon>
                  <Login />
                </ListItemIcon>
                Login
              </ListItemButton>
            </NavLink>
          )}
        </ListItem>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      sx={{
        display: "flex",
        marginBottom: "66px",
      }}
    >
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{
          backgroundColor: "white",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ color: "black", display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Link to="/home">
              {" "}
              <img src={logo} alt="logo" width={150} />
            </Link>
          </Box>
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
              <NavLink
                to={user ? `/${user?.role}/dashboard` : "/login"}
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
                Dashboard
              </NavLink>
              <Box>
                {user ? (
                  <button
                    onClick={handleLogOut}
                    style={{ color: "red", cursor: "pointer" }}
                  >
                    logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    style={{ color: "black", cursor: "pointer" }}
                  >
                    login/signup
                  </Link>
                )}
              </Box>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
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
      </nav>
    </Box>
  );
};

export default NavBar;
