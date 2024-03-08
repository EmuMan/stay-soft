import React from "react";
import MyBet from "./MyBet.js";

function MyBetsFeed(props) {
  const myBets = props.bets.map((bet, index) => {
    return (
      <MyBet
        key={index}
        decision={bet.decision}
        amount={bet.amount}
        question={bet.promptId.question}
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
