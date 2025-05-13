import { useGetCarsQuery } from "../../redux/features/admin/carManagement/carManagementApi";
import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid2 } from "@mui/material";
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
          display: { lg: "flex" },
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isLoading ? (
          <FeaturedSkelton quantity={6} />
        ) : (
          <Grid2 container spacing={3.5}>
            {cars &&
              Array.isArray(featuredCars) &&
              featuredCars?.map((car: ICars, index: number) => (
                <Grid2 key={index} size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
                  <Card sx={{ maxWidth: 460 }}>
                    <CardMedia
                      component="img"
                      alt="green iguana"
                      height="140"
                      image={car?.photoUrl}
                    />
                    <CardContent sx={{ paddingY: "0px" }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          color: "black",
                        }}
                      >
                        <h5>{`${car?.brand} ${car?.model}`}</h5>
                        <h5>${car?.price}</h5>
                      </Box>

                    </CardContent>
                    <CardActions sx={{ padding: '2px' }}>
                      <Button
                        size="small"
                        sx={{
                          color: "black",
                          ":hover": { backgroundColor: "#ff3b4b", color: "white" },
                          fontSize: "12px",
                          marginRight: "auto",

                        }}
                      >
                        <Link to={`/place-order/${car?._id}`}>Buy Now</Link>
                      </Button>
                      <Button
                        size="small"
                        sx={{
                          color: "black",
                          fontSize: "12px",
                          ":hover": { backgroundColor: "#ff3b4b", color: "white" },
                          marginLeft: "auto",
                        }}
                      >
                        <Link to={`/cars/${car?._id}`}>View Details</Link>
                      </Button>
                    </CardActions>
                  </Card>
                </Grid2>
              ))}
          </Grid2>
        )}
      </Box>
      <Box
        sx={{

          background: "white",
          boxShadow: "0px 0px 0px 1px lightgray",
          py: "8px",
          px: "10px",
          borderRadius: "5px",
          ":hover": { backgroundColor: "#ff3b4b", color: "white" },
          width: 'fit-content',
          ml: 'auto',
          mr: 'auto',
          mt: 1

        }}
      >
        <Link to="/cars">View All</Link>
      </Box>
    </Box>
  );
};

export default FeaturedProducts;
