import { useState } from "react";
import Button from "@mui/joy/Button";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { verifyToken } from "../../utils/verifyToken";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  selectCurrentUser,
  setUser,
} from "../../redux/features/auth/authSlice";
import "./Login.css";
import NavBar from "../../components/navBar/NavBar";
import { Box } from "@mui/material";
import banner from "../../assets/carousel/carousel2.jpg";
import { RotatingLines } from "react-loader-spinner";
import { TDecoded } from "../../types/userType";
import { zodResolver } from "@hookform/resolvers/zod";
import { userDataValidation } from "./authDataValidation";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [login, { error, isLoading }] = useLoginMutation();
  const errorMessage =
    (error && (error as any)?.data?.message) || "somethin went wrong";
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  console.log(user);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string; password: string }>({
    resolver: zodResolver(userDataValidation.loginDataValidationSchema),
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log("data", data);
    const toastId = toast.loading("loging in...");
    const userInfo = {
      email: data?.email,
      password: data?.password,
    };

    try {
      const token = await login(userInfo).unwrap();
      console.log(token.data);
      // verify user token
      const verifyUser = verifyToken(token.data) as TDecoded;
      // set user to local storage
      if (verifyUser) {
        dispatch(setUser({ user: verifyUser, token: token.data }));
      }
      // toast for succesfull login
      toast.success("Login successfully", { id: toastId });
      // redirect after login
      navigate("/home");
    } catch (error: any) {
      toast.error(error?.message || `login Faild ! ${error?.message}`, {
        id: toastId,
      });
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
            }}
          >
            <h2
              style={{
                margin: "0px",
                color: "white",
                fontWeight: "500",
              }}
            >
              {user ? "You are logged in" : "Welcome Back"}
            </h2>

            <Link
              to="/register"
              style={{
                fontSize: "14px",
                color: "white",
                margin: "0px",
              }}
            >
              New user? Click for Register
            </Link>
            <h3 className="error-text">{error ? errorMessage : " "}</h3>
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
              <input
                className={`input-field ${errors.password ? "error" : ""}`}
                {...register("password")}
                type={`${showPassword ? "text" : "password"}`}
                placeholder={
                  errors.password ? errors?.password?.message : "Password"
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
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? (
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
                disabled={user ? true : false}
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
                  "Login"
                )}
              </Button>
            </form>
            <Link style={{ color: "white" }} to="/forget-password">
              Forget Password?
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Login;
