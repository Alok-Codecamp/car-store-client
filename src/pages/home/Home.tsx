import { Box } from "@mui/material";
import Carousel from "../../components/Carousel";
import NavBar from "../../components/navBar/NavBar";
import "./home.css";
import FeaturedProducts from "../../components/featuredProduct/FeaturedProducts";
import ExtraSection from "../../components/extraSection/ExtraSection";
import Footer from "../../components/footer/Footer";
const Home = () => {
  return (
    <div>
      <NavBar />
      {/* bannar section */}
      <div className="banner">
        <Carousel />
      </div>
      {/* Feature products sections  */}
      <Box
        component="section"
        className="featured-items"
        style={{ margin: "30px" }}
      >
        <FeaturedProducts />
      </Box>
      {/* Extra section  */}
      <Box>
        <ExtraSection />
      </Box>

      {/* Footer sections  */}

      <Box>
        <Footer />
      </Box>
    </div>
  );
};

export default Home;
