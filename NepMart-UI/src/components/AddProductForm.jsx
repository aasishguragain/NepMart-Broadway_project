import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import { Formik } from "formik";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { addProductBySeller } from "../lib/apis/product.apis";
import {
  openErrorSnackbar,
  openSuccessSnackbar,
} from "../store/slices/snackbarSlice";
import Loader from "./Loader";
import axios from "axios";

const productCategories = [
  "grocery",
  "kitchen",
  "clothing",
  "electronics",
  "furniture",
  "cosmetics",
  "bakery",
  "liquor",
];

const AddProductForm = () => {
  const [localURL, setLocalURL] = useState(null);
  const navigate = useNavigate();
  const [productImage, setProductImage] = useState(null);

  const dispatch = useDispatch();
  const addProductMutation = useMutation({
    mutationKey: ["add-product"],
    mutationFn: (values) => addProductBySeller(values),
    onSuccess: (res) => {
      navigate("/products");
      dispatch(openSuccessSnackbar(res?.data?.message));
    },
    onError: (error) => {
      dispatch(
        openErrorSnackbar(
          error?.response?.data?.message || "Something went wrong."
        )
      );
    },
  });

  if (addProductMutation.isLoading) {
    return <Loader />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",

        width: "100%",
      }}
    >
      <Button
        variant="contained"
        sx={{
          padding: "8px",
          fontSize: "1rem",
          marginTop: "2rem",
          width: "30%",
        }}
        onClick={() => navigate("/products")}
      >
        Back to product page
      </Button>
      <Box
        sx={{
          margin: "5rem",
          width: "400px",

          padding: "10px",
          borderRadius: "10px",
          boxShadow:
            "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px",
        }}
      >
        <Formik
          initialValues={{
            name: "",
            company: "",
            price: 0,
            freeShipping: false,
            quantity: 0,
            category: "",
            description: "",
          }}
          validationSchema={Yup.object({
            name: Yup.string()
              .min(2, "Name must be at least 2 characters.")
              .max(55, "Name must be at most 55 characters.")
              .trim()
              .required("Product name is required."),
            company: Yup.string()
              .min(2, "Company name must be at least 2 characters.")
              .max(55, "Company name must be at most 55 characters.")
              .trim()
              .required("Company is required."),
            price: Yup.number()
              .min(0, "Price cannot be less than or equals to 0.")
              .required("Price is required."),
            freeShipping: Yup.boolean().required("Free shipping is required."),
            quantity: Yup.number()
              .min(1, "Quantity must be at least 1.")
              .required("Quantity is required")
              .integer(),
            category: Yup.string()
              .trim()
              .required("Category is required.")
              .oneOf(productCategories),
            description: Yup.string()
              .min(20, "Description must be at least 20 characters.")
              .max(1000, "Description must be at most 1000 characters.")
              .required("Description is required."),
          })}
          onSubmit={async (values) => {
            let imageUrl = "";
            if (productImage) {
              const cloudName = "dlkcko4n6";
              // creates form data object
              const data = new FormData();
              data.append("file", productImage);
              data.append("upload_preset", "nepal-mart");
              data.append("cloud_name", cloudName);

              try {
                const res = await axios.post(
                  `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                  data
                );

                imageUrl = res.data.secure_url;
              } catch (error) {
                dispatch(openErrorSnackbar("Image upload failed."));
              }
            }

            values.imageUrl = imageUrl;
            addProductMutation.mutate(values);
          }}
        >
          {({ handleSubmit, getFieldProps, errors, touched, values }) => (
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "1rem",
                padding: "2rem",
                minWidth: "350px",
              }}
            >
              {localURL && (
                <img
                  src={localURL}
                  style={{ width: "100%", minHeight: 200, objectFit: "cover" }}
                />
              )}
              <Stack direction="row" alignItems="center" spacing={2}>
                <Button variant="outlined" component="label">
                  Upload image
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={(event) => {
                      const productImage = event.target.files[0];
                      setLocalURL(URL.createObjectURL(productImage));
                      setProductImage(productImage);
                    }}
                  />
                </Button>
              </Stack>

              <TextField
                sx={{ width: "100%" }}
                name="name"
                label="Product name"
                {...getFieldProps("name")}
              />
              {touched.name && errors.name ? (
                <div className="error-message">{errors.name}</div>
              ) : null}

              <TextField
                sx={{ width: "100%" }}
                name="company"
                label="Company"
                {...getFieldProps("company")}
              />
              {touched.company && errors.company ? (
                <div className="error-message">{errors.company}</div>
              ) : null}

              <TextField
                sx={{ width: "100%" }}
                name="price"
                label="Price"
                {...getFieldProps("price")}
                type="number"
              />
              {touched.price && errors.price ? (
                <div className="error-message">{errors.price}</div>
              ) : null}

              <TextField
                sx={{ width: "100%" }}
                name="quantity"
                label="Quantity"
                {...getFieldProps("quantity")}
                type="number"
              />
              {touched.quantity && errors.quantity ? (
                <div className="error-message">{errors.quantity}</div>
              ) : null}

              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  label="Category"
                  {...getFieldProps("category")}
                >
                  {productCategories.map((item, index) => {
                    return (
                      <MenuItem value={item} key={index}>
                        {item}
                      </MenuItem>
                    );
                  })}
                </Select>
                {touched.category && errors.category ? (
                  <div className="error-message">{errors.category}</div>
                ) : null}
              </FormControl>

              <Grid
                item
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <InputLabel>Free shipping</InputLabel>
                <Checkbox
                  sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                  label="Free shipping"
                  name="freeShipping"
                  {...getFieldProps("freeShipping")}
                />
              </Grid>
              <Grid
                item
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <TextareaAutosize
                  placeholder="Product description here"
                  minRows={10}
                  className="product-description"
                  {...getFieldProps("description")}
                />
              </Grid>
              {touched.description && errors.description ? (
                <div className="error-message">{errors.description}</div>
              ) : null}

              <Button
                type="submit"
                variant="contained"
                sx={{ width: "100%", padding: "7px" }}
              >
                Submit
              </Button>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default AddProductForm;
