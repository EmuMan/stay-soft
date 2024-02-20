import { Box, Typography } from "@mui/material";
import { Bet } from "./Bet.js";

const HomeBody = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
      <Typography>Home</Typography>
      <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
        <Bet />
        <Bet />
        <Bet />
        <Bet />
        <Bet />
      </Box>
    </Box>
  );
}

export default HomeBody;
