import { Box, Typography } from "@mui/material";

const Bet = (props) => {
  return (
    <Box>
      <Typography variant="h6" component="div">
        {props.description}
      </Typography>
      <Typography variant="h6" component="div">
        yes: {props.yesCount}
      </Typography>
      <Typography variant="h6" component="div">
        no: {props.noCount}
      </Typography>
    </Box>
  );
};

export { Bet };
