import { Box, Button } from "@mui/material";
import {
  TUser,
  useMyAccountQuery,
  useUpdateMyAccountMutation,
} from "../../redux/features/user/accountManagementApi";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useForm } from "react-hook-form";
import { RotatingLines } from "react-loader-spinner";
import "./user.css";
import { useEffect } from "react";
import { toast } from "sonner";

const EditProfile = () => {
  const user = useAppSelector(selectCurrentUser) as TUser;
  const { data: myData, isSuccess } = useMyAccountQuery(user.email);
  console.log(myData);
  const formData = myData?.data;
  const [updateUser, { isLoading, error }] = useUpdateMyAccountMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ name: string; address: string }>({
    defaultValues: myData?.data,
  });
  useEffect(() => {
    if (myData?.data) {
      reset({
        name: formData?.name || "",
        address: formData?.address || "",
      });
    }
  }, [isSuccess, reset]);
  const onSubmit = async (data: { name: string; address: string }) => {
    const toastId = toast.loading("Data updating...");
    if (data.name === "") {
      data.name = formData.name;
    }
    if (data.address === "") {
      data.address = formData?.address;
    }
    try {
      const newData = { email: formData?.email, data };
      const result = await updateUser(newData);
      console.log(result);
      const updatedData = result?.data;
      if (updatedData) {
        toast.success("user data updated", { id: toastId });
        toast.dismiss(toastId);
      } else {
        toast.error(error?.data?.message || "updating faild");
      }
    } catch (error: any) {
      toast.error(error?.message || `login Faild ! ${error?.message}`, {
        id: toastId,
      });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "whitesmoke",
          boxShadow: "0px 0px 5px 1px lightgray",
          borderRadius: "10px",
          marginTop: "50px",

          padding: "50px 100px 50px 100px ",
        }}
      >
        <h4>Edit Profile</h4>
        <Box>
          <form
            className="update-profile-form"
            onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))}
          >
            <label
              className={`change-password-label ${
                errors?.name ? "update-profile-input-error" : ""
              }`}
            >
              {errors?.name ? `${errors?.name.message}` : "Edit Name"}
            </label>
            <br />
            <input
              className={`input-field ${errors.name ? "error" : ""}`}
              {...register("name")}
              placeholder={errors?.name ? errors?.name?.message : "Name"}
            />
            <br />
            <label
              className={`change-password-label ${
                errors?.address ? "update-profile-input-error" : ""
              }`}
            >
              {errors?.address ? `${errors?.address.message}` : "Edit address"}
            </label>
            <br />
            <input
              className={`input-field ${errors.address ? "error" : ""}`}
              {...register("address")}
              placeholder={
                errors?.address ? errors?.address?.message : "Address"
              }
            />
            <br />
            <Button
              sx={{
                color: "whitesmoke",
                border: "2px solid white",
                marginTop: "10px",
                marginLeft: "25%",
                marginRight: "25%",
                paddingLeft: "30px",
                paddingRight: "30px",
                backgroundColor: "rgba(0,0,0,0.6)",
                ":hover": {
                  backgroundColor: "#ff3b4b",
                },
              }}
              disabled={!user ? true : false}
              type="submit"
              className="submit-button"
            >
              {isLoading ? (
                <RotatingLines
                  width="20"
                  strokeWidth="2"
                  strokeColor="white"
                  animationDuration="0.75"
                />
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default EditProfile;
