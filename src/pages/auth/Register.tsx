import { useState } from "react";
import Button from "@mui/joy/Button";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import "./Login.css";
import NavBar from "../../components/navBar/NavBar";
import { Box } from "@mui/material";
import banner from "../../assets/carousel/carousel2.jpg";
import { useRegisterUserMutation } from "../../redux/features/admin/userManagement/userManagementApi";
import { RotatingLines } from "react-loader-spinner";
import {
  selectCurrentUser,
  setUser,
} from "../../redux/features/auth/authSlice";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { verifyToken } from "../../utils/verifyToken";
import { zodResolver } from "@hookform/resolvers/zod";
import { userDataValidation } from "./authDataValidation";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  const [registerUser, { data, error, isLoading }] = useRegisterUserMutation();

  console.log(data, error);

  const [login] = useLoginMutation();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ name: string; email: string; password: string }>({
    resolver: zodResolver(userDataValidation.registerDataValidationSchema),
  });

  //form submit handler function
  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    console.log("data", data);
    const toastId = toast.loading("register user...");
    try {
      const result = await registerUser(formData);
      const savedData = result?.data?.data?.data;
      if (savedData) {
        const userInfo = {
          email: formData.email,
          password: formData.password,
        };
        const token = await login(userInfo).unwrap();
        const verifyUser = verifyToken(token.data.data);
        console.log(verifyUser, token);
        dispatch(setUser({ user: verifyUser, token: token.data.data }));
        toast.success("registration successfully", { id: toastId });
        navigate("/home");
      } else {
        toast.error(error?.data?.message, {
          id: toastId,
        });
      }

      // dispatch(setUser())
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
            backgroundColor: "rgba(0,0,0,0.6)",
            margin: "auto",
            width: "fit-content",
            borderRadius: "16px",
            padding: "20px",
            height: { lg: "400px", md: "400px", sm: "360px", xs: "360px" },
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
              {user ? "You are logged in" : "Welcome"}
            </h2>

            <Link
              to="/login"
              style={{
                fontSize: "14px",
                color: "white",
                margin: "0px",
              }}
            >
              have an account? Please login!
            </Link>
            <h3 className="error-text">{error ? error?.data?.message : " "}</h3>
            <form
              className="login-form"
              onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))}
            >
              <input
                className={`input-field ${errors.name ? "error" : ""}`}
                {...register("name")}
                placeholder={errors?.name ? errors?.name?.message : "Name"}
              />
              <br />
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
                  marginTop: "10px",
                  paddingLeft: "30px",
                  paddingRight: "30px",
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
                  "Register"
                )}
              </Button>
            </form>
          </Box>
        </Box>
        <Toaster />
      </Box>
    </>
  );
};

export default Register;
