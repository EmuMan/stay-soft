import { Stack, TextField, Button } from "@mui/material";
import { useState } from "react";

const CreatePage = (props) => {
  const [question, setQuestion] = useState("");
  const [prompt, __setPrompt] = useState({ // eslint-disable-line no-unused-vars
    question: "hello",
    user: props.profile._id,
    category: "sports",
    dateOpened: new Date("2024-02-24T00:00:00.000+00:00"),
    dateClosed: new Date("2024-02-24T00:00:00.000+00:00"),
  });

  function postPrompt() {
    prompt.question = question;
    setQuestion("");
    if (prompt.question !== "") {
      const promise = fetch("http://localhost:8000/prompts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(prompt),
      });
      return promise;
    }
  }

  return (
    <Stack spacing={2} style={{ display: "flex", alignItems: "center" }}>
      <TextField
        label="Question"
        id="hello"
        name="sup"
        multiline
        style={{ width: "75%" }}
        value={question}
        onChange={(e) => {
          const newValue = e.target.value.toString().slice(0, 139);
          e.target.value = newValue;
          setQuestion(newValue);
        }}
      ></TextField>
      <Button
        variant="contained"
        style={{ textTransform: "none" }}
        onClick={postPrompt}
      >
        Post
      </Button>
    </Stack>
  );
};

export default CreatePage;
