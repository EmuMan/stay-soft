import { Box, Typography } from "@mui/material";
import Feed from "./Feed.js";
import Bet from "./Bet.js";

const HomeBody = () => {
  let prompts = [
    { description: "Will Cal Poly Basketball beat Hawaii?" },
    { description: "Will Cal Poly baseball beat Missouri?" },
    {
      description:
        "Will Chris Caudillo run a sub-4 mile at the Big West Championship?",
    },
  ];
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Feed questions={prompts} />
    </div>
  );
};

export default HomeBody;
