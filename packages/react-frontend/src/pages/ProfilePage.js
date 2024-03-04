import { Typography, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import CreatorPromptsFeed from "/Users/colinmcdonald/Library/CloudStorage/GoogleDrive-1colinmcdonald@gmail.com/My Drive/college/courses/CSC/CSC 307/PolyPicks-repo/packages/react-frontend/src/components/CreatorPromptsFeeds.js";

const ProfilePage = (props) => {
  const [prompts, setPrompts] = useState([]);
  function fetchPrompts() {
    const promise = fetch(
      "http://localhost:8000/prompts?user=" + props.profile["_id"]
    );
    return promise;
  }
  useEffect(() => {
    fetchPrompts()
      .then((res) => res.json())
      .then((json) => setPrompts(json))
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <Stack
      style={{
        display: "flex",
        flexDirection: "column",
        marginLeft: "20px",
        alignItems: "center",
      }}
    >
      {/* User Icon */}
      <Typography variant="h6">{props.profile.username}</Typography>
      <Typography variant="h6">Points: {props.profile.points}</Typography>
      <Typography variant="h6">Bets Won: {props.profile.betsWon}</Typography>
      <Typography variant="h6">Bets Lost: {props.profile.betsLost}</Typography>
      <Typography variant="h6">
        Respondents: {props.profile.respondents}
      </Typography>
      <CreatorPromptsFeed prompts={prompts} />
    </Stack>
  );
};

export default ProfilePage;
