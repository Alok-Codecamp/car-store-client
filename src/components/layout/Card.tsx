import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { ICars } from "../../types/carInterface";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

const ImgMediaCard = (car: any) => {
  const carData = car?.data as ICars;

  return (
    <Card sx={{ maxWidth: 460 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={carData?.photoUrl}
      />
      <CardContent>
        <Box
          sx={{
            // display: "flex",
            // justifyContent: "space-between",
            // alignItems: "center",
            textAlign: "left",
            lineHeight: "1px",
          }}
        >
          <h5
            style={{ textAlign: "left" }}
          >{`${carData?.brand} ${carData?.model}`}</h5>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            lineHeight: "1px",
            color: "black",
          }}
        >
          <h5>${carData.price}</h5>
          <h5 style={{ color: `${carData?.inStock ? "green" : "red"}` }}>
            {carData.inStock ? `${carData?.quantity} In stock` : "Out of Stock"}
          </h5>
        </Box>
        <h6>category:{carData.category}</h6>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          sx={{
            color: "black",
            ":hover": { backgroundColor: "#ff3b4b", color: "white" },
            fontSize: "12px",
            marginRight: "auto",
          }}
        >
          <Link to={`/place-order/${carData?._id}`}>Buy Now</Link>
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
          <Link to={`/cars/${carData?._id}`}>View Details</Link>
        </Button>
      </CardActions>
    </Card>
  );
};

export default ImgMediaCard;
