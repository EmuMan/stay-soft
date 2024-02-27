import { Box, Typography } from "@mui/material";
import { Prompt } from "./Prompt.js";
import Feed from "./Feed.js";

const HomeBody = () => {
  let prompts = [
    { description: "Will Cal Poly Basketball beat Hawaii?" },
    { description: "Will Cal Poly baseball beat Missouri?" },
    {
      description:
        "Will Chris Caudillo run a sub-4 mile at the Big West Championship?",
    },
    {
      description: "Will the strike end by tomorrow?",
    },
    {
      description: "Will we be on the quarter system by 2026",
    },
    {
      description: "Will the new building be finished by next 2025?",
    },
  ];
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
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
