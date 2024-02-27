import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardMedia,
  TextField,
  InputAdornment,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Stack,
} from "@mui/material";
import { useState } from "react";
import BetAmount from "./BetAmount.js";

function Bet(prop) {
  const [formVisible, setFormVisible] = useState(false);
  const [betVisible, setbetVisible] = useState(true);
  let visibility = "hidden";
  return (
    <Box width="95%">
      {betVisible && (
        <Card
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "0",
          }}
        >
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {prop.question.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Box>
              <FormControl>
                <RadioGroup name="decision" aria-labelledby="decision-label">
                  <FormControlLabel
                    control={<Radio />}
                    label="Yes"
                    value="Yes"
                    onClick={() => setFormVisible(true)}
                  />
                  <FormControlLabel
                    control={<Radio />}
                    label="No"
                    value="No"
                    onClick={() => setFormVisible(true)}
                  />
                </RadioGroup>
              </FormControl>
            </Box>
            <Stack>
              {formVisible && (
                <TextField
                  type="number"
                  label="Amount"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$ </InputAdornment>
                    ),
                  }}
                />
              )}
              <Button onClick={() => setbetVisible(false)}>Confirm</Button>
            </Stack>
          </CardActions>
        </Card>
      )}
    </Box>
  );
}

export default Bet;
