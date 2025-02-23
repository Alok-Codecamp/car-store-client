import { useForm } from "react-hook-form";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, mt: 5 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Contact Us
        </Typography>
        <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Name"
            {...register("name", { required: "Name is required" })}
            error={!!errors.name}
            helperText={
              typeof errors.name?.message === "string"
                ? errors.name.message
                : ""
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            {...register("email", {
              required: "Valid email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            error={!!errors.email}
            helperText={
              typeof errors.email?.message === "string"
                ? errors.email.message
                : ""
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="Message"
            multiline
            rows={4}
            {...register("message", { required: "Message cannot be empty" })}
            error={!!errors.message}
            helperText={
              typeof errors.message?.message === "string"
                ? errors.message.message
                : ""
            }
            margin="normal"
          />
          <Box textAlign="center" mt={2}>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default ContactPage;
