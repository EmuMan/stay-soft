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
        // Limit prompt length to 140 characters
        onInput={(e) => {
          e.target.value = e.target.value.toString().slice(0, 139);
        }}
      ></TextField>
      <Button variant="contained" style={{ textTransform: "none" }}>
        Post
      </Button>
    </Stack>
  );
};

export default CreatePage;
