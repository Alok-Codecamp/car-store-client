import { useGetCarsQuery } from "../../redux/features/admin/carManagement/carManagementApi";
import { Box, Grid2 } from "@mui/material";
import ImgMediaCard from "../layout/Card";
import FeaturedSkelton from "../layout/Skelton";
import { Link } from "react-router-dom";
import { ICars } from "../../types/carInterface";

const FeaturedProducts = () => {
  const { data: cars, isLoading } = useGetCarsQuery([]);
  // console.log("cars:", cars);
  // const allCars = Array.isArray(cars)
  //   ? cars?.filter((item: ICars) => item.quantity > 0)
  //   : [];
  const featuredCars = Array.isArray(cars) && cars?.slice(0, 6);
  return (
    <Box
      sx={{
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          display: { lg: "grid" },
          gridTemplateColumns: "92% 8%",
          marginBottom: "10px",
        }}
      >
        <Box sx={{ paddingLeft: "100px" }}>
          <h4 style={{ lineHeight: "5px" }}>Featured Items</h4>
          <h5 style={{ lineHeight: "5px" }}>Check & Get Your Desired Car!</h5>
        </Box>
        <Box
          sx={{
            marginTop: "auto",
            background: "white",
            boxShadow: "0px 0px 0px 1px lightgray",
            paddingTop: "8px",
            paddingBottom: "8px",
            paddingLeft: "10px",
            paddingRight: "10px",
            borderRadius: "5px",
            ":hover": { backgroundColor: "#ff3b4b", color: "white" },
          }}
        >
          <Link to="/cars">View All</Link>
        </Box>
      </Box>
      <Box
        sx={{
          display: { lg: "flex" },
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isLoading ? (
          <FeaturedSkelton />
        ) : (
          <Grid2 container spacing={2}>
            {cars &&
              Array.isArray(featuredCars) &&
              featuredCars?.map((car: ICars, index: number) => (
                <Grid2 key={index} size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
                  <ImgMediaCard data={car} />
                </Grid2>
              ))}
          </Grid2>
        )}
      </Box>
    </Box>
  );
};

export default FeaturedProducts;
