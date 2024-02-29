import React, { useState } from "react";
import { Box, Typography, Stack, Button, TextField } from "@mui/material";
import { Prompt } from "./Prompt.js";
import Feed from "./Feed.js";

function QuestionForm(){
  /*const [question, setQuestion] = useState({
    name: "",
    job: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "job")
      setPerson({ name: person["name"], job: value });
    else setPerson({ name: value, job: person["job"] });
  }

  function submitForm() {
    props.handleSubmit(person);
    setPerson({ name: "", job: "" });
  }*/

  return (
        <Stack spacing={2} style={{ display: "flex", alignItems: "center" }}>
            <TextField
                label="Question"
                id="1"
                name="sup1"
                multiline
                style={{ width: "75%" }}
            ></TextField>
            <TextField
                label="Category"
                id="2"
                name="sup2"
                multiline
                style={{ width: "75%" }}
            ></TextField>
            <TextField
                label="Date Event Happens"
                id="3"
                name="sup3"
                multiline
                style={{ width: "75%" }}
            ></TextField>
            <Button variant="contained" style={{ textTransform: "none" }}>
                Post
            </Button>
        </Stack>
  );

}

export default QuestionForm;