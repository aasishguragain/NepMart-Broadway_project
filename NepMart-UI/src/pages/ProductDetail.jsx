import {
  Box,
  Button,
  Chip,
  Grid,
  Stack,
  Typography,
  circularProgressClasses,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { $axios } from "../lib/axios";
import Loader from "../components/Loader";
import { GrAdd } from "react-icons/gr";
import { AiOutlineMinus } from "react-icons/ai";
import { useMutation, useQueryClient } from "react-query";
import { addItemToCart } from "../lib/apis/cart.api";
import { useDispatch } from "react-redux";
import {
  openErrorSnackbar,
  openSuccessSnackbar,
} from "../store/slices/snackbarSlice";
import { placeHolderImage } from "../constants/general.constant";

const ProductDetail = () => {
  const userRole = localStorage.getItem("userRole");
  const [productDetail, setProductDetail] = useState({});
  const [counter, setCounter] = useState(1);
  const dispatch = useDispatch();

  const loggedInUserId = localStorage.getItem("userId");

  const isOwnerOfProduct = loggedInUserId === productDetail?.sellerId;
  console.log({ isOwnerOfProduct });
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  //   extract id
  const params = useParams();

  const productId = params.id;

  const addItemToCartMutation = useMutation({
    mutationKey: ["add-item-to-cart"],
    mutationFn: () => addItemToCart({ productId, quantity: counter }),
    onSuccess: (res) => {
      queryClient.invalidateQueries("cart-item-count");
      dispatch(
        openSuccessSnackbar(res?.data?.message || "Item added to cart.")
      );
    },
    onError: (error) => {
      dispatch(
        openErrorSnackbar(
          error?.response?.data?.message || "Item cannot be added to cart."
        )
      );
    },
  });

  const getProductDetails = async () => {
    try {
      setLoading(true);
      const response = await $axios.get(`/product/details/${productId}`);

      setProductDetail(response.data);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        borderRadius: "10px",
        padding: "2rem",
        minWidth: "70%",

        // height: "600px",
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        gap: "5px",
        margin: "2rem",
      }}
    >
      <Grid container>
        <img
          style={{ height: 400, width: 500, objectFit: "contain" }}
          alt={productDetail?.name}
          src={productDetail?.imageUrl || placeHolderImage}
        />
      </Grid>
      <Grid
        container
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",

          padding: "2rem",
          fontSize: "1 rem",
        }}
      >
        <Grid item>
          <Typography variant="h6">
            {" "}
            <strong>Name:</strong> {productDetail.name}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6">
            <strong>Brand:</strong> {productDetail.company}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6">
            <strong>Price:</strong> Rs.{productDetail.price}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6">
            <strong>Description:</strong>
            {productDetail.description}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6">
            <strong>Free Shipping:</strong>{" "}
            {productDetail.freeShipping === true ? "Yes" : "No"}
          </Typography>
        </Grid>
        <Grid item>
          <Stack direction="row" spacing={2}>
            <Typography variant="h6">
              <strong>Available Quantity:</strong> {productDetail.quantity}
            </Typography>
            <Chip
              label={productDetail.quantity ? "In stock" : "Out of stock"}
              color={productDetail.quantity ? "success" : "error"}
              variant="outlined"
            />
          </Stack>
        </Grid>
        <Grid item sx={{ textTransform: "capitalize" }}>
          <Typography variant="h6">
            <strong>Category:</strong> {productDetail.category}
          </Typography>
        </Grid>

        {userRole === "buyer" && (
          <>
            <Grid item sx={{ display: "flex", gap: "1rem" }}>
              <Typography variant="h6">Number of items</Typography>

              <Button
                variant="outlined"
                onClick={() => {
                  const newCount = counter - 1;

                  if (newCount <= 0) {
                    setCounter(1);
                  } else {
                    setCounter(newCount);
                  }
                }}
              >
                <AiOutlineMinus size={30} />
              </Button>
              <Typography variant="h3">{counter}</Typography>
              <Button
                variant="outlined"
                onClick={() => {
                  const newCount = counter + 1;
                  if (newCount >= productDetail.quantity) {
                    setCounter(productDetail.quantity);
                  } else {
                    setCounter(newCount);
                  }
                }}
              >
                <GrAdd size={30} />
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                size="large"
                onClick={() => {
                  addItemToCartMutation.mutate();
                }}
              >
                Add to cart
              </Button>
            </Grid>
          </>
        )}

        {userRole === "seller" && isOwnerOfProduct && (
          <Grid item>
            <Button
              variant="outlined"
              onClick={() => {
                navigate(`/products/edit/${productId}`);
              }}
            >
              Edit product
            </Button>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default ProductDetail;
