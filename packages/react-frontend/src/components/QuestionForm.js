import React, { useState } from "react";
import { Box, Typography, Stack, Button, TextField } from "@mui/material";
import { Prompt } from "./Prompt.js";
import Feed from "./Feed.js";

function QuestionForm(props){
  

  const [question, setQuestion] = useState({
    question: ""
  });

  const [category, setCategory] = useState({
    category: ""
  });

  const [dateClosed, setDateClosed] = useState({
    dateClosed: ""
  });

  function handleChange(event) {
    console.log("we assigning the new stuff");
    const { name, value } = event.target;
    if (name === "question")
        setQuestion({ question: value });
    else if (name === "category")
        setCategory({category: value});
    else if (name === "date")
        setDateClosed({dateClosed: value});
    
  }

  function submitForm() {
    
    const subPrompt = {
        question: question.question,
        category: category.category,
        dateClosed: dateClosed.dateClosed
    }
    console.log("we shipping off the new stuff. heres where its at");
    console.log(subPrompt);
    props.handleSubmit(subPrompt);
    setQuestion({ question: "" });
    setCategory({ category: "" });
    setDateClosed({ dateClosed: "" });
  }

  return (
        <Stack spacing={2} style={{ display: "flex", alignItems: "center" }}>
            <TextField
                label="Question"
                id="1"
                name="question"
                multiline
                style={{ width: "75%" }}
                //value={question}
                onChange={handleChange}
            ></TextField>
            <TextField
                label="Category"
                id="2"
                name="category"
                multiline
                style={{ width: "75%" }}
                //value={category}
                onChange={handleChange}
            ></TextField>
            <TextField
                label="Date Event Happens"
                id="3"
                name="date"
                multiline
                style={{ width: "75%" }}
                //value={dateChanged}
                onChange={handleChange}
            ></TextField>
            <Button variant="contained" type="button" value="Submit" onClick={submitForm} style={{ textTransform: "none" }}>
                Post
            </Button>
        </Stack>
  );

}

export default QuestionForm;