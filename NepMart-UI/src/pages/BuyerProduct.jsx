import React, { useState } from "react";
import { useQuery } from "react-query";

import { Box, Grid, Pagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NoItemFound from "../components/NoItemFound";
import ProductCard from "../components/ProductCard";
import { getBuyerProducts } from "../lib/apis/product.apis";
import { openErrorSnackbar } from "../store/slices/snackbarSlice";

const BuyerProduct = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { searchText, minPrice, maxPrice, category } = useSelector(
    (state) => state.product
  );

  const { isLoading, error, isError, data } = useQuery({
    queryKey: [
      "buyer-products",
      page,
      searchText,
      minPrice,
      maxPrice,
      category,
    ],
    queryFn: () =>
      getBuyerProducts({
        page,
        limit: 9,
        searchText: searchText || "",
        minPrice: minPrice || 0,
        maxPrice: maxPrice || 0,
        category,
      }),
  });

  const getPaginationData = (event, data) => {
    setPage(data);
  };

  if (isError) {
    dispatch(
      openErrorSnackbar(
        error?.response?.data?.message || "Products cannot be fetched."
      )
    );
  }

  return (
    <Box sx={{ marginTop: "2rem" }}>
      {!isLoading && data?.data?.products?.length === 0 ? (
        <NoItemFound message="No product found" />
      ) : (
        <>
          <Grid>
            <Grid
              container
              sx={{
                display: "flex",
                gap: "2rem",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {data?.data?.products?.map((item) => {
                return <ProductCard {...item} key={item._id} />;
              })}
            </Grid>
            <Grid
              sx={{
                margin: "5rem 5rem 0 0",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Pagination
                page={page}
                count={data?.data?.totalPage}
                color="secondary"
                size="large"
                onChange={getPaginationData}
              />
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default BuyerProduct;
