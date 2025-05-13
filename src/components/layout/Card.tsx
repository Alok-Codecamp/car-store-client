import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
// import { ICars } from "../../types/carInterface";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { ICars } from "../../types/carInterface";

const ImgMediaCard = ({ car }: { car: ICars }) => {
  console.log(car);
  return (
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
            my: "10px",
            fontSize: '14px'
          }}
        >
          <Typography >{`${car?.brand} ${car?.model}`}</Typography>
          <Typography>${car?.price}</Typography>
        </Box>
        <Box>
          <Typography>{car?.category}</Typography>
          <Typography>{car?.ratings?.average}</Typography>
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
  );
};

export default ImgMediaCard;
