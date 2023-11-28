import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { loginUser } from "../../lib/apis/user.api";
import { useDispatch } from "react-redux";
import {
  openErrorSnackbar,
  openSuccessSnackbar,
} from "../../store/slices/snackbarSlice";

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const dispatch = useDispatch();

  // login mutation
  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: (values) => loginUser(values),
    onSuccess: (res) => {
      localStorage.setItem("accesstoken", res?.data?.access_token);
      localStorage.setItem("userRole", res?.data?.user?.role);
      localStorage.setItem("userName", res?.data?.user?.firstName);
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("userId", res?.data?.user?._id);
      navigate("/home");
      dispatch(openSuccessSnackbar("You are logged in successfully."));
    },
    onError: (error) => {
      dispatch(openErrorSnackbar(error?.response?.data?.message));
    },
  });

  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address.")
              .required("Email is required."),
            password: Yup.string().trim().required("Password is required."),
          })}
          onSubmit={async (values) => {
            loginMutation.mutate(values);
          }}
        >
          {(formik) => (
            <form
              onSubmit={formik.handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                boxShadow:
                  "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset",
                minWidth: "200px",
                // border: "2px solid black",
                borderRadius: "10px",
                margin: "auto",
                padding: "2rem",
                gap: "1rem",
              }}
            >
              <img
                src="/icons/flogo2.png"
                alt=""
                height={100}
                width={200}
                style={{ objectFit: "contain" }}
              />
              <Typography variant="h3" sx={{ color: "grey" }}>
                Login
              </Typography>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                name="email"
                {...formik.getFieldProps("email")}
              />

              {formik.touched.email && formik.errors.email ? (
                <div className="error-message">{formik.errors.email}</div>
              ) : null}

              <FormControl
                fullWidth
                error={Boolean(
                  formik.touched.password && formik.errors.password
                )}
              >
                <InputLabel htmlFor="outlined-adornment-password-register">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password-register"
                  type={showPassword ? "text" : "password"}
                  value={formik.values.password}
                  name="password"
                  label="Password"
                  onBlur={formik.handleBlur}
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        size="large"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  inputProps={{}}
                />

                {formik.touched.password && formik.errors.password ? (
                  <div className="error-message">{formik.errors.password}</div>
                ) : null}
              </FormControl>

              <Button
                variant="contained"
                type="submit"
                disabled={loginMutation.isLoading}
                sx={{ width: "100%" }}
              >
                Login
              </Button>
              <Link to="/register">Don&apos;t have an account?</Link>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Login;
