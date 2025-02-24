import { useForm } from "react-hook-form";
import { ICars } from "../../../types/carInterface";
import { cardataValidationSchema } from "./createCardataValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import "../../form/form.css";
import { Box, Button } from "@mui/material";
import carBg from "../../../assets/addCarBg.png";
import { useAddCarMutation } from "../../../redux/features/admin/carManagement/carManagementApi";
import { toast } from "sonner";
import { carCategory } from "./constants";

const AddNewCar = () => {
  const [addCar] = useAddCarMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICars>({
    resolver: zodResolver(cardataValidationSchema.createCardataValidation),
  });

  const onSubmit = async (data: ICars) => {
    console.log("Form Data:", data);
    const toastId = toast.loading("creating new car data in to db");
    try {
      const result = await addCar(data).unwrap();
      console.log(result);
      if (result?.data) {
        toast.success("car data created in to db ", { id: toastId });
      }
    } catch (error: any) {
      console.log(error);
      toast.error("error", { id: toastId });
    }
  };

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
        <form
          className="add-car-form"
          onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))}
        >
          <input {...register("brand")} placeholder="Brand" />
          {errors?.brand && (
            <p className="error-text">{errors?.brand?.message}</p>
          )}
          <br />
          <input {...register("model")} placeholder="Model" />
          {errors?.model && (
            <p className="error-text">{errors?.model?.message}</p>
          )}
          <br />
          <input {...register("year")} placeholder="year" />
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
          <input {...register("price")} placeholder="price" />
          {errors?.price && (
            <p className="error-text">{errors?.price?.message}</p>
          )}
          <br />
          <input {...register("quantity")} placeholder="quantity" />
          {errors?.quantity && (
            <p className="error-text">{errors?.quantity?.message}</p>
          )}
          <br />
          <input {...register("description")} placeholder="description" />
          {errors?.description && (
            <p className="error-text">{errors?.description?.message}</p>
          )}
          <br />
          <input {...register("photoUrl")} placeholder="Photo url" />
          {errors?.photoUrl && (
            <p className="error-text">{errors?.photoUrl?.message}</p>
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
            Add Car
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default AddNewCar;
