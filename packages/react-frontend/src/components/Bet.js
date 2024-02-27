import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardMedia,
} from "@mui/material";

function Bet(prop) {
  return (
    <Box width="300px">
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {prop.question.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained">Yes</Button>
          <Button variant="contained">NO</Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default Bet;
