import React from "react";
import { Button, Stack } from "@mui/material";
import Bet from "./Bet.js";

function Feed(prop) {
  const questions = prop.questions.map((question, index) => {
    return <Bet key={index} question={question}></Bet>;
  });
  return (
    <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
      {questions}
    </div>
  );
}

export default Feed;
