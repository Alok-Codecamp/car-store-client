import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import "./Login.css";
import NavBar from "../../components/navBar/NavBar";
import { Box, Button, FormControl, FormHelperText, OutlinedInput, Typography } from "@mui/material";
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
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();
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
          px: 2,
          pt: 22

        }}
      >
        <Box

          sx={{
            backgroundColor: "rgba(0,0,0,0.9)",
            margin: "auto",
            width: "fit-content",
            borderRadius: "16px",
            textAlign: "center",
            px: 2,
            py: 6
          }}
        >
          <Box
            sx={{
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
                <Typography sx={{ mx: 1 }}>Back to Login</Typography>
              </span>{" "}
            </Link>
            <h4 style={{ color: "white" }}>Forgot your password?</h4>
            {Object.keys(forgetPasswordResponse).length > 0 ? (
              <p style={{ color: "white" }}>
                {(forgetPasswordResponse?.data as any)?.message ||
                  (forgetPasswordResponse?.error as any)?.data?.message}
              </p>
            ) : (
              <p style={{ color: "white", }}>
                Please enter the account for which you want to reset the
                password.
              </p>
            )}

            {/* <h3 className="error-text">{error ? error?.data?.message : " "}</h3> */}
            <form
              className=""
              onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))}
            >
              <FormControl sx={{
                width: { xs: '30ch', md: '40ch', }

              }}>
                <OutlinedInput sx={{
                  height: 40,
                  color: 'white',
                  '& input:-webkit-autofill': {
                    WebkitBoxShadow: '0 0 0 1000px #121212 inset', // match your input bg
                    WebkitTextFillColor: 'white', // match your text color
                    transition: 'background-color 5000s ease-in-out 0s',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#FF3B4B', // default border color
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#FF3B4B', // hover border
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#FF3B4B', // focus border
                    borderWidth: '2px',
                  },
                }}  {...register('email')} placeholder="Email"
                />
                <FormHelperText sx={{ color: '#FF3B4B', fontSize: '16px' }}>
                  {errors.email?.message as string}
                </FormHelperText>
              </FormControl>

              <br />

              <Button
                sx={{
                  color: "whitesmoke",
                  border: "1px solid #FF3B4B",
                  marginTop: "10px",
                  paddingLeft: "30px",
                  paddingRight: "30px",
                  backgroundColor: "rgba(0,0,0,0.6)",
                  ":hover": {
                    backgroundColor: "#FF3B4B",
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
