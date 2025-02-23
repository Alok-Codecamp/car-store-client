import Button from "@mui/joy/Button";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";

import "./Login.css";
import NavBar from "../../components/navBar/NavBar";
import { Box } from "@mui/material";
import banner from "../../assets/carousel/carousel2.jpg";
import { RotatingLines } from "react-loader-spinner";

import { zodResolver } from "@hookform/resolvers/zod";
import { userDataValidation } from "./authDataValidation";
import { ArrowBack, Visibility, VisibilityOff } from "@mui/icons-material";
import { useResetPasswordMutation } from "../../redux/features/auth/authApi";
import { useState } from "react";

const ResetPassword = () => {
  const [inputError, setInputError] = useState<Record<string, unknown>>({});
  const [resetPasswordData, setResetPasswordData] = useState<string>("");
  const [resetPasswordError, setResetPasswordError] = useState<string>("");

  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ newPassword: string; confirmPassword: string }>({
    resolver: zodResolver(userDataValidation.resetPasswordValidationSchema),
  });
  const location = useLocation();
  const splitedLocation = location.search.split(/[&|=]/);

  const email = splitedLocation[1];
  const token = splitedLocation[3];

  // console.log(email, token);

  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    const newData = {
      ...formData,
      email,
      token,
    };
    // console.log(newData);
    const res = await resetPassword(newData);
    const errorMessage =
      (res?.error && (res.error as any)?.data?.message) ||
      "somethin went wrong";
    if (res.data) {
      setResetPasswordData(res?.data?.message);
    }
    if (res?.error) {
      setResetPasswordError(errorMessage);
    }

    reset();
  };
  console.log(resetPasswordError);
  console.log(resetPasswordData);
  return (
    <>
      <NavBar />
      <Box
        sx={{
          backgroundImage: `url(${banner})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          height: "100vh",
          paddingTop: "100px",
        }}
      >
        <Box
          className="form-container"
          sx={{
            backgroundColor: "rgba(0,0,0,0.7)",
            margin: "auto",
            width: "300px",
            borderRadius: "16px",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              marginTop: "30px",
            }}
          >
            <Link style={{ color: "white" }} to="/login">
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ArrowBack />
                Back to Login
              </span>{" "}
            </Link>
            <h5 style={{ color: "white" }}>
              {!resetPasswordData && !resetPasswordError ? (
                "Reset password"
              ) : resetPasswordData ? (
                <>
                  {resetPasswordData}{" "}
                  <Link to="/login">Please click here to log in!</Link>
                </>
              ) : resetPasswordError === "jwt expired" ? (
                <Link to="/forget-password">
                  Reset password link expired! Forgot again? Click here.
                </Link>
              ) : (
                resetPasswordError
              )}
            </h5>

            <h3 className="error-text">
              {inputError?.confirmPassword
                ? (inputError?.confirmPassword as any)?.message
                : (inputError?.newPassword as any)?.message}
            </h3>
            <form
              className="login-form"
              onSubmit={handleSubmit(onSubmit, (error) => setInputError(error))}
            >
              <input
                className={`input-field ${errors.newPassword ? "error" : ""}`}
                {...register("newPassword")}
                type={`${showNewPassword ? "text" : "password"}`}
                placeholder={
                  errors?.newPassword
                    ? errors?.newPassword?.message
                    : "New Password"
                }
              />
              <button
                style={{
                  cursor: "pointer",
                  border: "none",
                  background: "none",
                  position: "relative",
                  bottom: "38px",
                  left: "90px",
                }}
                type="button"
                onClick={() => {
                  setShowNewPassword(!showNewPassword);
                }}
              >
                {showNewPassword ? (
                  <Visibility sx={{ color: "white" }} />
                ) : (
                  <VisibilityOff sx={{ color: "white" }} />
                )}
              </button>
              <input
                className={`input-field ${
                  errors?.confirmPassword ? "error" : ""
                }`}
                {...register("confirmPassword")}
                type={`${showConfirmPassword ? "text" : "password"}`}
                placeholder={
                  errors?.confirmPassword
                    ? errors?.confirmPassword?.message
                    : "Confirm Password"
                }
              />
              <button
                style={{
                  cursor: "pointer",
                  border: "none",
                  background: "none",
                  position: "relative",
                  bottom: "38px",
                  left: "90px",
                }}
                type="button"
                onClick={() => {
                  setShowConfirmPassword(!showConfirmPassword);
                }}
              >
                {showConfirmPassword ? (
                  <Visibility sx={{ color: "white" }} />
                ) : (
                  <VisibilityOff sx={{ color: "white" }} />
                )}
              </button>
              <br />
              <Button
                sx={{
                  color: "whitesmoke",
                  border: "2px solid white",
                  paddingLeft: "30px",
                  paddingRight: "30px",
                  marginBottom: "20px",
                  backgroundColor: "rgba(0,0,0,0.6)",
                  ":hover": {
                    backgroundColor: "#ff3b4b",
                  },
                }}
                type="submit"
                className="submit-button"
                disabled={
                  resetPasswordData === "password reset successfully"
                    ? true
                    : false
                }
              >
                {isLoading ? (
                  <RotatingLines
                    width="20"
                    strokeWidth="2"
                    strokeColor="white"
                    animationDuration="0.75"
                  />
                ) : (
                  "Reset Password"
                )}
              </Button>
            </form>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ResetPassword;
