import { Box, Typography, Button, Stack } from "@mui/material";

const Bet = (props) => {
  const betContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    borderTop: "1px solid black",
    borderBottom: "1px solid black",
    padding: "1rem 0",
    margin: "1rem",
    width: "100%",
    gap: "1rem",
    backgroundColor: "white",
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
      <Stack spacing={2} direction="row">
        <Button variant="contained">Yes</Button>
        <Button variant="contained">No</Button>
      </Stack>
    </Box>
  );
};

export { Bet };
