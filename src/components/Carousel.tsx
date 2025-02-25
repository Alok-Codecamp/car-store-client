import suv_xs from "../assets/carousel/suv_sm.jpg";
import suv_sm from "../assets/carousel/suv_sm.jpg";
import suv_lg from "../assets/carousel/suv_lg.jpg";
import rols_xs from "../assets/carousel/rols_xs.jpg";
import rols_sm from "../assets/carousel/rols_sm.jpg";
import rols_lg from "../assets/carousel/rols_lg.jpg";
import lamborghini_xs from "../assets/carousel/lamborghini_xs.jpg";
import lamborghini_sm from "../assets/carousel/lamborghini_sm.jpg";
import lamborghini_lg from "../assets/carousel/lamborghini_lg.jpg";
import { useState } from "react";
import ReactSimplyCarousel from "react-simply-carousel";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { ArrowBackIosRounded } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
const images = [
  { small: suv_xs, medium: suv_sm, large: suv_lg },
  { small: rols_xs, medium: rols_sm, large: rols_lg },
  { small: lamborghini_xs, medium: lamborghini_sm, large: lamborghini_lg },
];

const Carousel = () => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  return (
    <div style={{ marginTop: "72px" }}>
      <ReactSimplyCarousel
        activeSlideIndex={activeSlideIndex}
        onRequestChange={setActiveSlideIndex}
        autoplay={true}
        autoplayDelay={8000}
        autoplayDirection="forward"
        itemsToShow={1}
        itemsToScroll={1}
        forwardBtnProps={{
          style: {
            background: "none",
            border: "none",
            alignSelf: "center",
            cursor: "pointer",
            fontSize: "30px",
            height: 30,
            lineHeight: 1,
            textAlign: "center",
            width: 30,
            marginLeft: "-54px",
            zIndex: "1",
          },
          children: (
            <ArrowForwardIosRoundedIcon
              key={uuidv4()}
              sx={{
                color: "rgba(255,255,255,0.5)",
                fontSize: "50px",
                ":hover": { color: "white", backgroundColor: "#ff3b4b" },
                borderRadius: "50%",
              }}
            />
          ),
        }}
        backwardBtnProps={{
          style: {
            background: "none",
            border: "none",
            alignSelf: "center",
            cursor: "pointer",
            fontSize: "30px",
            height: 30,
            lineHeight: 1,
            textAlign: "center",
            width: 30,
            marginRight: "-32px",
            zIndex: "1",
          },
          children: (
            <ArrowBackIosRounded
              key={uuidv4()}
              sx={{
                color: "rgba(255,255,255,0.5)",
                fontSize: "50px",
                ":hover": { color: "white", backgroundColor: "#ff3b4b" },
                borderRadius: "50%",
              }}
            />
          ),
        }}
        responsiveProps={[
          {
            itemsToShow: 1,
            itemsToScroll: 1,
            minWidth: 640,
          },
        ]}
        speed={400}
        easing="linear"
      >
        {/* here you can also pass any other element attributes. Also, you can use your custom components as slides */}
        {images.map((image) => (
          <Box
            key={uuidv4()}
            sx={{
              width: "80rem",
              height: "400px",
              backgroundImage: {
                lg: `url(${image.large})`,
                md: `url(${image.large})`,
                sm: `url(${image.medium})`,
                xs: `url(${image.small})`,
              },
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <Box>
              <Typography color="white" variant="h2">
                New Grandland
              </Typography>
              <Typography color="white">
                Available at your local Vauxhall Showroom £435 per month,
                <br />
                plus £435 initial rental Offer available on Grandland Hybrid GS,
                *T&Cs apply
              </Typography>
            </Box>
            <Box color="black" mt={26} textAlign="center">
              <Button
                sx={{
                  margin: "5px",
                  color: "white",
                  cursor: "pointer",
                  border: "1px solid black",
                  borderRadius: "20px",
                  padding: "5px 15px 5px 15px",
                  ":hover": { backgroundColor: "#ff3b4b" },
                }}
              >
                <Link to="/cars">Book Order Now</Link>
              </Button>
              <Button
                sx={{
                  margin: "5px",
                  color: "white",
                  cursor: "pointer",
                  border: "1px solid black",
                  borderRadius: "20px",
                  padding: "5px 15px 5px 15px",
                  ":hover": { backgroundColor: "#ff3b4b" },
                }}
              >
                <Link to="/cars">Book a Test Drive</Link>
              </Button>
            </Box>
          </Box>
        ))}
      </ReactSimplyCarousel>
    </div>
  );
};

export default Carousel;
