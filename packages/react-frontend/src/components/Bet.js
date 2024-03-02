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

function Bet(prop) {
  return (
    <Box width="400px">
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {prop.question.question}
          </Typography>
        </CardContent>
        <CardActions
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
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
        </CardActions>
      </Card>
    </Box>
  );
}

export default Bet;
