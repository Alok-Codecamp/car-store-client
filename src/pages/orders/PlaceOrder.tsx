import {
  Box,
  Breadcrumbs,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import NavBar from "../../components/navBar/NavBar";
import { Link, useParams } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import { Home } from "@mui/icons-material";
import { useGetCarByIdQuery } from "../../redux/features/admin/carManagement/carManagementApi";
import { ICars } from "../../types/carInterface";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  countTotalPrice,
  decraseQuantity,
  incraseQuantity,
  selectQuantity,
  selectTotalPrice,
} from "../../redux/features/admin/orderManagement/orderSlice";
import FeaturedSkelton from "../../components/layout/Skelton";
import { useCreateOrderMutation } from "../../redux/features/admin/orderManagement/orderManagementApi";
import { toast } from "sonner";
import { RotatingLines } from "react-loader-spinner";
import { useForm } from "react-hook-form";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { TUser } from "../../redux/features/user/accountManagementApi";

const PlaceOrder = () => {
  const userInfo = useAppSelector(selectCurrentUser) as TUser;
  // const { data: userData } = useMyAccountQuery(userInfo?.email);
  const dispatch = useAppDispatch();
  const { carId } = useParams();
  const { data: carData, isFetching } = useGetCarByIdQuery(carId as string);
  const car = carData?.data as ICars;
  const quantity = useAppSelector(selectQuantity);
  const totalPrice = useAppSelector(selectTotalPrice);
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const handleQunatityIncrement = () => {
    if (quantity < car?.quantity) {
      dispatch(incraseQuantity());
      dispatch(countTotalPrice(car.price));
    } else {
      alert("Ordered quantity does not exceed the Car stock");
    }
  };
  const handleQuantityDecrement = () => {
    if (quantity > 1) {
      dispatch(decraseQuantity());
      dispatch(countTotalPrice(car.price));
    } else {
      alert("Ordered quantity does not less then the 1");
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handlePlaceOrder = async (data: any) => {
    console.log(data);

    const toastId = toast.loading("please wait! order processing!");
    const cars = [{ car: car._id, quantity, shippingAddress: data.city }];
    const createOrderRes = await createOrder({ cars });
    console.log(createOrderRes);
    if (createOrderRes.data) {
      console.log(createOrderRes?.data?.data?.payment);
      toast.success("order placed!", { id: toastId });
      window.location.href = createOrderRes?.data?.data?.payment?.checkout_url;
    }
    if (createOrderRes.error) {
      toast.error(
        (createOrderRes?.error as any)?.data || "faild to place order"
      );
    }
  };

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
          <Link to="place order" color="inherit">
            Place order
          </Link>
        </Breadcrumbs>
      </Box>
      {/* Car details section  */}
      {isFetching ? (
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

          {/* car details section  */}
          <Box sx={{ marginLeft: "20px", marginRight: "20px" }}>
            <h2>Order details</h2>
            <h3>Car: {`${car?.brand}  ${car?.model}`}</h3>
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
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <p>Total Price: {totalPrice === 0 ? car?.price : totalPrice}</p>

                <p
                  style={{
                    marginLeft: "30px",
                  }}
                >
                  Quantity:
                </p>
                <Button onClick={handleQuantityDecrement}>-</Button>
                <span>{quantity}</span>
                <Button onClick={handleQunatityIncrement}>+</Button>
              </Box>
            </Box>
            <Box textAlign="center">
              <Typography textAlign="left" fontWeight="600">
                User Info
              </Typography>

              <form onSubmit={handleSubmit(handlePlaceOrder)}>
                <Box>
                  {/* user contact  */}
                  <TextField
                    sx={{
                      marginRight: "10px",
                    }}
                    {...register("address", {
                      required: "address is required",
                    })}
                    placeholder="Address"
                  />

                  <TextField
                    {...register("city", { required: "City is required" })}
                    placeholder="City"
                  />
                </Box>
                <Box mt={2}>
                  {/* user contact  */}
                  <TextField
                    sx={{
                      marginRight: "10px",
                    }}
                    {...register("email")}
                    value={userInfo.email}
                    placeholder="Email"
                  />

                  <Select
                    {...register("paymentMethod")}
                    sx={{
                      width: "48%",
                    }}
                    defaultValue="Mobile Banking"
                  >
                    <MenuItem value="Mobile Banking">Mobile Banking</MenuItem>
                    <MenuItem value="Bank Account">Bank Account</MenuItem>
                    <MenuItem value="Credit Card">Credit Card</MenuItem>
                  </Select>
                </Box>
                <Button
                  type="submit"
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
                    height: "40px",
                    marginTop: "20px",
                  }}
                >
                  {isLoading ? (
                    <RotatingLines
                      width="20"
                      strokeWidth="2"
                      strokeColor="white"
                      animationDuration="0.75"
                    />
                  ) : (
                    "Order Now"
                  )}
                </Button>
              </form>
            </Box>
          </Box>
        </Box>
      )}

      {/* footer section  */}
      <Footer />
    </Box>
  );
};

export default PlaceOrder;
