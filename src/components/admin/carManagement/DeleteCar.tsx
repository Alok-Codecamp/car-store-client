import { Grid2, Box, Button, Typography } from "@mui/material";

import {
  useDeleteCarMutation,
  useGetCarsQuery,
} from "../../../redux/features/admin/carManagement/carManagementApi";
import { ICars } from "../../../types/carInterface";
import { toast } from "sonner";

const DeleteCar = () => {
  const { data: cars, refetch } = useGetCarsQuery([]);
  const [deleteCar] = useDeleteCarMutation();
  console.log(cars);
  const handleDeleteCar = async (id: string) => {
    const toastId = toast.loading("car deleting...");
    console.log(id);
    try {
      const result = await deleteCar(id).unwrap();
      refetch();
      if (result.data.message === "car deleted successfully") {
        toast.success("car deleted successfully", { id: toastId });
      } else {
        toast.error(result.data.message as string, { id: toastId });
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.data.message as string, { id: toastId });
    }
  };
  return (
    <Box>
      <Typography>Delete Useless Data</Typography>
      {cars?.data &&
        Array.isArray(cars?.data) &&
        cars.data.map((item: ICars, index: number) => (
          <Grid2
            key={index}
            size={{ xs: 12, sm: 12, md: 6, lg: 3 }} // Responsive grid sizes
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 2,
            }}
            component="div" // Specify component as "div"
          >
            <Box
              sx={{
                border: "1px solid #ddd",
                borderRadius: 2,
                boxShadow: 3,
                overflow: "hidden",
                width: "100%",
                height: "auto",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#fff",
              }}
            >
              {/* Image Section */}
              <Box sx={{ width: "100%", height: "250px", overflow: "hidden" }}>
                <img
                  src={item.photoUrl}
                  alt={`${item.brand} ${item.model}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>

              {/* Content Section */}
              <Box sx={{ padding: 2 }}>
                <h3>{item.brand}</h3>
                <h4>{item.model}</h4>
                <p>{item.category}</p>
                <p>{item.year}</p>
                <p>{item.quantity} in stock</p>
                <p>{item.price}</p>
                <p>{item.description}</p>

                {/* Delete Button */}
                <Button
                  sx={{
                    backgroundColor: "#ff3b4b",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#d9303a",
                    },
                  }}
                  onClick={() => {
                    handleDeleteCar(item._id);
                  }}
                >
                  Delete
                </Button>
              </Box>
            </Box>
          </Grid2>
        ))}
    </Box>
  );
};

export default DeleteCar;
