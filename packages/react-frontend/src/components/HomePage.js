import { Box, Typography } from "@mui/material";
import { Prompt } from "./Prompt.js";

const HomeBody = () => {
  return (
    <Box
      display="flex"
      justifyContent="top"
      alignItems="center"
      flexDirection="column"
      style={{ backgroundColor: "lightGray", textTransform: "none" }}
      height="100%"
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Typography variant="h4">Home</Typography>
        <Prompt
          yesCount={7}
          noCount={25}
          description="Will I get off the CSC 307 waitlist from spot 15?"
          category="Waitlist"
          creator="Gabe Alonso"
          dateOpen="3/2/2024"
          dateClose="4/2/2024"
        />
        <Prompt
          yesCount={10}
          noCount={945812}
          description="Will Cal Poly make it to the Super Bowl?"
          category="Football"
          creator="Aiden Smith"
          dateOpen="1/2/2024"
          dateClose="2/2/2024"
        />
        <Prompt
          yesCount={10}
          noCount={945812}
          description="Will Cal Poly make it to the Super Bowl?"
          category="Football"
          creator="Aiden Smith"
          dateOpen="1/2/2024"
          dateClose="2/2/2024"
        />
        <Prompt
          yesCount={10}
          noCount={945812}
          description="Will Cal Poly make it to the Super Bowl?"
          category="Football"
          creator="Aiden Smith"
          dateOpen="1/2/2024"
          dateClose="2/2/2024"
        />
        <Prompt
          yesCount={10}
          noCount={945812}
          description="Will Cal Poly make it to the Super Bowl?"
          category="Football"
          creator="Aiden Smith"
          dateOpen="1/2/2024"
          dateClose="2/2/2024"
        />
      </Box>
    </Box>
  );
};

export default HomeBody;
