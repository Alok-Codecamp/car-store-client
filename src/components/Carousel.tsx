import { useState } from "react";
import ReactSimplyCarousel from "react-simply-carousel";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { ArrowBackIosRounded } from "@mui/icons-material";
import { Box, useMediaQuery } from "@mui/material";
import black_d from "../assets/carousel/black_d.png";
import black_m from "../assets/carousel/black_m.png";
import red_d from "../assets/carousel/red_d.png";
import red_m from "../assets/carousel/red_m.png";
import pink_d from "../assets/carousel/pink_d.png";
import pink_m from "../assets/carousel/pink_m.png";
const images = [
  { deskTop: black_d, mobile: black_m, tab: black_d },
  { deskTop: red_d, mobile: red_m, tab: red_d },
  { deskTop: pink_d, mobile: pink_m, tab: pink_d },
];

type TCarouselPic = {
  image: string;
}[];
const Carousel = () => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const isDesktop = useMediaQuery("(min-width:1199px)");
  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(max-width:1024px)");
  let caroouselPic: TCarouselPic = [];
  if (isMobile) {
    images.forEach((item) => {
      caroouselPic.push({ image: item.mobile });
    });
  } else if (isDesktop) {
    images.forEach((item) => {
      caroouselPic.push({ image: item.deskTop });
    });
  } else if (isTablet) {
    images.forEach((item) => {
      caroouselPic.push({ image: item.tab });
    });
  }


  return (
    <Box
      sx={{
        marginTop: {
          xs: 7,
          sm: 12
        },

      }}
    >
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

          },

        }}
        backwardBtnProps={{
          style: {
            background: "none",
            border: "none",

          },

        }}
        responsiveProps={[
          {
            itemsToShow: 1,
            itemsToScroll: 1,
            minWidth: 600,
          },
        ]}
        speed={400}
        easing="linear"
      >
        {caroouselPic.map((item, index) => (
          <Box
            key={index}
            component="img"
            src={item.image}
            alt="Image description"
            sx={{
              width: "100vw",
              height: "400px",
              objectFit: "cover",
            }}
          />
        ))}
      </ReactSimplyCarousel>
    </Box>
  );
};

export default Carousel;
