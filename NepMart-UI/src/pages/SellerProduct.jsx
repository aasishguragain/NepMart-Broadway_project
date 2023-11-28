import { Box, Button, Grid, Pagination } from "@mui/material";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import NoItemFound from "../components/NoItemFound";
import ProductCard from "../components/ProductCard";
import { fetchSellerProducts } from "../lib/apis/product.apis";
import { openErrorSnackbar } from "../store/slices/snackbarSlice";

const SellerProduct = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { searchText } = useSelector((state) => state.product);

  const getPaginationData = (event, data) => {
    setPage(data);
  };

  // query
  const getSellerProductQuery = useQuery({
    queryKey: ["seller-products", { page, searchText: searchText }],
    queryFn: () =>
      fetchSellerProducts({ page, limit: 10, searchText: searchText || "" }),
    onError: (error) => {
      dispatch(openErrorSnackbar("Product cannot be fetched at this time."));
    },
  });

  if (getSellerProductQuery.isLoading) {
    return <Loader />;
  }
  return (
    <Box>
      <Grid
        container
        sx={{
          marginTop: "1rem",
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "4rem",
        }}
      >
        <Grid
          item
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: {
              xs: "center",
              sm: "flex-end",
            },
          }}
        >
          <Button
            variant="contained"
            onClick={() => navigate("/products/add")}
            sx={{
              marginRight: {
                xs: 0,
                sm: "5rem",
              },
              width: {
                xs: "90%",
                sm: "10%",
              },
            }}
          >
            Add product
          </Button>
        </Grid>
      </Grid>

      {!getSellerProductQuery.isLoading &&
      !getSellerProductQuery.isError &&
      getSellerProductQuery.data.data.products.length === 0 ? (
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
              {getSellerProductQuery?.data?.data?.products?.map((item) => {
                return <ProductCard key={item._id} {...item} />;
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
                count={getSellerProductQuery?.data?.data?.totalPage}
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

export default SellerProduct;
