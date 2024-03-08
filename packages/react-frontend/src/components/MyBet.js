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

const MyBet = (prop) => {
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
            {prop.question}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {prop.amount.toString()}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {prop.decision.toString()}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MyBet;
