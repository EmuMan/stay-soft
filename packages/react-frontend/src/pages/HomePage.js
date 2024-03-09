import { Box } from "@mui/material";
import Feed from "../components/Feed.js";
import { useEffect, useState } from "react";

function HomeBody(props) {
  const [prompts, setPrompts] = useState([]);

  useEffect(() => {
    const fetchPrompts = () => {
      fetch(`${process.env.REACT_APP_API_ENDPOINT}/prompts`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((json) => setPrompts(json))
        .catch((error) => {
          console.log(error);
        });
    };

    fetchPrompts();
  }, []);

  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Feed prompts={prompts} onBetPlacement={props.onBetPlacement} />
    </Box>
  );
}

export default HomeBody;
