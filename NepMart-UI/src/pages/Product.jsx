import { Box, Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import ProductFilter from "../components/ProductFilter";
import BuyerProduct from "./BuyerProduct";
import SellerProduct from "./SellerProduct";
import { useDispatch } from "react-redux";
import { resetFilter, setSearchText } from "../store/slices/productSlice";

const Product = () => {
  const role = localStorage.getItem("userRole");

  const dispatch = useDispatch();

  return (
    <Box sx={{ width: "100%", minHeight: "70vh" }}>
      <Grid
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "row",
          },

          justifyContent: "flex-end",
          marginTop: "2rem",

          alignItems: "center",
          gap: "2rem",
        }}
      >
        {role === "buyer" && (
          <>
            <Button
              variant="contained"
              onClick={() => dispatch(resetFilter())}
              sx={{ width: { xs: "100%", sm: "15%" } }}
            >
              Clear Filter
            </Button>
            <ProductFilter />
          </>
        )}

        <TextField
          sx={{
            width: {
              xs: "100%",
              sm: "30%",
            },
          }}
          placeholder="Search"
          onChange={(event) => dispatch(setSearchText(event.target.value))}
          // TODO:place icon here
          // startAdornment={
          //   <InputAdornment position="start">
          //     <AiOutlineSearch size="1rem" />
          //   </InputAdornment>
          // }
        />
      </Grid>

      {role === "seller" ? <SellerProduct /> : <BuyerProduct />}
    </Box>
  );
};

export default Product;
