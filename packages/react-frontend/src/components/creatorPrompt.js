import { Box, Typography, Button, Stack } from "@mui/material";

const creatorPrompt = (prop) => {
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
            {prop.question.question}
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
};
const creatorPrompt = (props) => {
  const betContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    borderTop: "1px solid black",
    borderBottom: "1px solid black",
    padding: "1rem 0",
    margin: "1rem",
    width: "100%",
    gap: "1rem",
    backgroundColor: "white",
  };

  return (
    <Box style={betContainerStyle}>
      <Stack spacing={2} direction="row">
        <Typography variant="h6" component="div">
          Date Opened: {props.dateOpen}
        </Typography>
        <Typography variant="h6" component="div">
          Date Closed: {props.dateClose}
        </Typography>
      </Stack>
      <Typography variant="h6" component="div">
        {props.description}
      </Typography>
      <Typography variant="h6" component="div">
        Category: {props.category}
      </Typography>
      <Typography variant="h6" component="div">
        Creator: {props.creator}
      </Typography>
      <Typography variant="h6" component="div">
        yes: {props.yesCount}
      </Typography>
      <Typography variant="h6" component="div">
        no: {props.noCount}
      </Typography>
      <Stack spacing={2} direction="row">
        <Button variant="contained" style={{ textTransform: "none" }}>
          Yes
        </Button>
        <Button variant="contained" style={{ textTransform: "none" }}>
          No
        </Button>
      </Stack>
      <Typography variant="h6" color="#0000FF" component="div">
        Comments
      </Typography>
    </Box>
  );
};
