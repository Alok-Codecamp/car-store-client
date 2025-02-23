import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import Footer from "../../components/footer/Footer";
import NavBar from "../../components/navBar/NavBar";

const About = () => {
  return (
    <>
      <NavBar />
      <Container maxWidth="md" sx={{ py: 5 }}>
        <Box textAlign="center" mb={4}>
          <Typography
            variant="h3"
            fontWeight="bold"
            gutterBottom
            color="primary"
          >
            Welcome to Motion Era
          </Typography>
          <Typography variant="h6" color="textSecondary">
            Your Trusted Partner in Car Buying and Services
          </Typography>
        </Box>

        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Our Mission
        </Typography>
        <Typography variant="body1">
          Our mission is to help customers find their perfect car while ensuring
          a seamless and stress-free buying experience. We believe in
          transparency, honesty, and building long-term relationships by
          offering competitive pricing and reliable service.
        </Typography>

        <Typography variant="h5" fontWeight="bold" gutterBottom>
          What We Offer
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="🚗 New & Pre-Owned Vehicles"
              secondary="A wide selection of top brands and models to suit every budget and preference."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="💰 Financing Assistance"
              secondary="Flexible financing options to help you get behind the wheel without financial stress."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="🔄 Trade-Ins"
              secondary="Get the best value for your current vehicle when you trade it in for a new one."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="🛠️ Maintenance & Repairs"
              secondary="Professional servicing, from routine maintenance to major repairs, to keep your vehicle running smoothly."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="📞 Customer Support"
              secondary="A dedicated team ready to assist you at every step of your journey."
            />
          </ListItem>
        </List>

        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Why Choose Us?
        </Typography>
        <List>
          <ListItem>✔ High-quality vehicles and services</ListItem>
          <ListItem>✔ Customer-first approach</ListItem>
          <ListItem>✔ Affordable pricing and financing solutions</ListItem>
          <ListItem>✔ Trusted and experienced professionals</ListItem>
          <ListItem>✔ Hassle-free car buying experience</ListItem>
        </List>

        <Box textAlign="center" mt={4}>
          <Typography variant="h6">
            Visit us today or explore our collection online to find your dream
            car!
          </Typography>
        </Box>

        <Box textAlign="center" mt={3}>
          <Typography variant="body1">
            <strong>📍 Location:</strong> House #45, Road #12, Dhaka, Bangladesh
          </Typography>
          <Typography variant="body1">
            <strong>📞 Contact Us:</strong> +8801234567890
          </Typography>
          <Typography variant="body1">
            <strong>🌐 Website:</strong> https://www.dummywebsite.com
          </Typography>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default About;
