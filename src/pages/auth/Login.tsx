import { useState } from "react";
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
import { Box, Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from "@mui/material";
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

  // navigation hook
  const navigate = useNavigate();

  // react hook form
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<{ email: string; password: string }>({
    resolver: zodResolver(userDataValidation.loginDataValidationSchema),
  });
  // auto login by cridentials buttons
  const handleAutoLogin = async (email: string, password: string) => {
    setValue('email', email),
      setValue('password', password);
    const isValid = await trigger();
    if (isValid) {
      handleSubmit(onSubmit)();
    }
  }
  // form submit handler
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
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
          py: { xs: 10, md: 20 },
          px: 1
        }}
      >
        <Box
          className="form-container"
          sx={{
            backgroundColor: "rgba(0,0,0,0.8)",
            margin: "auto",
            width: "fit-content",
            borderRadius: "8px",
            textAlign: "center",
            px: 2,
            py: 4,
            display: 'flex',
            alignItems: 'flex-start'
          }}
        >
          {/* <Box sx={{ color: "white" }}>
            hello
          </Box> */}
          <Box
            sx={{

            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: "white",
                fontWeight: 'bold'
              }}
            >
              {user ? "You are logged in" : "Welcome Back"}
            </Typography>

            <Link
              to="/register"
              style={{
                fontSize: "14px",
                color: "white",
              }}
            >
              New user? Click for Register
            </Link>
            <Typography sx={{ color: "white", fontSize: '14px', width: { md: '43ch', }, textAlign: { xs: 'center', md: 'left' }, my: 0.5, mx: 1 }} >
              Test credentials are available. Click a button below to autofill the login form.
            </Typography>
            <Box sx={{ my: 1 }}>
              {/* admin credentials */}
              <Button
                onClick={() => handleAutoLogin('alokdas1dd@gmail.com', '123456')}
                variant="outlined" sx={{

                  color: "whitesmoke",
                  border: "2px solid #FF3B4B",
                  marginBottom: "10px",
                  mx: 1,
                  backgroundColor: "rgba(0,0,0,0.6)",
                  ":hover": {
                    backgroundColor: "#ff3b4b",
                  },

                }}>Admin Credentials</Button>

              <Button
                onClick={() => handleAutoLogin('alok61.bd@gmail.com', '123456')}
                variant="outlined" sx={{
                  color: "whitesmoke",
                  border: "2px solid #FF3B4B",
                  marginBottom: "10px",
                  mx: 1,
                  backgroundColor: "rgba(0,0,0,0.6)",
                  ":hover": {
                    backgroundColor: "#ff3b4b",
                  },

                }}>user Credentials</Button>
            </Box>
            <h3 className="error-text">{error ? errorMessage : " "}</h3>
            <form
              onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))}
            >
              <InputLabel sx={{ color: 'white', textAlign: 'left', mx: 1 }} htmlFor="email">Email</InputLabel>
              <FormControl sx={{
                width: { xs: '35ch', md: '43ch', }

              }}>

                <OutlinedInput
                  id="email"
                  sx={{
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
                  {errors.password?.message as string}
                </FormHelperText>
              </FormControl>
              <br />
              <InputLabel sx={{ color: 'white', textAlign: 'left', mx: 1, mt: 2 }} htmlFor="password">Password</InputLabel>
              <FormControl sx={{
                width: { xs: '35ch', md: '43ch', }

              }}>

                <OutlinedInput
                  id="password"
                  sx={{
                    height: 40,

                    color: 'white',
                    '& input:-webkit-autofill': {
                      WebkitBoxShadow: '0 0 0 1000px #121212 inset',
                      WebkitTextFillColor: "white",
                      transition: 'background-color 5000s ease-in-out 0s'
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
                  }}  {...register('password')} placeholder="Password"
                  type={`${showPassword ? "text" : "password"}`}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton type="button" onClick={() => {
                        setShowPassword(!showPassword);
                      }} edge="end" sx={{ color: '#FF3B4B' }}>
                        {showPassword ? (
                          <Visibility sx={{ color: "white" }} />
                        ) : (
                          <VisibilityOff sx={{ color: "white" }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText sx={{ color: '#FF3B4B', fontSize: '16px' }}>
                  {errors.password?.message as string}
                </FormHelperText>
              </FormControl>
              <br />

              <Button
                variant="outlined"
                sx={{
                  color: "whitesmoke",
                  border: "2px solid #FF3B4B",
                  my: 3,
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
      </Box >
    </>
  );
};

export default Login;
