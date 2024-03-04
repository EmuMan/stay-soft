import React from "react";
import { Button, Stack } from "@mui/material";
import CreatorPrompt from "./CreatorPrompt.js"

function CreatorPromptsFeed(props) {
  const questions = props.prompts.map((prompt, index) => {
    return <CreatorPrompt key={index} question={prompt.question} />;
  });
  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {questions}
    </div>
  );
}

export default CreatorPromptsFeed;
