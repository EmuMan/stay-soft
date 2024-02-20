import { Box, Typography } from "@mui/material";

const Bet = () => {
  let numberYes = 0;
  let numberNo = 0;
  let description = "Will Cal Poly make it to the Super Bowl";
  return (
    <Box>
      <Typography variant="h6" component="div">
        {description}
      </Typography>
      <Typography variant="h6" component="div">
        yes: {numberYes}
      </Typography>
      <Typography variant="h6" component="div">
        no: {numberNo}
      </Typography>
    </Box>
  );
};

export { Bet };
