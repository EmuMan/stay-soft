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
  const [result, setResult] = useState("");
  const [bets, setBets] = useState([]);
  const [betters, setBetters] = useState([]);
  const { prompt } = props;

  const handleResolution = () => {
    if (result !== "") {
      if (result === "Yes") {
        result = true;
      } else if (result === "No") {
        result = false;
      }
      const fetchBets = () => {
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
      const winningBets = bets.filter((bet) => bet.decision === result);
      // use patch to update each user's points
    }
  };
  const handleChange = (event) => {
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
              <RadioGroup name="decision" aria-labelledby="decision-label">
                <FormControlLabel control={<Radio />} label="Yes" value="Yes" />
                <FormControlLabel control={<Radio />} label="No" value="No" />
              </RadioGroup>
            </FormControl>
          </Box>
          <Stack>
            <Button>Confirm</Button>
          </Stack>
        </CardActions>
      </Card>
    </Box>
  );
};

export default CreatorPrompt;
