import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Inputs = {
  fullName: string;
  email: string;
  message: string;
};

function Contact() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const contactForm: SubmitHandler<Inputs> = async (values) => {
    try {
      toast.success("message sent successfully!!");
      reset();
    } catch (error) {
      toast.error("server error!!");
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ margin: "4rem auto", paddingBottom: "7rem" }}
    >
      <Card
        onSubmit={handleSubmit(contactForm)}
        component={"form"}
        variant="elevation"
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          p: "3rem 2rem",
          gap: "1rem",
        }}
      >
        <Typography
          variant="h4"
          textAlign={"center"}
          sx={{ marginBottom: "1rem" }}
          component="h2"
        >
          Contact Us
        </Typography>
        <TextField
          id="outlined-multiline-flexible"
          label="Full Name"
          maxRows={4}
          fullWidth
          {...register("fullName", {
            required: {
              value: true,
              message: "FullName is required",
            },
          })}
        />
        {errors.fullName && (
          <Typography variant="caption" color={red[700]}>
            {errors.fullName?.message}
          </Typography>
        )}

        <TextField
          id="outlined-multiline-flexible"
          label="Email"
          maxRows={4}
          fullWidth
          {...register("email", {
            required: {
              value: true,
              message: "Email is required",
            },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "invalid email address",
            },
          })}
        />
        {errors.email && (
          <Typography variant="caption" color={red[700]}>
            {errors.email?.message}
          </Typography>
        )}
        <TextField
          id="outlined-multiline-flexible"
          label="Message"
          multiline
          maxRows={4}
          minRows={3}
          fullWidth
          {...register("message", {
            required: {
              value: true,
              message: "Message is required",
            },
          })}
        />
        {errors.message && (
          <Typography variant="caption" color={red[700]}>
            {errors.message?.message}
          </Typography>
        )}

        <Button type="submit" variant="contained" sx={{ marginTop: "1rem" }}>
          Submit
        </Button>
      </Card>
    </Container>
  );
}

export default Contact;
