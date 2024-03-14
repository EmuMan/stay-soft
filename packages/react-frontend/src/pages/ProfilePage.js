import { useState, useEffect } from "react";
import { Typography, Stack, Card, CardContent } from "@mui/material";
import MyBetsAndPrompts from "../components/MyBetsAndPrompts.js";

const ProfilePage = (props) => {
  const [prompts, setPrompts] = useState([]);
  const [bets, setBets] = useState([]);
  const profileId = props.profile["_id"];
  useEffect(() => {
    const fetchPrompts = () => {
      return fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/prompts?user=${profileId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    };
    fetchPrompts()
      .then((res) => res.json())
      .then((json) => setPrompts(json))
      .catch((error) => {
        console.log(error);
      });
  }, [profileId]);

  useEffect(() => {
    const fetchBets = () => {
      return fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/bets?user=${profileId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    };
    fetchBets()
      .then((res) => res.json())
      .then((json) => setBets(json))
      .catch((error) => {
        console.log(error);
      });
  }, [profileId]);

  const onPromptClose = (promptId) => {
    setPrompts(prompts.filter((prompt) => prompt._id !== promptId));
  };

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
      <Typography variant="h5">{props.profile.username}</Typography>
      <Card style={{ margin: "20px 0", padding: "20px" }}>
        <CardContent>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              minWidth: "320px",
              // alignItems: "center",
            }}
          >
            <Typography variant="h6">
              Points: {Math.round(props.profile.points)}
            </Typography>
            <Typography variant="h6">
              Bets Won: {props.profile.betsWon}
            </Typography>
            <Typography variant="h6">
              Bets Lost: {props.profile.betsLost}
            </Typography>
            <Typography variant="h6">
              Respondents: {props.profile.respondents}
            </Typography>
          </div>
        </CardContent>
      </Card>
      <MyBetsAndPrompts bets={bets} onPromptClose={onPromptClose} prompts={prompts} profile={props.profile} />
    </Stack>
  );
};

export default ProfilePage;
