import {
  Avatar,
  Badge,
  Box,
  Button,
  Grid,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { styled } from "styled-components";
import { BiLogOut } from "react-icons/bi";
import { useQuery } from "react-query";
import { getCartCount } from "../lib/apis/cart.api";

const Header = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");
  const userRole = localStorage.getItem("userRole");

  const [anchorEl, setAnchorEl] = React.useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ["cart-item-count"],
    queryFn: () => getCartCount(),

    // conditionally hit api
    // if role is not buyer, api is not hit
    enabled: userRole === "buyer",
  });

  // to get current route
  const { pathname } = useLocation();
  console.log(location);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
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
            Are you sure you want to logout ?
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            sx={{ justifyContent: "flex-end" }}
          >
            <Button
              variant="contained"
              onClick={() => {
                handleLogout();
                handleClose();
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
      <Box
        sx={{
          color: "#fff",
          padding: "1rem",
          width: "100%",

          background: "#090660",
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
        }}
      >
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Grid
            item
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src="/icons/flogo1.png"
              width={200}
              height={100}
              style={{ objectFit: "contain", color: "white" }}
            />
            {/* <Typography variant="h4">Nepal mart</Typography> */}
          </Grid>

          <Grid
            item
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "5rem",
            }}
          >
            <NavLink
              to="/home"
              className={({ isActive }) => (isActive ? "active" : "in-active")}
            >
              <Typography variant="h4" sx={{ fontFamily: "Classy" }}>
                Home
              </Typography>
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) => (isActive ? "active" : "in-active")}
            >
              <Typography variant="h4" sx={{ fontFamily: "Cambria" }}>
                Products
              </Typography>
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? "active" : "in-active")}
            >
              <Typography variant="h4" sx={{ fontFamily: "Classy" }}>
                About
              </Typography>
            </NavLink>
          </Grid>
          <Grid
            item
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "3rem",
            }}
          >
            {userRole === "buyer" && (
              <Box sx={{ cursor: "pointer" }} onClick={() => navigate("/cart")}>
                <Badge
                  badgeContent={data?.data?.itemCount}
                  color="secondary"
                  size="large"
                >
                  <Button
                    sx={{ color: pathname === "/cart" ? "orange" : "white" }}
                  >
                    <FaShoppingCart size={45} />
                  </Button>
                </Badge>
              </Box>
            )}

            <div>
              <Avatar
                alt="Remy Sharp"
                src="/avatar/avatar.jpg"
                sx={{ width: 50, height: 50, marginLeft: "25%" }}
              />
              <Typography variant="h6" sx={{ fontFamily: "Classy" }}>
                Hello {userName}
              </Typography>
            </div>
            {/* TODO:ICON COLOR */}
            <Button sx={{ color: "#fff" }} onClick={handleClick}>
              <BiLogOut size={35} />
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Header;
