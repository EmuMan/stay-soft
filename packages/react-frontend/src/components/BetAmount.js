import { TextField, Stack, Button, InputAdornment } from "@mui/material";
function BetAmount(decision) {
  console.log(decision);
  let visibility = "hidden";
  if (decision === "Yes" || decision === "No") {
    visibility = "visible";
  }
  return (
    <Stack>
      <TextField
        style={{ visibility: visibility }}
        label="Amount"
        InputProps={{
          startAdornment: <InputAdornment position="start">$ </InputAdornment>,
        }}
      />
      <Button>Confirm</Button>
    </Stack>
  );
}

export default BetAmount;
