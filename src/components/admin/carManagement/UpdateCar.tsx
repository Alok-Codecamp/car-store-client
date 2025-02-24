import { useForm } from "react-hook-form";
import { ICars } from "../../../types/carInterface";
import { cardataValidationSchema } from "./createCardataValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import "../../form/form.css";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid2,
  Typography,
} from "@mui/material";
import carBg from "../../../assets/addCarBg.png";
import {
  useGetCarByIdQuery,
  useGetCarsQuery,
  useUpdateCarMutation,
} from "../../../redux/features/admin/carManagement/carManagementApi";

import { carCategory } from "./constants";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";
import { TUser } from "../../../redux/features/user/accountManagementApi";

const UpdateCar = () => {
  const { data: cars } = useGetCarsQuery([{ name: "limit", value: 100 }]);
  const [updateCar] = useUpdateCarMutation();
  const [car, setCar] = useState("");
  const { data: carId, refetch } = useGetCarByIdQuery(car);
  const user = useAppSelector(selectCurrentUser);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICars>({
    resolver: zodResolver(cardataValidationSchema.updateCardataValidation),
  });
  const handleUpdateCar = (id: string) => {
    setCar(id);
    refetch();
  };
  const onSubmit = async (data: ICars) => {
    const toastId = toast.loading("car data updating");
    const newData = { carData: data, id: car };
    const res = await updateCar(newData);

    if (res.data) {
      toast.success("car data updated", { id: toastId });
      navigate(`/${(user as any)?.role}/dashboard/update-car`);
      setCar("");
    } else {
      toast.error((res?.error as any)?.message, { id: toastId });
    }
    console.log(res);
  };

  if (car) {
    return (
      <Box
        sx={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${carBg})`,

          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundColor: "rgba(0,0,0,0.8)",
          paddingTop: "5%",
          paddingBottom: "5%",
        }}
      >
        <Box
          sx={{
            margin: "auto",
            padding: "20px",
            borderRadius: "12px",
            backgroundColor: "rgba(255, 255, 255, 0.1)", // Slightly transparent white
            backdropFilter: "blur(10px)", // Glassmorphism effect
            boxShadow:
              "0px 4px 10px rgba(255, 255, 255, 0.1), 0px 8px 30px rgba(0, 0, 0, 0.4)", // Layered shadow effect
            maxWidth: "500px",
          }}
        >
          <Typography
            fontSize={20}
            fontWeight={600}
            textAlign="center"
            sx={{ color: "white" }}
          >
            Update Car
          </Typography>
          <form
            className="add-car-form"
            onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))}
          >
            <input
              {...register("brand")}
              placeholder="Brand"
              defaultValue={carId?.data?.brand}
            />
            {errors?.brand && (
              <p className="error-text">{errors?.brand?.message}</p>
            )}
            <br />
            <input
              {...register("model")}
              placeholder="Model"
              defaultValue={carId?.data?.model}
            />
            {errors?.model && (
              <p className="error-text">{errors?.model?.message}</p>
            )}
            <br />
            <input
              {...register("year")}
              placeholder="year"
              defaultValue={carId?.data?.year}
            />
            {errors?.year && (
              <p className="error-text">{errors?.year?.message}</p>
            )}
            <br />
            <select {...register("category")}>
              {carCategory.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
            {errors?.category && (
              <p className="error-text">{errors?.category?.message}</p>
            )}
            <br />
            <input
              {...register("price")}
              placeholder="price"
              defaultValue={carId?.data?.price}
            />
            {errors?.price && (
              <p className="error-text">{errors?.price?.message}</p>
            )}
            <br />
            <input
              {...register("quantity")}
              placeholder="quantity"
              defaultValue={carId?.data?.quantity}
            />
            {errors?.quantity && (
              <p className="error-text">{errors?.quantity?.message}</p>
            )}
            <br />
            <input
              {...register("inStock")}
              placeholder="quantity"
              defaultValue={carId?.data?.inStock}
            />
            {errors?.quantity && (
              <p className="error-text">{errors?.inStock?.message}</p>
            )}
            <br />

            <input
              {...register("photoUrl")}
              placeholder="Photo url"
              defaultValue={carId?.data?.photoUrl}
            />
            {errors?.photoUrl && (
              <p className="error-text">{errors?.photoUrl?.message}</p>
            )}
            <br />
            <textarea
              rows={6}
              {...register("description")}
              placeholder="description"
              defaultValue={carId?.data?.description}
            />
            {errors?.description && (
              <p className="error-text">{errors?.description?.message}</p>
            )}
            <br />
            <Button
              sx={{
                color: "whitesmoke",
                border: "2px solid white",
                marginTop: "10px",
                paddingLeft: "30px",
                paddingRight: "30px",
                backgroundColor: "rgba(0,0,0,0.6)",
                ":hover": {
                  backgroundColor: "#ff3b4b",
                },
              }}
              type="submit"
              className="submit-button"
            >
              Update Car
            </Button>
          </form>
        </Box>
      </Box>
    );
  }
  return (
    <Box
      sx={{
        padding: "50px",
      }}
    >
      <Typography textAlign="center" mb={4} fontWeight={600} fontSize={20}>
        Update Car Data
      </Typography>
      <Grid2 container spacing={2}>
        {cars &&
          Array.isArray(cars) &&
          cars.map((item: ICars, index: number) => (
            <Grid2 key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <Card sx={{ maxWidth: 460 }}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="140"
                  image={item?.photoUrl}
                />
                <CardContent>
                  <Box
                    sx={{
                      textAlign: "left",
                      lineHeight: "1px",
                    }}
                  >
                    <h5
                      style={{ textAlign: "left" }}
                    >{`${item?.brand} ${item?.model}`}</h5>
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
                    <h5>${item?.price}</h5>
                    <h5 style={{ color: `${item?.inStock ? "green" : "red"}` }}>
                      {item?.inStock
                        ? `${item?.quantity} In stock`
                        : "Out of Stock"}
                    </h5>
                  </Box>
                  <h6 style={{ textAlign: "left" }}>
                    category:{item?.category}
                  </h6>
                </CardContent>
                <CardActions>
                  <Button
                    onClick={() => {
                      handleUpdateCar(item._id);
                    }}
                    size="small"
                    sx={{
                      color: "black",
                      ":hover": { backgroundColor: "#ff3b4b", color: "white" },
                      fontSize: "12px",
                      marginRight: "auto",
                    }}
                  >
                    Update Car Data
                  </Button>
                </CardActions>
              </Card>
            </Grid2>
          ))}
      </Grid2>
    </Box>
  );
};

export default UpdateCar;
