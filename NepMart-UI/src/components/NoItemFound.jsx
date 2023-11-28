import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NoItemFound = (props) => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");
  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
        gap: "5rem",
      }}
    >
      <Typography variant="h3">{props.message}</Typography>

      {userRole === "seller" && (
        <Button variant="contained" onClick={() => navigate("/products/add")}>
          <Typography variant="h6" sx={{ textDecoration: "none" }}>
            Click here to create product
          </Typography>
        </Button>
      )}
    </Stack>
  );
};

export default NoItemFound;
