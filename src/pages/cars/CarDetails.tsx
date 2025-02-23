import { Box, Breadcrumbs, Button } from "@mui/material";
import NavBar from "../../components/navBar/NavBar";
import { Link, useParams } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import { Home } from "@mui/icons-material";
import { useGetCarByIdQuery } from "../../redux/features/admin/carManagement/carManagementApi";
import { ICars } from "../../types/carInterface";
import "./Cars.css";
import FeaturedSkelton from "../../components/layout/Skelton";
const CarDetails = () => {
  const { id } = useParams();

  const { data: carData, isLoading } = useGetCarByIdQuery(id as string);
  const car = carData?.data as ICars;
  console.log(car);

  return (
    <Box>
      {/* nav bar section  */}
      <NavBar />
      {/* BreadCrumbs section  */}
      <Box
        sx={{
          marginTop: "100px",
          marginLeft: "20px",
        }}
      >
        <Breadcrumbs aria-label="breadcrumb">
          <Link style={{ textAlign: "center" }} to="/home" color="inherit">
            <Home
              style={{
                fontSize: "16px",
                marginRight: "10px",
                marginTop: "4px",
              }}
            />
            <span style={{ color: "gray" }}>/</span> home
          </Link>

          <Link to="/cars" color="inherit">
            cars
          </Link>
          <Link to={`/cars/${id}`} color="inherit">
            {`${car?.brand} ${car?.model}`}
          </Link>
        </Breadcrumbs>
      </Box>
      {/* Car details section  */}
      {isLoading ? (
        <Box
          sx={{ marginLeft: "auto", marginRight: "auto", width: "fit-content" }}
        >
          <FeaturedSkelton quantity={1} />
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: { lg: "row", md: "row", sm: "column", xs: "column" },
            alignItems: "flex-start",
            justifyContent: "center",
            marginTop: "100px",
            marginBottom: "100px",
            marginLeft: "100px",
            marginRight: "100px",
          }}
        >
          {/* Image section  */}

          <Box
            sx={{
              width: { lg: "50%", md: "50%" },
            }}
            marginRight="50px"
          >
            <img src={car?.photoUrl} alt={car?.brand} width="100%" />
          </Box>

          {/* details section  */}
          <Box sx={{ marginLeft: "20px", marginRight: "20px" }}>
            <h3>{`${car?.brand}  ${car?.model}`}</h3>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "12px",
              }}
            >
              <span>Price:{car?.price}</span>
              <span style={{ color: `${car?.inStock ? "green" : "red"}` }}>
                Status:
                {car?.inStock ? `${car?.quantity}In stock` : "out of stock"}
              </span>
              <span>Brand:{car?.brand}</span>
            </Box>
            <h4>Detail Informations</h4>
            <Box
              sx={{
                fontSize: "14px",
              }}
            >
              <p>Brand: {car?.brand}</p>
              <p>Model: {car?.model}</p>
              <p>Release: {car?.year}</p>
              <p
                style={{
                  wordWrap: "break-word",
                }}
              >
                Description: {car?.description}
              </p>
            </Box>

            <Button
              size="small"
              sx={{
                backgroundColor: "whitesmoke",
                boxShadow: "0px 0px 0px 1px lightgray",
                border: "white",
                color: "black",
                ":hover": { backgroundColor: "#ff3b4b", color: "white" },
                fontSize: "12px",
                marginRight: "auto",
                width: { lg: "200px", md: "160px" },
              }}
            >
              <Link to={`/place-order/${car?._id}`}>Buy Now</Link>
            </Button>
          </Box>
        </Box>
      )}
      {/* footer section  */}
      <Footer />
    </Box>
  );
};

export default CarDetails;
