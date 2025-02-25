import {
  Grid2,
  Box,
  Button,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Stack,
  Pagination,
} from "@mui/material";

import {
  useDeleteCarMutation,
  useGetCarsQuery,
} from "../../../redux/features/admin/carManagement/carManagementApi";
import { ICars } from "../../../types/carInterface";
import { toast } from "sonner";
import { useState } from "react";

const DeleteCar = () => {
  const [page, setPage] = useState(1);
  const { data: cars, refetch } = useGetCarsQuery([
    { name: "page", value: page },
  ]);
  const [deleteCar] = useDeleteCarMutation();
  // console.log(cars);
  const handleDeleteCar = async (id: string) => {
    const toastId = toast.loading("car deleting...");
    console.log(id);
    // try {
    const result = await deleteCar(id).unwrap();
    console.log(result);

    if (result.success) {
      refetch();
      toast.success("car deleted successfully", { id: toastId });
    } else {
      toast.error(result.message as string, { id: toastId });
    }
  };
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    console.log(event.target);
  };
  return (
    <Box
      sx={{
        padding: "50px",
      }}
    >
      <Typography textAlign="center" mb={4} fontWeight={600} fontSize={20}>
        Delete Unnecessary car Data
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
                      handleDeleteCar(item._id);
                    }}
                    size="small"
                    sx={{
                      color: "black",
                      ":hover": { backgroundColor: "#ff3b4b", color: "white" },
                      fontSize: "12px",
                      marginRight: "auto",
                    }}
                  >
                    Delete Car
                  </Button>
                </CardActions>
              </Card>
            </Grid2>
          ))}
      </Grid2>
      <Stack spacing={2} mt={6} ml="auto" width="fit-content">
        <Pagination
          count={10}
          variant="outlined"
          shape="rounded"
          page={page} // Set the current page
          onChange={handlePageChange} // Handle page change
        />
      </Stack>
    </Box>
  );
};

export default DeleteCar;
