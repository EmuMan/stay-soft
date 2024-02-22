import { Stack, Typography, TextField, Button } from "@mui/material";

const CreatePage = () => {
  return (
    <Stack
      marginTop="20px"
      spacing={2}
      style={{ display: "flex", alignItems: "center" }}
    >
      <Typography variant="h4">Create</Typography>
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
