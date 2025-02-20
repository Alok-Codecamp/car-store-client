import Button from "@mui/joy/Button";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import "./Login.css";
import NavBar from "../../components/navBar/NavBar";
import { Box } from "@mui/material";
import banner from "../../assets/carousel/carousel2.jpg";
import { RotatingLines } from "react-loader-spinner";

import { zodResolver } from "@hookform/resolvers/zod";
import { userDataValidation } from "./authDataValidation";
import { ArrowBack } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useForgetPasswordMutation } from "../../redux/features/auth/authApi";
import { useState } from "react";

const ForgetPassword = () => {
  const [forgetPasswordResponse, setforgetPasswordResponse] = useState<
    Record<string, unknown>
  >({});
  const [forgetPassword, { isLoading, error }] = useForgetPasswordMutation();
  // console.log(error, isLoading);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>({
    resolver: zodResolver(userDataValidation.forgetPasswordValidatonSchema),
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = await forgetPassword(data);
    if (res) {
      setforgetPasswordResponse(res);
    }
  };

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
            width: "fit-content",
            borderRadius: "16px",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              marginTop: "30px",
              textAlign: "left",
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
            <h4 style={{ color: "white" }}>Forgot your password?</h4>
            {forgetPasswordResponse ? (
              <p style={{ color: "white", width: "200px" }}>
                {forgetPasswordResponse?.data?.message ||
                  forgetPasswordResponse?.error?.data?.message}
              </p>
            ) : (
              <p style={{ color: "white", width: "200px" }}>
                Please enter the account for which you want to reset the
                password.
              </p>
            )}

            {/* <h3 className="error-text">{error ? error?.data?.message : " "}</h3> */}
            <form
              className="login-form"
              onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))}
            >
              <input
                className={`input-field ${errors.email ? "error" : ""}`}
                {...register("email")}
                placeholder={errors?.email ? errors?.email?.message : "Email"}
              />

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
                disabled={forgetPasswordResponse.data ? true : false}
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
                  "Forget Password"
                )}
              </Button>
            </form>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ForgetPassword;
