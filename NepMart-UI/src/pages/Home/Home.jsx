import React from "react";
import { useQuery } from "react-query";
import { getLatestProducts } from "../../lib/apis/product.apis";
import Loader from "../../components/Loader";
import Carousel from "react-material-ui-carousel";
import { Box, Button, Paper, Typography } from "@mui/material";
import ProductCard from "../../components/ProductCard";
import { getRandomId } from "../../utils/random.id.genreator";

const Home = () => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["get-latest-product"],
    queryFn: () => getLatestProducts(6),
  });

  const latestProducts = data?.data;

  console.log(latestProducts);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Typography
        variant="h3"
        color="teal"
        textAlign="center"
        sx={{ margin: "2rem 0", textAlign: "center", width: "100%" }}
      >
        New arrivals
      </Typography>{" "}
      <Box
        sx={{
          display: "flex",

          flexDirection: {
            xs: "column",
            sm: "row",
          },
          justifyContent: "center",
          alignItems: "center",
          gap: "2rem",
          flexWrap: "wrap",
        }}
      >
        {latestProducts.map((item) => {
          return <ProductCard key={getRandomId()} {...item} />;
        })}
      </Box>
    </>
  );
};

export default Home;
