import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  TextField,
  InputAdornment,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Stack,
} from "@mui/material";

function Bet(props) {
  return (
    <Box width="400px">
      <Card>
        <CardContent>
          <Stack spacing={2} direction="row">
            <Typography variant="h6" component="div">
              Date Opened: {props.question.dateOpened}
            </Typography>
            <Typography variant="h6" component="div">
              Date Closed: {props.question.dateClosed}
            </Typography>
          </Stack>
          <Typography gutterBottom variant="h5" component="div">
            {props.question.question}
          </Typography>
          <Typography variant="h6" component="div">
            Category: {props.question.category}
          </Typography>
          <Typography variant="h6" component="div">
            Creator: {props.question.user.username}
          </Typography>
          <Typography variant="h6" component="div">
            yes: {props.question.numYes}
          </Typography>
          <Typography variant="h6" component="div">
            no: {props.question.numNo}
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
              noWrap
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
