import { Box, Typography } from "@mui/material";
import { Prompt } from "../components/Prompt.js";
import Feed from "../components/Feed.js";
import Bet from "../components/Bet.js";
import { useEffect, useState } from "react";

function HomeBody(props) {
  const [prompts, setPrompts] = useState([]);
  function fetchPrompts() {
    const promise = fetch("http://localhost:8000/prompts");
    return promise;
  }
  useEffect(() => {
    fetchPrompts()
      .then((res) => res.json())
      .then((json) => setPrompts(json))
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Feed questions={prompts} />
    </Box>
  );
}

export default HomeBody;
