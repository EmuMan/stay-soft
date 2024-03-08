import React from "react";
import CreatorPrompt from "./CreatorPrompt.js";
import MyBet from "./MyBet.js";
import { useState, useEffect } from "react";

function MyBetsFeed(props) {
  const [bets, setBets] = useState(props.bets);
  let question = null;
  const myBets = props.bets.map((bet, index) => {
    const fetchPrompt = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/prompts/${bet.promptId}`
      );
      const promptData = await response.json();
      question = promptData.question;
      setBets((prevBets) =>
        prevBets.map((b) =>
          b._id === bet._id ? { ...b, prompt: promptData } : b
        )
      );
    };
    fetchPrompt();
    return (
      <MyBet
        key={index}
        decision={bet.decision}
        amount={bet.amount}
        question={bet.promptId}
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
      {myBets}
    </div>
  );
}

export default MyBetsFeed;
