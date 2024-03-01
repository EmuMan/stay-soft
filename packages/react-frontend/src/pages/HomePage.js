import { Box, Typography } from "@mui/material";
import { Prompt } from "../components/Prompt.js";
import Feed from "../components/Feed.js";
import Bet from "../components/Bet.js";

function HomeBody(props) {
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Feed questions={props.prompts} />
    </Box>
  );
};

export default HomeBody;
