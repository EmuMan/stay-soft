import React from "react";
import Prompt from "./Prompt.js";

function Feed({ prompts, onBetPlacement }) {
  const promptComponents = prompts.map((prompt) => (
    <Prompt
      key={prompt._id}
      {...prompt}
      onBetPlacement={onBetPlacement}
    />
  ));

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {promptComponents}
    </div>
  );
}

export default Feed;
