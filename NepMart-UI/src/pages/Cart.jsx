import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Stack,
  TableContainer,
  TableFooter,
  Typography,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from "react";
import styled from "styled-components";
import { AiOutlinePlus, AiOutlineMinus, AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  getCartData,
  removeItemFromCart,
  updateCartQuantity,
} from "../lib/apis/cart.api";
import { getRandomId } from "../utils/random.id.genreator";
import Loader from "../components/Loader";
import { useDispatch } from "react-redux";
import {
  openErrorSnackbar,
  openSuccessSnackbar,
} from "../store/slices/snackbarSlice";
import NoItemFound from "../components/NoItemFound";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCartData(),
    onError: (error) => {
      dispatch(
        openErrorSnackbar(
          error?.response?.data?.message || "Something is wrong"
        )
      );
    },
  });

  const cartData = data?.data?.cartList;
  const grandTotal = data?.data?.grandTotal;
  const subTotal = data?.data?.subTotal;

  // delete mutation
  const { mutate, isLoading: removeCartLoading } = useMutation({
    mutationKey: ["removeCart"],
    mutationFn: (id) => removeItemFromCart(id),
    onSuccess: (res) => {
      dispatch(openSuccessSnackbar(res?.data?.message || "Item removed"));
      // reloads cart query
      queryClient.invalidateQueries("cart");
      queryClient.invalidateQueries("cart-item-count");
    },
    onError: (error) => {
      dispatch(openErrorSnackbar("Item cannot be removed."));
    },
  });

  // update quantity mutation
  const { mutate: updateQuantityMutate, isLoading: updateQuantityLoading } =
    useMutation({
      mutationKey: ["updateQuantity"],
      mutationFn: (values) =>
        updateCartQuantity(values.productId, { action: values.action }),

      onSuccess: () => {
        queryClient.invalidateQueries("cart");
        queryClient.invalidateQueries("cart-item-count");
      },
    });

  if (isLoading || removeCartLoading || updateQuantityLoading) {
    return <Loader />;
  }
  return (
    <>
      {cartData?.length <= 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <NoItemFound message="Nothing in your cart" />
          <Button onClick={() => navigate("/products")} variant="contained">
            Start shopping
          </Button>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            justifyContent: "space-around",
            gap: "2rem",
            width: "100%",
            padding: "2rem",
          }}
        >
          <Grid
            container
            sx={{
              maxHeight: "70vh",
              width: {
                xs: "100%",
                sm: "70%",
              },

              overflowY: "scroll",
              borderRadius: "10px",
              boxShadow:
                " rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
            }}
          >
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">
                      <Typography variant="h5">Image</Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Typography variant="h5">Name</Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Typography variant="h5">Brand</Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Typography variant="h5">Price per unit</Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Typography variant="h5">Quantity</Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Typography variant="h5">Total</Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Typography variant="h5">Action</Typography>
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartData?.map((item) => (
                    <TableRow
                      key={getRandomId()}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                      f
                    >
                      <StyledTableCell align="center">
                        <img
                          style={{
                            height: "100px",
                            width: "100px",
                            objectFit: "contain",
                          }}
                          src={item?.imageUrl}
                          alt={item?.name}
                        />
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Typography variant="h6">{item?.name}</Typography>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Typography variant="h6"> {item?.company}</Typography>
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        <Typography variant="h6"> {item?.unitPrice}</Typography>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Stack direction="row">
                          <Button
                            onClick={() =>
                              updateQuantityMutate({
                                productId: item?.productId,
                                action: "decrease",
                              })
                            }
                            disabled={item?.orderQuantity === 1}
                          >
                            <AiOutlineMinus size={20} />
                          </Button>

                          <Typography variant="h6">
                            {item?.orderQuantity}
                          </Typography>

                          <Button
                            onClick={() =>
                              updateQuantityMutate({
                                productId: item?.productId,
                                action: "increase",
                              })
                            }
                          >
                            <AiOutlinePlus size={20} />
                          </Button>
                        </Stack>
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        <Typography variant="h6">{item?.totalPrice}</Typography>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Button
                          sx={{ color: "red" }}
                          onClick={() => {
                            mutate(item?.productId);
                          }}
                        >
                          <AiOutlineDelete size={30} />
                        </Button>
                      </StyledTableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: {
                xs: "100%",
                sm: "30%",
              },
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              onClick={() => {
                navigate("/products");
              }}
            >
              Back to shopping
            </Button>
            <Grid
              container
              sx={{
                marginTop: "6rem",
                borderRadius: "10px",
                boxShadow: "rgba(120, 29, 69, 0.3) 0px 0px 0px 3px",
                minWidth: "20rem",
                padding: "1rem 0.5rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                gap: "0.5rem",
              }}
            >
              <Typography
                variant="h5"
                sx={{ textAlign: "center", color: "grey", mb: "1rem" }}
              >
                Order Summary
              </Typography>
              <Grid
                item
                sx={{
                  display: "flex",

                  justifyContent: "space-around",
                }}
              >
                <Typography variant="h6">Subtotal</Typography>
                <Typography variant="h6">Rs.{subTotal || 0}</Typography>
              </Grid>
              <Divider />
              <Grid
                item
                sx={{
                  display: "flex",

                  justifyContent: "space-around",
                }}
              >
                <Typography variant="h6">Discount</Typography>
                <Typography variant="h6">5%</Typography>
              </Grid>
              <Divider />
              <Grid
                item
                sx={{
                  display: "flex",

                  justifyContent: "space-around",
                }}
              >
                <Typography variant="h6">Grand total</Typography>
                <Typography variant="h6"> Rs.{grandTotal}</Typography>
              </Grid>
              <Divider />
            </Grid>
            <Button variant="contained" sx={{ mt: "3rem" }} color="success">
              Proceed to checkout
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

const StyledTableCell = styled(TableCell)`
  padding: 1rem;
`;
export default Cart;
