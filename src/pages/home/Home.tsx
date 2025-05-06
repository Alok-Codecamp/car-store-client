import { Box, Typography } from "@mui/material";
import Carousel from "../../components/Carousel";
import NavBar from "../../components/navBar/NavBar";
import "./home.css";
import FeaturedProducts from "../../components/featuredProduct/FeaturedProducts";
import ExtraSection from "../../components/extraSection/ExtraSection";
import Footer from "../../components/footer/Footer";
import CategoriesCard from "../../components/categoriesCard/CategoriesCard";
const Home = () => {
  return (
    <div>
      <NavBar />
      {/* bannar section */}
      <div>
        <Carousel />
      </div>
      {/* Feature products sections  */}
      <Box
        component="section"
        className="featured-items"
        sx={{
          mx: 4.5
        }}
      >
        <Box sx={{ textAlign: 'center', my: 5 }}>
          <Typography variant="h5">Featured Items</Typography>
          <Typography>Check & Get Your Desired Car!</Typography>
        </Box>
        <FeaturedProducts />
      </Box>
      {/* category section  */}
      <Box
        component="section"
        sx={{
          mx: 4.5

        }}
      >
        <Box sx={{ textAlign: 'center', my: 5 }}>
          <Typography variant="h5" sx={{ textAlign: 'center', }}>Featured Category</Typography>
          <Typography sx={{ textAlign: 'center' }}>Get Your Desired Car from Featured Category!</Typography>
        </Box>
        <CategoriesCard />
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
