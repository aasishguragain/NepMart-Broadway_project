import {
  FilledInput,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import React from "react";

const AmountInput = ({ label, purpose }) => {
  const [amount, setAmount] = React.useState(0);
  return (
    <FormControl sx={{ m: 1 }}>
      <InputLabel htmlFor="outlined-adornment-amount">{label}</InputLabel>
      <OutlinedInput
        onChange={(event) => {
          console.log("hello");
          console.log(event.target.value);
        }}
        fullWidth
        type="number"
        id="outlined-adornment-amount"
        startAdornment={<InputAdornment position="start">Rs.</InputAdornment>}
        label={label}
      />
    </FormControl>
  );
};

export default AmountInput;
