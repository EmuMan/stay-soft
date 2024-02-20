import { Box, Typography } from "@mui/material";

const Bet = (props) => {
  const betContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    border: "1px solid black",
    padding: "1rem",
    margin: "1rem",
    width: "100%",
  };

  return (
    <Box style={betContainerStyle}>
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
