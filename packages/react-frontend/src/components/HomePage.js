import { Box, Typography } from "@mui/material";
import { Bet } from "./Bet.js";

const HomeBody = () => {
  return (
    <Box
      display="flex"
      justifyContent="top"
      alignItems="center"
      flexDirection="column"
      style={{ backgroundColor: "lightGray" }}
      height="100%"
    >
      <Typography variant="h4">Home</Typography>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        marginBottom="70px"
      >
        <Bet
          yesCount={7}
          noCount={25}
          description="Will I get off the CSC 307 waitlist from spot 15?"
        />
        <Bet
          yesCount={10}
          noCount={945812}
          description="Will Cal Poly make it to the Super Bowl?"
        />
        <Bet
          yesCount={10}
          noCount={945812}
          description="Will Cal Poly make it to the Super Bowl?"
        />
        <Bet
          yesCount={10}
          noCount={945812}
          description="Will Cal Poly make it to the Super Bowl?"
        />
        <Bet
          yesCount={10}
          noCount={945812}
          description="Will Cal Poly make it to the Super Bowl?"
        />
      </Box>
    </Box>
  );
};

export default HomeBody;
