import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Typography } from "@mui/material";

function valuetext(value) {
  return `${value}°C`;
}

export default function PriceRangePicker() {
  const [value, setValue] = React.useState([1, 100000]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: 300 }}>
      <Typography id="non-linear-slider" gutterBottom>
        Price
      </Typography>
      <Slider
        getAriaLabel={() => "Temperature range"}
        aria-label="Price"
        color="secondary"
        max={1000000}
        step={10000}
        min={1}
        size="medium"
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
    </Box>
  );
}
