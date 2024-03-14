import React from "react";
import Prompt from "./Prompt.js";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

function Feed({ prompts, onBetPlacement }) {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [userBets, setUserBets] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setLoggedInUser(decoded.id);
      fetchBets(decoded.id, token);
    }
  }, []);

  const handleBetUpdate = (promptId) => {
    setUserBets((prevBets) => [
      ...prevBets,
      { promptId, userId: loggedInUser },
    ]);
  };

  const fetchBets = async (userId, token) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/bets?user=${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    setUserBets(data || []);
  };

  const filteredPrompts = prompts.filter(
    (prompt) => prompt.user._id !== loggedInUser
  );
  const promptComponents = filteredPrompts.map((prompt) => {
    const hasBet = userBets.some((bet) => bet.promptId === prompt._id);
    console.log(prompt.dateClosed);
    return (
      <Prompt
        key={prompt._id}
        {...prompt}
        onBetPlacement={onBetPlacement}
        hasBet={hasBet}
        handleBetUpdate={handleBetUpdate}
        loggedInUser={loggedInUser}
        dateClosed={prompt.dateClosed}
      />
    );
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
      {promptComponents}
    </div>
  );
}

export default Feed;
