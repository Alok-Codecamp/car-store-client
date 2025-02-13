import { Call, LocationOn } from "@mui/icons-material";
import { Box, List, ListItemText, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#081621",
        textAlign: { xs: "center", sm: "center", md: "left" },
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        },
        justifyContent: "space-between",
        alignItems: "baseline",
        padding: "20px",
        gap: { xs: 3, sm: 4, lg: 1 },
      }}
    >
      {/* Support Section */}
      <Box
        sx={{
          textAlign: { xs: "center", sm: "center", md: "left", lg: "left" },
          marginLeft: { xs: "auto", sm: "auto" },
          marginRight: { xs: "auto", sm: "auto" },
        }}
      >
        <Typography variant="h5" sx={{ color: "white" }}>
          General Information
        </Typography>

        <Box
          component="a"
          href="tel:09845"
          sx={{
            border: "1px solid #ff3b4b",
            borderRadius: "340px",
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            paddingLeft: "10px",
            paddingTop: "5px",
            paddingBottom: "5px",
            margin: "20px",
            width: "220px",
            textAlign: "left",
            color: "white",
          }}
        >
          <Box sx={{ borderRight: "1px solid white", marginRight: "5px" }}>
            <Call sx={{ color: "white" }} />
          </Box>

          <Box>
            <Typography sx={{ color: "white", fontSize: "12px" }}>
              9am-8pm
            </Typography>
            <Typography sx={{ color: "#ff3b4b" }}>09845</Typography>
          </Box>
        </Box>

        <Box
          sx={{
            border: "1px solid #ff3b4b",
            borderRadius: "340px",
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            paddingLeft: "10px",
            paddingTop: "5px",
            paddingBottom: "5px",
            margin: "20px",
            width: "220px",
            textAlign: "left",
            color: "white",
          }}
        >
          <Box sx={{ borderRight: "1px solid white", marginRight: "5px" }}>
            <LocationOn sx={{ color: "white", fontSize: "26px" }} />
          </Box>

          <Box>
            <Typography sx={{ color: "white", fontSize: "12px" }}>
              Showroom locator
            </Typography>
            <Typography sx={{ color: "#ff3b4b" }}>
              Find Our Dealerships
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* About Us Section */}
      <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
        <Typography variant="h5" sx={{ color: "white" }}>
          Company & Policies
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: 1,
            color: "white",
            textAlign: { xs: "center", sm: "left" },
            marginTop: "16px",
            fontSize: "14px",
          }}
        >
          <Link
            style={{ color: "white" }}
            to="/affiliate-program"
            color="inherit"
          >
            About Us
          </Link>
          <Link to="/affiliate-program" color="inherit">
            Affiliate Program
          </Link>
          <Link to="/affiliate-program" color="inherit">
            EMI Terms
          </Link>
          <Link to="/affiliate-program" color="inherit">
            Online Car Delivery
          </Link>
          <Link to="/affiliate-program" color="inherit">
            Privacy Policy
          </Link>
          <Link to="/affiliate-program" color="inherit">
            Terms & Conditions
          </Link>
          <Link to="/affiliate-program" color="inherit">
            Refund & Return Policy
          </Link>
          <Link to="/affiliate-program" color="inherit">
            Loyalty Program
          </Link>
          <Link to="/affiliate-program" color="inherit">
            Careers
          </Link>
          <Link to="/affiliate-program" color="inherit">
            Blog
          </Link>
          <Link to="/affiliate-program" color="inherit">
            Contact Us
          </Link>
        </Box>
      </Box>

      {/* Car Brands Section */}
      <Box
        sx={{
          textAlign: { xs: "center", sm: "left" },
          marginRight: { lg: "10px", xs: 0 },
        }}
      >
        <Typography variant="h5" sx={{ color: "white" }}>
          Car Brands We Offer
        </Typography>
        <List
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: 1,
            color: "white",
            textAlign: { lg: "left", md: "left", sm: "center", xs: "center" },
          }}
        >
          <ListItemText>Mitsubishi</ListItemText>
          <ListItemText>Toyota</ListItemText>
          <ListItemText>Honda</ListItemText>
          <ListItemText>Nissan</ListItemText>
          <ListItemText>BMW</ListItemText>
          <ListItemText>Mercedes-Benz</ListItemText>
          <ListItemText>Audi</ListItemText>
          <ListItemText>Hyundai</ListItemText>
          <ListItemText>Ford</ListItemText>
          <ListItemText>Lexus</ListItemText>
        </List>
      </Box>
    </Box>
  );
};

export default Footer;
