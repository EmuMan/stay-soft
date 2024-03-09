import React from "react";
import CreatorPrompt from "./CreatorPrompt.js"

function CreatorPromptsFeed(props) {
  const questions = props.prompts.map((prompt, index) => {
    console.warn(prompt);
    return <CreatorPrompt key={index} prompt={prompt} />;
  });
  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        flexDirection: "column",
        alignItems: "center",
        minWidth: "400px"
      }}
    >
      {questions}
    </div>
  );
}

export default CreatorPromptsFeed;
