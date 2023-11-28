import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { AiOutlineDelete } from "react-icons/ai";
import { Chip, Grid, Popover, Stack } from "@mui/material";
import { $axios } from "../lib/axios";
import Loader from "./Loader";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { deleteSellerProduct } from "../lib/apis/product.apis";
import { placeHolderImage } from "../constants/general.constant";

export default function ProductCard(props) {
  const userRole = localStorage.getItem("userRole");
  const { pathname } = useLocation();
  console.log(pathname);

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { _id, name, price, category, company, description, imageUrl } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const deleteProductMutation = useMutation({
    mutationKey: ["delete-product"],
    mutationFn: () => deleteSellerProduct(_id),
    onSuccess: () => {
      queryClient.invalidateQueries("seller-products");
    },
  });

  if (deleteProductMutation.isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Grid sx={{ padding: "1rem" }}>
          <Typography sx={{ p: 2 }}>
            Are you sure you want to delete this product?
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            sx={{ justifyContent: "flex-end" }}
          >
            <Button
              variant="contained"
              onClick={() => {
                handleClose();
                deleteProductMutation.mutate();
              }}
            >
              Yes
            </Button>
            <Button variant="outlined" onClick={() => handleClose()}>
              No
            </Button>
          </Stack>
        </Grid>
      </Popover>
      <Card
        sx={{
          width: {
            xs: "100%",
            sm: "30%",
          },

          minHeight: "400px",
          // border: "2px solid black",
          boxShadow:
            " rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
        }}
      >
        <CardMedia
          onClick={() => navigate(`/products/details/${_id}`)}
          component="img"
          alt={name}
          image={imageUrl || placeHolderImage}
          height={300}
          sx={{
            objectFit: "contain",
            cursor: "pointer",

            width: "100%",
          }}
        />
        <CardContent>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              gap: "3rem",
            }}
          >
            <Typography gutterBottom variant="h6" component="div">
              {name}
            </Typography>
            <Chip label={company} color="primary" variant="outlined" />
          </div>

          <Typography gutterBottom variant="h6" component="div">
            Rs.{price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description.slice(0, 150)}...
          </Typography>
        </CardContent>
        <CardActions>
          {userRole === "seller" && pathname !== "/home" && (
            <Button size="small" onClick={(event) => handleClick(event)}>
              <AiOutlineDelete size={30} color="success" />
            </Button>
          )}

          <Button
            variant="contained"
            size="small"
            onClick={() => {
              navigate(`/products/details/${_id}`);
            }}
          >
            Explore
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
