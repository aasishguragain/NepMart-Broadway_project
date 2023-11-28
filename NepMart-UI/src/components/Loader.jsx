import { Box } from "@mui/material";
import React from "react";
import { styled } from "styled-components";

const Loader = () => {
  return (
    <StyledBox>
      <img src="/gif/loader.gif" />
    </StyledBox>
  );
};

export default Loader;

const StyledBox = styled(Box)`
  position: absolute;
  top: 45%;
  left: 45%;
  transform: translate(0, -50%);
  padding: 10px;
`;
