import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Stack,
} from "@mui/material";
import { useState } from "react";

const CreatorPrompt = (props) => {
  let [result, setResult] = useState("");
  let [bets, setBets] = useState([]);
  const [closed, setClosed] = useState(0);
  let { prompt } = props;

  let handleResolution = () => {
    if (result !== "" && closed < 2 && !prompt.dateClosed) {
      let correctPool = prompt.yesPool;
      let wrongPool = prompt.noPool;
      if (result === "Yes") {
        setResult(true);
      } else if (result === "No") {
        setResult(false);
        correctPool = prompt.noPool;
        wrongPool = prompt.yesPool;
      }

      let fetchBets = () => {
        return fetch(
          `${process.env.REACT_APP_API_ENDPOINT}/bets?promptId=${prompt._id}`,
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

      let winningBets = bets.filter((bet) => bet.decision === result);
      for (let j = 0; j < bets.length; j++) {
        fetch(`${process.env.REACT_APP_API_ENDPOINT}/bets/${bets[j]._id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      }
      console.log("The actual prompt: ");
      console.log(prompt._id);
      for (let i = 0; i < winningBets.length; i++) {
        let points = {
          points:
            (winningBets[i].amount / correctPool) * wrongPool +
            winningBets[i].amount,
        };
        console.log(winningBets[i].promptId);
        console.log(winningBets[i].decision);
        fetch(
          `${process.env.REACT_APP_API_ENDPOINT}/users/${winningBets[i].user._id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(points),
          }
        );
      }
      setClosed(closed + 1);

      fetch(`${process.env.REACT_APP_API_ENDPOINT}/prompts/${prompt._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    }
  };
  let handleChange = (event) => {
    setResult(event.target.value);
  };

  return (
    <Box width="95%">
      <Card
        style={{
          display: "flex",
          flexDirection: "column",
          paddingRight: "20px",
          paddingLeft: "10px",
        }}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {prompt.question}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            Responses
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h5" color={"primary"}>
              Yes: {prompt.numYes.toLocaleString()}
            </Typography>
            <Typography variant="h5" color={"secondary"}>
              No: {prompt.numNo.toLocaleString()}
            </Typography>
          </Stack>
        </CardContent>
        <CardActions>
          <Box>
            <FormControl>
              <RadioGroup
                name="decision"
                aria-labelledby="decision-label"
                onChange={handleChange}
              >
                <FormControlLabel control={<Radio />} label="Yes" value="Yes" />
                <FormControlLabel control={<Radio />} label="No" value="No" />
              </RadioGroup>
            </FormControl>
          </Box>
          <Stack>
            <Button onClick={handleResolution}>Confirm</Button>
          </Stack>
        </CardActions>
      </Card>
    </Box>
  );
};

export default CreatorPrompt;
