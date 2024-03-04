import { Box } from "@mui/material";
import Feed from "../components/Feed.js";
import { useEffect, useState } from "react";

function HomeBody() {
  const [prompts, setPrompts] = useState([]);
  function fetchPrompts() {
    const promise = fetch(`${process.env.REACT_APP_API_ENDPOINT}/prompts`);
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
