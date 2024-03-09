import { Box, Card, CardContent, Typography } from "@mui/material";

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
            {prop.bet.promptId.question}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {prop.bet.amount.toString()}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {prop.bet.decision.toString()}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MyBet;
