import { Box, Typography } from "@mui/material";
import { Prompt } from "./Prompt.js";
import Feed from "./Feed.js";
import Bet from "./Bet.js";
import App from "../App.js";

const HomeBody = (props) => {
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Feed questions={props.prompts} />
    </div>
  );
};

export default HomeBody;
