import { Stack, TextField, Button } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";

const CreatePage = (props) => {
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState("");
  const [dateClosed, setDateClosed] = useState("");
  const [prompt, setPrompt] = useState({ // eslint-disable-line no-unused-vars
    question: question,
    user: props.profile._id,
    category: category,
    dateOpened: new Date(),
    dateClosed: new Date(),
  });

  function postPrompt() {
    prompt.question = question;
    prompt.category = category;
    prompt.dateClosed = dateClosed;
    setQuestion("");
    setCategory("");
    setDateClosed("");
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

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker
            label="Date of Event"
            name="dateCalendar"
            style={{ width: "75%" }}
            value={dateClosed}
            onChange={(newValue) => setDateClosed(newValue)}
          />
        </DemoContainer>
      </LocalizationProvider>


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
