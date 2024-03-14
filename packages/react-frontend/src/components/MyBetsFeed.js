import React from "react";
import MyBet from "./MyBet.js";

function MyBetsFeed(props) {
  const myBets = props.bets.filter((bet) => bet.promptId !== null).map((bet, index) => {
    return (
      <MyBet
        key={index}
        bet={bet}
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
