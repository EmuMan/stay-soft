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
  return (
    <Box width="95%">
      <Card
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
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
                <FormControlLabel control={<Radio />} label="Yes" value="Yes" />
                <FormControlLabel control={<Radio />} label="No" value="No" />
              </RadioGroup>
            </FormControl>
          </Box>
          <Stack>
            <TextField
              label="Amount"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$ </InputAdornment>
                ),
              }}
            />
            <Button>Confirm</Button>
          </Stack>
        </CardActions>
      </Card>
    </Box>
  );
}

export default Bet;
