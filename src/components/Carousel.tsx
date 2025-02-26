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
  console.log(caroouselPic, "m:", isMobile, "tab:", isTablet, "d:", isDesktop);

  return (
    <div
      style={{ marginTop: "72px", paddingLeft: "20px", paddingRight: "20px" }}
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
            minWidth: 600,
          },
        ]}
        speed={400}
        easing="linear"
      >
        {caroouselPic.map((item, index) => (
          <Box
            component="img"
            src={item.image}
            alt="Image description"
            sx={{
              width: "100vw",
              height: "400px",
              objectFit: "cover",
            }}
          ></Box>
        ))}
      </ReactSimplyCarousel>
    </div>
  );
};

export default Carousel;
