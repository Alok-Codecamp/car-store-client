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
      {/* offer product section  */}
      <Box
        component="section"
        className="featured-items"
        sx={{
          mx: 4.5
        }}
      >
        <Box sx={{ textAlign: 'center', my: 5 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Hot Deals on Wheels</Typography>
          <Typography sx={{ fontSize: '18px' }}>Drive away with exclusive limited-time offers!</Typography>
        </Box>
        <FeaturedProducts />
      </Box>
      {/* Feature products sections  */}
      <Box
        component="section"
        className="featured-items"
        sx={{
          mx: 4.5
        }}
      >
        <Box sx={{ textAlign: 'center', my: 5 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Featured Cars</Typography>
          <Typography sx={{ fontSize: '18px' }}>Check & Get Your Desired Car!</Typography>
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
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Featured Car Category</Typography>
          <Typography variant="h5" sx={{ fontSize: '18px' }}>Get Your Desired Car from Featured Category!</Typography>
        </Box>
        <CategoriesCard />
      </Box>
      {/* recently sold cars  */}
      <Box
        component="section"
        className="featured-items"
        sx={{
          mx: 4.5
        }}
      >
        <Box sx={{ textAlign: 'center', my: 5 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Recently Sold Cars</Typography>
          <Typography sx={{ fontSize: '18px' }}>Find out what others are driving off with!</Typography>
        </Box>
        <FeaturedProducts />
      </Box>
      {/* sport car section   */}
      <Box
        component="section"
        className="featured-items"
        sx={{
          mx: 4.5
        }}
      >
        <Box sx={{ textAlign: 'center', my: 5 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Explore Our Sport Cars</Typography>
          <Typography sx={{ fontSize: '18px' }}>Unleash unmatched power, style, and precision.</Typography>
        </Box>
        <FeaturedProducts />
      </Box>
      {/* blog section  */}
      <Box
        component="section"
        className="featured-items"
        sx={{
          mx: 4.5
        }}
      >
        <Box sx={{ textAlign: 'center', my: 5 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Drive Smarter with Our Blog</Typography>
          <Typography sx={{ fontSize: '18px' }}>Expert tips, reviews, and everything you need to know about cars.</Typography>
        </Box>
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
