import {
  Box,
  Card,
  CardContent,
  Stack,
  Typography
} from "@mui/material";

const CreatorPrompt = (props) => {
  const prompt = props.prompt;
  return (
    <Box width="95%">
      <Card
        style={{
          display: "flex",
          flexDirection: "column",
          paddingRight: "20px",
          paddingLeft: "10px"
        }}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {prompt.question}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            Responses
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
            <Typography variant="h5" color={"primary"}>Yes: {prompt.numYes.toLocaleString()}</Typography>
            <Typography variant="h5" color={"secondary"}>No: {prompt.numNo.toLocaleString()}</Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CreatorPrompt;
