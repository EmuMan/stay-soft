import { Box, Card, CardContent, Typography } from "@mui/material";

const MyBet = (prop) => {
  return (
    <Box width="95%">
      <Card
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {prop.bet.promptId.question}
          </Typography>
          <div style={{
            backgroundColor: prop.bet.decision ? "var(--primary)" : "var(--secondary)", 
            color: "white",
            display: "inline-block",
            padding: "0.35em 15px 0",
            margin: "5px 0 10px",
            borderRadius: "5px"
          }}>
            <Typography gutterBottom variant="h5" component="div">
              {prop.bet.decision ? "YES!" : "NO!"}
            </Typography>
          </div>
          <div style={{display: "flex", gap: "1ch"}}>
            <Typography gutterBottom variant="h5" component="div">
              Wager:
            </Typography>
            <Typography gutterBottom variant="h5" component="div" color={"secondary"}>
              ${prop.bet.amount.toString()}
            </Typography>
          </div>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MyBet;
