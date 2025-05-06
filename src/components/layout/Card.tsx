import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
// import { ICars } from "../../types/carInterface";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

const ImgMediaCard = (car: any) => {
  // console.log(car.data);
  return (
    <Card sx={{ maxWidth: 460 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={car.data?.photoUrl}
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
          <h5>{`${car.data?.brand} ${car.data?.model}`}</h5>
          <h5>${car.data.price}</h5>
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
          <Link to={`/place-order/${car.data?._id}`}>Buy Now</Link>
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
          <Link to={`/cars/${car.data?._id}`}>View Details</Link>
        </Button>
      </CardActions>
    </Card>
  );
};

export default ImgMediaCard;
