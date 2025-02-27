import { Box, Button } from "@mui/material";
import {
  TUser,
  useChangeAccountPasswordMutation,
  useMyAccountQuery,
} from "../../redux/features/user/accountManagementApi";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useForm } from "react-hook-form";
import { RotatingLines } from "react-loader-spinner";
import "./user.css";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { userDataValidation } from "../../pages/auth/authDataValidation";
import { TChangePassword } from "./types";

const ChangePassword = () => {
  const user = useAppSelector(selectCurrentUser) as TUser;

  const { data: myData } = useMyAccountQuery(user.email);
  // console.log(myData);
  const currentUser = myData?.data;

  const [changeAccountPassword, { isLoading }] =
    useChangeAccountPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TChangePassword>({
    resolver: zodResolver(userDataValidation.passwordValidationSchema),
  });

  const onSubmit = async (password: TChangePassword) => {
    const toastId = toast.loading("password changing...");
    console.log(password);
    try {
      const result = await changeAccountPassword({
        email: currentUser?.email as string,
        data: {
          oldPassword: password.oldPassword,
          newPassword: password.newPassword,
        },
      });
      console.log(result);
      const newData = result?.data?.data;
      if (newData) {
        toast.success("Password updated", { id: toastId });
      } else {
        toast.error(
          (result?.error as any)?.data?.message || "Password changeing faild!",
          { id: toastId }
        );
      }
    } catch (error: any) {
      toast.error(error?.message || ` ${error?.message}`, {
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
        <h4>Change password</h4>
        <form
          className="update-profile-form"
          onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))}
        >
          <label
            className={`change-password-label ${
              errors?.oldPassword ? "update-profile-input-error" : ""
            }`}
          >
            {errors?.oldPassword
              ? `${errors?.oldPassword.message}`
              : "Enter old password"}
          </label>
          <br />
          <input
            className={`update-profile-input ${
              errors.oldPassword ? "error" : ""
            }`}
            {...register("oldPassword")}
            placeholder="Current Password"
            required
          />

          <br />
          <label
            className={`change-password-label ${
              errors?.newPassword ? "update-profile-input-error" : ""
            }`}
          >
            {errors?.newPassword
              ? `${errors?.newPassword.message}`
              : "Enter new password"}
          </label>
          <br />
          <input
            className={`update-profile-input ${
              errors?.newPassword ? "error" : ""
            }`}
            {...register("newPassword")}
            placeholder={"Mew Password"}
            required
          />
          <br />
          <label
            className={`change-password-label ${
              errors?.confirmPassword ? "update-profile-input-error" : ""
            }`}
          >
            {errors?.confirmPassword
              ? `${errors?.confirmPassword.message}`
              : "Enter confirm password"}
          </label>
          <br />
          <input
            className={`update-profile-input ${
              errors?.confirmPassword ? "error" : ""
            }`}
            {...register("confirmPassword")}
            placeholder={"Confirm Password"}
            required
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
            disabled={isLoading}
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
  );
};

export default ChangePassword;
