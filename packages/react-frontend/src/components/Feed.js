import React from "react";
import Prompt from "./Prompt.js";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

function Feed({ prompts, onBetPlacement }) {
  const [loggedInUser, setLoggedInUser] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setLoggedInUser(decoded.id); 
    }
  }, []);

  console.log(prompts);
  const filteredPrompts = prompts.filter(prompt => prompt.user._id !== loggedInUser);
  const promptComponents = filteredPrompts.map((prompt) => (
    <Prompt
      key={prompt._id}
      {...prompt}
      onBetPlacement={onBetPlacement}
      loggedInUser={loggedInUser}
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
