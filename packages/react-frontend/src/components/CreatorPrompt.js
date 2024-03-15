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
  const [closed, setClosed] = useState(0);
  const [result, setResult] = useState("");
  let { prompt } = props;

  let handleResolution = () => {
    if (result !== "" && closed < 2) {
      setClosed(closed + 1);

      fetch(`${process.env.REACT_APP_API_ENDPOINT}/prompts/${prompt._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ result: result === "Yes" }),
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
