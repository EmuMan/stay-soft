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

function Bet(props) {
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
          <Stack spacing={2} direction="row">
            <Typography variant="h6" component="div">
              Date Opened: {props.question.dateOpened}
            </Typography>
            <Typography variant="h6" component="div">
              Date Closed: {props.question.dateClose}
            </Typography>
          </Stack>
          <Typography gutterBottom variant="h5" component="div">
            {props.question.description}
          </Typography>
          <Typography variant="h6" component="div">
            Category: {props.question.category}
          </Typography>
          <Typography variant="h6" component="div">
            Creator: {props.question.creator}
          </Typography>
          <Typography variant="h6" component="div">
            yes: {props.question.yesCount}
          </Typography>
          <Typography variant="h6" component="div">
            no: {props.question.noCount}
          </Typography>
          <Stack spacing={2} direction="row" padding={2}>
            <Button variant="contained" style={{ textTransform: "none" }}>
              Yes
            </Button>
            <Button variant="contained" style={{ textTransform: "none" }}>
              No
            </Button>

          </Stack>
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

        </CardContent>

      </Card>
    </Box>
  );
}

export default Bet;
