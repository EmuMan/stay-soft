import { Stack, Typography, TextField, Button } from "@mui/material";

const CreatePage = () => {
  return (
    <Stack spacing={2} style={{ display: "flex", alignItems: "center" }}>
      <TextField
        label="Question"
        id="hello"
        name="sup"
        multiline
        style={{ width: "75%" }}
      ></TextField>
      <Button variant="contained" style={{ textTransform: "none" }}>
        Post
      </Button>
    </Stack>
  );
};

export default CreatePage;
