import { useState, useEffect } from "react";
import { Typography, Stack } from "@mui/material";
import CreatorPromptsFeed from "../components/CreatorPromptsFeeds.js";

const ProfilePage = (props) => {
  const [prompts, setPrompts] = useState([]);

  const profileId = props.profile["_id"];
  useEffect(() => {
    const fetchPrompts = () => {
      return fetch(`${process.env.REACT_APP_API_ENDPOINT}/prompts?user=${profileId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    };
    fetchPrompts()
      .then((res) => res.json())
      .then((json) => setPrompts(json))
      .catch((error) => {
        console.log(error);
      });
  }, [profileId]);
  
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
