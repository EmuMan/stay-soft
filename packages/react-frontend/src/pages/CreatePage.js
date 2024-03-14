import { Stack, TextField, Button } from "@mui/material";
import { useState } from "react";

const CreatePage = (props) => {
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState("");
  const prompt = {
    // eslint-disable-line no-unused-vars
    question: question,
    user: props.profile._id,
    category: category,
    dateOpened: new Date(),
  };

  function postPrompt() {
    prompt.question = question;
    prompt.category = category;
    setQuestion("");
    setCategory("");
    if (prompt.question !== "") {
      const promise = fetch(`${process.env.REACT_APP_API_ENDPOINT}/prompts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
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
        id="1"
        name="questionBar"
        multiline
        style={{ width: "75%" }}
        value={question}
        onChange={(e) => {
          const newValue = e.target.value.toString().slice(0, 139);
          e.target.value = newValue;
          setQuestion(newValue);
        }}
      ></TextField>
      <TextField
        label="Category"
        id="2"
        name="categoryBar"
        multiline
        style={{ width: "75%" }}
        value={category}
        onChange={(e) => {
          const newValue = e.target.value.toString().slice(0, 139);
          e.target.value = newValue;
          setCategory(newValue);
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
